# PERFORMANCE.md — High-Throughput & Low-Latency Architecture

## 1. Frontend Performance Strategy (Next.js)

- **Server-Side Generation (SSG) & Incremental Static Regeneration (ISR)**:
  - Stable pages (`/`, `/product/*`, `/use-cases/*`, `/pricing`) are pre-rendered at build time with automated revalidation when data updates.
- **Image Optimization**:
  - Utilizing Next.js `<Image />` component with modern formats (`webp`, `avif`).
  - Predefined responsive dimension rules (`sizes`) to prevent Cumulative Layout Shifts (CLS).
- **Bundle Optimization**:
  - Dynamic imports for heavier non-critical client components (e.g. interactive demo simulators, complex modal pickers).
  - Tree-shaking enabled across all shared packages.

## 2. Backend Latency Strategy (NestJS + Redis)

- **Multi-Tier Caching**:
  - Public marketing endpoints (e.g., `/api/v1/pages/home`, `/api/v1/pricing/plans`, `/api/v1/faqs`) are cached in Redis with a 3600-second TTL.
  - Sub-15ms response times for cached API requests.
- **Database Connection Pooling**:
  - Configured Prisma connection pool with connection timeouts and idle reclamation.
- **Asynchronous Task Offloading (BullMQ)**:
  - Lead submission notifications and confirmation emails are offloaded to BullMQ background workers, returning `201 Created` immediately to visitors within <50ms without waiting for third-party email providers.

