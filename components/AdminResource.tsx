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
      { name: 'image', label: 'Image path / uploaded URL' },
      { name: 'tags', label: 'Tags (comma separated)' },
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

  beforeafter: {
    title: 'Before / After',
    endpoint: 'beforeafter',
    fields: [
      { name: 'id', label: 'ID (unique)' },
      { name: 'title', label: 'Title' },
      { name: 'before', label: 'Before image URL' },
      { name: 'after', label: 'After image URL' },
      {
        name: 'detail',
        label: 'Details',
        type: 'textarea',
      },
    ],
  },

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

  async function load() {
    const r = await fetch(`/api/admin/${c.endpoint}`);

    if (r.ok) {
      setRows(await r.json());
    }
  }

  useEffect(() => {
    load();
  }, []);

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
        data.published = String(data.published) === 'true';
      }

      const url =
        `/api/admin/${c.endpoint}` +
        (editing !== 'new' ? `/${form.id}` : '');

      const r = await fetch(url, {
        method: editing === 'new' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const d = await r.json();

      if (!r.ok) {
        throw new Error(d.error || 'Save failed');
      }

      setMessage(
        'Saved successfully. Public website will use the database data.'
      );

      setEditing(null);

      await load();
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this item?')) return;

    const r = await fetch(
      `/api/admin/${c.endpoint}/${id}`,
      {
        method: 'DELETE',
      }
    );

    if (r.ok) {
      load();
    } else {
      setMessage('Delete failed');
    }
  }

  async function chooseFile(
    field: string,
    file?: File
  ) {
    if (!file) return;

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
        (e as Error).message
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="admin-panel">

      <div className="admin-top">

        <div>
          <h1>{c.title}</h1>

          <p className="admin-muted">
            Create, edit and delete content.
            Changes are stored in SQLite and
            reflected on the public site.
          </p>
        </div>

        <button
          className="admin-btn"
          onClick={() => start()}
        >
          + Add new
        </button>

      </div>

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
                    value={form[f.name] ?? ''}
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
                    value={form[f.name] ?? ''}
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
              onClick={() => setEditing(null)}
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

      <div className="admin-list">

        {rows.map((row) => (

          <div
            className="admin-row"
            key={row.id}
          >

            <div className="admin-row-main">

              {(row.image || row.after) && (

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
                  {row.title ||
                    row.name ||
                    row.siteName ||
                    row.slug}
                </b>

                <div className="admin-muted">
                  {row.category ||
                    row.sector ||
                    row.role ||
                    row.excerpt ||
                    row.email ||
                    ''}
                </div>

              </div>

            </div>

            <div className="admin-actions">

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

      </div>

    </section>
  );
}