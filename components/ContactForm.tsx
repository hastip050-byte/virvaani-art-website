'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formElement = e.currentTarget;
    const form = new FormData(formElement);
    const body = Object.fromEntries(form.entries());

    setLoading(true);
    setError('');
    setSent(false);

    try {
      const r = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const d = await r.json();

      if (!r.ok) {
        throw new Error(d.error || 'Unable to send');
      }

      setSent(true);

      // Reset the form using the saved reference
      formElement.reset();
    } catch (err: any) {
      setError(err.message || 'Unable to send enquiry');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <span className="eyebrow">Project enquiry</span>

      <h3>Tell us what you want to transform.</h3>

      <div className="form-grid">
        <input
          name="name"
          required
          placeholder="Your name"
        />

        <input
          name="email"
          required
          type="email"
          placeholder="Email address"
        />

        <input
          name="phone"
          placeholder="Phone number"
        />

        <input
          name="company"
          placeholder="Company / Institution"
        />

        <select
          name="projectType"
          defaultValue=""
        >
          <option value="" disabled>
            Project type
          </option>

          <option>
            School / Educational
          </option>

          <option>
            Government / Public Space
          </option>

          <option>
            Private / Commercial
          </option>

          <option>
            Other
          </option>
        </select>

        <input
          name="city"
          placeholder="City / District"
        />

        <textarea
          name="message"
          required
          placeholder="Tell us about the space, theme and approximate scope..."
          rows={5}
        />
      </div>

      <button
        className="btn dark"
        type="submit"
        disabled={loading}
      >
        {loading
          ? 'Sending…'
          : sent
          ? 'Enquiry Captured ✓'
          : 'Send Enquiry ↗'}
      </button>

      {sent && (
        <small className="success">
          Thank you. Your enquiry has been saved. Our team can now manage it
          from the admin panel.
        </small>
      )}

      {error && (
        <small className="success">
          {error}
        </small>
      )}
    </form>
  );
}