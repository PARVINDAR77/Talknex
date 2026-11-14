# TalkNex Engineering Documentation

Welcome to the TalkNex Master Web Platform documentation repository.

## Table of Contents

1. [Project Overview](./PROJECT_OVERVIEW.md)
2. [Product Requirements](./PRODUCT_REQUIREMENTS.md)
3. [System Architecture](./ARCHITECTURE.md)
4. [Database Schema](./DATABASE_SCHEMA.md)
5. [Entity Relationship Diagram](./ER_DIAGRAM.md)
6. [API Specification](./API_SPECIFICATION.md)
7. [API Endpoints Reference](./API_ENDPOINTS.md)
8. [Design System](./DESIGN_SYSTEM.md)
9. [Website Pages & Section Inventory](./WEBSITE_PAGES.md)
10. [Content Model](./CONTENT_MODEL.md)
11. [Security Strategy](./SECURITY.md)
12. [Performance Strategy](./PERFORMANCE.md)
13. [Scalability Architecture](./SCALABILITY.md)
14. [Deployment Guide](./DEPLOYMENT.md)
15. [Environment Variables](./ENVIRONMENT_VARIABLES.md)
16. [Automated Testing Strategy](./TESTING.md)
17. [Load Testing Plan & Results](./LOAD_TESTING.md)
18. [Backup and Disaster Recovery](./BACKUP_AND_RECOVERY.md)
19. [Architecture Decision Records (ADR)](./DECISIONS.md)
20. [Implementation Progress](./IMPLEMENTATION_PROGRESS.md)
21. [Changelog](./CHANGELOG.md)

---

## Quick Start for Developers

```bash
# Install all dependencies across the monorepo
npm install

# Setup environment variables
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Generate Prisma Client & Run Migrations
npm run db:generate
npm run db:migrate
npm run db:seed

# Run both frontend and backend concurrently in dev mode
npm run dev
```

