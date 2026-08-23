# Development Guide

Local development
- Backend
  - Create virtual env: `python -m venv .venv`
  - Activate & install: `pip install -r backend/requirements.txt`
  - Start (when implemented): `uvicorn backend.app.main:app --reload`
  - Run tests: `pytest -v`
- Frontend
  - `cd frontend`
  - `npm install`
  - `npm run dev`

Branching & PRs
- Branch naming examples (from repo): `sparsh-data-orbit`, `anushka-risk-backend`.
- PR template: include summary, testing steps, linked issue.

Coding conventions
- Python: PEP8, type hints encouraged.
- Frontend: TypeScript linting via ESLint.

Debugging
- Backend logs: check `backend/app/utils/logging.py`.
- Frontend devtools: Vite console output and browser devtools.

Add a feature
1. Create branch
2. Implement & test
3. Update docs in `docs/`
4. Open PR to `main`
# Development

## Development model

The repository is organized around a frontend feature architecture and a planned backend/domain architecture.

## Frontend workflow

1. Create or switch to a focused branch.
2. Make changes inside the relevant feature/component/store/type module.
3. Run lint.
4. Run a production build.
5. Manually verify the affected route.
6. Open a pull request.

## Existing repository guidance

The original README recommends responsibility-oriented branches and focused commits. Examples include:

```text
sparsh-data-orbit
anushka-risk-backend
suryansh-dashboard
yuvraj-frontend-visualisation
```

These are project-specific examples, not enforced Git configuration.

## Feature development

For frontend work:

- Put route-level screens in `frontend/src/pages`.
- Put domain-specific functionality in `frontend/src/features`.
- Put reusable components in `frontend/src/components`.
- Put browser/API adapters in `frontend/src/services`.
- Put cross-feature state in `frontend/src/store`.
- Put shared types in `frontend/src/types`.
- Put reusable helpers in `frontend/src/lib`.

## Testing before commit

At minimum:

```bash
npm run lint
npm run build
```

A formal automated test suite is not currently configured for the frontend.

## Backend development

Backend implementation should not be assumed to exist. New backend work should first establish:

- Python runtime/version policy.
- Dependency management.
- API framework.
- Domain models.
- Test framework.
- Database adapter.
- Authentication strategy.

## Pull requests

The repository has no enforced branch-protection or CI policy visible in the inspected tree. Contributors should therefore manually provide:

- What changed.
- Why it changed.
- Screenshots for UI changes.
- Verification commands.
- Known limitations.
