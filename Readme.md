# Colorectal ML — Flask + Angular + GitHub CI/CD

This teaching project implements the **Week 6 DevOps laboratory** architecture.

- Angular frontend: 24 fields inferred from the supplied training notebook (feature names preserved, including `Hemoglobin ` with a trailing space).
- Flask REST API: `GET /health`, `GET /schema` (extra helper), `POST /predict`.
- CI: Python pytest (safe demo mode) and Angular production build.
- GitHub Pages: static frontend ONLY, no hosted Python backend.

## Important: demo mode versus actual predictions

**By default `MODEL_MODE=demo`.** Valid POST requests return `prediction: null` and an explicit DEMO label. They do **not** run or simulate a trained model. This allows app + CI/CD work to proceed without loading incompatible model artifacts.

Copy trusted files to `backend/models/full_pipeline.pkl` and `backend/models/model_config.json` locally for future integration. The `.gitignore` excludes these files. To enable real inference after validating compatible dependency versions and correct feature encoding, set `MODEL_MODE=real` on the Flask process. Real mode must be verified with the actual model data contract before use.

**The frontend category options are only development placeholders.** Replace them with the exact encoder-compatible categories before enabling real inference. This app is not a clinical tool.

## Windows setup (project root in VS Code PowerShell)

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r backend\requirements.txt
$env:MODEL_MODE='demo'
python backend\app.py
```

Run from a second terminal:
```powershell
cd frontend
npm install
npm start
```

`npm install` generates `frontend/package-lock.json`; **commit that file** before triggering GitHub Actions. Node 24 and Angular 22 CLI are targeted. If `npm install` gives Angular peer-dependency errors, align Angular 22/TypeScript versions using the official Angular compatibility table and regenerate the lockfile. npm registry access is required on your machine.

Open `http://localhost:4200`.

Third terminal from root:
```powershell
$env:MODEL_MODE='demo'
python -m pytest -q backend\tests
curl.exe --noproxy "*" http://127.0.0.1:5000/health
curl.exe --noproxy "*" http://localhost:4200/api/health
```

## CI/CD and GitHub Pages

1. Run `npm install` inside `frontend` so a real `package-lock.json` exists. Build locally using `npm run build`.
2. Create a root repository, review `.gitignore`, `git add .`, `git commit -m "Initial ML DevOps app"`.
3. Create empty GitHub repository and `git remote add origin <HTTPS_URL>`; `git push -u origin main`.
4. On GitHub go to Settings → Pages → Source → **GitHub Actions**.
5. In Actions, confirm **Full-stack CI** and **Deploy Angular to GitHub Pages** succeed. Pages deploys only the static UI with prediction disabled.
6. The workflows use the Angular output at `frontend/dist/frontend/browser`. Pages deploys only the static UI with prediction disabled.

## Endpoints

- `GET /health`: returns API mode, feature count, and model readiness.
- `GET /schema`: returns feature metadata.
- `POST /predict`: expects exactly all 24 feature names; returns HTTP 400 for missing/extra/invalid fields. In demo mode, HTTP 200 returns demo status without a prediction.

## Lab submission items

Code repository; local Flask health/POST responses; passing pytest; Angular form/result screenshot (demo mode must be labeled); GitHub Actions URLs; Angular build artifact; GitHub Pages URL; environment/technical report; screenshots. Live model prediction evidence is **pending** until model integration works and is separately verified.
