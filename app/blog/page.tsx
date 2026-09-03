'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
};

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then((r) => r.json())
      .then((data) => {
        console.log('BLOG DATA:', data);
        setPosts(data);
      })
      .catch((err) => {
        console.error('BLOG ERROR:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />

      <PageHero
        eyebrow="Insights"
        title="VIRVAANI ART JOURNAL."
        desc="Ideas, project stories and practical guidance for educational, public and commercial art programmes."
        image="/images/library-story.jpg"
      />

      <main>
        <section className="section">
          <div className="container">

            {loading ? (
              <p className="body-copy">Loading articles...</p>
            ) : posts.length > 0 ? (

              <div className="blog-grid">

                {posts.map((p) => (
                  <article className="card" key={p.id}>

                    <Link
                      href={`/blog/${p.slug}`}
                      className="card-image"
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                      />

                      <span className="image-detail">
                        Read article ↗
                      </span>
                    </Link>

                    <div className="card-body">

                      <span className="eyebrow">
                        VIRVAANI ART
                      </span>

                      <h3>{p.title}</h3>

                      <p>
                        {p.excerpt}
                      </p>

                      <Link href={`/blog/${p.slug}`}>
                        Read full article <i>↗</i>
                      </Link>

                    </div>

                  </article>
                ))}

              </div>

            ) : (

              <p className="body-copy">
                Blog posts will appear here after an admin publishes them.
              </p>

            )}

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}