# Security Policy

Summary

- Responsible disclosure: report security issues via GitHub Issues or contact maintainers directly.
- Do not post secrets in issues or PRs.

Status

- Implemented: minimal guidance on secrets and `.env` usage.
- Recommended: add automated dependency scanning and a dedicated security contact.

Reporting

If you discover a security issue, open a private issue or use GitHub’s security reporting. Include reproduction steps and any logs that help reproduce the issue.
# Security Policy

## Current status

CelestIQ is a prototype and should not be used for operational spacecraft decisions or real credential handling.

## Supported versions

No formal release/support version policy is currently established.

## Reporting a vulnerability

For a real security issue, do not publish credentials, tokens, exploit details, or sensitive operational data in a public issue.

Contact the repository maintainers through a private GitHub security/reporting channel if one is enabled for the repository. If no private reporting mechanism is configured, contact the repository owner directly through GitHub before public disclosure.

## Security expectations

Contributors must not:

- Commit secrets.
- Add real credentials to `db.json`.
- Treat frontend route gating as secure authorization.
- Introduce real spacecraft-control functionality without appropriate review.
- Present prototype calculations as operationally certified results.

## Responsible disclosure

Security findings should be reported privately, with enough information to reproduce the issue safely.
