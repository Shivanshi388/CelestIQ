# Troubleshooting (practical)

Problem: Backend fails to import a module
- Cause: missing dependency or wrong Python version
- Solution: `pip install -r backend/requirements.txt` and ensure Python 3.10+
- Verify: `python -c "import <module>"`

Problem: Frontend 3D rendering errors
- Cause: mismatched Three.js versions or missing WebGL
- Solution: ensure `npm install` succeeded; test in Chrome/Firefox with WebGL enabled.

Problem: Docker Compose not found
- Cause: top-level `docker-compose.yml` not present
- Solution: use local dev flow (venv, npm) or add Compose file.
# Troubleshooting

## `npm install` fails

**Cause:** Node/npm environment or network/package registry problem.

**Solution:**

```bash
cd frontend
npm install
```

Ensure Node/npm is installed and the lockfile is being used.

**Verification:**

```bash
npm run build
```

## `npm run dev` fails

**Cause:** Dependency installation or local port conflict.

**Solution:** Re-run `npm install` and follow the Vite error output. If the default port is occupied, use Vite's documented CLI options/configuration rather than changing application code.

**Verification:** Vite starts and prints a local URL.

## Login users are missing

**Cause:** The application initializes from `/db.json`.

**Solution:** Confirm `frontend/public/db.json` exists and has valid JSON.

**Verification:** Reload and retry login.

## Authentication behaves unexpectedly after account changes

**Cause:** Browser localStorage contains the prototype user database/session.

**Solution:** Clear the application's local storage and reload.

**Verification:** The application reinitializes its user list from `db.json`.

## Protected pages are inaccessible

**Cause:** The current role may be `Guest`.

**Solution:** Authenticate as an authorized prototype user.

**Verification:** `/3d`, `/alerts`, and `/maneuvers` become available to non-Guest users.

## Build fails on TypeScript

**Cause:** Type or import errors.

**Solution:**

```bash
npm run build
```

Read the first TypeScript error and fix the affected source module.

**Verification:** Build completes successfully.

## Backend cannot start

**Cause:** Backend is not currently implemented/configured.

**Solution:** Do not treat the backend structure as runnable. Implement and document the Python runtime/dependencies/API first.

**Verification:** A real backend startup command should be added only after implementation.

## Database cannot start

**Cause:** SQL files are currently empty.

**Solution:** Database implementation is required before database startup can be documented.

**Verification:** Add a real schema/migration strategy first.
