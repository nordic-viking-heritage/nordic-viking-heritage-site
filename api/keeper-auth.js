import crypto from 'node:crypto';

const COOKIE = 'keeper_session';
const MAX_AGE = 60 * 60 * 8;

const json = (res, status, payload) => {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
};

const secret = () => process.env.KEEPER_ADMIN_SECRET || '';
const sign = value => crypto.createHmac('sha256', secret()).update(value).digest('hex');
const safeEqual = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};
const cookieValue = () => {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE;
  return `${expires}.${sign(String(expires))}`;
};
const isSession = req => {
  const raw = String(req.headers.cookie || '').split(';').map(v => v.trim()).find(v => v.startsWith(`${COOKIE}=`));
  if (!raw || !secret()) return false;
  const value = decodeURIComponent(raw.slice(COOKIE.length + 1));
  const [expires, signature] = value.split('.');
  if (!expires || !signature || Number(expires) < Math.floor(Date.now() / 1000)) return false;
  return safeEqual(signature, sign(expires));
};

export default async function handler(req, res) {
  if (process.env.VERCEL_ENV !== 'preview') return json(res, 404, { ok: false, error: 'Not found.' });
  if (!secret()) return json(res, 503, { ok: false, error: 'Keeper authentication is not configured.' });

  if (req.method === 'GET') return json(res, 200, { ok: true, authenticated: isSession(req) });

  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    if (!safeEqual(body.secret || '', secret())) return json(res, 401, { ok: false, error: 'The chamber remains sealed.' });
    res.setHeader('Set-Cookie', `${COOKIE}=${encodeURIComponent(cookieValue())}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${MAX_AGE}`);
    return json(res, 200, { ok: true, authenticated: true });
  }

  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`);
    return json(res, 200, { ok: true });
  }

  res.setHeader('Allow', 'GET, POST, DELETE');
  return json(res, 405, { ok: false, error: 'Method not allowed.' });
}
