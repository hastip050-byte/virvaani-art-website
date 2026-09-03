import { NextResponse } from 'next/server';
import { prisma, ensureSeeded, parseJsonArray } from '@/lib/db';
const map:any={projects:'project',services:'service',gallery:'galleryItem',beforeafter:'beforeAfter',testimonials:'testimonial',blog:'blogPost'};
const model=(r:string)=>(prisma as any)[map[r]];
function clean(r:string,row:any){if(r==='projects')return {...row,scope:parseJsonArray(row.scope)};if(r==='services')return {...row,tags:parseJsonArray(row.tags),deliverables:parseJsonArray(row.deliverables)};return row;}

export async function PUT(req:Request,{params}:{params:{resource:string,id:string}}){
 await ensureSeeded(); const r=params.resource.toLowerCase(); if(!map[r]) return NextResponse.json({error:'Unknown resource'},{status:404});
 const body=await req.json(); const data:any={...body}; delete data.id; delete data.createdAt; delete data.updatedAt;
 if(r==='projects'&&Array.isArray(body.scope))data.scope=JSON.stringify(body.scope);
 if(r==='services'){if(Array.isArray(body.tags))data.tags=JSON.stringify(body.tags);if(Array.isArray(body.deliverables))data.deliverables=JSON.stringify(body.deliverables);}
 const row=await model(r).update({where:{id:params.id},data}); return NextResponse.json(clean(r,row));
}
export async function DELETE(_:Request,{params}:{params:{resource:string,id:string}}){
 await ensureSeeded(); const r=params.resource.toLowerCase(); if(!map[r]) return NextResponse.json({error:'Unknown resource'},{status:404});
 await model(r).delete({where:{id:params.id}}); return NextResponse.json({ok:true});
}
