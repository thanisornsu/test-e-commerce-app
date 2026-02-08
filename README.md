# E-Commerce Automation Test Suite

Playwright + TypeScript E2E tests for e-commerce. **SUT:** https://www.automationexercise.com

Full answers and strategy: **[docs/](docs/)**

---

## Strategy (A1)

- **70%** UI E2E (login, search, cart) — business-critical, matches user behavior.
- **20%** API (future) — auth, cart ops.
- **10%** Component (future).

UI-first: shopping is visual; E2E catches integration issues. Trade-off: slower runs, higher confidence.

---

## Critical Scenarios (A2)

| Priority   | ID          | Scenario                            |
| ---------- | ----------- | ----------------------------------- |
| P1 Blocker | TC001–TC003 | Login (valid, invalid, empty)       |
| P2 High    | TC004       | Search + add to cart                |
| P3 High    | TC005–TC006 | Multiple products; cart persistence |

Not automated: registration (manual), payment (mocking), UI cosmetics (design QA).

---

## Structure (B1)

```
docs/          → ASSIGNMENT_ANSWERS, AUTOMATION_STRATEGY, AI_PROMPTS, PROJECT_SUMMARY
tests/login/   → login.spec.ts (TC001–TC003)
tests/cart/    → cart.spec.ts (TC004–TC006)
tests/pages/   → BasePage, LoginPage, ProductsPage, CartPage
tests/fixtures → pages.fixture.ts
tests/helpers  → testData.helper.ts
```

POM + fixtures + test data helper. One place for selectors; tests stay thin.

---

## Quick Start

**Docker:** `docker compose up test`

**Local:**

```bash
npm install
npx playwright install chromium
npm test
```

**Reproduce CI locally** (same retries, viewport, env): `npm run test:ci`

**Config:** Copy `.env.example` to `.env`. Set `TEST_USER_EMAIL` / `TEST_USER_PASSWORD` for TC001 (optional).

**Report:** `npx playwright show-report`

---

## Config

- **Env:** `BASE_URL`, `TEST_USER_EMAIL`, `TEST_USER_PASSWORD`, `CI` — see `.env.example`.
- **Playwright:** 60s timeout, 2 retries in CI, viewport 1280×720 (CI/local parity), HTML/list/JSON reporters, artifacts on failure.

---

## CI/CD (C1)

Workflow: [.github/workflows/e2e.yml](.github/workflows/e2e.yml). Runs on push/PR to `main` or `master`; uploads report and test-results as artifacts. To run TC001 in CI, add repo secrets `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` (registered account on the SUT).

**Block deploy:** Login or add-to-cart fails, critical assertion fails.  
**Don’t block:** Flaky UI (investigate), minor search variance, small perf regression.

---

## Test Data (C2)

Unique data via `TestDataHelper` (emails, usernames); credentials from env. No shared state; no cleanup needed for current scope. Login uses seeded user from env.

---

## What NOT to Automate (D1)

| Area          | Why                          | Instead                          |
| ------------- | ---------------------------- | -------------------------------- |
| Visual design | Subjective, high maintenance | Manual + Percy/Chromatic         |
| Payment       | Security, deps               | Manual staging + prod monitoring |
| Email         | Async, brittle               | API checks + manual spot         |

---

## Quality Metrics (D2)

- **Pass rate** &gt; 95%; investigate if &lt; 90%.
- **Runtime** &lt; 10 min for critical suite.
- **Escape rate** &lt; 5% production bugs; add scenarios if higher.

---

## License

MIT
