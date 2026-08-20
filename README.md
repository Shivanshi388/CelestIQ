# Celestiq

## Intelligent Collision-Avoidance Decision Support and Manoeuvre Optimisation

Celestiq is a software-only space technology project designed to help satellite operators analyse predicted close approaches, assess conjunction risk, generate possible avoidance manoeuvres and compare feasible options.

The system is intended as a decision-support prototype. It does not autonomously control a spacecraft and must not be used as a replacement for official operational conjunction-assessment services.

---

## Project Overview

As the number of satellites and debris objects in Earth orbit increases, satellite operators need reliable tools to identify potentially dangerous close approaches.

Celestiq provides a prototype workflow that:

1. Loads orbital and conjunction data.
2. Validates and normalises the input records.
3. Propagates object positions into the future.
4. Detects predicted close approaches.
5. Estimates collision probability and risk.
6. Prioritises alerts according to urgency.
7. Generates possible avoidance manoeuvre scenarios.
8. Simulates the consequences of each scenario.
9. Filters options using safety, mission and ΔV constraints.
10. Recommends the most suitable feasible option.
11. Presents the results through a web dashboard.

The project follows the general idea of conjunction assessment: identifying possible close approaches and supporting operators when evaluating whether an avoidance action may be required. NASA describes conjunction assessment as part of the process used to reduce collision risk for spacecraft.

---

## Project Goals

### Primary goals

- Build a clear software architecture for satellite conjunction analysis.
- Process orbital and space-object data in a consistent format.
- Detect predicted close approaches between space objects.
- Calculate an understandable risk score.
- Prioritise alerts for the operator.
- Generate and compare possible avoidance manoeuvres.
- Display results through a simple and accessible dashboard.
- Provide explainable reasons for risk and manoeuvre recommendations.
- Maintain a reliable demonstration scenario for presentations and testing.

### Secondary goals

- Support future integration with external orbital-data sources.
- Add uncertainty handling to improve the realism of risk estimates.
- Provide a modular structure that can later support machine-learning models.
- Maintain testable backend components and reusable API endpoints.

---

## Important Disclaimer

Celestiq is an educational and research prototype.

It is not an operational flight-safety system and must not be used to make real spacecraft manoeuvre decisions without validation by qualified mission operators and official conjunction-assessment sources.

The output of this project is intended for:

- Learning.
- Demonstration.
- Software development.
- Algorithm experimentation.
- Academic presentations.
- Prototype decision support.

Public orbital data may be incomplete, outdated or unsuitable for operational collision avoidance. Real mission operations should rely on authoritative data, validated models, mission-specific constraints and qualified experts.

---

## Main Features

### Orbital data processing

- Load data from sample files or future external APIs.
- Parse records into a common internal format.
- Detect missing or invalid values.
- Normalise timestamps, units and object identifiers.

### Orbit propagation

- Estimate future positions of orbital objects.
- Support propagation over a selected time window.
- Prepare position data for conjunction screening.

### Conjunction detection

- Compare the predicted positions of objects.
- Identify close approaches.
- Calculate time of closest approach.
- Store miss distance and related encounter details.

### Risk assessment

- Estimate collision probability.
- Combine risk factors into a comparable risk score.
- Categorise alerts as critical, high, monitor or low.
- Rank alerts by urgency.

### Manoeuvre decision support

- Generate candidate avoidance manoeuvres.
- Simulate possible effects.
- Compare miss distance, ΔV and operational consequences.
- Apply safety and mission constraints.
- Recommend a feasible candidate based on the selected scoring criteria.

### Explainability

- Show why a conjunction received its risk level.
- Display the factors influencing a manoeuvre recommendation.
- Help users understand the output instead of showing only a final score.

### Web dashboard

- Show a summary of active alerts.
- Display detailed conjunction information.
- Present encounter timelines.
- Compare manoeuvre candidates.
- Display charts and orbit visualisations.
- Support responsive viewing on different screen sizes.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Backend | Python |
| API | FastAPI or compatible Python web framework |
| Data processing | Python modules and CSV/JSON files |
| Database | SQL |
| Frontend | HTML, CSS and JavaScript |
| Testing | Python testing tools such as pytest |
| Deployment | Docker and Docker Compose |
| Optional intelligence | Machine-learning models in Python |

