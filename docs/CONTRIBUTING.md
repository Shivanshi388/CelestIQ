# Contributing to CelestIQ

CelestIQ is a prototype with a deliberately small verified surface. Contributions should improve that surface without presenting planned analytics as operational capability.

## Start here

1. Read [Getting Started](Detailed_docs/GETTING_STARTED.md) and [Development](Detailed_docs/DEVELOPMENT.md).
2. Check [Architecture](ARCHITECTURE.md) and [Project Structure](Detailed_docs/PROJECT_STRUCTURE.md) before choosing a module.
3. Confirm the current status of the area in the [documentation hub](README.md).

## Choose the right boundary

- Put route-level screens in `frontend/src/pages/`.
- Put domain behavior in `frontend/src/features/`.
- Put reusable UI in `frontend/src/components/`.
- Put service adapters in `frontend/src/services/`.
- Put cross-feature state in `frontend/src/store/`.
- Keep future analytical work inside its reserved `backend/app/` package.
- Update the matching documentation page when behavior, status, or a public contract changes.

## Verify locally

```powershell
cd frontend
npm install
npm run lint
npm run build
```

The root Python tests and backend dependency manifests are not executable in the current revision. Do not claim Python test coverage until a test framework and real tests are added.

## Pull requests

Include the problem, implementation boundary, verification commands, screenshots for UI changes, accessibility considerations, and known limitations. Changes to authentication, risk, manoeuvre recommendations, data provenance, or security require extra review because these areas can be misunderstood as operational functionality.

## Security and data

Never commit credentials, tokens, private orbital data, or production configuration. The current browser authentication uses public seed data, localStorage, and `btoa`; it is intentionally unsuitable for real accounts. Report suspected security issues privately through the repository's trusted maintainer channel.
