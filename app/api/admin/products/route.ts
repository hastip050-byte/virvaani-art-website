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

export async function POST(req: Request) {
  try {
    await ensureSeeded();

    const body = await req.json();

    if (!body.id || !body.title) {
      return NextResponse.json(
        { error: 'ID and Product Title are required' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        id: body.id,
        title: body.title,
        name: body.name || body.title,
        category: body.category || '',
        description: body.description || '',
        detail: body.detail || '',
        image: body.image || '',
        price: body.price || null,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error('PRODUCT CREATE ERROR:', error);

    return NextResponse.json(
      {
        error:
          error.message || 'Unable to create product',
      },
      { status: 500 }
    );
  }
}