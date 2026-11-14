# PROJECT_OVERVIEW.md — TalkNex Public SaaS Marketing Web Platform

## 1. Executive Summary

- **Project Name:** TalkNex
- **Parent Company:** Emperor Smart Solutions
- **Product Category:** AI Voice Calling & Conversation Automation SaaS
- **Tagline:** Turn Conversations into Business Growth with AI Voice Agents.
- **Product Descriptor:** AI Voice & Conversation Platform.
- **Primary Market:** India (with native multilingual support for Hindi, Gujarati, English, Marathi, Tamil, Telugu, Kannada, Bengali), designed with architecture ready for global expansion.

TalkNex is an enterprise-grade AI voice calling platform enabling businesses to automate inbound customer calls, execute intelligent high-throughput outbound calling campaigns, qualify leads dynamically, integrate with existing CRMs and calendars, and generate real-time conversation analytics.

## 2. Project Scope & Guardrails

### Core Scope
1. **Public SaaS Marketing Website**: A multi-page, API-driven web platform mirroring the approved visual reference and design system.
2. **Backend API Platform (NestJS)**: A production-ready RESTful API handling dynamic website content, dynamic pricing plans, use cases, integrations, blogs, author profiles, contact submissions, and demo bookings.
3. **Database Architecture (PostgreSQL + Prisma)**: A fully normalized, indexed, transactional relational data store.
4. **Caching & Asynchronous Processing (Redis + BullMQ)**: In-memory caching for sub-50ms content retrieval, and decoupled queue processing for email notifications and lead processing.
5. **No Dummy/Fabricated Data Policy**: Real backend persistence, verified company details, and transparent illustrative examples without fabricated metrics.

### Non-Scope
- Future Customer Application portal (`app.talknex.com`).
- Super Admin portal (`admin.talknex.com`).
Integration-ready navigation and database schemas are established to cleanly connect to these portals in subsequent phases.

