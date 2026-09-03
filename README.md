# VIRVAANI ART — Admin + Database Upgrade

This package keeps the existing VIRVAANI ART public design and original logo, while adding a complete admin/backend layer.

## Features
- Existing public UI preserved
- Admin Control Room at `/admin/login`
- Admin authentication with secure httpOnly session cookie
- Prisma ORM + SQLite database
- Projects CRUD
- Services CRUD
- Gallery CRUD
- Before / After CRUD
- Testimonials CRUD
- Blog + SEO CRUD
- Leads / Enquiries management
- Image upload to `public/uploads`
- SEO + Site Settings
- Public Projects / Services / Gallery read database content automatically
- Contact form saves enquiries to database
- No product pricing UI

## First run

1. Open this folder in VS Code.
2. Install packages:
   `npm install`
3. Create/update `.env`:
   ```
   DATABASE_URL="file:./dev.db"
   ADMIN_EMAIL="admin@virvaaniart.com"
   ADMIN_PASSWORD="ChangeThisPassword123!"
   SESSION_SECRET="replace-with-a-long-random-secret"
   ```
4. Set up the database:
   `npm run db:setup`
5. Start:
   `npm run dev`
6. Public site: `http://localhost:3000`
7. Admin: `http://localhost:3000/admin/login`

### Default admin
Email: `admin@virvaaniart.com`
Password: `ChangeThisPassword123!`

**Change the password and SESSION_SECRET before production.**

## Admin workflow

Admin → save → SQLite → public API/server page → public website.

Projects, Services and Gallery are seeded from the original static content on first database setup. After that, the database is the source of truth.

## Production notes
- Use a persistent writable SQLite volume if deploying to a platform.
- For production-scale multi-user hosting, move the Prisma datasource to PostgreSQL.
- Restrict image uploads to trusted admins (the included admin session already protects the upload route).
