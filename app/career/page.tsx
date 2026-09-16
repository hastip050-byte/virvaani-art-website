'use client';

import { FormEvent, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CareerPage() {
  const [submitted, setSubmitted] = useState(false);

 async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const form = e.currentTarget;

  try {
    const formData = new FormData(form);

    const response = await fetch('/api/career', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      alert(
        data.error ||
          data.message ||
          'Something went wrong. Please try again.'
      );
      return;
    }

    // API returned 201 = successfully submitted
    setSubmitted(true);
    form.reset();

  } catch (error) {
    console.error('Career form error:', error);

    alert('Unable to submit your profile. Please try again.');
  }
}

  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container page-hero-grid">
            <div>
              <span className="eyebrow">CAREERS / CREATIVE NETWORK</span>

              <h1>
                JOIN OUR
                <br />
                <em>CREATIVE NETWORK.</em>
              </h1>

              <p>
                We are always looking for talented artists and creative
                professionals to work on meaningful spaces and
                large-scale visual projects.
              </p>
            </div>

            <div className="page-hero-image">
              <img
                src="/client-images/DSC_0665.JPG"
                alt="VIRVAANI ART creative work"
              />

              <div>
                <span>VIRVAANI ART</span>
                <b>
                  CREATIVE
                  <br />
                  NETWORK
                </b>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="career-intro">
  <div className="container">
    <div className="career-intro-inner">

      <div className="career-intro-label">
        <span></span>
        <small>WORK WITH US</small>
      </div>

      <div className="career-intro-content">
        <h2>
          BRING YOUR <em>CREATIVITY.</em>
        </h2>

        <p>
          Create your creative profile and tell us about your
          skills, experience and interests. When the right
          opportunity comes up, our team can connect with you.
        </p>

        <div className="career-intro-line" />
      </div>

    </div>
  </div>
</section>

        {/* ROLES */}
        <section className="section soft">
  <div className="container">

    <div className="split-title">
      <div>
        <span className="eyebrow">02 / OPPORTUNITIES</span>

        <h2>
          CREATIVE
          <br />
          <em>ROLES.</em>
        </h2>
      </div>

      <p className="body-copy">
        We collaborate with creative professionals across different
        disciplines and project requirements.
      </p>
    </div>

    <div className="career-roles">

      <a href="#creative-profile">
        <span>01</span>
        <div>
          <h3>Mural Artist</h3>
          <p>Large-scale murals & wall painting</p>
        </div>
        <b>↗</b>
      </a>

      <a href="#creative-profile">
        <span>02</span>
        <div>
          <h3>3D Artist</h3>
          <p>3D wall art & visual experiences</p>
        </div>
        <b>↗</b>
      </a>

      <a href="#creative-profile">
        <span>03</span>
        <div>
          <h3>Illustrator</h3>
          <p>Educational art & visual storytelling</p>
        </div>
        <b>↗</b>
      </a>

      <a href="#creative-profile">
        <span>04</span>
        <div>
          <h3>Creative Coordinator</h3>
          <p>Artist coordination & project support</p>
        </div>
        <b>↗</b>
      </a>

    </div>

  </div>
</section>
        {/* FORM */}
        <section className="section career-apply" id="creative-profile">
  <div className="container">

    <div className="career-form-heading">
      <span className="eyebrow">03 / CREATIVE PROFILE</span>

      <h2>
        LET'S CREATE
        <br />
        <em>TOGETHER.</em>
      </h2>

      <p>
        Tell us about your experience, skills and creative work.
      </p>
    </div>

    <form className="career-form" onSubmit={handleSubmit}>

      <div className="career-form-grid">

        <label>
          Full Name *
          <input
            type="text"
            name="fullName"
            placeholder="Your full name"
            required
          />
        </label>

        <label>
          Email *
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
          />
        </label>

        <label>
          Phone *
          <input
            type="tel"
            name="phone"
            placeholder="+91 XXXXX XXXXX"
            required
          />
        </label>

        <label>
          City *
          <input
            type="text"
            name="city"
            placeholder="Your city"
            required
          />
        </label>

        <label>
          Primary Role *
          <select name="role" required>
            <option value="">Select role</option>
            <option>Mural Artist</option>
            <option>3D Artist</option>
            <option>Illustrator</option>
            <option>Graphic Designer</option>
            <option>Art Teacher</option>
            <option>Creative Coordinator</option>
            <option>Other</option>
          </select>
        </label>

        <label>
          Experience *
          <select name="experience" required>
            <option value="">Select experience</option>
            <option>Fresher</option>
            <option>1–2 Years</option>
            <option>3–5 Years</option>
            <option>5–10 Years</option>
            <option>10+ Years</option>
          </select>
        </label>

        <label className="full">
          Skills *
          <input
            type="text"
            name="skills"
            placeholder="Mural painting, sketching, 3D art..."
            required
          />
        </label>

        <label className="full">
          About Yourself *
          <textarea
            name="about"
            rows={4}
            placeholder="Tell us briefly about your creative experience..."
            required
          />
        </label>

        <label>
          Resume / CV *
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            required
          />
          <small>PDF, DOC or DOCX</small>
        </label>

        <label>
          Portfolio / Website
          <input
            type="url"
            name="portfolio"
            placeholder="https://yourportfolio.com"
          />
        </label>

        <label className="full">
          Work Images
          <input
            type="file"
            name="workImages"
            accept="image/*"
            multiple
          />
          <small>
            Upload your previous artwork or project images.
          </small>
        </label>

      </div>

      <div className="career-submit">

        {submitted ? (
          <div className="career-success">
            <strong>PROFILE SUBMITTED</strong>
            <span>
              Thank you. Our team will review your creative profile.
            </span>
          </div>
        ) : (
          <button type="submit" className="btn dark">
            Join Our Creative Network ↗
          </button>
        )}

      </div>

    </form>

  </div>
</section>
        {/* SMALL CTA */}
        <section className="experience-band career-final">
          <div className="container">
            <div>
              <span className="eyebrow">
                04 / CREATE WITH US
              </span>

              <h2>
                YOUR WORK
                <br />
                <i>CAN MAKE AN IMPACT.</i>
              </h2>

              <p>
                Be part of creative projects that transform schools,
                public spaces, commercial environments and communities.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .career-intro-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .career-intro h2,
        .career-form-heading h2 {
          margin: 12px 0 0;
        }

        .career-roles {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 45px;
        }

        .career-roles article {
          padding: 26px 22px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: rgba(255, 255, 255, 0.45);
          transition: transform 0.25s ease,
            border-color 0.25s ease;
        }

        .career-roles article:hover {
          transform: translateY(-4px);
          border-color: #f97316;
        }

        .career-roles span {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.1em;
        }

        .career-roles h3 {
          margin: 22px 0 10px;
          font-size: 19px;
          text-transform: uppercase;
        }

        .career-roles p {
          margin: 0;
          font-size: 13px;
          line-height: 1.6;
          opacity: 0.65;
        }

        .career-form-heading {
          max-width: 700px;
        }

        .career-form-heading p {
          margin-top: 18px;
          opacity: 0.65;
        }

        .career-form {
          margin-top: 45px;
          padding: 35px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: rgba(255, 255, 255, 0.45);
        }

        .career-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        .career-form label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .career-form .full {
          grid-column: 1 / -1;
        }

       .career-form input,
.career-form select,
.career-form textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 13px 14px;
  border: 1px solid rgba(0, 0, 0, 0.16);
  background: #fff;
  color: #111 !important;
  -webkit-text-fill-color: #111 !important;
  font: inherit;
  font-size: 14px;
  font-weight: 400;
  outline: none;
  border-radius: 0;
}

