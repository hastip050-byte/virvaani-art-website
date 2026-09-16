import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const message = String(body.message || '').trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and suggestion are required.' },
        { status: 400 }
      );
    }

    const row = await prisma.suggestion.create({
      data: {
        id: crypto.randomUUID(),
        name,
        email,
        message,
        status: 'NEW',
      },
    });

    return NextResponse.json(
      { ok: true, id: row.id, message: 'Suggestion submitted successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('SUGGESTION POST ERROR:', error);
    return NextResponse.json(
      { error: 'Unable to save suggestion.' },
      { status: 500 }
    );
  }
}
