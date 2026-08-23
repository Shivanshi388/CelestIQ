# Testing

Verified
- `tests/` contains pytest test files: `test_orbit.py`, `test_risk.py`, `test_manoeuvre.py`, `test_optimizer.py`, `test_api.py`.

Run tests
```bash
pytest -v
```

Test strategy (current)
- Unit tests for ingestion, propagation, risk and manoeuvre logic (presence of test files indicates intent).
- Integration tests for API (see `tests/test_api.py`).

Recommendations
- Add CI job to run tests for PRs and produce coverage reports.
# Testing

## Current state

Testing infrastructure is incomplete.

The repository contains a root `tests/` directory and the original README describes pytest-based tests, but:

- `backend/requirements.txt` is empty.
- No Python test dependency is currently declared.
- No CI workflow is present in the repository tree.
- The backend source itself is currently empty.

## Verifiable frontend checks

```bash
cd frontend
npm run lint
npm run build
```

These validate linting and production compilation.

## Test types

| Type | Current status |
|---|---|
| Frontend unit tests | Not currently configured |
| Frontend integration tests | Not currently configured |
| Frontend E2E | Not currently configured |
| Backend unit tests | Not implemented |
| Backend integration tests | Not implemented |
| API tests | Not implemented |
| Manual UI testing | Applicable |

## Manual smoke test

1. Start Vite.
2. Open the login page.
3. Test login.
4. Test guest access.
5. Test route restrictions.
6. Test dashboard rendering.
7. Test alerts.
8. Test manoeuvres.
9. Test 3D visualization.
10. Run production build.
