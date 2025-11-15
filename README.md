# Full Stack Developer – Windows Explorer Clone

Repositori ini berisi solusi full stack untuk studi kasus "Windows Explorer". Aplikasi dibangun dengan arsitektur monorepo yang terdiri atas frontend (Vue 3) dan backend (Bun + Elysia + Drizzle + PostgreSQL) serta direktori `shared/` untuk berbagi tipe data.

## Struktur Repositori

```
.
├── backend/      # REST API + database schema & seeder
├── frontend/     # Vue 3 SPA dengan UI Windows XP
└── shared/       # Tipe & data bersama frontend-backend
```

## Backend (directory: `backend/`)

- **Stack**: Bun runtime, Elysia framework, Drizzle ORM, PostgreSQL, TypeScript.
- **Fitur utama**:
  - API REST hierarki folder (`/api/v1/folders`).
  - Endpoint anak folder (`/api/v1/folders/:id/child`).
  - Seeder berbasis data mock untuk mengisi tabel `folders`.
  - CORS untuk komunikasi dengan frontend.
- **Skrip penting**:
  - `bun run dev` – development server dengan hot reload.
  - `bun run start` – produksi.
  - `bun run db:generate` / `bun run db:migrate` – manajemen migrasi Drizzle.
  - `bun run db:seed` – populate data folder.
- **Setup singkat**:
  1. `cd backend && bun install`
  2. Salin `.env.example` → `.env`, isi `DATABASE_URL` & `APP_PORT`.
  3. Jalankan migrasi: `bun run db:generate && bun run db:migrate`.
  4. Seed data: `bun run db:seed`.
  5. Mulai server: `bun run dev` (default `http://localhost:6700`).

Rincian lengkap tersedia di [`backend/README.md`](backend/README.md).

## Frontend (directory: `frontend/`)

- **Stack**: Vue 3 (Composition API), Vite, TypeScript, xp.css, Vitest, Playwright, ESLint + Prettier.
- **Fitur utama**:
  - Tree view folder dengan expand/collapse.
  - Panel konten menampilkan subfolder terpilih.
  - Konsumsi API backend untuk data real-time.
  - Gaya retro Windows XP.
- **Skrip penting**:
  - `npm run dev` / `pnpm dev` – development server Vite.
  - `npm run build` – build production.
  - `npm run preview` – preview produksi.
  - `npm run test:unit` – unit test (Vitest).
  - `npm run test:e2e` – E2E test (Playwright).
- **Setup singkat**:
  1. `cd frontend && npm install` (atau `pnpm install`).
  2. Salin `.env.example` → `.env`, sesuaikan `VITE_API_BASE_URL` (mis. `http://localhost:6700`).
  3. Jalankan frontend: `npm run dev` (default `http://localhost:5173`).

Detail tambahan tersedia di [`frontend/README.md`](frontend/README.md).

## Shared Types & Data (`shared/`)

- `shared/types/folder.ts` mendefinisikan struktur `Folder` yang digunakan di kedua sisi.
- `shared/data/mockFolders.ts` menyimpan data mock awal (digunakan oleh seeder/backend & dokumentasi).

## Pengujian

- **Unit (frontend)**: `cd frontend && npm run test:unit`.
- **E2E (frontend)**: `cd frontend && npm run test:e2e` (Playwright otomatis menjalankan dev server sesuai konfigurasi).
- **Backend**: Seeder dan migrasi diuji melalui perintah `bun run db:*`.
