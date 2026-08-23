# Dependencies

Frontend (`frontend/package.json`) highlights:
- `react`, `react-dom` — UI
- `@react-three/fiber`, `three`, `@react-three/drei` — 3D orbit visualisation
- `vite` — dev server/build
- `tailwindcss` — styles

Backend (`backend/requirements.txt`)
- Inspect `backend/requirements.txt` for exact Python package versions before installing.

Testing
- `pytest` is expected for unit tests.
# Dependencies

## Frontend runtime dependencies

Versions are taken from `frontend/package.json`.

| Dependency | Version | Purpose |
|---|---:|---|
| `react` | ^18.3.1 | UI runtime |
| `react-dom` | ^18.3.1 | Browser rendering |
| `react-router-dom` | ^6.26.1 | Routing |
| `zustand` | ^4.5.5 | State management |
| `three` | ^0.168.0 | 3D rendering |
| `@react-three/fiber` | ^8.17.7 | React renderer for Three.js |
| `@react-three/drei` | ^9.112.0 | Three.js helper components |
| `framer-motion` | ^11.18.2 | UI animation |
| `lucide-react` | ^0.438.0 | Icons |
| `clsx` | ^2.1.1 | Conditional class composition |
| `tailwind-merge` | ^2.6.1 | Tailwind class merging |

## Development dependencies

| Dependency | Version | Purpose |
|---|---:|---|
| `typescript` | ^5.5.3 | Type checking/build |
| `vite` | ^5.4.1 | Development/build tooling |
| `@vitejs/plugin-react` | ^4.3.1 | Vite React integration |
| `eslint` | ^9.9.0 | Linting |
| `@eslint/js` | ^9.9.0 | ESLint base config |
| `typescript-eslint` | ^8.0.1 | TypeScript lint integration |
| `eslint-plugin-react-hooks` | ^5.1.0-rc.0 | React Hooks lint rules |
| `eslint-plugin-react-refresh` | ^0.4.9 | React refresh linting |
| `@types/react` | ^18.3.3 | React types |
| `@types/react-dom` | ^18.3.0 | React DOM types |
| `@types/three` | ^0.168.0 | Three.js types |
| `@types/node` | ^22.5.4 | Node types |
| `tailwindcss` | ^3.4.10 | Utility CSS |
| `postcss` | ^8.4.45 | CSS processing |
| `autoprefixer` | ^10.4.20 | CSS vendor prefixes |
| `globals` | ^15.9.0 | ESLint globals |

## Backend dependencies

`backend/requirements.txt` is empty and `backend/pyproject.toml` contains no dependency configuration in the inspected revision.

Therefore Python dependencies are **not currently established**.
