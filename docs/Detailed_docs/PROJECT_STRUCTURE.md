# Project Structure

Top-level layout (important items)
- `backend/` — Python backend project.
  - `backend/pyproject.toml`, `backend/requirements.txt` — dependency manifests.
  - `backend/app/` — application code (`main.py`, `api/`, `data/`, `orbit/`, `risk/`, `manoeuvre/`, `services/`, `utils/`).
- `frontend/` — React + Vite app.
  - `frontend/package.json`, `frontend/vite.config.ts`, `frontend/src/` — UI source and visualisation.
- `data/` — `sample/` demo datasets and `processed/`.
- `database/` — `schema.sql`, `seed.sql`, `queries.sql`.
- `docs/` — architecture/algorithm/contract docs and new docs added here.
- `tests/` — pytest test files.

Responsibilities (as per repository)
- Backend: ingestion, propagation, risk, manoeuvre, API endpoints.
- Frontend: dashboard, visualisation, API integration.
- Demo: sample scenarios for presentations and testing.

Entry points
- Backend: `backend/app/main.py` (FastAPI‑style app expected).
- Frontend: Vite dev server via `frontend/package.json` scripts.

Notes on completeness
- Many modules are present but may be scaffolds. Inspect `backend/app/main.py` and `backend/requirements.txt` before running the backend.
# Project Structure

## Repository tree

```text
CelestIQ/
├── .vscode/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── data/
│   │   ├── manoeuvre/
│   │   ├── ml/
│   │   ├── orbit/
│   │   ├── risk/
│   │   ├── services/
│   │   └── utils/
│   ├── pyproject.toml
│   └── requirements.txt
├── data/
│   ├── processed/
│   └── sample/
├── database/
│   ├── queries.sql
│   ├── schema.sql
│   └── seed.sql
├── demo/
│   ├── DEMO_README.md
│   ├── sample_alerts.json
│   └── scenario.json
├── docs/
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── tsconfig*.json
├── tests/
├── README.md
└── package-lock.json
```

## Backend

The Python tree is organized by responsibility:

- `backend/app/api/` — planned HTTP route modules.
- `backend/app/data/` — planned ingestion, parsing, validation, and normalization.
- `backend/app/orbit/` — planned propagation, conjunction, and uncertainty logic.
- `backend/app/risk/` — planned collision probability, risk score, and prioritization.
- `backend/app/manoeuvre/` — planned generation, simulation, constraints, and optimization.
- `backend/app/ml/` — optional planned intelligence layer.
- `backend/app/services/` — planned orchestration/reporting services.
- `backend/app/utils/` — planned utility modules.
- `main.py` and `config.py` — intended application entry/configuration points.

**Implementation status:** most backend Python files are scaffolds or empty, but `backend/app/data/ingestion.py` contains a working CSV loader (`load_orbital_data`). The backend API entrypoint, analytical modules, dependency manifests, and SQL files do not currently form a runnable service.

## Frontend

The frontend is the main implemented subsystem.

### `frontend/src/app`

Application composition and route registration.

### `frontend/src/components`

Reusable UI, dashboard, layout, and shared components.

### `frontend/src/context`

Theme context/provider.

### `frontend/src/features`

Feature-oriented modules:

- `alerts`
- `auth`
- `dashboard`
- `maneuvers`
- `visualization`

### `frontend/src/pages`

Top-level route pages including login, dashboard, alerts, manoeuvres, orbit visualization, and unauthorized/not-found views.

### `frontend/src/services`

Separates intended API adapters from mock services.

### `frontend/src/store`

Zustand stores for authentication, UI, and visualization.

### `frontend/src/types`

Shared TypeScript domain/API types for alerts, manoeuvres, missions, satellites, and API structures.

### `frontend/src/lib`

Constants, utilities, and validation helpers.

### `frontend/src/styles`

Global CSS, variables, and animations.

### `frontend/public`

Static assets and `db.json`, which seeds the browser-side authentication store.

## Database

`database/` contains `schema.sql`, `seed.sql`, and `queries.sql`, but the inspected SQL files are empty. Therefore there is currently no implemented database schema to document.

## Tests

A root `tests/` directory exists. The repository README describes planned pytest files, but the current Python dependency configuration is empty and no CI workflow was found.

## Build configuration

The implemented frontend uses:

- `package.json`
- `package-lock.json`
- `vite.config.ts`
- TypeScript configuration files
- Tailwind/PostCSS configuration
- ESLint configuration
