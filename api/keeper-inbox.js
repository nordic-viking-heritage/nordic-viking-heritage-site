import crypto from 'node:crypto';
import { get, list, put, del } from '@vercel/blob';

const json = (res, status, payload) => {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
};

const safeEqual = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};
const isKeeper = req => {
  const secret = process.env.KEEPER_ADMIN_SECRET || '';
  if (!secret) return false;
  const raw = String(req.headers.cookie || '').split(';').map(v => v.trim()).find(v => v.startsWith('keeper_session='));
  if (!raw) return false;
  const value = decodeURIComponent(raw.slice('keeper_session='.length));
  const [expires, signature] = value.split('.');
  if (!expires || !signature || Number(expires) < Math.floor(Date.now() / 1000)) return false;
  const expected = crypto.createHmac('sha256', secret).update(expires).digest('hex');
  return safeEqual(signature, expected);
};
const sameOrigin = req => {
  const origin = String(req.headers.origin || '');
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '');
  if (!origin || !host) return false;
  try { return new URL(origin).host === host; } catch { return false; }
};
const allowedPendingPath = value => {
  const path = String(value || '');
  return path.startsWith('keepers-chamber/pending/') && path.endsWith('.json') ? path : null;
};
const readSubmission = async pathname => {
  const readback = await get(pathname, { access: 'private', useCache: false });
  if (!readback?.stream) return null;
  return JSON.parse(await new Response(readback.stream).text());
};
const readBucket = async status => {
  const result = await list({ prefix: `keepers-chamber/${status}/` });
  const blobs = [...(result.blobs || [])].sort((a,b)=>new Date(b.uploadedAt||0)-new Date(a.uploadedAt||0)).slice(0,50);
  const messages=[];
  for (const blob of blobs) {
    const stored=await readSubmission(blob.pathname);
    if (stored?.kind!=='crew-voice') continue;
    messages.push({id:blob.pathname,identity:stored.identity,message:stored.message,submittedAt:stored.submittedAt,status:stored.status,decidedAt:stored.moderation?.decidedAt||null,automaticPublishing:stored.privacy?.automaticPublishing===true});
  }
  return messages;
};

export default async function handler(req,res){
  if(process.env.VERCEL_ENV!=='preview') return json(res,404,{ok:false,error:'Not found.'});
  if(!isKeeper(req)) return json(res,401,{ok:false,error:'Keeper authentication required.'});

  if(req.method==='GET'){
    try{
      const [pending,approved,rejected]=await Promise.all([readBucket('pending'),readBucket('approved'),readBucket('rejected')]);
      return json(res,200,{ok:true,counts:{pending:pending.length,approved:approved.length,rejected:rejected.length},pending,approved,rejected});
    }catch(error){console.error('Keeper inbox read failed:',error);return json(res,500,{ok:false,error:'The Keeper could not open the message chest.'});}
  }

  if(req.method==='POST'){
    if(!sameOrigin(req)) return json(res,403,{ok:false,error:'Invalid request origin.'});
    try{
      const body=typeof req.body==='string'?JSON.parse(req.body||'{}'):(req.body||{});
      const pathname=allowedPendingPath(body.id);
      const action=body.action==='approve'?'approved':body.action==='reject'?'rejected':null;
      if(!pathname||!action) return json(res,400,{ok:false,error:'Invalid moderation request.'});
      const stored=await readSubmission(pathname);
      if(!stored||stored.kind!=='crew-voice'||stored.status!=='pending') return json(res,409,{ok:false,error:'This Crew Voice is no longer pending.'});
      const moderated={...stored,status:action,moderation:{decision:action,decidedAt:new Date().toISOString(),automaticPublishing:false},privacy:{...(stored.privacy||{}),automaticPublishing:false}};
      const filename=pathname.split('/').pop();
      await put(`keepers-chamber/${action}/${filename}`,JSON.stringify(moderated,null,2),{access:'private',addRandomSuffix:false,allowOverwrite:false,contentType:'application/json'});
      await del(pathname);
      return json(res,200,{ok:true,status:action,automaticPublishing:false,message:action==='approved'?'Crew Voice approved for editorial use. It has NOT been published.':'Crew Voice rejected and archived. It has NOT been published.'});
    }catch(error){console.error('Keeper moderation failed:',error);return json(res,500,{ok:false,error:'The Keeper could not complete that decision.'});}
  }
  res.setHeader('Allow','GET, POST');
  return json(res,405,{ok:false,error:'Method not allowed.'});
}