.career-form input::placeholder,
.career-form textarea::placeholder {
  color: #777 !important;
  opacity: 1;
  -webkit-text-fill-color: #777 !important;
}

.career-form select {
  color: #111 !important;
  -webkit-text-fill-color: #111 !important;
}

        .career-form textarea {
          resize: vertical;
        }

        .career-form input:focus,
        .career-form select:focus,
        .career-form textarea:focus {
          border-color: #f97316;
        }

        .career-form small {
          font-size: 10px;
          font-weight: 400;
          opacity: 0.55;
          text-transform: none;
          letter-spacing: 0;
        }

        .career-submit {
          margin-top: 28px;
          padding-top: 25px;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .career-success {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 18px;
          border: 1px solid rgba(249, 115, 22, 0.5);
        }

        .career-success strong {
          font-size: 13px;
          letter-spacing: 0.08em;
        }

        .career-success span {
          font-size: 13px;
          opacity: 0.65;
        }

        .career-final {
          padding-top: 75px;
          padding-bottom: 75px;
        }

        .career-final h2 {
          margin-top: 12px;
        }

        .career-final p {
          max-width: 600px;
          margin-top: 18px;
          opacity: 0.7;
        }

        @media (max-width: 900px) {
          .career-roles {
            grid-template-columns: repeat(2, 1fr);
          }

          .career-intro-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 600px) {
          .career-roles {
            grid-template-columns: 1fr;
          }

          .career-form {
            padding: 22px;
          }

          .career-form-grid {
            grid-template-columns: 1fr;
          }

          .career-form .full {
            grid-column: auto;
          }
        }
      `}</style>
    </>
  );
}