FastAPI is suitable for the backend because it is a Python framework for building APIs using Python type hints. The project can also begin with a simpler Python API implementation and add FastAPI features as development progresses.

---

## Repository Structure

```text
Celestiq/
│
├── README.md
├── .env.example
├── .gitignore
├── docker-compose.yml
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API_CONTRACT.md
│   ├── DATA_SOURCES.md
│   ├── ALGORITHM.md
│   ├── TEAM_WORKPLAN.md
│   ├── FILE_OWNERSHIP.md
│   ├── DEMO_SCRIPT.md
│   └── TROUBLESHOOTING.md
│
├── backend/
│   ├── requirements.txt
│   ├── pyproject.toml
│   │
│   └── app/
│       ├── main.py
│       ├── config.py
│       │
│       ├── api/
│       │   ├── satellites.py
│       │   ├── conjunctions.py
│       │   ├── risk.py
│       │   ├── manoeuvres.py
│       │   └── health.py
│       │
│       ├── data/
│       │   ├── ingestion.py
│       │   ├── parser.py
│       │   ├── validator.py
│       │   └── normalizer.py
│       │
│       ├── orbit/
│       │   ├── propagation.py
│       │   ├── conjunction.py
│       │   └── uncertainty.py
│       │
│       ├── risk/
│       │   ├── collision_probability.py
│       │   ├── risk_score.py
│       │   └── prioritizer.py
│       │
│       ├── manoeuvre/
│       │   ├── generator.py
│       │   ├── simulator.py
│       │   ├── constraints.py
│       │   └── optimizer.py
│       │
│       ├── ml/
│       │   ├── features.py
│       │   ├── model.py
│       │   ├── train.py
│       │   └── explain.py
│       │
│       ├── services/
│       │   ├── decision_support.py
│       │   ├── alert_service.py
│       │   └── report_generator.py
│       │
│       └── utils/
│           ├── logging.py
│           └── timestamps.py
│
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   └── queries.sql
│
├── frontend/
│   ├── index.html
│   ├── dashboard.html
│   ├── conjunction.html
│   ├── manoeuvres.html
│   │
│   ├── css/
│   │   ├── style.css
│   │   ├── dashboard.css
│   │   └── responsive.css
│   │
│   ├── js/
│   │   ├── api.js
│   │   ├── dashboard.js
│   │   ├── conjunction.js
│   │   ├── manoeuvres.js
│   │   ├── charts.js
│   │   └── orbit-view.js
│   │
│   └── assets/
│       ├── logo.svg
│       └── icons/
│
├── data/
│   ├── sample/
│   │   ├── satellites.csv
│   │   ├── space_objects.csv
│   │   └── conjunctions.csv
│   │
│   └── processed/
│
├── tests/
│   ├── test_ingestion.py
│   ├── test_orbit.py
│   ├── test_risk.py
│   ├── test_manoeuvre.py
│   ├── test_optimizer.py
│   └── test_api.py
│
└── demo/
    ├── scenario.json
    ├── sample_alerts.json
    └── DEMO_README.md
```

---

## Team Responsibilities

The project responsibilities are divided into backend data and orbital calculations, backend risk and integration, frontend interface development, and frontend visualisation.

### Backend data and orbital calculations

Main responsibilities:

- Data ingestion.
- Data parsing.
- Data validation.
- Data normalisation.
- Orbit propagation.
- Conjunction detection.
- Uncertainty handling.
- Sample orbital datasets.
- Ingestion and orbit tests.

Main files:

```text
backend/app/data/*
backend/app/orbit/*
data/sample/*
data/processed/*
tests/test_ingestion.py
tests/test_orbit.py
```

### Backend risk, manoeuvre and integration

Main responsibilities:

