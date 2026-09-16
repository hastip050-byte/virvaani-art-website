import { NextRequest, NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
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
    console.error('Career GET error:', error);

    return NextResponse.json(
      { error: 'Failed to load career profiles' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log('🔥 CAREER POST STARTED');

    const formData = await req.formData();

    const fullName = String(
      formData.get('fullName') || ''
    ).trim();

    const email = String(
      formData.get('email') || ''
    ).trim();

    const phone = String(
      formData.get('phone') || ''
    ).trim();

    const city = String(
      formData.get('city') || ''
    ).trim();

    const role = String(
      formData.get('role') || ''
    ).trim();

    const experience = String(
      formData.get('experience') || ''
    ).trim();

    const skills = String(
      formData.get('skills') || ''
    ).trim();

    const about = String(
      formData.get('about') || ''
    ).trim();

    const portfolio = String(
      formData.get('portfolio') || ''
    ).trim();

    if (
      !fullName ||
      !email ||
      !phone ||
      !city ||
      !role ||
      !experience ||
      !skills ||
      !about
    ) {
      return NextResponse.json(
        {
          error:
            'Required fields are missing',
        },
        { status: 400 }
      );
    }

    /* ==================================================
       UPLOAD DIRECTORY
    ================================================== */

    const uploadDir = path.join(
      process.cwd(),
      'public',
      'uploads',
      'career'
    );

    await mkdir(uploadDir, {
      recursive: true,
    });

    /* ==================================================
       RESUME UPLOAD
    ================================================== */

    let resumeUrl: string | null = null;

    const resume = formData.get('resume');

    if (
      resume instanceof File &&
      resume.size > 0
    ) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];

      if (
        !allowedTypes.includes(
          resume.type
        )
      ) {
        return NextResponse.json(
          {
            error:
              'Resume must be PDF, DOC or DOCX.',
          },
          { status: 400 }
        );
      }

      if (
        resume.size >
        5 * 1024 * 1024
      ) {
        return NextResponse.json(
          {
            error:
              'Resume must be smaller than 5MB.',
          },
          { status: 400 }
        );
      }

      const safeName =
        resume.name.replace(
          /[^a-zA-Z0-9._-]/g,
          '-'
        );

      const fileName = `${randomUUID()}-${safeName}`;

      const filePath = path.join(
        uploadDir,
        fileName
      );

      const bytes =
        await resume.arrayBuffer();

      await writeFile(
        filePath,
        new Uint8Array(bytes)
      );

      resumeUrl =
        `/uploads/career/${fileName}`;

      console.log(
        '✅ Resume uploaded:',
        resumeUrl
      );
    }

    /* ==================================================
       WORK IMAGES UPLOAD
    ================================================== */

    const workImages: string[] = [];

    const imageFiles =
      formData.getAll('workImages');

    for (
      const item of imageFiles
    ) {
      if (
        !(item instanceof File) ||
        item.size === 0
      ) {
        continue;
      }

      if (
        !item.type.startsWith(
          'image/'
        )
      ) {
        continue;
      }

      if (
        item.size >
        5 * 1024 * 1024
      ) {
        return NextResponse.json(
          {
            error:
              'Each work image must be smaller than 5MB.',
          },
          { status: 400 }
        );
      }

      const safeName =
        item.name.replace(
          /[^a-zA-Z0-9._-]/g,
          '-'
        );

      const fileName = `${randomUUID()}-${safeName}`;

      const filePath = path.join(
        uploadDir,
        fileName
      );

      const bytes =
        await item.arrayBuffer();

      await writeFile(
        filePath,
        new Uint8Array(bytes)
      );

      const imageUrl =
        `/uploads/career/${fileName}`;

      workImages.push(imageUrl);

      console.log(
        '✅ Work image uploaded:',
        imageUrl
      );
    }

    /* ==================================================
       SAVE PROFILE TO DATABASE
    ================================================== */

    const profile =
      await prisma.careerProfile.create({
        data: {
          fullName,
          email,
          phone,
          city,
          role,
          experience,
          skills,
          about,

          portfolio:
            portfolio || null,

          social: null,
          linkedin: null,
          availability: null,
          workType: null,

          resumeUrl,

          profilePhotoUrl: null,

          workImages,

          status: 'NEW',
        },
      });

    console.log(
      '✅ CAREER PROFILE SAVED:',
      profile.id
    );

    return NextResponse.json(
      {
        success: true,
        message:
          'Profile submitted successfully.',
        profileId: profile.id,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.error(
      '❌ Career POST error:',
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          'Failed to create career profile',
      },
      { status: 500 }
    );
  }
}