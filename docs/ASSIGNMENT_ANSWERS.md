# Assignment Answers (A–E)

All sections in one place for submission.

---

## A — Core Automation

**A1. Automation strategy**  
UI-first E2E (70%), API (20%), Component (10%). Rationale: e-commerce is visual and integration-heavy; UI tests match user behavior and catch integration bugs. Trade-off: slower, higher confidence.

**A2. Critical scenarios**

| ID | Priority | Scenario |
|----|----------|----------|
| TC001–TC003 | P1 | Login (valid, invalid, empty) |
| TC004 | P2 | Search + add to cart |
| TC005–TC006 | P3 | Multiple products; cart persistence |

Not automated: registration, payment, UI cosmetics. Implemented: `tests/login/login.spec.ts`, `tests/cart/cart.spec.ts`.

**A3. Implemented tests**  
6 tests (Playwright + TypeScript), POM + fixtures + TestDataHelper. Run: `npm test` or `docker compose up test`.

---

## B — Test Architecture

**B1. Framework design**  
Feature folders: `login/`, `cart/`. Shared: `pages/` (BasePage, LoginPage, ProductsPage, CartPage), `fixtures/pages.fixture.ts`, `helpers/testData.helper.ts`. Fixtures inject page objects; one place for selectors.

---

## C — CI/CD & Test Data

**C1. CI/CD**  
Run on push/PR (e.g. GitHub Actions): `docker compose up test --abort-on-container-exit`; upload report artifact. Block on login/cart/critical failure; don’t block on flakiness or minor variance.

**C2. Test data**  
Unique data via helper; credentials from env. No shared state; optional cleanup for CI accounts.

---

## D — Leadership & Quality

**D1. What NOT to automate**  
Visual design (manual + tools). Payment (manual + monitoring). Email (API + manual).

**D2. Metrics**  
Pass rate &gt; 95%; runtime &lt; 10 min; escape rate &lt; 5%.

---

## E — Docker & Execution

**E1. Docker**  
`Dockerfile` (Playwright image, `npm ci`, Chromium), `docker-compose.yml` (env, volumes for report). Run: `docker compose up test`.

**E2. Hosted SUT**  
https://www.automationexercise.com. `BASE_URL` from env. Waits and selectors for stability; see README and AUTOMATION_STRATEGY.

---

| Section | File / location |
|---------|------------------|
| A | This file, README, tests/ |
| B | README (Structure), tests/ |
| C | README (CI/CD, Test Data) |
| D | README (What NOT, Metrics) |
| E | Dockerfile, docker-compose.yml, README |
