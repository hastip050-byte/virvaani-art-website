'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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
        if (!res.ok) {
          throw new Error('Failed to load settings');
        }

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

        {/* BRAND */}
        <div className="footer-brand">
          <Link href="/" aria-label="VIRVAANI ART Home">
            <img
              src={logo}
              alt={siteName}
            />
          </Link>

          <h3>{siteName}</h3>

          <p>
            {s.description ||
              'Commercial art, educational murals and large-scale creative execution for spaces that need a story.'}
          </p>
        </div>

        {/* EXPLORE */}
        <div>
          <b>Explore</b>

          <Link href="/about">
            About
          </Link>

          <Link href="/services">
            Services
          </Link>

          <Link href="/projects">
            Projects
          </Link>

          <Link href="/before-after">
            Before / After
          </Link>

          <Link href="/gallery">
            Gallery
          </Link>

          <Link href="/blog">
            Blog
          </Link>
        </div>

        {/* CONTACT */}
        <div>
          <b>Contact</b>

          <span>
            {s.address ||
              '301, Milestone Milagro, Nr. Someshwar Junction, Udhana–Magdalla Road, Vesu, Surat – 395007.'}
          </span>
        </div>

        {/* REACH US */}
        <div>
          <b>Reach Us</b>

          <a
            href={`mailto:${s.email || 'info@virvaaniart.com'}`}
          >
            {s.email || 'info@virvaaniart.com'}
          </a>

          <a
            href={`tel:${s.phone || '+917797791717'}`}
          >
            {s.phone || '+91 77977 91717'}
          </a>

          <Link href="/contact">
            Send an enquiry ↗
          </Link>

          {/* CAREER */}
          <Link href="/career">
            Join Our Creative Network ↗
          </Link>

          {/* ADMIN */}
          <div className="footer-admin">
            <span className="footer-admin-title">
              Admin
            </span>

            <Link
              href="/admin/login"
              className="admin-login-link"
            >
              🔐 Admin Login
            </Link>
          </div>
        </div>

      </div>

      {/* BOTTOM */}
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