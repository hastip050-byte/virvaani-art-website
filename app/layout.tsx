import './globals.css';
import { prisma, ensureSeeded } from '@/lib/db';

export async function generateMetadata() {
  try {
    await ensureSeeded();

    const s = await prisma.siteSetting.findUnique({
      where: { id: 'main' },
    });

    const title =
      s?.seoTitle ||
      'VIRVAANI ART | School Wall Art & Educational Murals';

    const description =
      s?.seoDescription ||
      'VIRVAANI ART creates school wall art, educational murals, 3D wall painting and large-scale public art across India.';

    return {
      title,
      description,

      keywords: [
        'VIRVAANI ART',
        'school wall art',
        'school wall painting',
        'educational wall painting',
        'educational murals',
        '3D wall painting',
        'classroom wall painting',
        'school mural artists',
        'commercial wall art',
        'public art',
        'large scale mural',
        'wall painting India',
      ],

      authors: [
        {
          name: 'VIRVAANI ART',
        },
      ],

      openGraph: {
        title,
        description,
        type: 'website',
        siteName: 'VIRVAANI ART',
        images: [
          {
            url: '/images/selected-modern-01.jpg',
            width: 1200,
            height: 630,
            alt: 'VIRVAANI ART',
          },
        ],
      },

      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['/images/selected-modern-01.jpg'],
      },

      robots: {
        index: true,
        follow: true,
      },
    };
  } catch {
    return {
      title: 'VIRVAANI ART | School Wall Art & Educational Murals',
      description:
        'VIRVAANI ART creates school wall art, educational murals, 3D wall painting and large-scale public art across India.',
      robots: {
        index: true,
        follow: true,
      },
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}