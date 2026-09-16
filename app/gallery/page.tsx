'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

type GalleryItem = {
  id: string;
  name: string;
  image: string;
  desc?: string;
  detail?: string;
};

type BeforeAfterItem = {
  id: string;
  title?: string;
  name?: string;
  beforeImage?: string;
  afterImage?: string;
  before?: string;
  after?: string;
  description?: string;
};

type Tab = 'gallery' | 'before-after';




export default function Gallery() {
  const [activeTab, setActiveTab] = useState<Tab>('gallery');

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [beforeAfter, setBeforeAfter] = useState<BeforeAfterItem[]>([]);

  const [activeGallery, setActiveGallery] =
    useState<GalleryItem | null>(null);

  /* =========================
     READ DROPDOWN URL
  ========================= */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');

    if (
      tab === 'before-after' ||
      tab === 'gallery'
    ) {
      setActiveTab(tab);
    } else {
      setActiveTab('gallery');
    }
  }, []);

  /* =========================
     LOAD DATA
  ========================= */
  useEffect(() => {
   fetch('/api/gallery')
  .then((r) => r.json())
  .then((data) => {
    setGalleryItems(
      Array.isArray(data) ? data : []
    );
  })
  .catch(() => {
    setGalleryItems([]);
  });

    fetch('/api/before-after')
      .then((r) => r.json())
      .then((data) => {
        setBeforeAfter(
          Array.isArray(data) ? data : []
        );
      })
      .catch(() => setBeforeAfter([]));
  }, []);

  return (
    <>
      <Header />

      <PageHero
        eyebrow="Visual Gallery"
        title="A DIFFERENT VISUAL LANGUAGE FOR EVERY THEME."
        desc="Explore our artwork and before-and-after transformations."
        image="/client-images/DSC_0522.JPG"
      />

      <main>
       <section
  className="section"
  style={{
    paddingTop: '35px',
    paddingBottom: '70px',
  }}
>
          <div className="container">

            {/* ================= GALLERY ================= */}
            {activeTab === 'gallery' && (
              <>
                <div
  className="gallery-page-heading"
  style={{
    marginTop: '0',
    marginBottom: '25px',
  }}
>                 <span
  className="eyebrow"
  style={{
    display: "block",
    fontSize: "28px",
    fontWeight: 900,
    letterSpacing: "0.12em",
    marginBottom: "14px",
  }}
>
  GALLERY
</span>

                  <h2>
                    OUR ARTWORK & VISUAL CREATIONS
                  </h2>

                  <p>
                    Explore our collection of completed
                    artwork and creative visual installations.
                  </p>
                </div>

                <div className="gallery-grid">

                  {galleryItems.map((item) => (
                    <button
                      className="gallery-item"
                      key={item.id}
                      onClick={() =>
                        setActiveGallery(item)
                      }
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <span>
                        {item.name}
                      </span>

                      <b>
                        View theme ↗
                      </b>
                    </button>
                  ))}

                  {galleryItems.length === 0 && (
                    <p>
                      No gallery items available yet.
                    </p>
                  )}

                </div>
              </>
            )}


            {/* ================= BEFORE / AFTER ================= */}
            {activeTab === 'before-after' && (
              <>
                <div className="section-heading">
                 <span
  className="eyebrow"
  style={{
    display: "block",
    fontSize: "28px",
    fontWeight: 900,
    letterSpacing: "0.12em",
    marginBottom: "14px",
  }}
>
  BEFORE / AFTER
</span>

                  <h2>
                    TRANSFORMATION SHOWCASE
                  </h2>

                  <p>
                    See how our artwork transforms ordinary
                    spaces into engaging visual experiences.
                  </p>
                </div>

                <div className="gallery-grid">

                  {beforeAfter.map((item) => {
                    const title =
                      item.title ||
                      item.name ||
                      'Transformation';

                    const before =
                      item.beforeImage ||
                      item.before ||
                      '';

                    const after =
                      item.afterImage ||
                      item.after ||
                      '';

                    return (
                      <article
                        className="gallery-item"
                        key={item.id}
                      >

                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns:
                              '1fr 1fr',
                            gap: '8px',
                          }}
                        >

                          <div>
                            <img
                              src={before}
                              alt={`${title} before`}
                            />

                            <small>
                              Before
                            </small>
                          </div>

                          <div>
                            <img
                              src={after}
                              alt={`${title} after`}
                            />

                            <small>
                              After
                            </small>
                          </div>

                        </div>

                        <span>
                          {title}
                        </span>

                        {item.description && (
                          <b>
                            {item.description}
                          </b>
                        )}

                      </article>
                    );
                  })}

                  {beforeAfter.length === 0 && (
                    <p>
                      No before / after projects available yet.
                    </p>
                  )}

                </div>
              </>
            )}

          </div>
        </section>
      </main>


      {/* =========================
          GALLERY LIGHTBOX
      ========================= */}
      {activeGallery && (
        <div
          className="lightbox"
          onClick={() =>
            setActiveGallery(null)
          }
        >

          <div
            className="lightbox-card"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <img
              src={activeGallery.image}
              alt={activeGallery.name}
            />

            <div>

              <span className="eyebrow">
                Theme
              </span>

              <h2>
                {activeGallery.name}
              </h2>

              <p>
                {activeGallery.detail ||
                  activeGallery.desc ||
                  'Creative artwork designed for the space.'}
              </p>

              <a
                className="btn dark"
                href="/contact"
              >
                Discuss this theme ↗
              </a>

            </div>

            <button
              onClick={() =>
                setActiveGallery(null)
              }
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