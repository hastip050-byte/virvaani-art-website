import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: product,
    });
  }

  console.log('✅ 6 default products added successfully.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });