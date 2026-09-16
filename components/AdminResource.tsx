'use client';

import { useEffect, useState } from 'react';

type Field = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
};

const configs: Record<
  string,
  { title: string; endpoint: string; fields: Field[] }
> = {
  projects: {
    title: 'Projects',
    endpoint: 'projects',
    fields: [
      { name: 'id', label: 'ID (unique)' },
      { name: 'title', label: 'Title' },
      { name: 'sector', label: 'Sector' },
      { name: 'location', label: 'Location' },
      { name: 'year', label: 'Year' },
      { name: 'image', label: 'Image path / uploaded URL' },
      {
        name: 'summary',
        label: 'Short summary',
        type: 'textarea',
      },
      {
        name: 'detail',
        label: 'Full detail',
        type: 'textarea',
      },
      {
        name: 'scope',
        label: 'Scope items (one per line)',
        type: 'textarea',
      },
    ],
  },

  /* ================= CAREER ================= */

  career: {
    title: 'Career / Talent',
    endpoint: 'career',
    fields: [
      { name: 'fullName', label: 'Full Name' },
      { name: 'email', label: 'Email' },
      { name: 'phone', label: 'Phone' },
      { name: 'city', label: 'City' },
      { name: 'role', label: 'Primary Role' },
      { name: 'experience', label: 'Experience' },
      {
        name: 'skills',
        label: 'Skills',
        type: 'textarea',
      },
      {
        name: 'about',
        label: 'About',
        type: 'textarea',
      },
      {
        name: 'portfolio',
        label: 'Portfolio / Website',
      },
      {
        name: 'social',
        label: 'Social Profile',
      },
      {
        name: 'linkedin',
        label: 'LinkedIn',
      },
      {
        name: 'availability',
        label: 'Availability',
      },
      {
        name: 'workType',
        label: 'Preferred Work Type',
      },
      {
        name: 'resumeUrl',
        label: 'Resume URL',
      },
      {
        name: 'profilePhotoUrl',
        label: 'Profile Photo URL',
      },
      {
        name: 'status',
        label: 'Status',
      },
    ],
  },

  /* ================= SERVICES ================= */

  services: {
    title: 'Services',
    endpoint: 'services',
    fields: [
      { name: 'id', label: 'ID (unique)' },
      { name: 'number', label: 'Number' },
      { name: 'title', label: 'Title' },
      {
        name: 'short',
        label: 'Short description',
        type: 'textarea',
      },
      {
        name: 'image',
        label: 'Image path / uploaded URL',
      },
      {
        name: 'tags',
        label: 'Tags (comma separated)',
      },
      {
        name: 'detail',
        label: 'Full detail',
        type: 'textarea',
      },
      {
        name: 'deliverables',
        label: 'Deliverables (one per line)',
        type: 'textarea',
      },
    ],
  },

  /* ================= PRODUCTS ================= */

  products: {
    title: 'Products',
    endpoint: 'products',
    fields: [
      { name: 'id', label: 'ID (unique)' },
      { name: 'title', label: 'Product Title' },
      { name: 'category', label: 'Category' },
      {
        name: 'description',
        label: 'Short Description',
        type: 'textarea',
      },
      {
        name: 'detail',
        label: 'Full Details',
        type: 'textarea',
      },
      {
        name: 'image',
        label: 'Product Image',
      },
      {
        name: 'price',
        label: 'Price / Contact for Price',
      },
    ],
  },

  /* ================= SUGGESTIONS ================= */

  suggestions: {
    title: 'Suggestions',
    endpoint: 'suggestions',
    fields: [
      { name: 'id', label: 'ID' },
      { name: 'name', label: 'Name' },
      { name: 'email', label: 'Email' },
      {
        name: 'message',
        label: 'Suggestion',
        type: 'textarea',
      },
      { name: 'status', label: 'Status' },
    ],
  },

  /* ================= GALLERY ================= */

  gallery: {
    title: 'Gallery',
    endpoint: 'gallery',
    fields: [
      { name: 'id', label: 'ID (unique)' },
      { name: 'name', label: 'Name' },
      {
        name: 'image',
        label: 'Image path / uploaded URL',
      },
      {
        name: 'desc',
        label: 'Short description',
        type: 'textarea',
      },
      {
        name: 'detail',
        label: 'Details',
        type: 'textarea',
      },
    ],
  },

  /* ================= BEFORE AFTER ================= */

  beforeafter: {
    title: 'Before / After',
    endpoint: 'beforeafter',
    fields: [
      { name: 'id', label: 'ID (unique)' },
      { name: 'title', label: 'Title' },
      {
        name: 'before',
        label: 'Before image URL',
      },
      {
        name: 'after',
        label: 'After image URL',
      },
      {
        name: 'detail',
        label: 'Details',
        type: 'textarea',
      },
    ],
  },

  /* ================= TESTIMONIALS ================= */

  testimonials: {
    title: 'Testimonials',
    endpoint: 'testimonials',
    fields: [
      { name: 'id', label: 'ID (unique)' },
      { name: 'name', label: 'Name' },
      {
        name: 'role',
        label: 'Role / Organisation',
      },
      {
        name: 'quote',
        label: 'Testimonial',
        type: 'textarea',
      },
      {
        name: 'image',
        label: 'Image URL',
      },
    ],
  },

  /* ================= BLOG ================= */

  blog: {
    title: 'Blog + SEO',
    endpoint: 'blog',
    fields: [
      { name: 'id', label: 'ID (unique)' },
      { name: 'title', label: 'Title' },
      { name: 'slug', label: 'Slug' },
      {
        name: 'excerpt',
        label: 'Excerpt',
        type: 'textarea',
      },
      {
        name: 'content',
        label: 'Content',
        type: 'textarea',
      },
      {
        name: 'image',
        label: 'Image URL',
      },
      {
        name: 'seoTitle',
        label: 'SEO title',
      },
      {
        name: 'seoDescription',
        label: 'SEO description',
        type: 'textarea',
      },
      {
        name: 'published',
        label: 'Published (true/false)',
      },
    ],
  },
};

