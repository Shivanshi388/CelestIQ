# Test Strategy

Current
- Unit tests present for ingestion, orbit, risk, manoeuvre, optimizer, API (see `tests/`).

Recommendations
- Add CI job to run tests for PRs.
- Add integration/e2e scenario tests using `demo/scenario.json`.
# Test Strategy

## Philosophy

Testing should protect the operator workflow first, then analytical correctness once the backend exists.

## Current quality gates

The current repository can verify:

```bash
npm run lint
npm run build
```

## Planned testing pyramid

```text
             E2E
          Integration
        Domain/API tests
       Unit/component tests
```

## Critical paths

Future automated coverage should prioritize:

1. Authentication state transitions.
2. Guest restrictions.
3. Dashboard rendering.
4. Alert severity/status display.
5. Manoeuvre comparison.
6. 3D visualization initialization.
7. API adapter behavior.
8. Orbital propagation correctness.
9. Conjunction detection.
10. Risk calculations.
11. Manoeuvre constraint enforcement.
12. Optimization ranking.

## Quality gates

No formal CI quality gate is currently configured. Once CI exists, lint and build should be mandatory; domain calculations should additionally require deterministic automated tests.
