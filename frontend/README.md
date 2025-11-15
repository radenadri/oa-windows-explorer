# Windows Explorer Frontend

Frontend aplikasi Windows Explorer yang dibangun dengan **Vue 3**, **Composition API**, **Vite**, dan **xp.css** untuk styling retro Windows XP.

## Fitur

- ✅ Hierarchical folder tree navigation (left panel)
- ✅ Folder contents display (right panel)
- ✅ Expandable/collapsible folders
- ✅ Real-time data fetching dari backend API
- ✅ Windows XP retro UI dengan xp.css
- ✅ TypeScript untuk type safety
- ✅ Vite untuk fast development
- ✅ Unit tests dengan Vitest
- ✅ E2E tests dengan Playwright

## Tech Stack

- **Framework**: Vue 3 dengan Composition API
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Framework**: xp.css (Windows XP styling)
- **Testing**: Vitest (unit), Playwright (E2E)
- **Linting**: ESLint + Prettier

## Prerequisites

- Node.js (v20.19.0 atau >=22.12.0)
- npm/pnpm/yarn

## Instalasi

### 1. Install dependencies

```bash
cd frontend
npm install
# atau
pnpm install
```

### 2. Setup environment variables

```bash
cp .env.example .env
```

Edit `.env` dan sesuaikan dengan backend URL:
```env
VITE_API_BASE_URL=http://localhost:6700
```

### 3. Pastikan backend sudah berjalan

Backend harus berjalan di port yang dikonfigurasi (default: 6700) sebelum frontend dapat mengambil data.

## Development

### Start development server

```bash
npm run dev
# atau
pnpm dev
```

Server akan berjalan di `http://localhost:5173` (atau port lain yang ditampilkan di terminal)

### Available Scripts

| Script               | Deskripsi                                  |
| -------------------- | ------------------------------------------ |
| `npm run dev`        | Start development server dengan hot reload |
| `npm run build`      | Build untuk production                     |
| `npm run preview`    | Preview production build                   |
| `npm run type-check` | Type check dengan vue-tsc                  |
| `npm run lint`       | Lint dan fix dengan ESLint                 |
| `npm run format`     | Format code dengan Prettier                |
| `npm run test:unit`  | Run unit tests dengan Vitest               |
| `npm run test:e2e`   | Run E2E tests dengan Playwright            |

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── FolderTree.vue       # Left panel - folder tree navigation
│   │   └── FolderList.vue       # Right panel - folder contents
│   ├── composables/
│   │   └── useFolders.ts        # Folder state management & API calls
│   ├── App.vue                  # Root component
│   ├── main.ts                  # Application entry point
│   └── main.css                 # Global styles
├── public/                      # Static assets
├── .env                         # Environment variables (local)
├── .env.example                 # Environment variables template
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
├── vitest.config.ts             # Vitest configuration
├── playwright.config.ts         # Playwright configuration
└── package.json                 # Dependencies and scripts
```

## Komponen

### FolderTree.vue (Left Panel)

Menampilkan struktur folder dalam bentuk tree dengan fitur:
- Expandable/collapsible folders
- Folder selection
- Hierarchical display dengan indentation
- Dynamic initialization saat data tersedia

**Props:**
- `folders: Folder[]` - Array folder dari API
- `selectedFolderId: number | null` - ID folder yang dipilih

**Events:**
- `@select` - Emitted saat user memilih folder

### FolderList.vue (Right Panel)

Menampilkan direct children dari folder yang dipilih dalam grid layout.

**Props:**
- `subfolders: Folder[]` - Array subfolder dari folder yang dipilih

## Composables

### useFolders

Mengelola state dan logika folder:

```typescript
const { 
  fetchFolders,           // Fetch data dari API
  folders,                // Ref<Folder[]> - semua folder
  selectedFolderId,       // Ref<number | null> - ID folder terpilih
  selectedFolderChildren, // Computed<Folder[]> - direct children
  selectFolder            // Function untuk select folder
} = useFolders()
```

## API Integration

Frontend mengkonsumsi API dari backend:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/api/v1'

// GET /api/v1/folders - Fetch hierarchical tree
const response = await fetch(`${API_BASE_URL}/folders`)
const data = await response.json()
```

## Shared Types

Frontend menggunakan shared types dari `@shared/types/folder`:

```typescript
interface Folder {
  id: number
  name: string
  parentId: number | null
  children?: Folder[]
  createdAt: Date | null
}
```

## Testing

### Unit Tests

```bash
npm run test:unit
```

Tests disimpan di `src/__tests__/` dengan pattern `*.spec.ts`

### E2E Tests

```bash
# Install browsers (first time only)
npx playwright install

# Run tests
npm run test:e2e

# Run specific test
npm run test:e2e tests/example.spec.ts

# Debug mode
npm run test:e2e --debug
```

Tests disimpan di `e2e/` folder

## IDE Setup

### Recommended

- **VS Code** + **Vue (Official)** extension
  - Disable Vetur jika sudah terinstall
  - Install [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

### Browser DevTools

- **Chrome/Edge/Brave**:
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)

- **Firefox**:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## TypeScript Support

TypeScript configuration menggunakan `vue-tsc` untuk type checking `.vue` files. Volar extension di VS Code memberikan full type support.

## Styling

Frontend menggunakan **xp.css** untuk retro Windows XP UI styling. Custom styles ditambahkan di `main.css` dan component-level `<style scoped>`.

## Development Tips

- Gunakan `npm run dev` untuk development dengan hot reload
- Gunakan `npm run type-check` sebelum commit untuk memastikan tidak ada type errors
- Gunakan `npm run lint` untuk auto-fix linting issues
- Lihat console browser untuk debugging

## Troubleshooting

### Error: Cannot find module '@shared'

Pastikan path alias di `vite.config.ts` dan `tsconfig.app.json` sudah benar:
```typescript
// vite.config.ts
'@shared': fileURLToPath(new URL('../shared', import.meta.url))

// tsconfig.app.json
"@shared/*": ["../shared/*"]
```

### Error: API request failed

Pastikan backend sudah berjalan dan `VITE_API_BASE_URL` di `.env` benar.
