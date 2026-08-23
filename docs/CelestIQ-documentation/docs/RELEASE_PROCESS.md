# Release Process

Status: Not formalised.

Recommendation
- Tag releases using semantic versioning and update `CHANGELOG.md`.
- Run full test suite and smoke tests before release.
# Release Process

## Current status

No formal release automation or release-management workflow is configured.

## Current manual release preparation

```bash
cd frontend
npm ci
npm run lint
npm run build
```

Then manually verify the application.

## Future release process

1. Review changes.
2. Update version.
3. Run lint/tests/build.
4. Review security changes.
5. Build release artifacts.
6. Deploy.
7. Run smoke checks.
8. Record release notes.
9. Retain previous deployment for rollback.

No step should be represented as automated until the repository contains the corresponding configuration.
