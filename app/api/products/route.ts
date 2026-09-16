import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('PUBLIC PRODUCTS ERROR:', error);

    return NextResponse.json(
      {
        error: 'Unable to load products',
      },
      { status: 500 }
    );
  }
}