- Collision probability.
- Risk scoring.
- Alert prioritisation.
- Manoeuvre generation.
- Manoeuvre simulation.
- Constraints.
- Manoeuvre optimisation.
- Backend APIs.
- Services.
- Database.
- Optional ML modules.
- Risk, manoeuvre, optimiser and API tests.

Main files:

```text
backend/app/api/*
backend/app/risk/*
backend/app/manoeuvre/*
backend/app/ml/*
backend/app/services/*
database/*
tests/test_risk.py
tests/test_manoeuvre.py
tests/test_optimizer.py
tests/test_api.py
```

### Frontend dashboard and interface

Main responsibilities:

- Landing page.
- Dashboard page.
- Conjunction details page.
- General layout.
- Dashboard styling.
- Alert cards and tables.
- Conjunction timeline.
- Basic frontend assets.

Main files:

```text
frontend/index.html
frontend/dashboard.html
frontend/conjunction.html
frontend/css/style.css
frontend/css/dashboard.css
frontend/js/dashboard.js
frontend/js/conjunction.js
frontend/assets/*
```

### Frontend visualisation and interactive features

Main responsibilities:

- Manoeuvre comparison page.
- Backend connection from the frontend.
- Responsive styling.
- Manoeuvre comparison logic.
- Charts.
- Orbit visualisation.

Main files:

```text
frontend/manoeuvres.html
frontend/css/responsive.css
frontend/js/api.js
frontend/js/manoeuvres.js
frontend/js/charts.js
frontend/js/orbit-view.js
```

## System Workflow

```text
Orbital Data
     │
     ▼
Data Ingestion
     │
     ▼
Parsing, Validation and Normalisation
     │
     ▼
Orbit Propagation
     │
     ▼
Conjunction Detection
     │
     ▼
Collision Probability and Risk Score
     │
     ▼
Alert Prioritisation
     │
     ▼
Candidate Manoeuvre Generation
     │
     ▼
Manoeuvre Simulation
     │
     ▼
Safety and Mission Constraints
     │
     ▼
Optimisation and Recommendation
     │
     ▼
API Response
     │
     ▼
Web Dashboard
```

---

## Risk-Scoring Concept

The risk score should combine relevant encounter factors into a transparent and comparable result.

Possible factors include:

- Estimated collision probability.
- Minimum predicted separation distance.
- Time until closest approach.
- Position uncertainty.
- Relative velocity.
- Object type.
- Mission criticality.
- Quality and age of the input data.

A basic prototype score may be represented as:

```text
risk_score =
    probability_factor
    + distance_factor
    + time_urgency_factor
    + uncertainty_factor
    + mission_priority_factor
```

The exact weights must be documented in:

```text
docs/ALGORITHM.md
```

The score is a decision-support indicator, not an official probability of collision unless it has been rigorously validated against an appropriate operational method.

---

## Manoeuvre-Optimisation Concept

Celestiq may generate multiple candidate manoeuvres, such as:

- Small along-track velocity change.
- Small radial velocity change.
- Small cross-track velocity change.
- Earlier or later execution time.
- Alternative manoeuvre magnitudes.

Each candidate can be evaluated using:

- Resulting miss distance.
- Estimated collision-risk reduction.
- Required ΔV.
- Time until execution.
- Fuel or propellant cost.
- Mission impact.
- Constraint violations.
- Post-manoeuvre orbital effects.

A simplified objective function may be:

```text
objective =
    risk_weight × remaining_risk
    + delta_v_weight × manoeuvre_delta_v
    + mission_impact_weight × mission_impact
    + constraint_penalty
```

The recommended manoeuvre should be selected only from feasible candidates.

---

## Data Sources

The prototype uses local CSV, JSON and demo data stored in:

```text
data/sample/
demo/
```

Future versions may support public orbital data sources such as CelesTrak or other authorised providers. CelesTrak provides orbital element data and documentation for formats such as Two-Line Element sets and newer general perturbation formats.

External data should be:

- Retrieved responsibly.
- Validated before use.
- Timestamped.
- Stored with source information.
- Checked for stale or missing records.
- Used only according to the provider’s terms.
- Clearly distinguished from the fixed demonstration data.