/* ================= IMAGE UPLOAD ================= */

async function upload(file: File) {
  const fd = new FormData();

  fd.append('file', file);

  const r = await fetch('/api/admin/upload', {
    method: 'POST',
    body: fd,
  });

  const d = await r.json();

  if (!r.ok) {
    throw new Error(d.error || 'Upload failed');
  }

  return d.url;
}

/* ================= ADMIN RESOURCE ================= */

export default function AdminResource({
  resource,
}: {
  resource: keyof typeof configs;
}) {
  const c = configs[resource];

  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<any>({});
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  /* Career detail modal */
  const [viewing, setViewing] = useState<any | null>(null);

  /* ================= LOAD RESOURCE ================= */

  async function load() {
    try {
      const r = await fetch(`/api/admin/${c.endpoint}`, {
        cache: 'no-store',
      });

      if (r.ok) {
        const data = await r.json();

        if (Array.isArray(data)) {
          setRows(data);
        }
      }
    } catch (error) {
      console.error('ADMIN RESOURCE LOAD ERROR:', error);
    }
  }

  useEffect(() => {
    load();
    setEditing(null);
    setViewing(null);
    setMessage('');
  }, [resource]);

  /* ================= START EDIT ================= */

  function start(row?: any) {
    if (!row) {
      const x: any = {};

      c.fields.forEach((f) => {
        x[f.name] = '';
      });

      setForm(x);
    } else {
      const x = { ...row };

      if (Array.isArray(x.scope)) {
        x.scope = x.scope.join('\n');
      }

      if (Array.isArray(x.tags)) {
        x.tags = x.tags.join(', ');
      }

      if (Array.isArray(x.deliverables)) {
        x.deliverables = x.deliverables.join('\n');
      }

      setForm(x);
    }

    setEditing(row || 'new');
    setMessage('');
  }

  /* ================= SAVE ================= */

  async function save(e: React.FormEvent) {
    e.preventDefault();

    setBusy(true);

    try {
      const data = { ...form };

      if (resource === 'products') {
        data.name = data.title;
      }

      if (resource === 'projects') {
        data.scope = String(data.scope || '')
          .split('\n')
          .map((x: string) => x.trim())
          .filter(Boolean);
      }

      if (resource === 'services') {
        data.tags = String(data.tags || '')
          .split(',')
          .map((x: string) => x.trim())
          .filter(Boolean);

        data.deliverables = String(data.deliverables || '')
          .split('\n')
          .map((x: string) => x.trim())
          .filter(Boolean);
      }

      if (resource === 'blog') {
        data.published =
          String(data.published) === 'true';
      }

      const url =
        `/api/admin/${c.endpoint}` +
        (editing !== 'new'
          ? `/${form.id}`
          : '');

      const r = await fetch(url, {
        method:
          editing === 'new'
            ? 'POST'
            : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const d = await r.json();

      if (!r.ok) {
        throw new Error(
          d.error ||
            d.message ||
            'Save failed'
        );
      }

      setMessage(
        'Saved successfully. Public website will use the database data.'
      );

      setEditing(null);

      await load();
    } catch (e: any) {
      setMessage(
        e.message || 'Save failed'
      );
    } finally {
      setBusy(false);
    }
  }

  /* ================= DELETE ================= */

  async function remove(id: string) {
    if (!confirm('Delete this item?')) {
      return;
    }

    try {
      const r = await fetch(
        `/api/admin/${c.endpoint}/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (r.ok) {
        await load();
      } else {
        const d = await r.json().catch(() => ({}));

        setMessage(
          d.error ||
            d.message ||
            'Delete failed'
        );
      }
    } catch (error) {
      console.error('DELETE ERROR:', error);
      setMessage('Delete failed');
    }
  }

  /* ================= FILE UPLOAD ================= */

  async function chooseFile(
    field: string,
    file?: File
  ) {
    if (!file) {
      return;
    }

    setBusy(true);

    try {
      const url = await upload(file);

      setForm((x: any) => ({
        ...x,
        [field]: url,
      }));

      setMessage(
        'Image uploaded. Save the item to store it.'
      );
    } catch (e: any) {
      setMessage(
        e.message || 'Upload failed'
      );
    } finally {
      setBusy(false);
    }
  }

  /* ================= RENDER ================= */

  return (
    <section className="admin-panel">

      {/* ================= HEADER ================= */}

      <div className="admin-top">

        <div>
          <h1>{c.title}</h1>

          <p className="admin-muted">
            {resource === 'career'
              ? 'Review candidate profiles submitted through the public Career page.'
              : 'Create, edit and delete content. Changes are stored in PostgreSQL and reflected on the public site.'}
          </p>
        </div>

        {/* Career candidates should only be submitted from public website */}
        {resource !== 'career' && resource !== 'suggestions' && (
          <button
            className="admin-btn"
            onClick={() => start()}
          >
            + Add new
          </button>
        )}

      </div>

      {/* ================= EDIT FORM ================= */}

      {editing && (
        <form
          className="admin-form"
          onSubmit={save}
        >

          <div className="admin-form-grid">

            {c.fields.map((f) => (

              <label
                className={
                  f.type === 'textarea'
                    ? 'full'
                    : ''
                }
                key={f.name}
              >

                {f.label}

                {f.type === 'textarea' ? (

                  <textarea
                    value={
                      form[f.name] ?? ''
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [f.name]:
                          e.target.value,
                      })
                    }
                  />

                ) : (

                  <input
                    value={
                      form[f.name] ?? ''
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [f.name]:
                          e.target.value,
                      })
                    }
                    required={
                      f.name === 'id' ||
                      f.name === 'title' ||
                      f.name === 'name'
                    }
                  />

                )}

                {(f.name === 'image' ||
                  f.name === 'before' ||
                  f.name === 'after') && (

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      chooseFile(
                        f.name,
                        e.target.files?.[0]
                      )
                    }
                  />

                )}

              </label>

            ))}

          </div>

          <div className="admin-actions-bar">

            <button
              type="button"
              className="admin-btn secondary"
              onClick={() =>
                setEditing(null)
              }
            >
              Cancel
            </button>

            <button
              className="admin-btn"
              disabled={busy}
            >
              {busy
                ? 'Saving…'
                : 'Save'}
            </button>

          </div>

          {message && (
            <div className="admin-message">
              {message}
            </div>
          )}

        </form>
      )}

      {/* ================= RESOURCE LIST ================= */}

      <div className="admin-list">

        {rows.map((row) => (

          <div
            className="admin-row"
            key={row.id}
          >

            <div className="admin-row-main">

              {(row.image ||
                row.after) && (

                <img
                  className="admin-thumb"
                  src={
                    row.image ||
                    row.after
                  }
                  alt=""
                />

              )}

              <div>

                <b>
                  {resource === 'career'
                    ? row.fullName ||
                      'Candidate'
                    : row.title ||
                      row.name ||
                      row.siteName ||
                      row.slug}
                </b>

                <div className="admin-muted">

                  {resource === 'career'
                    ? `${row.role || 'Role not provided'} • ${row.email || 'No email'} • ${row.phone || 'No phone'} • ${row.city || 'No city'}`
                    : row.category ||
                      row.sector ||
                      row.role ||
                      row.excerpt ||
                      row.email ||
                      ''}

                </div>

              </div>

            </div>

            {/* ================= ACTIONS ================= */}

            <div className="admin-actions">

              {resource === 'career' && (
                <button
                  className="admin-btn secondary"
                  onClick={() =>
                    setViewing(row)
                  }
                >
                  View Details
                </button>
              )}

              <button
                className="admin-btn secondary"
                onClick={() =>
                  start(row)
                }
              >
                Edit
              </button>

              <button
                className="admin-btn danger"
                onClick={() =>
                  remove(row.id)
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))}

        {!rows.length && (
          <p className="admin-muted">
            {resource === 'career'
              ? 'No candidate profiles submitted yet.'
              : 'No records found.'}
          </p>
        )}

      </div>

      {/* ================================================== */}
      {/* CAREER PROFILE DETAIL MODAL */}
      {/* ================================================== */}

      {viewing &&
        resource === 'career' && (

        <div
          className="lightbox"
          onClick={() =>
            setViewing(null)
          }
        >

          <div
  className="lightbox-card career-detail-card"
  onClick={(e) =>
    e.stopPropagation()
  }
>
        

            <button
              onClick={() =>
                setViewing(null)
              }
              aria-label="Close"
            >
              ×
            </button>

           <div className="career-detail-content">

  <div className="career-detail-header">

    <span className="eyebrow">
      Career / Talent Profile
    </span>

    <h2>
      {viewing.fullName || 'Candidate'}
    </h2>

    <p className="admin-muted">
      {viewing.role || 'Role not provided'}
    </p>

  </div>
              {/* ================= PERSONAL ================= */}

              <h3>Personal Information</h3>

              <p>
                <strong>Email:</strong>{' '}
                {viewing.email || '—'}
              </p>

              <p>
                <strong>Phone:</strong>{' '}
                {viewing.phone || '—'}
              </p>

              <p>
                <strong>City:</strong>{' '}
                {viewing.city || '—'}
              </p>

              {/* ================= PROFESSIONAL ================= */}

              <h3>
                Professional Information
              </h3>

              <p>
                <strong>Primary Role:</strong>{' '}
                {viewing.role || '—'}
              </p>

              <p>
                <strong>Experience:</strong>{' '}
                {viewing.experience || '—'}
              </p>

              <p>
                <strong>Availability:</strong>{' '}
                {viewing.availability || '—'}
              </p>

              <p>
                <strong>
                  Preferred Work Type:
                </strong>{' '}
                {viewing.workType || '—'}
              </p>

              {/* ================= SKILLS ================= */}

              <h3>Skills</h3>

              <p>
                {viewing.skills || '—'}
              </p>

              {/* ================= ABOUT ================= */}

              <h3>About</h3>

              <p>
                {viewing.about || '—'}
              </p>

              {/* ================= LINKS ================= */}

              {(viewing.portfolio ||
                viewing.linkedin ||
                viewing.social) && (

                <>
                  <h3>
                    Links & Profiles
                  </h3>

                  {viewing.portfolio && (
                    <p>
                      <strong>
                        Portfolio:
                      </strong>{' '}
                      <a
                        href={
                          viewing.portfolio
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open Portfolio ↗
                      </a>
                    </p>
                  )}

                  {viewing.linkedin && (
                    <p>
                      <strong>
                        LinkedIn:
                      </strong>{' '}
                      <a
                        href={
                          viewing.linkedin
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open LinkedIn ↗
                      </a>
                    </p>
                  )}

                  {viewing.social && (
                    <p>
                      <strong>
                        Social Profile:
                      </strong>{' '}
                      <a
                        href={
                          viewing.social
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open Social Profile ↗
                      </a>
                    </p>
                  )}

                </>

              )}

              {/* ================= RESUME ================= */}

             {viewing.resumeUrl && (
  <>
    <h3>Resume</h3>

    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        padding: '16px',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '10px',
        marginTop: '10px',
      }}
    >
      <div>
        <strong>Candidate Resume</strong>
        <p
          className="admin-muted"
          style={{ margin: '4px 0 0' }}
        >
          Uploaded resume document
        </p>
      </div>

      <a
        className="btn dark"
        href={viewing.resumeUrl}
        target="_blank"
        rel="noreferrer"
      >
        Open Resume ↗
      </a>
    </div>
  </>
)}

              {/* ================= WORK IMAGES ================= */}

             {Array.isArray(viewing.workImages) &&
  viewing.workImages.length > 0 && (
    <>
      <h3>Uploaded Work</h3>

      <p className="admin-muted">
        {viewing.workImages.length} work image
        {viewing.workImages.length > 1 ? 's' : ''}{' '}
        uploaded by the candidate.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
          marginTop: '14px',
        }}
      >
        {viewing.workImages.map(
          (image: string, index: number) => (
            <div
              key={`${image}-${index}`}
              style={{
                border:
                  '1px solid rgba(255,255,255,0.12)',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <a
                href={image}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={image}
                  alt={`Candidate work ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </a>

              <div
                style={{
                  padding: '10px 12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span className="admin-muted">
                  Work {index + 1}
                </span>

                <a
                  href={image}
                  target="_blank"
                  rel="noreferrer"
                  className="admin-btn secondary"
                  style={{
                    textDecoration: 'none',
                    fontSize: '12px',
                  }}
                >
                  View ↗
                </a>
              </div>
            </div>
          )
        )}
      </div>
    </>
  )}

              {/* ================= STATUS ================= */}

              <h3>Status</h3>

              <p>
                <strong>
                  {viewing.status ||
                    'NEW'}
                </strong>
              </p>

              {/* ================= SUBMITTED ================= */}

              {viewing.createdAt && (
                <p className="admin-muted">
                  Submitted:{' '}
                  {new Date(
                    viewing.createdAt
                  ).toLocaleString()}
                </p>
              )}

            </div>

          </div>

        </div>

      )}

    </section>
  );
}