import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rows = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Unable to load testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.id || !body.name || !body.quote) {
      return NextResponse.json(
        { error: 'ID, Name and Testimonial are required' },
        { status: 400 }
      );
    }

    const row = await prisma.testimonial.create({
      data: {
        id: String(body.id),
        name: String(body.name),
        role: String(body.role || ''),
        quote: String(body.quote),
        image: body.image ? String(body.image) : null,
      },
    });

    return NextResponse.json(row);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Unable to create testimonial' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const row = await prisma.testimonial.update({
      where: { id: String(body.id) },
      data: {
        name: String(body.name),
        role: String(body.role || ''),
        quote: String(body.quote),
        image: body.image ? String(body.image) : null,
      },
    });

    return NextResponse.json(row);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Unable to update testimonial' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    await prisma.testimonial.delete({
      where: { id: String(body.id) },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Unable to delete testimonial' },
      { status: 500 }
    );
  }
}