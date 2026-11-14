# SCALABILITY.md — Concurrency & Horizontal Scaling Architecture

## 1. Concurrency Target: 1,000 Simultaneous Visitors

To comfortably sustain 1,000 active concurrent visitors without degradation:
1. **Stateless Frontend Instances**: Multiple Next.js instances load-balanced via Nginx or Cloudflare. Static assets served directly from Edge CDN caches.
2. **Stateless Backend Instances**: NestJS application runs in multiple replicas behind an application load balancer with sticky sessions disabled.
3. **Redis Cluster / Sentinel**: Caching common read endpoints removes 90%+ of queries from hitting PostgreSQL.
4. **PostgreSQL Read Replicas**: Capable of scaling out read queries should dynamic traffic surge.
5. **Decoupled Queue Workers**: BullMQ worker instances scale independently from web/api servers, preventing lead intake spikes from degrading web responsiveness.

## 2. Infrastructure Dimensioning

| Tier | Minimal Specs (1,000 concurrents) | Scale-Out Pattern |
| :--- | :--- | :--- |
| **Next.js Web** | 2 x 2 vCPU, 4GB RAM | Horizontal Pod / Container Autoscaling |
| **NestJS API** | 2 x 2 vCPU, 4GB RAM | Horizontal Scaling based on CPU > 70% |
| **Redis** | 1 Primary + 1 Replica (2GB RAM) | Vertical or Redis Cluster |
| **PostgreSQL** | 4 vCPU, 8GB RAM, SSD NVMe | Connection Pooling via PgBouncer |
| **BullMQ Worker** | 1 x 1 vCPU, 2GB RAM | Horizontal scaling based on queue depth |

