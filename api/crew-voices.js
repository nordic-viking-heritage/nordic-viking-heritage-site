import { put } from '@vercel/blob';

const json = (res, status, payload) => {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
};

const clean = (value, max) => String(value ?? '').replace(/\u0000/g, '').trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return json(res, 200, { ready: Boolean(process.env.BLOB_READ_WRITE_TOKEN) });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return json(res, 405, { ok: false, error: 'Method not allowed.' });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
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

    const submission = {
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
    };

    await put(
      `keepers-chamber/pending/${Date.now()}-crew-voice.json`,
      JSON.stringify(submission, null, 2),
      {
        access: 'private',
        addRandomSuffix: true,
        contentType: 'application/json'
      }
    );

    return json(res, 201, {
      ok: true,
      message: 'YOUR MESSAGE HAS BEEN CARRIED TO THE KEEPER.'
    });
  } catch (error) {
    console.error('Crew Voices submission failed:', error);
    return json(res, 500, { ok: false, error: 'The raven lost the route. Please try again later.' });
  }
}
