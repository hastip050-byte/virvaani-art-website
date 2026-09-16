'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const links = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Testimonials', '/testimonials'],
  ['Blog', '/blog'],
  ['Contact', '/contact'],
];

type SiteSettings = {
  siteName?: string;
  logo?: string;
  phone?: string;
  email?: string;
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((data) => setSettings(data))
      .catch(() => {});
  }, []);

  const logo = settings?.logo || '/logo/virvaani-art-logo.png';
  const siteName = settings?.siteName || 'VIRVAANI ART';

  const closeMenus = () => {
    setOpen(false);
    setGalleryOpen(false);
  };

  return (
    <header className="site-header">
      <div className="nav-wrap">

        {/* LOGO */}
        <Link
          href="/"
          className="logo-link"
          onClick={closeMenus}
        >
          <img
            src={logo}
            alt={siteName}
            className="header-logo"
          />

          <span>
            VIRVAANI <b>ART</b>
          </span>
        </Link>

        {/* NAVIGATION */}
        <nav className={open ? 'nav open' : 'nav'}>

          {/* HOME / ABOUT / SERVICES */}
          {links.slice(0, 3).map(([n, p]) => (
            <Link
              key={n}
              href={p}
              onClick={closeMenus}
            >
              {n}
            </Link>
          ))}

          {/* GALLERY DROPDOWN */}
          <div className="gallery-nav">

            <button
              type="button"
              className="gallery-nav-button"
              onClick={() =>
                setGalleryOpen((prev) => !prev)
              }
              aria-expanded={galleryOpen}
              aria-haspopup="menu"
            >
              Gallery
            </button>

            {galleryOpen && (
              <div className="gallery-dropdown">

                <Link
                  href="/gallery"
                  onClick={closeMenus}
                >
                  Gallery
                </Link>

                <Link
                  href="/projects"
                  onClick={closeMenus}
                >
                  Projects
                </Link>

                <Link
                  href="/gallery?tab=before-after"
                  onClick={closeMenus}
                >
                  Before / After
                </Link>

              </div>
            )}

          </div>

          {/* TESTIMONIALS / BLOG / CONTACT */}
          {links.slice(3).map(([n, p]) => (
            <Link
              key={n}
              href={p}
              onClick={closeMenus}
            >
              {n}
            </Link>
          ))}

          {/* CTA */}
          <Link
            className="nav-cta"
            href="/contact"
            onClick={closeMenus}
          >
            Start a Project ↗
          </Link>

        </nav>

        {/* RIGHT TOOLS */}
        <div className="nav-tools">

          <ThemeToggle />

          <button
            className="menu-btn"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? '×' : '☰'}
          </button>

        </div>

      </div>
    </header>
  );
}