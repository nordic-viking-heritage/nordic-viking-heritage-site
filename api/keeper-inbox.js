import { get, list } from '@vercel/blob';

const json = (res, status, payload) => {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
};

export default async function handler(req, res) {
  if (process.env.VERCEL_ENV !== 'preview') {
    return json(res, 404, { ok: false, error: 'Not found.' });
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return json(res, 405, { ok: false, error: 'Method not allowed.' });
  }

  try {
    const result = await list({ prefix: 'keepers-chamber/pending/' });
    const blobs = [...(result.blobs || [])]
      .sort((a, b) => new Date(b.uploadedAt || 0) - new Date(a.uploadedAt || 0))
      .slice(0, 50);

    const messages = [];
    for (const blob of blobs) {
      const readback = await get(blob.pathname, { access: 'private', useCache: false });
      if (!readback?.stream) continue;
      const stored = JSON.parse(await new Response(readback.stream).text());
      if (stored?.kind !== 'crew-voice') continue;
      messages.push({
        id: blob.pathname,
        identity: stored.identity,
        message: stored.message,
        submittedAt: stored.submittedAt,
        status: stored.status,
        automaticPublishing: stored.privacy?.automaticPublishing === true
      });
    }

    return json(res, 200, { ok: true, count: messages.length, messages });
  } catch (error) {
    console.error('Keeper inbox read failed:', error);
    return json(res, 500, { ok: false, error: 'The Keeper could not open the message chest.' });
  }
}
