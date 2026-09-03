'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

type Item = {
  id: string;
  name: string;
  image: string;
  desc: string;
  detail: string;
};

export default function Gallery() {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState<Item | null>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => r.json())
      .then(setItems);
  }, []);

  return (
    <>
      <Header />

      <PageHero
        eyebrow="Visual Gallery"
        title="A DIFFERENT VISUAL LANGUAGE FOR EVERY THEME."
        desc="We avoid one-size-fits-all artwork. Every theme, audience and space gets its own visual direction."
        image="/images/geometric-atrium.jpg"
      />

      <main>
        <section className="section">
          <div className="container gallery-grid">
            {items.map((t) => (
              <button
                className="gallery-item"
                key={t.id}
                onClick={() => setActive(t)}
              >
                <img src={t.image} alt={t.name} />
                <span>{t.name}</span>
                <b>View theme ↗</b>
              </button>
            ))}
          </div>
        </section>
      </main>

      {active && (
        <div
          className="lightbox"
          onClick={() => setActive(null)}
        >
          <div
            className="lightbox-card"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.image}
              alt={active.name}
            />

            <div>
              <span className="eyebrow">Theme</span>

              <h2>{active.name}</h2>

              <p>{active.detail}</p>

              <a
                className="btn dark"
                href="/contact"
              >
                Discuss this theme ↗
              </a>
            </div>

            <button
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}