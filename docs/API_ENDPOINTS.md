# API_ENDPOINTS.md — Complete TalkNex API Inventory

## 1. Content & Navigation APIs

| Method | Endpoint | Description | Cache TTL |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/pages/:slug` | Retrieve page structure, SEO meta and active sections | 3600s |
| `GET` | `/api/v1/navigation` | Retrieve header and footer menu hierarchies | 3600s |
| `GET` | `/api/v1/website-settings` | Retrieve brand information, contacts, and social links | 3600s |

## 2. Pricing APIs

| Method | Endpoint | Description | Cache TTL |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/pricing/plans` | Retrieve all active pricing plans with feature sets | 3600s |
| `GET` | `/api/v1/pricing/plans/:slug` | Retrieve single plan details | 3600s |
| `GET` | `/api/v1/pricing/compare` | Retrieve matrix comparison of all plans and features | 3600s |

## 3. Blog & Resources APIs

| Method | Endpoint | Description | Cache TTL |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/blog` | List published blog posts with pagination & category filter | 600s |
| `GET` | `/api/v1/blog/:slug` | Get full blog post article with author details | 600s |
| `GET` | `/api/v1/blog/categories`| List all blog categories with article counts | 3600s |
| `GET` | `/api/v1/blog/related/:slug` | Get 3 related articles based on category | 600s |

## 4. Use Cases & Integrations APIs

| Method | Endpoint | Description | Cache TTL |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/use-cases` | List all industry use cases | 3600s |
| `GET` | `/api/v1/use-cases/:slug` | Get detailed use case with sample conversations | 3600s |
| `GET` | `/api/v1/integrations` | List all supported and planned software integrations | 3600s |
| `GET` | `/api/v1/integrations/:slug`| Get integration specs and connection workflows | 3600s |

## 5. FAQs APIs

| Method | Endpoint | Description | Cache TTL |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/faqs` | List all FAQs, with optional category filter | 3600s |

## 6. Lead Capture & Engagement APIs

| Method | Endpoint | Description | Rate Limit |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/contact` | Submit general business contact enquiry | 5 / 10 min |
| `POST` | `/api/v1/demo-bookings` | Submit interactive demo booking request | 5 / 10 min |
| `GET` | `/api/v1/demo-bookings/availability` | Check available slots for demo scheduling | 60 / min |
| `POST` | `/api/v1/newsletter/subscribe` | Register newsletter email | 5 / 10 min |
| `POST` | `/api/v1/newsletter/unsubscribe` | Opt-out newsletter subscription | 10 / min |

## 7. Global Search & System Health

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/search?q={query}` | Global search across blog, use cases, FAQs and integrations |
| `GET` | `/api/v1/health` | Liveness probe (checks application instance) |
| `GET` | `/api/v1/health/ready` | Readiness probe (checks DB and Redis connections) |

