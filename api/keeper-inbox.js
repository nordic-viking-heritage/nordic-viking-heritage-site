import { get, list, put, del } from '@vercel/blob';

const json = (res, status, payload) => {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
};

const allowedPendingPath = (value) => {
  const path = String(value || '');
  return path.startsWith('keepers-chamber/pending/') && path.endsWith('.json') ? path : null;
};

const readSubmission = async (pathname) => {
  const readback = await get(pathname, { access: 'private', useCache: false });
  if (!readback?.stream) return null;
  return JSON.parse(await new Response(readback.stream).text());
};

export default async function handler(req, res) {
  if (process.env.VERCEL_ENV !== 'preview') {
    return json(res, 404, { ok: false, error: 'Not found.' });
  }

  if (req.method === 'GET') {
    try {
      const result = await list({ prefix: 'keepers-chamber/pending/' });
      const blobs = [...(result.blobs || [])]
        .sort((a, b) => new Date(b.uploadedAt || 0) - new Date(a.uploadedAt || 0))
        .slice(0, 50);

      const messages = [];
      for (const blob of blobs) {
        const stored = await readSubmission(blob.pathname);
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

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const pathname = allowedPendingPath(body.id);
      const action = body.action === 'approve' ? 'approved' : body.action === 'reject' ? 'rejected' : null;
      if (!pathname || !action) return json(res, 400, { ok: false, error: 'Invalid moderation request.' });

      const stored = await readSubmission(pathname);
      if (!stored || stored.kind !== 'crew-voice' || stored.status !== 'pending') {
        return json(res, 409, { ok: false, error: 'This Crew Voice is no longer pending.' });
      }

      const moderated = {
        ...stored,
        status: action,
        moderation: {
          decision: action,
          decidedAt: new Date().toISOString(),
          automaticPublishing: false
        },
        privacy: {
          ...(stored.privacy || {}),
          automaticPublishing: false
        }
      };

      const filename = pathname.split('/').pop();
      const destination = `keepers-chamber/${action}/${filename}`;
      await put(destination, JSON.stringify(moderated, null, 2), {
        access: 'private',
        addRandomSuffix: false,
        allowOverwrite: false,
        contentType: 'application/json'
      });
      await del(pathname);

      return json(res, 200, {
        ok: true,
        status: action,
        automaticPublishing: false,
        message: action === 'approved'
          ? 'Crew Voice approved for editorial use. It has NOT been published.'
          : 'Crew Voice rejected and archived. It has NOT been published.'
      });
    } catch (error) {
      console.error('Keeper moderation failed:', error);
      return json(res, 500, { ok: false, error: 'The Keeper could not complete that decision.' });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return json(res, 405, { ok: false, error: 'Method not allowed.' });
}
