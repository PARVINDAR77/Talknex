# DECISIONS.md — Architecture Decision Records (ADR)

## ADR-001: Monorepo vs Multi-repo
- **Decision:** Utilize npm workspaces monorepo with `apps/` and `packages/`.
- **Reasoning:** Keeps backend contracts, validation schemas, and types shared without publishing packages to a private registry. Simplifies atomic commits and CI/CD pipelines.

## ADR-002: Next.js App Router for Marketing Website
- **Decision:** Use Next.js 15+ App Router with React Server Components (RSC) and Tailwind CSS.
- **Reasoning:** RSC minimizes client-side JavaScript bundle footprint, optimizing Core Web Vitals (LCP, FID, CLS) and SEO indexability for public SaaS discovery.

## ADR-003: NestJS Modular Domain Architecture
- **Decision:** Structure backend into decoupled domain modules (`ContentModule`, `PricingModule`, `LeadsModule`, etc.).
- **Reasoning:** Enforces strict separation of concerns, simplifies maintenance, allows independent unit/integration testing, and avoids monolithic controller anti-patterns.

## ADR-004: Prisma ORM with PostgreSQL
- **Decision:** Use Prisma ORM with strong relational schema, migrations, and transactions.
- **Reasoning:** Type safety between database and TypeScript models, preventing runtime discrepancies and ensuring safe migrations.

## ADR-005: Decoupled Queue Processing with BullMQ
- **Decision:** BullMQ on Redis for asynchronous processing of leads and email dispatches.
- **Reasoning:** Guarantees fast HTTP responses to users submitting contact forms while protecting against transient third-party email service downtime via automatic retries with backoff.

