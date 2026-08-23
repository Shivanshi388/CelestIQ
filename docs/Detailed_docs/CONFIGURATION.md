# Configuration

Configuration files present
- `backend/pyproject.toml`, `backend/requirements.txt`
- `frontend/package.json`, `vite.config.ts`, `tailwind.config.ts`
- `.env.example` present in `frontend/` and referenced at repo root.

Runtime configuration
- Use `.env` for secrets and runtime overrides. Do not commit `.env`.

Where to inspect runtime keys
- Backend: `backend/app/config.py` (open to confirm exact env names).
- Frontend: `frontend/.env.example`.
# Configuration

## Frontend configuration

The frontend is configured through standard Vite/TypeScript/Tailwind files:

- `frontend/vite.config.ts`
- `frontend/tailwind.config.ts`
- `frontend/postcss.config.js`
- `frontend/eslint.config.js`
- `frontend/tsconfig.json`
- `frontend/tsconfig.app.json`
- `frontend/tsconfig.node.json`
- `frontend/components.json`

## Runtime configuration

No runtime environment variables are currently consumed by the inspected authentication/store implementation.

`frontend/.env.example` exists but is empty.

## Application data configuration

User seed data is stored in:

```text
frontend/public/db.json
```

This is not a secure configuration store. It is a frontend asset and should be treated as public.

## Backend configuration

`backend/app/config.py` exists but is currently empty.

## Production configuration

Not currently configured.
