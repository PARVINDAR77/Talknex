# TESTING.md — Automated Testing Framework & Test Strategy

## 1. Unit Testing
- **Backend**: Jest with NestJS testing utilities.
  - Testing validation pipes, DTO mappings, pricing calculators, email template renderers, and rate limiting logic.
- **Frontend**: Vitest / Jest with React Testing Library.
  - Testing component rendering, input validation, and interactive widget state (toggle monthly/annual billing, sound player).

## 2. Integration Testing
- Supertest with NestJS testing module against test PostgreSQL / SQLite database.
- Testing all endpoint response envelopes, error handling, rate limits, contact persistence, and demo booking validations.

## 3. End-to-End Testing (Playwright)
- Testing full user flows:
  - Homepage navigation & interactive playground.
  - Contact form submission and success confirmation.
  - Demo booking workflow with slot selection.
  - Pricing plan comparison navigation.
  - Blog post search and detail navigation.
  - Mobile responsive drawer menu.

