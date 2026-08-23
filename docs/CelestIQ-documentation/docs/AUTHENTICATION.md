# Authentication

Status: Not implemented (audit)

- No authentication middleware or user model was detected in the repository audit.

Recommendation
- Implement OAuth2 / JWT for API protection in production.
- Add session management and role definitions for operator workflows.
# Authentication

## Current implementation

Authentication is implemented entirely in the frontend using Zustand and browser storage.

### Initialization

`useAuthStore` checks:

- `sentinel_token`
- `sentinel_user`

in `localStorage`.

If no local user list exists, `initDb()` fetches `/db.json` and transforms the supplied passwords using `btoa`.

### Login

The login flow:

1. Normalizes the username.
2. Finds the matching local user.
3. Encodes the supplied password with `btoa`.
4. Compares it with the stored encoded value.
5. Creates a session user object.
6. Stores authentication markers in localStorage.

### Signup

New users are created locally with the default role `Operator`.

### Guest

Guest login creates a local session with role `Guest`.

### Password changes

Both password reset and authenticated password update modify the browser-local user list.

The reset flow does not implement email ownership verification or another external identity check.

### Logout

Logout removes:

- `sentinel_token`
- `sentinel_user`

from localStorage.

## Security assessment

The implementation is suitable only for demonstration:

- `btoa` is reversible encoding, not password hashing.
- User records are delivered to the browser.
- Session state is client-controlled.
- No server-side verification exists.
- No secure token lifecycle exists.

A production implementation must replace this mechanism with server-side identity management.
