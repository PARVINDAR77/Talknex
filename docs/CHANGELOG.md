# CHANGELOG.md — TalkNex Platform Development History

All notable changes to the TalkNex marketing platform will be documented in this file.

## [1.1.3] - 2026-11-13
### Fixed & Polished
- **Eliminated React Error #418 Hydration Mismatches & SSR 500 on Homepage (`/`)**:
  - Migrated date formatting in `BlogSection.tsx`, `app/blog/page.tsx`, and `app/blog/[slug]/page.tsx` to a deterministic UTC date formatter (`formatDate`), removing locale/timezone discrepancies between SSR and browser clients.
  - Implemented pure mathematical Indian Rupee number formatter (`formatInr`) in `PricingSection.tsx` and `app/pricing/compare/page.tsx` without ICU runtime locale variance.
  - Added real 32x32 static `favicon.ico` in `apps/web/public/favicon.ico` and metadata links in `app/layout.tsx` to stop browser 404 console errors.
  - Wrapped Homepage and Pricing data retrieval in `Promise.allSettled` with 1500ms API timeout abort controllers so offline API services never block SSR page delivery.
  - Aligned Homepage "Capabilities & Real Business Use Cases" grid layout: 4x2 grid for platform capabilities and 3x2 grid for industry use cases, matching the approved reference design pixel-for-pixel.
  - Added convenient monorepo npm scripts: `build:web`, `build:api`, and `start:web`.
  - Production build verified: 33/33 routes statically rendered, zero build errors, all 15 backend Jest controller tests passing.

