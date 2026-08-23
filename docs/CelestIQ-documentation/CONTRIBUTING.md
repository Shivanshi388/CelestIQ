# Contributing to CelestIQ

Thank you for your interest in contributing to CelestIQ. This document describes the expected workflow, conventions, and guidance for contributors.

Getting started

- Fork the repository and clone your fork.
- Create a topic branch named with the convention: `yourname-feature` or team prefix (examples used in the repo: `sparsh-data-orbit`, `anushka-risk-backend`).
- Keep changes small, focused and testable.

Branching and commits

- Branch names: feature branches should use descriptive names and may include the team prefix.
- Commit messages: short summary on first line, optional detailed body. Use present‑tense verbs (e.g. "Add risk score calculation").

Development workflow

- Run tests locally (`pytest`) and make sure new code includes tests where appropriate.
- Open a Pull Request against `main` with a clear description and link to any relevant issue.
- Use code reviews to discuss design and implementation details.

Coding conventions

- Python: follow PEP8 and type hints where possible.
- JavaScript/TypeScript: follow project conventions present in `frontend/` files.

Testing

- Add or update unit tests under `tests/` for new functionality.
- Run `pytest -v` before opening a PR.

Security

- Do not commit secrets, API keys, or private credentials. Use `.env` and `.env.example`.

Reporting issues

- Use the GitHub Issues page for bug reports and feature requests.

Thank you — maintainers will review contributions and provide feedback.
# Contributing

## Getting started

Read:

- [Setup](docs/SETUP.md)
- [Development](docs/DEVELOPMENT.md)
- [Architecture](docs/ARCHITECTURE.md)

## Branches

Use focused branch names describing the responsibility or feature.

Example:

```text
feature/dashboard-alerts
feature/orbit-visualization
feature/authentication
```

The repository's original README uses responsibility-specific names; no branch naming enforcement is configured.

## Coding standards

For frontend TypeScript:

- Preserve existing module boundaries.
- Prefer typed interfaces over `any`.
- Keep reusable UI in shared components.
- Keep feature-specific logic inside the corresponding feature.
- Avoid embedding API access directly in page components.
- Run ESLint before submitting changes.

## Testing

At minimum:

```bash
cd frontend
npm run lint
npm run build
```

Add automated tests when a real testing framework is introduced.

## Pull requests

Include:

- Summary.
- Motivation.
- Scope.
- Screenshots for UI changes.
- Verification commands.
- Known limitations.

## Security

Never commit:

- Real credentials.
- API keys.
- Private tokens.
- Production configuration.
- Personal secrets.

Report security concerns privately rather than publishing sensitive details in an issue.
