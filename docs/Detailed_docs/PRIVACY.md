# Privacy

Data collected: sample orbital data and demo scenarios only.

No PII detected in repository audit. Avoid storing PII in the repo and document retention policies before production.
# Privacy

## Current data handled

The frontend handles:

- Username.
- Display name.
- Role.
- Password value during account operations.
- Session state.
- Mock operational/mission data.

## Storage

User/session information is stored in browser localStorage. Seed credentials are also present in `frontend/public/db.json`.

## Transmission

No backend transmission of authentication data is implemented.

The frontend may load static assets through the browser, but no production external data provider is configured.

## Third-party sharing

No third-party data-sharing integration is currently implemented.

## Retention

Browser-local data remains until localStorage is cleared or application logic removes it. No server-side retention policy exists.

## Sensitive data

Passwords are present in the prototype data flow and therefore require special caution. The repository is not suitable for handling real credentials.

## Future privacy requirements

A production system should define:

- Data minimization.
- Retention periods.
- Access controls.
- Audit requirements.
- Encryption requirements.
- User/account deletion procedures.
- Third-party provider disclosures.
