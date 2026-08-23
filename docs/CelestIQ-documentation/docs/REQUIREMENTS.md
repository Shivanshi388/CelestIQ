# Requirements

## Current runtime requirements

The implemented application is the `frontend/` package.

### Required

- Git.
- Node.js/npm compatible with the versions declared in the frontend package.
- A modern browser with JavaScript enabled.

### Development

- TypeScript toolchain installed through npm dependencies.
- Vite development server.
- Optional VS Code; a `.vscode/` directory exists.

## Backend requirements

The repository reserves a Python backend but does not currently define usable dependencies. `backend/requirements.txt` and `backend/pyproject.toml` are empty in the inspected revision.

Therefore:

- Python backend runtime: **Not currently configured**.
- Python dependency set: **Not currently configured**.
- API server: **Not implemented**.
- Production Python runtime requirements: **Not applicable to current implementation**.

## Database requirements

A SQL directory exists, but the schema and seed/query files are empty. No database server is currently required to run the implemented frontend.

## Network requirements

The frontend can run locally without a backend because it uses mock data and browser-local authentication. Network access is only needed to install npm packages or access any external resources introduced by future implementation.

## Production requirements

A production infrastructure specification is **not currently configured**. A production deployment should be defined only after the backend, database, authentication, and operational requirements are implemented.
