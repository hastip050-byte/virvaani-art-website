'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

type Product = {
  id: string;
  title: string;
  name: string;
  category: string;
  description: string;
  detail: string;
  image: string;
  price?: string | null;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [active, setActive] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error('PRODUCTS ERROR:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />

      <PageHero
        eyebrow="Products & Creative Systems"
        title="READY-TO-ADAPT VISUAL SYSTEMS."
        desc="VIRVAANI ART can package recurring art requirements into clear theme sets, mural concepts and visual systems for faster rollouts."
        image="/images/geometric-atrium.jpg"
      />

      <main>
        <section className="section">
          <div className="container product-grid">

            {loading ? (
              <div className="container">
                <p className="body-copy">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="container">
                <p className="body-copy">
                  Products will appear here after an admin adds them.
                </p>
              </div>
            ) : (
              products.map((product) => (
                <button
                  className="product product-button"
                  key={product.id}
                  onClick={() => setActive(product)}
                >
                  <img
                    src={product.image}
                    alt={product.title || product.name}
                  />

                  <div>
                    <span>
                      {product.category || 'CREATIVE SYSTEM'}
                    </span>

                    <h3>
                      {product.title || product.name}
                    </h3>

                    <p>{product.description}</p>

                    <b>View details ↗</b>
                  </div>
                </button>
              ))
            )}

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
              alt={active.title || active.name}
            />

            <div>
              <span className="eyebrow">
                {active.category || 'Creative System'}
              </span>

              <h2>
                {active.title || active.name}
              </h2>

              <p>
                {active.detail || active.description}
              </p>

              {active.price && (
                <p className="body-copy">
                  <strong>{active.price}</strong>
                </p>
              )}

              <a
                className="btn dark"
                href="/contact"
              >
                Request a concept ↗
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