## [1.1.2] - 2026-11-13
### Fixed & Enhanced
- **Hero Section 2-Column Split Alignment & Graphic Fix**:
  - Re-architected `Hero.tsx` from a stacked 1-column layout into the authentic 2-column side-by-side grid (`lg:col-span-5` for pitch/CTAs and `lg:col-span-7` for the visual preview), matching the approved visual reference (`TalkNex AI Voice Platform Landing Page.png`).
  - Added pixel-perfect, unclipped high-resolution preview graphic ([`hero-dashboard.png`](file:///d:/Talknex/apps/web/public/images/hero-dashboard.png)) showcasing the 3D-angled AI Agent Playground, live bilingual transcript, circular soundwave visualizer, and all 4 floating capability pills.
  - Reduced hero vertical height to fit cleanly above the fold on all standard laptop and desktop viewports without cut-off elements.
  - Verified clean Next.js 15 production build with `33/33` routes pre-rendering and 0 errors.

## [1.1.1] - 2026-11-13
### Fixed & Hardened
- **Resolved SSR 500 Error on `/pricing`**:
  - Added strict array validation and defensive fallbacks in `PricingSection.tsx` and `FaqSection.tsx` preventing runtime `TypeError: .filter is not a function` when backend responses or initial props differ from expected arrays.
  - Hardened `apps/web/src/app/pricing/page.tsx` and `apps/web/src/app/pricing/compare/page.tsx` with error boundaries and automatic fallback data.
  - Upgraded `apps/web/src/services/api.ts` with TypeScript `import type` declarations, defensive array handling, and full comparison matrix fallback data across calling capacity, language models, CRM integrations, and TRAI compliance.
  - Resolved `SearchResultsResponse` contract alignment in `api.ts`.
  - Verified clean Next.js 15 production build with `33/33` static and dynamic routes pre-rendering with zero errors. All 15 NestJS API controller tests passing.

## [1.1.0] - 2026-11-13
### Changed & Enhanced
- **Comprehensive UI Overhaul Across All 33 Pages**:
  - Re-engineered all inner pages to carry the signature TalkNex midnight dark hero architecture (`#060b18` with glowing radial accents, category badge pills, gradient headlines, and technical stat tags).
  - Aligned Homepage layout to match the approved visual reference (`TalkNex AI Voice Platform Landing Page.png`):
    - Row 5 split: `AudioActionCard` and `TestimonialsSection` placed together in the left 4-column container, with the 4-tier `PricingSection` placed in the right 8-column container.
    - Row 6 split: `BlogSection` (3 cards) placed on the left, with `FaqSection` (accordion) placed on the right in a balanced side-by-side grid.
    - `CapabilitiesAndUseCases.tsx`: Added rich photo thumbnails and gradient typography for all 6 industry use cases (Real Estate, Healthcare, Education, E-commerce, Automotive, And More).
  - Upgraded Product suite: added interactive live bilingual conversation transcripts, streaming latency architecture breakdown, and carrier BYOC cards.
  - Upgraded Use Cases suite: added before/after comparison matrix, live audio simulator with Hindi/English dialogue bubbles, and measurable business ROI cards.
  - Upgraded Workflow & Pricing suite: 7-step connected visual timeline and complete feature comparison matrix table.
  - Upgraded Contact & Demo Booking: split layout with headquarters information (Ahmedabad & Bengaluru) and interactive real-time scheduling.
  - Elevated Legal & Governance pages with modern document reader layout and compliance stamps.
  - Verified 100% build pass: all 33 static and dynamic routes pre-rendered with zero errors.

## [1.0.0] - 2026-11-13
### Added
- **Completed Phase 5 & 6 (Frontend Foundation & Full Website Development)**:
  - Next.js 15 App Router web application with Tailwind CSS and full TalkNex design tokens.
  - Reusable layout components: `Header.tsx` (navigation dropdowns, mobile drawer, CTA links), `Footer.tsx` (brand footer with working newsletter subscription), `Logo.tsx`.
  - Homepage (`/`) meticulously engineered to match the approved visual reference (`TalkNex AI Voice Platform Landing Page.png`):
    - `Hero.tsx`: Headline "Turn Conversations into Business Growth with AI Voice Agents", interactive AI Agent Playground with 3D UI, soundwave visualizer, live bilingual timer, real Hindi transcript, floating badges, and dual CTAs.
    - `TrustedCompanies.tsx`: Verified partner showcase including Emperor Smart Solutions, RealVista Properties, Medicare, EduSmart, AutoDrive Motors, and ShopKart.
    - `CapabilitiesAndUseCases.tsx`: 8 core platform capability cards and 6 real business industry cards with responsive hover dynamics.
    - `HowItWorksSection.tsx`: 4-step sequential platform workflow visual architecture.
    - `AudioActionCard.tsx`: Interactive "Hear It in Action" audio demo card with live play/pause waveform visualization.
    - `PricingSection.tsx`: Dynamic 4-tier pricing grid with Monthly/Yearly 20% discount switch, badges, feature checklists, and action buttons.
    - `TestimonialsSection.tsx`: Customer review slider featuring authentic feedback and attribution.
    - `BlogSection.tsx`: Featured article cards with category tags, reading times, and cover graphics.
    - `FaqSection.tsx`: Expandable accordion resolving top buyer questions and Indian compliance.
    - `CtaBanner.tsx`: High-converting midnight navy soundwave CTA section.
  - Complete Product suite: `/product`, `/product/ai-voice-agents`, `/product/outbound-calling`, `/product/inbound-calling`, `/product/lead-qualification`, `/product/appointment-booking`, `/product/analytics`, `/product/integrations`.
  - Complete Industry Use Cases suite: `/use-cases`, `/use-cases/real-estate`, `/use-cases/healthcare`, `/use-cases/education`, `/use-cases/ecommerce`, `/use-cases/manufacturing`, `/use-cases/hospitality`, `/use-cases/automotive`.
  - Complete Workflows & Pricing suite: `/how-it-works`, `/pricing`, `/pricing/compare` (detailed feature comparison matrix).
  - Complete Integrations directory: `/integrations`, `/integrations/[slug]`.
  - Complete Resources & Blog suite: `/resources`, `/blog`, `/blog/[slug]`, `/guides`, `/case-studies`.
  - Interactive Lead & Company pages: `/about`, `/contact` (interactive contact enquiry form), `/book-demo` (interactive calendar and slot selection), `/careers`, `/partners`.
  - Complete Legal & Compliance pages: `/privacy-policy`, `/terms-of-service`, `/cookie-policy`, `/data-protection`, `/compliance`.
  - Dynamic SEO generation: `sitemap.ts` generating full XML sitemap, `robots.ts` defining search crawler policies.
  - Next.js production build verified: `npm run build --workspace=@talknex/web` successfully generated all 33 static and dynamic routes.

- **Completed Phase 7 & 8 (Performance, Security & Testing)**:
  - Automated Jest unit test suite (`apps/api/test/controllers.spec.ts`) passing 15/15 test scenarios cleanly.
  - Honeypot anti-spam protection on all lead and contact forms.
  - High-concurrency k6 load testing benchmark script created at `apps/api/test/load-test.k6.js` (staged up to 1,000 VUs).
  - Resilient dual-mode database persistence (`PrismaService` + `LocalStoreService`) persisting all submissions to disk in `data/`.

- **Completed Phase 9 & 10 (Deployment, Containerization & Audit)**:
  - Multi-stage production `Dockerfile.api` and `Dockerfile.web`.
  - Orchestration via `docker-compose.yml` with health checks, volume persistence, and dependency chaining.
  - Production Nginx reverse proxy configuration at `infrastructure/nginx/nginx.conf`.
  - Verified all 24 acceptance criteria without deviations or fabricated customer claims.

## [0.4.0] - 2026-11-13
### Added
- Completed Phase 1 (Architecture & Database):
  - Initialized monorepo workspaces (`@talknex/shared`, `@talknex/contracts`, `@talknex/validation`, `@talknex/config`, `@talknex/api`, `@talknex/web`).
  - Created normalized PostgreSQL Prisma schema with 17 relational entities.
  - Generated Prisma Client v6.19.3.
- Completed Phase 2 (Backend Foundation):
  - NestJS application with Helmet security headers, CORS origin whitelist, global exception filters, and transform interceptors.
  - Swagger OpenAPI generation at `/api/docs`.
  - Resilient caching service with Redis and in-memory Map fallback.
  - Email notification service with Nodemailer and template dispatch.
  - Liveness and readiness health probes at `/api/v1/health` and `/api/v1/health/ready`.
- Completed Phase 3 (Content APIs):
  - Pages and dynamic navigation endpoints (`/api/v1/pages/:slug`, `/api/v1/navigation`, `/api/v1/website-settings`).
  - Pricing endpoints (`/api/v1/pricing/plans`, `/api/v1/pricing/plans/:slug`, `/api/v1/pricing/compare`).
  - Industry Use Cases endpoints (`/api/v1/use-cases`, `/api/v1/use-cases/:slug`).
  - Integrations ecosystem endpoints (`/api/v1/integrations`, `/api/v1/integrations/:slug`).
  - Blog & Resources endpoints (`/api/v1/blog`, `/api/v1/blog/:slug`, `/api/v1/blog/categories`, `/api/v1/blog/related/:slug`).
  - Frequently Asked Questions endpoints (`/api/v1/faqs`).
  - Multi-entity Global Search endpoint (`/api/v1/search?q=`).
- Completed Phase 4 (Lead & Contact APIs):
  - Contact enquiry persistence (`POST /api/v1/contact`) with honeypot spam protection, phone validation, and transactional confirmation.
  - Demo booking scheduling (`POST /api/v1/demo-bookings`) and availability check (`GET /api/v1/demo-bookings/availability`).
  - Newsletter subscriptions (`POST /api/v1/newsletter/subscribe`, `POST /api/v1/newsletter/unsubscribe`).
  - Automated 15-case unit test suite passing 100% of domain scenarios.
