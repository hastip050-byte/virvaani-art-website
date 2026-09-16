import { PrismaClient } from '@prisma/client';
import {
  services as staticServices,
  projects as staticProjects,
} from './data';

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

let seeded = false;

export async function ensureSeeded() {
  if (seeded) return;

  // ==============================
  // SITE SETTINGS
  // ==============================
  await prisma.siteSetting.upsert({
    where: {
      id: 'main',
    },
    update: {},
    create: {
      id: 'main',
      siteName: 'VIRVAANI ART',
      tagline: 'Art • Education • Public Spaces • Commercial',
      description:
        'VIRVAANI ART creates educational murals, public art and commercial visual experiences.',
      email: 'info@virvaaniart.com',
      phone: '+91 77977 91717',
      address:
        '301, Milestone Milagro, Nr. Someshwar Junction, Udhana–Magdalla Road, Vesu, Surat – 395007.',
      seoTitle:
        'VIRVAANI ART | Commercial Art & Creative Spaces',
      seoDescription:
        'Educational murals, school wall art, public-space artwork and large-scale creative execution.',
      logo: '/logo/virvaani-art-logo.png',
    },
  });

  // ==============================
  // SERVICES
  // ==============================
  for (const s of staticServices) {
    await prisma.service.upsert({
      where: {
        id: s.id,
      },
      update: {
        title: s.title,
        short: s.short,
        image: s.image,
        tags: JSON.stringify(s.tags),
        number: s.number,
        detail: s.detail,
        deliverables: JSON.stringify(s.deliverables),
      },
      create: {
        ...s,
        tags: JSON.stringify(s.tags),
        deliverables: JSON.stringify(s.deliverables),
      },
    });
  }

  // ==============================
  // GALLERY
  // ==============================
 

  

  seeded = true;
}

export function parseJsonArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}