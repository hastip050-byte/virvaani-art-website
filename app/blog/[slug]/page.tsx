import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { prisma, ensureSeeded } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function BlogDetail({
  params,
}: {
  params: { slug: string };
}) {
  await ensureSeeded();

  const post = await prisma.blogPost.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <>
      <Header />

      <PageHero
        eyebrow="VIRVAANI ART JOURNAL"
        title={post.title}
        desc={post.excerpt}
        image={post.image}
      />

      <main>
        <section className="section">
          <div className="container">
            <article className="blog-detail">

              <img
                src={post.image}
                alt={post.title}
                className="blog-detail-image"
              />

              <div className="blog-detail-content">
                <span className="eyebrow">
                  VIRVAANI ART
                </span>

                <h1>{post.title}</h1>

                <p className="body-copy">
                  {post.content}
                </p>

                <a
                  href="/blog"
                  className="btn dark"
                >
                  ← Back to Journal
                </a>
              </div>

            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}