'use client';

import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const links = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Projects', '/projects'],
  ['Before / After', '/before-after'],
  ['Products', '/products'],
  ['Gallery', '/gallery'],
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
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((data) => setSettings(data))
      .catch(() => {});
  }, []);

  const logo = settings?.logo || '/logo/virvaani-art-logo.png';
  const siteName = settings?.siteName || 'VIRVAANI ART';

  return (
    <header className="site-header">
      <div className="nav-wrap">

        <a href="/" className="logo-link">
          <img
            src={logo}
            alt={siteName}
          />

          <span>
            VIRVAANI <b>ART</b>
          </span>
        </a>

        <nav className={open ? 'nav open' : 'nav'}>
          {links.map(([n, p]) => (
            <a
              key={n}
              href={p}
              onClick={() => setOpen(false)}
            >
              {n}
            </a>
          ))}

          <a
            className="nav-cta"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Start a Project ↗
          </a>
        </nav>

        <div className="nav-tools">
          <ThemeToggle />

          <button
            className="menu-btn"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? '×' : '☰'}
          </button>
        </div>

      </div>
    </header>
  );
}