# TalkNex Super Admin — Integration Guide

## 1. Integration with Existing Platform Services
The Super Admin application integrates directly with all existing TalkNex platform components without duplicating database tables, business models, or code paths.

### A. Marketing Website (`talknex.com`)
- **Shared Pricing Model**: Commercial changes executed in `/admin/plans` immediately reflect on `talknex.com/pricing` via automatic Redis cache invalidation (`cache.invalidatePattern('pricing:*')`).
- **Dynamic Content & Blog**: Blog articles drafted and published in `/admin/cms` appear on `talknex.com/blog`.
- **Inbound Lead Synchronization**: Demo bookings and contact inquiries submitted via the marketing site are captured in `LocalStoreService` and PostgreSQL, triggering administrative notification alerts.

### B. Core Backend API (`api.talknex.com`)
- Administrative endpoints reside strictly under the `/api/v1/admin/` namespace.
- Secured by `AdminAuthGuard` and `PermissionsGuard` with role-based metadata.
- All responses conform to standard ApiResponse envelopes:
  ```json
  {
    "success": true,
    "statusCode": 200,
    "data": { ... },
    "meta": { "requestId": "req_...", "timestamp": "2026-11-13T..." }
  }
  ```

### C. Future Customer Application (`app.talknex.com`)
- Tenant organizations provisioned in `/admin/organizations` carry an isolated `organizationId`.
- Organization calling wallets and concurrency quotas defined by the Super Admin govern outbound campaign throttling in the customer application.

