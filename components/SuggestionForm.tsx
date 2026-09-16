'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';

export default function SuggestionForm() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to submit suggestion.');

      setSent(true);
      form.reset();
      setTimeout(() => {
        setOpen(false);
        setSent(false);
      }, 1400);
    } catch (err: any) {
      setError(err.message || 'Unable to submit suggestion.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
  type="button"
  className="btn dark suggestion-button"
  onClick={() => {
    setOpen(true);
    setError('');
  }}
>
  Have a Suggestion ↗
</button>
      {open && typeof document !== 'undefined' && createPortal(
        <div className="lightbox suggestion-modal" onClick={() => setOpen(false)}>
          <div className="suggestion-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="suggestion-close"
              onClick={() => setOpen(false)}
              aria-label="Close suggestion form"
            >
              ×
            </button>

            <span className="eyebrow">Your feedback matters</span>
            <h2>Share Your Suggestion</h2>
            <p>Have an idea or suggestion? We’d love to hear it.</p>

            <form className="suggestion-modal-form" onSubmit={submit}>
              <input name="name" required placeholder="Your name" />
              <input name="email" required type="email" placeholder="Email address" />
              <textarea name="message" required placeholder="Your suggestion..." rows={5} />

              <button className="btn dark" type="submit" disabled={loading}>
                {loading ? 'Submitting…' : sent ? 'Suggestion Sent ✓' : 'Submit Suggestion ↗'}
              </button>

              {error && <small className="suggestion-error">{error}</small>}
              {sent && <small className="success">Thank you. Your suggestion has been submitted successfully.</small>}
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
