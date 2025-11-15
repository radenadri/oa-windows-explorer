# Windows Explorer Backend

REST API backend untuk aplikasi Windows Explorer yang dibangun dengan **Bun**, **Elysia**, **Drizzle ORM**, dan **PostgreSQL**.

## Fitur

- ✅ REST API untuk manajemen folder hierarkis
- ✅ Database PostgreSQL dengan Drizzle ORM
- ✅ CORS support untuk komunikasi dengan frontend
- ✅ Seeder untuk populate data mock
- ✅ Migration tools untuk database schema
- ✅ TypeScript untuk type safety

## Tech Stack

- **Runtime**: Bun
- **Framework**: Elysia
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL
- **Language**: TypeScript

## Instalasi

### Prerequisites
- Bun (v1.0+)
- PostgreSQL (v12+)

### Setup

1. **Clone repository dan install dependencies**
```bash
cd backend
bun install
```

2. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` dan sesuaikan dengan konfigurasi PostgreSQL Anda:
```env
APP_PORT=6700
DATABASE_URL=postgresql://user:password@localhost:5432/file_manager
```

3. **Generate migration dan migrate database**
```bash
bun run db:generate
bun run db:migrate
```

4. **Seed database dengan data mock**
```bash
bun run db:seed
```

## Development

### Start development server
```bash
bun run dev
```

Server akan berjalan di `http://localhost:6700` (atau port yang dikonfigurasi di `.env`)

### Available Scripts

| Script                | Deskripsi                                  |
| --------------------- | ------------------------------------------ |
| `bun run dev`         | Start development server dengan hot reload |
| `bun run start`       | Start production server                    |
| `bun run db:generate` | Generate migration files dari schema       |
| `bun run db:migrate`  | Run pending migrations                     |
| `bun run db:seed`     | Populate database dengan data mock         |

## API Endpoints

### Base URL
```
http://localhost:6700/api/v1
```

### Endpoints

#### Get All Folders (Hierarchical Tree)
```http
GET /folders
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "My Computer",
    "parentId": null,
    "createdAt": "2024-11-16T10:00:00Z",
    "children": [
      {
        "id": 2,
        "name": "C:",
        "parentId": 1,
        "createdAt": "2024-11-16T10:00:00Z",
        "children": [...]
      }
    ]
  }
]
```

#### Get Direct Children of a Folder
```http
GET /folders/:id/child
```

**Parameters:**
- `id` (number): Folder ID

**Response:**
```json
[
  {
    "id": 3,
    "name": "Program Files",
    "parentId": 2,
    "createdAt": "2024-11-16T10:00:00Z"
  },
  {
    "id": 7,
    "name": "Users",
    "parentId": 2,
    "createdAt": "2024-11-16T10:00:00Z"
  }
]
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Database connection setup
│   ├── models/
│   │   └── folder.ts            # Drizzle schema definition
│   ├── routes/
│   │   └── folders.ts           # Folder API routes
│   ├── utils/
│   │   └── buildTree.ts         # Tree building utility
│   ├── seed.ts                  # Database seeder
│   └── index.ts                 # Application entry point
├── drizzle/                     # Generated migrations
├── .env                         # Environment variables (local)
├── .env.example                 # Environment variables template
├── drizzle.config.ts            # Drizzle kit configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## Database Schema

### Folders Table

| Column      | Type      | Constraints                    |
| ----------- | --------- | ------------------------------ |
| `id`        | serial    | PRIMARY KEY                    |
| `name`      | text      | NOT NULL                       |
| `parentId`  | integer   | FOREIGN KEY (self-referencing) |
| `createdAt` | timestamp | DEFAULT NOW()                  |

## Shared Types

Backend menggunakan shared types dari `@shared/types/folder` untuk konsistensi dengan frontend:

```typescript
interface Folder {
  id: number
  name: string
  parentId: number | null
  children?: Folder[]
  createdAt: Date | null
}
```

## Utilities

### buildTree

Mengkonversi flat array dari database menjadi hierarchical tree structure.

```typescript
import { buildTree } from './utils/buildTree'

const flatFolders = await db.select().from(folders)
const treeStructure = buildTree(flatFolders)
```

## Database Migrations

Migrations disimpan di folder `drizzle/` dan di-generate otomatis dari schema Drizzle.

### Generate migration baru
```bash
bun run db:generate
```

### Run migrations
```bash
bun run db:migrate
```

## Troubleshooting

### Error: DATABASE_URL is undefined
Pastikan file `.env` ada dan berisi `DATABASE_URL` yang valid.

### Error: Connection refused
Pastikan PostgreSQL server berjalan dan URL connection benar.

### Error: Migration failed
Jalankan `bun run db:generate` terlebih dahulu untuk generate migration files.
