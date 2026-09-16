import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

type Context = {
  params: {
    id: string;
  };
};

export async function GET(
  _req: NextRequest,
  { params }: Context
) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('PRODUCT GET ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Unable to load product',
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: Context
) {
  try {
    const body = await req.json();

    const product = await prisma.product.update({
      where: {
        id: params.id,
      },
      data: {
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
  } catch (error) {
    console.error('PRODUCT UPDATE ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Unable to update product',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: Context
) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('PRODUCT DELETE ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Unable to delete product',
      },
      { status: 500 }
    );
  }
}