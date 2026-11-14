# ARCHITECTURE.md — TalkNex System Architecture

## 1. High-Level Architecture Overview

The TalkNex public web platform is designed as an API-first, horizontally scalable monorepo architecture:

```
[ Visitor Browser / Mobile Client ]
               │
               ▼
   [ Nginx Reverse Proxy / Cloudflare CDN ]
         │                        │
         ▼ (SSR / HTML / Assets)  ▼ (API Requests: /api/v1/*)
   [ apps/web (Next.js) ]    [ apps/api (NestJS) ]
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼                        ▼                        ▼
  [ PostgreSQL DB ]         [ Redis Cache ]         [ BullMQ Workers ]
  - Pages & Content        - Content Cache          - Email Dispatch
  - Pricing Plans          - Rate Limiting          - Lead Notifications
  - Leads & Demo Bookings  - Session Cache          - Analytics Aggregate
```

## 2. Component Decoupling

- **`apps/web` (Next.js 15+ App Router)**:
  - Default Server Components for static/ISR rendering of marketing pages.
  - Client components isolated to interactive widgets (e.g. playground simulator, pricing monthly/yearly toggle, demo calendar picker, contact forms, mobile menu).
  - Strongly typed API client consuming NestJS endpoints.
- **`apps/api` (NestJS 11+)**:
  - Modular domain modules: `ContentModule`, `PricingModule`, `LeadsModule`, `BlogModule`, `FaqModule`, `IntegrationsModule`, `UseCasesModule`, `HealthModule`.
  - Global filters (`HttpExceptionFilter`), logging interceptors, and validation pipes.
  - Swagger OpenAPI generation at `/api/docs`.
- **`apps/workers` (BullMQ + Redis)**:
  - Background asynchronous task handling for email dispatch, notification routing, and audit persistence.
- **`packages/shared`**:
  - Shared TypeScript interfaces, DTO definitions, enums, constants, and formatting utilities.
- **`packages/contracts`**:
  - REST API contracts, path definitions, and request/response specifications.
- **`packages/validation`**:
  - Shared validation schemas using class-validator and Zod.

## 3. Communication Patterns

- **Synchronous**: RESTful JSON over HTTPS (`/api/v1/*`).
- **Caching**: Cache-aside strategy using Redis with 3600s TTL for public marketing data, invalidated immediately upon editorial updates.
- **Asynchronous**: Producers push jobs to BullMQ queues; background worker consumers process jobs with exponential backoff retries.

