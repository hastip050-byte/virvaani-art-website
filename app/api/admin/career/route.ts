import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const profiles = await prisma.careerProfile.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(profiles);
  } catch (error) {
    console.error('ADMIN CAREER GET ERROR:', error);

    return NextResponse.json(
      {
        error: 'Failed to load career profiles',
      },
      {
        status: 500,
      }
    );
  }
}