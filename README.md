# Demo Web Shop UI & API Automation

## Project Overview
This project automates UI workflows on Demo Web Shop using Playwright with Page Object Model (POM) and API workflows on JSONPlaceholder Users API using Postman and Newman, with Allure reporting and screenshot attachments.

## Tech Stack
- Playwright (`@playwright/test`) + Page Object Model (POM)
- Allure Report (`allure-playwright` & Allure CLI)
- Postman & Newman CLI
- Node.js / JavaScript

## Setup Steps
1. Clone the repository:
   ```bash
   git clone <YOUR_PUBLIC_REPO_URL>
   cd sqa-demo-webshop-automation
   ```
2. Install dependencies and Playwright browsers:
   ```bash
   npm install
   npx playwright install
   ```
3. Install Newman globally (if not already installed):
   ```bash
   npm install -g newman
   ```

## How to Run Tests
- Run Q1 (Invalid Login):
  ```bash
  npm run test:q1
  ```
- Run Q2 (Register + Add to Cart):
  ```bash
  npm run test:q2
  ```
- Run Q3 (E2E Search to Order Confirmation):
  ```bash
  npm run test:q3
  ```
- Run all UI tests sequentially:
  ```bash
  npm run test:ui
  ```
- Run API tests via Newman:
  ```bash
  npm run test:api
  ```
- Run UI and API tests together in sequence:
  ```bash
  npm run test:all
  ```

## Generate & Open Allure Report
```bash
npm run report:generate
npm run report:open
```