For operational work, public demonstration data should not be treated as a replacement for authoritative conjunction data.

---

## Installation

### Prerequisites

Install the following:

- Python 3.10 or later.
- Git.
- A code editor such as Visual Studio Code.
- Optional: Docker and Docker Compose.
- Optional: a SQL database supported by the project.

Check Python:

```bash
python --version
```

Check Git:

```bash
git --version
```

### Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/Celestiq.git
cd Celestiq
```

Replace `YOUR-USERNAME` with the GitHub account or organisation that owns the repository.

### Create a virtual environment

Windows PowerShell:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### Install backend dependencies

```bash
pip install -r backend/requirements.txt
```

If the requirements file is not ready yet, install dependencies only after they are added by the backend team.

### Configure environment variables

Create a local `.env` file from the example:

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

macOS/Linux:

```bash
cp .env.example .env
```

Never commit the `.env` file to GitHub.

---

## Running the Project

### Backend

When the FastAPI application is implemented, a typical command may be:

```bash
uvicorn backend.app.main:app --reload
```

The backend may then be available at:

```text
http://127.0.0.1:8000
```

FastAPI commonly provides interactive API documentation at:

```text
http://127.0.0.1:8000/docs
```

The exact command may change depending on the final project configuration.

### Frontend

The frontend can be opened through a local development server.

For example:

```bash
python -m http.server 5500 --directory frontend
```

Then open:

```text
http://127.0.0.1:5500
```

Do not depend on opening HTML files directly with `file://` if the frontend needs API requests, because browser security restrictions may affect requests.

### Docker

When `docker-compose.yml` is configured, use:

```bash
docker compose up --build
```

To stop the services:

```bash
docker compose down
```

---

## Testing

Run all tests with:

```bash
pytest
```

Run a particular test file:

```bash
pytest tests/test_orbit.py
```

Run tests with more detailed output:

```bash
pytest -v
```

The test suite should cover:

- Data loading.
- Data validation.
- Orbit propagation.
- Conjunction detection.
- Risk scoring.
- Manoeuvre generation.
- Manoeuvre simulation.
- Manoeuvre optimisation.
- API responses.

---

## API Endpoints

The planned API structure includes:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | Check backend availability |
| GET | `/satellites` | List tracked satellites |
| GET | `/conjunctions` | List predicted conjunctions |
| GET | `/conjunctions/{id}` | Show one conjunction |
| GET | `/risk/{id}` | Show risk analysis |
| POST | `/manoeuvres/generate` | Generate candidate manoeuvres |
| POST | `/manoeuvres/simulate` | Simulate a candidate |
| POST | `/manoeuvres/optimise` | Select the best feasible candidate |
| GET | `/reports/{id}` | Generate a conjunction report |

The final request and response formats must be documented in:

```text
docs/API_CONTRACT.md
```

---

## Minimum Viable Prototype

If development time is limited, implement these components first:

```text
backend/app/main.py
backend/app/data/ingestion.py
backend/app/orbit/propagation.py
backend/app/orbit/conjunction.py
backend/app/risk/risk_score.py
backend/app/manoeuvre/generator.py
backend/app/manoeuvre/simulator.py
backend/app/manoeuvre/optimizer.py
backend/app/api/conjunctions.py
backend/app/api/manoeuvres.py
database/schema.sql
data/sample/satellites.csv
data/sample/space_objects.csv
frontend/index.html
frontend/dashboard.html
frontend/manoeuvres.html
frontend/css/style.css
frontend/js/api.js
frontend/js/dashboard.js
frontend/js/manoeuvres.js
frontend/js/orbit-view.js
demo/scenario.json
```

The first demo should show:

1. A loaded satellite and nearby object.
2. A predicted close approach.
3. A calculated risk category.
4. Two or more possible manoeuvres.
5. A comparison of candidate results.
6. One recommended feasible option.
7. A clear explanation of the recommendation.

---

## Development Workflow

### Branch naming

Create one branch for each major responsibility:

```text
sparsh-data-orbit
anushka-risk-backend
suryansh-dashboard
yuvraj-frontend-visualisation
```

