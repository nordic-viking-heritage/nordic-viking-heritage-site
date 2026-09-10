import { get, list } from '@vercel/blob';

const json=(res,status,payload)=>{res.status(status).setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','no-store');res.end(JSON.stringify(payload));};
const read=async pathname=>{const r=await get(pathname,{access:'private',useCache:false});if(!r?.stream)return null;return JSON.parse(await new Response(r.stream).text());};

export default async function handler(req,res){
  if(process.env.VERCEL_ENV!=='preview') return json(res,404,{ok:false,error:'Not found.'});
  if(req.method!=='GET'){res.setHeader('Allow','GET');return json(res,405,{ok:false,error:'Method not allowed.'});}
  try{
    const result=await list({prefix:'keepers-chamber/published/'});
    const blobs=[...(result.blobs||[])].sort((a,b)=>new Date(b.uploadedAt||0)-new Date(a.uploadedAt||0)).slice(0,100);
    const voices=[];
    for(const blob of blobs){const x=await read(blob.pathname);if(x?.kind!=='crew-voice'||x.status!=='published')continue;voices.push({identity:x.identity,message:x.message,submittedAt:x.submittedAt,publishedAt:x.publication?.publishedAt||null});}
    return json(res,200,{ok:true,voices});
  }catch(error){console.error('Crew Voices public feed failed:',error);return json(res,500,{ok:false,error:'Crew Voices could not be opened.'});}
}
