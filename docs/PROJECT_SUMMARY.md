# Project Summary

## Status

- **A** — Automation strategy, 6 scenarios, 6 tests implemented ✅
- **B** — POM, fixtures, helpers ✅
- **C** — CI/CD and test data (README) ✅
- **D** — What NOT to automate, metrics (README) ✅
- **E** — Docker + hosted SUT ✅

## Run

```bash
docker compose up test
# or
npm install && npx playwright install chromium && npm test
```

## Deliverables

- `tests/` (login, cart, pages, fixtures, helpers)
- `docs/` (ASSIGNMENT_ANSWERS, AUTOMATION_STRATEGY, AI_PROMPTS)
- `README.md`, `Dockerfile`, `docker-compose.yml`, `.env.example`, `.gitignore`

## Checklist

- [ ] Repo public; README and docs complete
- [ ] `docker compose up test` runs; report viewable
- [ ] .env not committed; env vars documented
