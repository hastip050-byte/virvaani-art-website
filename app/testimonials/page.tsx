'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

type T = {
  id: string;
  name: string;
  role: string;
  quote: string;
  image?: string;
};

export default function Testimonials() {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const res = await fetch('/api/testimonials', {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('Failed to load testimonials');
        }

        const data = await res.json();
        console.log('TESTIMONIAL DATA:', data);
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error('Testimonials loading error:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    loadTestimonials();
  }, []);

  return (
    <>
      <Header />

      <PageHero
        eyebrow="Client Voice"
        title="WHAT PEOPLE SAY."
        desc="Testimonials published by the VIRVAANI ART team from completed work and collaborations."
        image="/images/creative-room.jpg"
      />

      <main>
        <section className="section">
          <div className="container testimonial-grid">

            {loading ? (
              <p className="body-copy">Loading testimonials...</p>
            ) : items.length > 0 ? (
              items.map((x) => (
                <article
                  className="admin-public-quote"
                  key={x.id}
                >
                  {x.image && (
                    <img
                      src={x.image}
                      alt={x.name}
                    />
                  )}

                  <p>“{x.quote}”</p>

                  <h3>{x.name}</h3>

                  <span>{x.role}</span>
                </article>
              ))
            ) : (
              <p className="body-copy">
                Testimonials will appear here when published from the Admin Control Room.
              </p>
            )}

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}