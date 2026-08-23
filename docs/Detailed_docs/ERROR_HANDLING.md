# Error Handling

API errors
- 4xx: validation or client errors.
- 5xx: server exceptions.

Logging
- Centralised logger likely in `backend/app/utils/logging.py` — verify configuration.

User-facing errors
- Frontend should show clear messages when API returns non‑200.
# Error Handling

## Authentication errors

The authentication UI displays errors for:

- Empty required fields.
- Invalid username.
- Incorrect password.
- Duplicate username.
- Missing username during password reset.
- Incorrect current password.

## Initialization errors

`initDb()` catches errors while loading `/db.json` and logs a failure to the browser console.

## Authorization errors

Guests receive an `UnauthorizedPage` for protected routes.

## Backend errors

Not implemented.

## API errors

Not currently applicable because there is no live API.

## Recovery

Current recovery is primarily UI-level:

- Retry the login operation.
- Return from reset-password mode.
- Re-authenticate.
- Reload the application.

Production error handling should add structured error identifiers, server-side logging, correlation IDs, and safe user-facing messages.
