# DEPLOYMENT.md — TalkNex Production & Local Deployment Guide

## 1. Local Development via Docker Compose

Run full environment (PostgreSQL, Redis, NestJS API, Next.js Web, BullMQ Worker):
```bash
docker-compose -f infrastructure/docker/docker-compose.yml up -d
```

## 2. Production Deployment Architecture

```
[ Internet ]
     │
[ Cloudflare CDN / WAF ]
     │
[ Nginx Ingress Controller ]
  ├── talknex.com          ──> Next.js Web Service (Port 3000)
  └── api.talknex.com      ──> NestJS API Service (Port 4000)
```

## 3. Zero-Downtime Rollout Strategy
- Blue/Green or Rolling update strategy with container health checks.
- Pre-deploy migration step: `npm run db:migrate:deploy` before shifting traffic.
- Healthcheck probes verify `/api/v1/health` and `/api/v1/health/ready` before instances accept ingress traffic.

