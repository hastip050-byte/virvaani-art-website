import { NextResponse } from 'next/server';
import { prisma, ensureSeeded } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  await ensureSeeded();

  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(products);
}