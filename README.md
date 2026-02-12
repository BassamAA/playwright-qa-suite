# Playwright QA Suite

End-to-end tests for the Construction Dashboard UI. This repo is meant to live on its own and run against a running instance of the app.

## Requirements

- Node.js 18+
- A running frontend + backend for the Construction Dashboard
- Valid credentials for login

## Setup

```bash
npm install
npx playwright install --with-deps
```

## Run tests

```bash
E2E_EMAIL="you@example.com" \
E2E_PASSWORD="your-password" \
FRONTEND_URL="http://localhost:5173" \
npm test
```

Notes:
- `FRONTEND_URL` defaults to `http://localhost:5173`.
- The tests use a global login setup and save a storage state in `playwright/.auth/storageState.json`.
- Make sure your frontend is configured to point to the correct backend (e.g. `VITE_API_BASE`).

## Project structure

- `playwright.config.ts` Playwright configuration
- `tests/e2e/*.spec.ts` Test specs
- `tests/e2e/global-setup.ts` Login setup

## Troubleshooting

- If WebKit crashes locally on macOS, run Chromium-only (default). To re-enable WebKit:
  - `PW_WEBKIT=true npm test`
- If you get redirected unexpectedly, confirm your credentials and `FRONTEND_URL` are correct.

- If your `FRONTEND_URL` has no protocol, the config will assume `https://`.
- To enable the HTML report locally: `PW_HTML=true npm test`
