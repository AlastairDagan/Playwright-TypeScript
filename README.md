# Playwright TypeScript Automation Suite

This repository contains end-to-end browser automation tests written with Playwright and TypeScript for the Practice Software Testing demo application.

The suite covers core user flows such as browsing products, viewing product details, using category filters, submitting the contact form, and validating pagination and search functionality.

## Overview

This project is designed for learning and practicing UI test automation with Playwright. It includes:

- Browser-based end-to-end tests
- Cross-browser execution with Chromium, Firefox, and WebKit
- HTML test reporting
- Screenshot and trace capture on failures

## Tech Stack

- Node.js
- TypeScript
- Playwright Test
- HTML Reporter

## Project Structure

- [tests/](tests/) - Test specifications for Sprint 1 and Sprint 2 scenarios
- [playwright.config.ts](playwright.config.ts) - Playwright configuration, browser projects, and base URL
- [package.json](package.json) - Scripts and dependencies
- [playwright-report/](playwright-report/) - Generated HTML reports
- [test-results/](test-results/) - Test artifacts such as screenshots and traces

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Install Playwright browsers

```bash
npx playwright install
```

### 3. Run the test suite

Run all tests:

```bash
npm test
```

Run tests in Chromium only:

```bash
npm run chrome
```

### 4. View the HTML report

```bash
npx playwright show-report
```

## Test Configuration

The suite is configured to:

- Test against the public demo site at https://practicesoftwaretesting.com/
- Run in headless mode
- Generate traces on retry/failure
- Capture screenshots for failed tests
- Use the HTML reporter by default

## Notes

- Tests depend on the public demo site being available.
- If you want to run only specific tests, you can use Playwright's filtering options such as `--grep`.
- This repository is intended for automation practice and QA learning.
