import { PrismaClient } from '@prisma/client';
import {
  services as staticServices,
  projects as staticProjects,
  themes as staticThemes,
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
      update: {},
      create: {
        ...s,
        tags: JSON.stringify(s.tags),
        deliverables: JSON.stringify(s.deliverables),
      },
    });
  }

  // ==============================
  // PROJECTS
  // ==============================
  for (const p of staticProjects) {
    await prisma.project.upsert({
      where: {
        id: p.id,
      },
      update: {},
      create: {
        ...p,
        scope: JSON.stringify(p.scope),
      },
    });
  }

  // ==============================
  // GALLERY
  // ==============================
  for (const [i, t] of staticThemes.entries()) {
    await prisma.galleryItem.upsert({
      where: {
        id: `gallery-${i + 1}`,
      },
      update: {},
      create: {
        id: `gallery-${i + 1}`,
        name: t.name,
        image: t.image,
        desc: t.desc,
        detail: t.detail,
      },
    });
  }

  // ==============================
  // PRODUCTS
  // ==============================
  const products = [
    {
      id: 'theme-packs',
      title: 'Theme Packs',
      name: 'Theme Packs',
      category: 'Creative System',
      description:
        'Curated visual themes for classrooms, corridors and public learning spaces.',
      detail:
        'A reusable collection of visual directions that can be adapted across multiple walls and locations.',
      image: '/images/science-lab.jpg',
      price: null,
    },
    {
      id: 'mural-concepts',
      title: 'Mural Concepts',
      name: 'Mural Concepts',
      category: 'Creative System',
      description:
        'Ready-to-customise concept directions that can be adapted to wall size and audience.',
      detail:
        'Concept packages help teams choose a visual direction before full-scale execution begins.',
      image: '/images/school-compound.jpg',
      price: null,
    },
    {
      id: 'wayfinding-art',
      title: 'Wayfinding Art',
      name: 'Wayfinding Art',
      category: 'Creative System',
      description:
        'Colour-coded visual systems that help people navigate large campuses and public spaces.',
      detail:
        'Art and wayfinding can work together to make large environments easier to understand and more memorable.',
      image: '/images/geometric-atrium.jpg',
      price: null,
    },
    {
      id: 'brand-walls',
      title: 'Brand Walls',
      name: 'Brand Walls',
      category: 'Creative System',
      description:
        'Custom visual installations for offices, retail and private-sector environments.',
      detail:
        'Brand-led wall art designed around identity, interior architecture, audience and customer experience.',
      image: '/images/selected-modern-02.jpg',
      price: null,
    },
    {
      id: 'community-learning-kits',
      title: 'Community Learning Kits',
      name: 'Community Learning Kits',
      category: 'Creative System',
      description:
        'Friendly visual systems for Anganwadi and community spaces.',
      detail:
        'Simple, colourful and positive visual themes designed for early-learning environments and community use.',
      image: '/images/selected-modern-03.jpg',
      price: null,
    },
    {
      id: 'public-art-concepts',
      title: 'Public Art Concepts',
      name: 'Public Art Concepts',
      category: 'Creative System',
      description:
        'Large-scale directions for bridges, facades and civic infrastructure.',
      detail:
        'High-visibility artwork concepts developed for large public-facing structures and circulation spaces.',
      image: '/images/selected-modern-01.jpg',
      price: null,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: {
        id: product.id,
      },
      update: {},
      create: product,
    });
  }

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