'use client';

import { useEffect, useState } from 'react';

type SiteSettings = {
  siteName?: string;
  tagline?: string;
  description?: string;
  address?: string;
  email?: string;
  phone?: string;
  logo?: string;
};

export default function Footer() {
  const [s, setS] = useState<SiteSettings>({});

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load settings');
        return res.json();
      })
      .then((data) => {
        setS(data);
      })
      .catch((error) => {
        console.error('Footer settings error:', error);
      });
  }, []);

  const siteName = s.siteName || 'VIRVAANI ART';
  const logo = s.logo || '/logo/virvaani-art-logo.png';

  return (
    <footer className="footer">
      <div className="container footer-grid">

        <div className="footer-brand">
          <img
            src={logo}
            alt={siteName}
          />

          <h3>
            {siteName}
          </h3>

          <p>
            {s.description ||
              'Commercial art, educational murals and large-scale creative execution for spaces that need a story.'}
          </p>
        </div>

        <div>
          <b>Explore</b>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/projects">Projects</a>
          <a href="/before-after">Before / After</a>
          <a href="/products">Products</a>
          <a href="/gallery">Gallery</a>
          <a href="/blog">Blog</a>
        </div>

        <div>
          <b>Contact</b>

          <span>
            {s.address ||
              '301, Milestone Milagro, Nr. Someshwar Junction, Udhana–Magdalla Road, Vesu, Surat – 395007.'}
          </span>
        </div>

        <div>
          <b>Reach Us</b>

          <a href={`mailto:${s.email || 'info@virvaaniart.com'}`}>
            {s.email || 'info@virvaaniart.com'}
          </a>

          <a href={`tel:${s.phone || '+917797791717'}`}>
            {s.phone || '+91 77977 91717'}
          </a>

          <a href="/contact">Send an enquiry ↗</a>
          <a href="/credits">Image credits ↗</a>
        </div>

      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </span>

        <span>
          {s.tagline ||
            'Art • Education • Public Spaces • Commercial'}
        </span>
      </div>
    </footer>
  );
}