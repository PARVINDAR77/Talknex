# TalkNex Super Admin — REST API Reference

Base URL: `http://localhost:4000/api/v1` (Production: `https://api.talknex.com/api/v1`)  
Authentication: `Authorization: Bearer <token>` or `x-admin-key: <ADMIN_API_KEY>`

---

## 1. Platform Overview
### `GET /admin/overview`
Retrieves platform-wide KPI aggregates, trends, and recent events.
- **Query Parameters**:
  - `timeRange`: `Today` | `Last 7 Days` | `Last 30 Days` (default) | `Last 90 Days`
- **Response**:
  ```json
  {
    "success": true,
    "statusCode": 200,
    "data": {
      "timeRange": "Last 30 Days",
      "metrics": {
        "totalOrganizations": 248,
        "organizationsTrendPercent": 12.4,
        "totalUsers": 3420,
        "usersTrendPercent": 18.1,
        "totalCalls": 124560,
        "callsTrendPercent": 27.6,
        "callMinutes": 386420,
        "callMinutesTrendPercent": 25.8,
        "totalRevenueInr": 1875420,
        "revenueTrendPercent": 31.2
      },
      "callTrend": [...],
      "subscriptionDistribution": [...],
      "platformHealth": {...},
      "recentOrganizations": [...],
      "recentActivities": [...],
      "usageSummary": {...},
      "topAiProviders": [...]
    }
  }
  ```

---

## 2. Organization Management
### `GET /admin/organizations`
Query customer organizations with pagination and status filters.
- **Query Parameters**:
  - `search`: Organization name, email, or domain.
  - `status`: `ALL` | `ACTIVE` | `SUSPENDED` | `PENDING`
  - `industry`: Filter by vertical.
  - `page`: Page number (default: 1).
  - `limit`: Items per page (default: 20).

### `POST /admin/organizations`
Provision a new customer enterprise organization.
- **Body**: `{ "name": "string", "businessEmail": "string", "industry": "string", "planId": "growth", "walletBalanceInr": 10000 }`

### `PATCH /admin/organizations/:id/status`
Suspend or reactivate customer accounts.
- **Body**: `{ "status": "ACTIVE" | "SUSPENDED" }`

---

## 3. Users & RBAC
### `GET /admin/users`
List platform administrators and staff.
### `POST /admin/users`
Invite an administrative staff member with bounded role permissions.
### `POST /admin/users/:id/reset-password`
Dispatch a secure password reset token.

---

## 4. AI Providers Orchestration
### `GET /admin/ai-providers`
List all registered speech synthesis, transcription, and LLM providers.
### `POST /admin/ai-providers/:id/test-connection`
Execute live latency diagnostic and endpoint handshake.

---

## 5. Telephony Infrastructure
### `GET /admin/telephony-providers`
List telecom gateways, SIP trunking endpoints, and concurrency limits.
### `POST /admin/telephony-providers/:id/test-sip`
Execute SIP OPTIONS ping diagnostic.

---

## 6. Commercial Plans & Pricing
### `GET /admin/plans`
List all plans synchronized with public marketing site.
### `PATCH /admin/plans/:id`
Update plan price, included minutes, or voice agent limits.

---

## 7. Billing & Revenue Ledger
### `GET /admin/billing/transactions`
List financial transactions with invoice status and payment methods.
### `GET /admin/billing/metrics`
Retrieve MRR, ARR, and gross margin totals.
### `POST /admin/billing/transactions/:id/refund`
Authorize customer refund.

---

## 8. Content Management (CMS)
### `GET /admin/cms/blog`, `POST /admin/cms/blog`
Manage published and draft articles.
### `GET /admin/cms/faqs`, `POST /admin/cms/faqs`
Manage FAQ questions and categories.
### `POST /admin/cms/revalidate`
Purge all edge caches and trigger immediate website revalidation.

---

## 9. System Health & Audit
### `GET /admin/health`
Cluster CPU, memory, database connection pool, and queue telemetry.
### `GET /admin/audit-logs`
Searchable immutable security audit log.