Create a branch:

```bash
git checkout -b your-branch-name
```

### Commit changes

```bash
git add .
git commit -m "Describe the change clearly"
```

Examples:

```text
Add orbital data ingestion
Implement conjunction screening
Add risk score calculation
Create dashboard alert cards
Add manoeuvre comparison chart
```

### Push a branch

```bash
git push -u origin your-branch-name
```

### Pull the latest changes

```bash
git checkout main
git pull origin main
```

### Recommended collaboration rules

- Do not commit passwords, tokens or private keys.
- Do not directly change another member’s files without discussion.
- Keep commits small and focused.
- Test changes before opening a Pull Request.
- Explain algorithm changes in the relevant documentation file.
- Use Pull Requests for merging work into `main`.
- Resolve conflicts carefully rather than overwriting another person’s work.
- Keep file and function names consistent with this structure.

---

## Documentation Plan

The `docs/` directory should contain:

| File | Content |
|---|---|
| `ARCHITECTURE.md` | Overall system design and module relationships |
| `API_CONTRACT.md` | API endpoints, inputs and outputs |
| `DATA_SOURCES.md` | Data formats, providers, timestamps and limitations |
| `ALGORITHM.md` | Propagation, conjunction, risk and optimisation methods |
| `TEAM_WORKPLAN.md` | Tasks, deadlines and progress |
| `FILE_OWNERSHIP.md` | Team member responsibilities |
| `DEMO_SCRIPT.md` | Step-by-step presentation instructions |
| `TROUBLESHOOTING.md` | Common errors and solutions |

---

## Limitations

The prototype may have the following limitations:

- Simplified orbital propagation.
- Simplified collision-probability estimation.
- Incomplete uncertainty modelling.
- Limited space-object data.
- Synthetic or demonstration datasets.
- Simplified manoeuvre physics.
- No direct spacecraft command capability.
- No guarantee of operational accuracy.
- No replacement for official conjunction data or mission analysis.
- Machine-learning features may be optional and dependent on training data quality.

These limitations should be clearly mentioned during demonstrations.

---

## Future Improvements

Possible future extensions include:

- Integration with validated orbital-data providers.
- More accurate orbit propagation.
- Covariance and uncertainty propagation.
- Conjunction Data Message support.
- More realistic collision-probability calculations.
- Mission-specific constraints.
- Fuel and propellant modelling.
- Multi-object conjunction analysis.
- Historical alert analysis.
- Improved 3D orbit visualisation.
- User authentication and role-based access.
- Notification and alert delivery.
- Model monitoring and explainability.
- Cloud deployment.
- Continuous integration and automated testing.

---

## Security and Privacy

- Store secrets only in `.env`.
- Keep `.env` in `.gitignore`.
- Use `.env.example` to document required variable names without real values.
- Do not upload personal access tokens.
- Do not expose private database credentials.
- Validate all API input.
- Avoid accepting arbitrary file paths from users.
- Log errors without revealing secrets.
- Use authentication before deploying the system publicly.

---

## Project Status

Current status:

```text
Initial repository structure created.
Backend and frontend implementation in progress.
```

Update this section as the project develops.

---

## Team

| Member | Responsibility |
|---|---|
| Sparsh | Backend data ingestion and orbital calculations |
| Anushka | Backend risk, manoeuvre, API, services and database |
| Suryansh | Frontend pages, dashboard and interface styling |
| Yuvraj | Frontend API connection, manoeuvre comparison, charts and orbit visualisation |

---

## Acknowledgements and References

- NASA Conjunction Assessment and Collision Avoidance resources.
- CelesTrak orbital element documentation.
- FastAPI documentation.
- Python documentation.
- Relevant academic and technical literature on orbit propagation, conjunction assessment, collision probability and spacecraft manoeuvre planning.

---

## License

This project is currently intended for educational and demonstration purposes.

If the project is released publicly, add an appropriate open-source license, such as the MIT License, after confirming that all team members agree to the licensing terms.

---

## Contact

For questions about the project, contact the Celestiq team through the project repository’s issue tracker or team communication channel.
