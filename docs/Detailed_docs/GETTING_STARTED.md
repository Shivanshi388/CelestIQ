# Getting Started

Prereqs (verified)
- Python 3.10+
- Node 18+ / npm or pnpm
- Git
- (Optional) Docker & Docker Compose — referenced but not verified in audit.

Clone
```bash
git clone https://github.com/Shivanshi388/CelestIQ.git
cd CelestIQ
```

Backend
```bash
python -m venv .venv
# Windows
.venv\Scripts\Activate.ps1
# macOS/Linux
# source .venv/bin/activate
pip install -r backend/requirements.txt
# Start (if implemented)
uvicorn backend.app.main:app --reload
```

Frontend
```bash
cd frontend
npm install
npm run dev
# open http://localhost:5173 (Vite default)
```

Database
- Apply SQL in `database/schema.sql` to your DB if you intend to use persistent features.

Run tests
```bash
pytest -v
```

Troubleshooting
- If backend modules fail on import: check Python version and required packages.
- If frontend fails: ensure Node version matches and `npm install` completed.
