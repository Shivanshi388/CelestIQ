# CI / CD

Status: Not configured (audit)

- No `.github/workflows/` entries were verified during the audit.

Recommendation
- Add GitHub Actions to run `pytest`, build frontend, and run linting on PRs.
# CI/CD

## Current status

**Not currently configured.**

No `.github/workflows/` directory is present in the inspected repository tree.

## Current manual checks

```bash
cd frontend
npm run lint
npm run build
```

## Planned CI pipeline

A future CI workflow should include:

```mermaid
flowchart LR
    PR["Pull Request"] --> Install["npm ci"]
    Install --> Lint["npm run lint"]
    Lint --> Build["npm run build"]
    Build --> Artifact["Build artifact"]
```

Backend testing and deployment stages should be added only after the backend is implemented.

## Secrets

No CI secrets are currently configured in the repository.
