# PRODUCT_REQUIREMENTS.md — TalkNex Functional & Non-Functional Specifications

## 1. Functional Requirements

### 1.1 Website Navigation & Public Pages
- **Homepage (`/`)**:
  1. Header & Navigation (Product dropdown, Use Cases dropdown, Pricing, Resources dropdown, Company dropdown, Login, Start Free Trial CTA).
  2. Hero Section (Headline, Subtitle, Dual CTAs, Trust indicators: "No Credit Card Required", "Setup in Minutes", "Indian Languages Support").
  3. Interactive Dashboard Preview Mockup (AI Agent Playground with live Hindi/English transcription, call controls, audio visualization).
  4. Trusted Companies / Partners strip.
  5. Platform Capabilities (8 core modules: AI Voice Agents, Outbound Calling, Inbound Support, Multilingual, Lead Qualification, Appointment Booking, Integrations, Analytics & Reports).
  6. Industry Use Cases Grid (Real Estate, Healthcare, Education, E-commerce, Automotive, And More).
  7. How TalkNex Works (4-step visual flow: Create Agent -> Add Knowledge -> Run Campaign -> Track & Grow).
  8. Audio Demonstration Card ("Hear It in Action" player).
  9. Dynamic Pricing Preview (Monthly/Yearly billing toggle with 20% discount badge, 4 tiers: Starter, Growth, Business, Enterprise).
  10. Verified Testimonials / Customer Stories slider.
  11. Blog & Insights preview (Retrieved via REST API).
  12. Frequently Asked Questions (Accordion, retrieved via REST API).
  13. Final Midnight Banner CTA with soundwave graphics.
  14. Global Footer with multi-column links, newsletter subscription, and legal links.
- **Product Suite Pages**:
  - `/product`
  - `/product/ai-voice-agents`
  - `/product/outbound-calling`
  - `/product/inbound-calling`
  - `/product/lead-qualification`
  - `/product/appointment-booking`
  - `/product/analytics`
  - `/product/integrations`
- **Industry Use Case Pages**:
  - `/use-cases`
  - `/use-cases/real-estate`
  - `/use-cases/healthcare`
  - `/use-cases/education`
  - `/use-cases/ecommerce`
  - `/use-cases/manufacturing`
  - `/use-cases/hospitality`
  - `/use-cases/automotive`
- **Workflow & Pricing Pages**:
  - `/how-it-works`
  - `/pricing`
  - `/pricing/compare`
- **Integrations Directory**:
  - `/integrations`
  - `/integrations/[slug]`
- **Content & Knowledge Base**:
  - `/resources`
  - `/blog`
  - `/blog/[slug]`
  - `/guides`
  - `/case-studies`
- **Company & Conversion Pages**:
  - `/about`
  - `/contact` (Transactional enquiry form)
  - `/book-demo` (Interactive slot selector and booking flow)
  - `/careers`
  - `/partners`
- **Legal & Compliance**:
  - `/privacy-policy`
  - `/terms-of-service`
  - `/cookie-policy`
  - `/data-protection`
  - `/compliance`

### 1.2 Lead Generation & Processing
- Contact Form: Name, Email, Phone, Company, Industry, Message, Source page, UTM tracking, Consent.
- Demo Booking Form: Name, Email, Phone, Company, Industry, Preferred Date, Preferred Time, Time Zone, Requirements, Consent.
- Newsletter Subscription: Email validation, double opt-in ready, unsubscribe tokens.
- Spam protection & Rate limiting on all submission endpoints.

## 2. Non-Functional Requirements

- **Target Concurrency**: Support up to 1,000 concurrent visitors on standard production instances with sub-200ms page response times for cached pages.
- **Security**: Strict CORS, helmet headers, input sanitization, CSRF tokens, rate limiting via Redis, parameterized queries via Prisma.
- **Accessibility**: WCAG 2.1 AA compliant typography, focus states, screen reader semantics, and reduced-motion handling.
- **SEO**: Dynamic OpenGraph tags, JSON-LD structured data (Organization, SoftwareApplication, FAQPage, Article), automated sitemap.xml, robots.txt.

