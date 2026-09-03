import { NextResponse } from 'next/server';
import { prisma, ensureSeeded } from '@/lib/db';
export async function GET(){await ensureSeeded();return NextResponse.json(await prisma.siteSetting.findUnique({where:{id:'main'}}));}
export async function PUT(req:Request){await ensureSeeded();const body=await req.json();delete body.id;delete body.updatedAt;return NextResponse.json(await prisma.siteSetting.update({where:{id:'main'},data:body}));}
