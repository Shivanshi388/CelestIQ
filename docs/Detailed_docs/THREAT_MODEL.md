# Threat Model (high level)

Threat: Malicious API payloads
- Attack surface: public endpoints
- Mitigation: input validation, authentication for sensitive endpoints (Not implemented)

Threat: Leaked secrets
- Attack surface: committed `.env` or repo history
- Mitigation: `.gitignore` `.env`, use secret manager
# Threat Model

## Scope

This threat model covers the current browser prototype and identifies realistic future risks. It does not assert that the project has suffered an exploit.

| Threat | Attack surface | Impact | Likelihood | Existing mitigation | Recommended mitigation |
|---|---|---|---|---|---|
| Credential disclosure | `public/db.json` | High | High for production | None | Move authentication server-side |
| Password recovery abuse | Client reset flow | High | High | Username lookup only | Require verified identity/recovery channel |
| Session tampering | localStorage | High | High | None | Server-issued secure session |
| Role tampering | Client role state | High | High | Route gating | Server-side authorization |
| Malicious input | Future API | High | Medium | No backend | Strict validation/schema validation |
| Dependency compromise | npm dependencies | Medium/High | Medium | Lockfile | Automated scanning and review |
| Data integrity failure | Future orbital data | High | Medium | None | Provenance, timestamps, validation |
| Incorrect manoeuvre recommendation | Analytical engine | Critical | Domain-dependent | Not implemented | Independent validation and human approval |
| Data staleness | External orbital data | High | Domain-dependent | Not integrated | Freshness checks and provenance |

## Key security conclusion

The largest current architectural issue is not a hidden vulnerability in a server: **there is no trusted server boundary**. The authentication/authorization model is intentionally prototype-grade and should be replaced before production use.
