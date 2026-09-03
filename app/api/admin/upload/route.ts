import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

export async function POST(req:Request){
  const form=await req.formData();
  const file=form.get('file');
  if(!(file instanceof File)) return NextResponse.json({error:'No file uploaded'},{status:400});
  if(!file.type.startsWith('image/')) return NextResponse.json({error:'Only image files are allowed'},{status:400});
  if(file.size>10*1024*1024) return NextResponse.json({error:'Maximum image size is 10MB'},{status:400});
  const ext=(file.name.split('.').pop()||'jpg').replace(/[^a-z0-9]/gi,'').toLowerCase()||'jpg';
  const name=`${Date.now()}-${crypto.randomBytes(5).toString('hex')}.${ext}`;
  const dir=path.join(process.cwd(),'public','uploads');
  await fs.mkdir(dir,{recursive:true});
  await fs.writeFile(path.join(dir,name),Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({url:`/uploads/${name}`});
}
