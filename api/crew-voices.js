import { get, list, put } from '@vercel/blob';

const json = (res, status, payload) => {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
};

const clean = (value, max) => String(value ?? '').replace(/\u0000/g, '').trim().slice(0, max);
const blobConfigured = () => Boolean(
  process.env.BLOB_STORE_ID ||
  process.env.BLOB_READ_WRITE_TOKEN ||
  process.env.VERCEL_OIDC_TOKEN
);

const makeSubmission = ({ identity, message }) => ({
  kind: 'crew-voice',
  status: 'pending',
  identity,
  message,
  submittedAt: new Date().toISOString(),
  source: 'keepers-chamber',
  privacy: {
    publicIdentityOnly: true,
    automaticPublishing: false
  }
});

const persistSubmission = async (submission, prefix = 'keepers-chamber/pending') => put(
  `${prefix}/${Date.now()}-crew-voice.json`,
  JSON.stringify(submission, null, 2),
  {
    access: 'private',
    addRandomSuffix: true,
    contentType: 'application/json'
  }
);

const runPreviewSmokeTest = async () => {
  if (process.env.VERCEL_ENV !== 'preview') {
    return { ok: false, blocked: true, error: 'Preview smoke test is disabled outside Preview.' };
  }

  const marker = `preview-${Date.now()}`;
  const submission = makeSubmission({
    identity: `Preview Test ${marker}`,
    message: 'Automated Crew Voices Preview chain verification.'
  });

  const blob = await persistSubmission(submission, 'keepers-chamber/preview-tests/pending');
  const readback = await get(blob.pathname, { access: 'private', useCache: false });

  if (!readback?.stream) {
    throw new Error('Private Blob readback returned no stream.');
  }

  const stored = JSON.parse(await new Response(readback.stream).text());
  const verified = stored.kind === 'crew-voice' &&
    stored.status === 'pending' &&
    stored.identity === submission.identity &&
    stored.message === submission.message &&
    stored.privacy?.automaticPublishing === false;

  if (!verified) {
    throw new Error('Stored Crew Voices payload did not match the pending submission.');
  }

  return {
    ok: true,
    environment: process.env.VERCEL_ENV,
    privateBlob: true,
    status: stored.status,
    automaticPublishing: stored.privacy.automaticPublishing,
    pathname: blob.pathname
  };
};

const runPreviewVisitorTest = async (req) => {
  if (process.env.VERCEL_ENV !== 'preview') {
    return { ok: false, blocked: true, error: 'Preview visitor test is disabled outside Preview.' };
  }

  const marker = `Visitor E2E ${Date.now()}`;
  const message = `Preview form-path verification ${marker}`;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const endpoint = `${proto}://${host}/api/crew-voices`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: marker, message, consent: true, website: '' })
  });

  const postResult = await response.json().catch(() => ({}));
  if (response.status !== 201 || postResult?.ok !== true) {
    throw new Error(`Visitor-style POST failed with HTTP ${response.status}.`);
  }

  const listed = await list({ prefix: 'keepers-chamber/pending/' });
  const candidates = [...(listed.blobs || [])].sort((a, b) => (b.uploadedAt || 0) - (a.uploadedAt || 0));

  for (const blob of candidates.slice(0, 20)) {
    const readback = await get(blob.pathname, { access: 'private', useCache: false });
    if (!readback?.stream) continue;
    const stored = JSON.parse(await new Response(readback.stream).text());
    if (stored.identity !== marker) continue;

    const verified = stored.kind === 'crew-voice' &&
      stored.status === 'pending' &&
      stored.message === message &&
      stored.source === 'keepers-chamber' &&
      stored.privacy?.automaticPublishing === false;

    if (!verified) {
      throw new Error('Visitor-style POST was stored, but moderation/privacy fields were incorrect.');
    }

    return {
      ok: true,
      environment: process.env.VERCEL_ENV,
      httpPost: response.status,
      apiAccepted: true,
      privateBlobReadback: true,
      status: stored.status,
      automaticPublishing: stored.privacy.automaticPublishing,
      pathname: blob.pathname
    };
  }

  throw new Error('Visitor-style POST succeeded, but its private pending Blob could not be located for readback.');
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    if (req.query?.visitorTest === '1') {
      try {
        const result = await runPreviewVisitorTest(req);
        return json(res, result.ok ? 200 : 403, result);
      } catch (error) {
        console.error('Crew Voices Preview visitor test failed:', error);
        return json(res, 500, { ok: false, error: error?.message || 'Preview visitor test failed.' });
      }
    }
    if (req.query?.smoke === '1') {
      try {
        const result = await runPreviewSmokeTest();
        return json(res, result.ok ? 200 : 403, result);
      } catch (error) {
        console.error('Crew Voices Preview smoke test failed:', error);
        return json(res, 500, { ok: false, error: error?.message || 'Preview smoke test failed.' });
      }
    }
    return json(res, 200, { ready: blobConfigured() });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return json(res, 405, { ok: false, error: 'Method not allowed.' });
  }

  if (!blobConfigured()) {
    return json(res, 503, { ok: false, error: 'The Keeper’s message route is not active yet.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

    // Honeypot: real visitors never see or fill this field.
    if (clean(body.website, 200)) {
      return json(res, 200, { ok: true });
    }

    const identity = clean(body.identity, 60);
    const message = clean(body.message, 700);
    const consent = body.consent === true;

    if (!identity || identity.length < 2) {
      return json(res, 400, { ok: false, error: 'Please enter your Pacer or Viking name.' });
    }
    if (!message || message.length < 3) {
      return json(res, 400, { ok: false, error: 'Please write a short message for the Keeper.' });
    }
    if (!consent) {
      return json(res, 400, { ok: false, error: 'Please confirm that your public Viking/Pacer name may be shown if the message is approved.' });
    }

    const submission = makeSubmission({ identity, message });
    await persistSubmission(submission);

    return json(res, 201, {
      ok: true,
      message: 'YOUR MESSAGE HAS BEEN CARRIED TO THE KEEPER.'
    });
  } catch (error) {
    console.error('Crew Voices submission failed:', error);
    return json(res, 500, { ok: false, error: 'The raven lost the route. Please try again later.' });
  }
}
