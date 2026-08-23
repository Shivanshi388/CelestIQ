# Deployment

Status: Local/developer deployment documented; production deployment not configured in repo.

Local
- Backend: `uvicorn backend.app.main:app --reload` (when `main.py` is implemented)
- Frontend: `npm run dev` in `frontend/`

Docker
- README references Docker Compose; top‑level manifest was not verified in audit — Not currently configured.

Rollback
- Not implemented.
# Deployment

## Current deployment status

**Not currently configured.**

The repository contains an executable frontend build but no production hosting configuration.

## Frontend build

```bash
cd frontend
npm install
npm run build
```

The Vite build produces the frontend distribution in the configured Vite output directory.

## Production server

A production web server/provider is not specified in the repository.

## Backend

Not implemented.

## Database

Not implemented.

## Health checks

No deployed health endpoint exists. A planned `/health` route is mentioned in the original design but is not implemented.

## Rollback

No automated rollback procedure is configured.

## Recommended future deployment sequence

1. Build frontend.
2. Deploy static assets.
3. Deploy backend API.
4. Provision SQL database.
5. Configure server-side secrets.
6. Configure CORS and authentication.
7. Add health checks.
8. Add monitoring.
9. Verify frontend-to-API integration.
10. Record release version and rollback target.

These are recommendations, not current deployment capabilities.
