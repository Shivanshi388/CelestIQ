# Environment Variables

Extracted placeholders (confirm names in `backend/app/config.py` and `frontend/.env.example`):

| Variable | Required | Purpose | Example | Sensitive |
|---|---:|---|---|:---:|
| `DATABASE_URL` | Recommended | Connection string for SQL DB | `postgresql://user:pass@localhost:5432/celestiq` | Yes |
| `PORT` | Optional | Backend port override | `8000` | No |
| `ENV` | Optional | `development`/`production` | `development` | No |

Note: Exact variable names must be confirmed by inspecting `backend/app/config.py`.
# Environment Variables

No environment variables are currently defined by the repository's `.env.example` file or established by the inspected frontend runtime code.

| Variable | Required | Purpose | Example | Sensitive |
|---|---|---|---|---|
| None currently defined | No | No configured runtime environment variables | N/A | N/A |

## Notes

Do not introduce secrets into frontend environment variables unless the value is intentionally public. Vite-style frontend environment variables are generally exposed to browser code when explicitly made available to the client.

Future backend secrets should be managed server-side and never committed to the repository.
