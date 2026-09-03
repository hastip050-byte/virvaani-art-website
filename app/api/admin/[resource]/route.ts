import { NextResponse } from 'next/server';
import { prisma, ensureSeeded, parseJsonArray } from '@/lib/db';

const map:any = { projects:'project', services:'service', gallery:'galleryItem', beforeafter:'beforeAfter', testimonials:'testimonial', blog:'blogPost', settings:'siteSetting' };
const model:any = (key:string)=> (prisma as any)[map[key]];

function clean(resource:string, row:any) {
  if (!row) return row;
  if (resource==='projects') return {...row, scope:parseJsonArray(row.scope)};
  if (resource==='services') return {...row, tags:parseJsonArray(row.tags), deliverables:parseJsonArray(row.deliverables)};
  return row;
}
export async function GET(_:Request,{params}:{params:{resource:string}}) {
  await ensureSeeded();
  const r=params.resource.toLowerCase();
  if (!map[r]) return NextResponse.json({error:'Unknown resource'},{status:404});
  const rows=await model(r).findMany({orderBy:{createdAt:'desc'}});
  return NextResponse.json(rows.map((x:any)=>clean(r,x)));
}
export async function POST(req:Request,{params}:{params:{resource:string}}) {
  await ensureSeeded();
  const r=params.resource.toLowerCase();
  if (!map[r] || r==='settings') return NextResponse.json({error:'Invalid resource'},{status:400});
  const body=await req.json();
  const id=String(body.id || `${r}-${Date.now()}`);
  const data:any={...body,id};
  delete data.createdAt; delete data.updatedAt;
  if(r==='projects') data.scope=JSON.stringify(body.scope||[]);
  if(r==='services'){data.tags=JSON.stringify(body.tags||[]);data.deliverables=JSON.stringify(body.deliverables||[]);}
  const row=await model(r).create({data});
  return NextResponse.json(clean(r,row),{status:201});
}
