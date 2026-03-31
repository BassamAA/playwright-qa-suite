# Playwright QA Suite

Playwright-based end-to-end automation suite for validating critical workflows in the Construction Dashboard application.

## Overview
This repository contains browser-driven automation focused on real user journeys, login flows, and workflow validation against a running application instance.

## What it demonstrates
- End-to-end automation using Playwright
- Authenticated workflow coverage
- Environment-based execution against real app instances
- Practical QA automation design for business-facing applications

## Requirements
- Node.js 18+
- A running frontend + backend instance of the target application
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

## Tech Stack
- Playwright
- TypeScript / Node.js
- Environment-driven E2E execution

## Purpose
This project reflects practical QA automation work focused on validating production-style workflows with reliable end-to-end coverage.
