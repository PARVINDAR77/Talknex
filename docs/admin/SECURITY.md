# TalkNex Super Admin — Security & RBAC Specifications

## 1. Security Architecture
All administrative actions operate on the **Principle of Least Privilege (PoLP)** and zero-trust authentication.

---

## 2. Granular Role-Based Access Control (RBAC)

The platform defines distinct, permission-bounded administrative roles:

| Role Identifier | Title | Scope & Authority |
|---|---|---|
| `SUPER_ADMIN` | Super Admin | Unrestricted global access (`*`), company ownership, billing, key rotation. |
| `PLATFORM_ADMIN` | Platform Administrator | Infrastructure health, AI provider priority, telephony SIP trunks, cache invalidation. |
| `FINANCE_ADMIN` | Finance Administrator | Invoices, refund authorization, ARR/MRR revenue analytics, ledger audits. |
| `TECHNICAL_ADMIN` | Technical Administrator | Carrier concurrency, STT/TTS latency diagnostics, API credentials management. |
| `SUPPORT_ADMIN` | Support Administrator | Customer organization suspension, password resets, inbound leads. |
| `CONTENT_ADMIN` | Content Administrator | Dynamic CMS publishing, blog articles, FAQs, website page metadata. |
| `READONLY_AUDITOR`| Compliance Auditor | Immutable read-only inspection of security audit logs and customer records. |

---

## 3. Granular Permission Keys
The `@RequirePermissions()` decorator enforces fine-grained authorization at the NestJS controller and route level:

- `overview.read`: Access overview dashboard aggregation.
- `organizations.read`: View customer organization listings.
- `organizations.create`: Provision new customer workspaces.
- `organizations.update`: Modify account details and calling wallets.
- `organizations.suspend`: Suspend or reactivate delinquent organizations.
- `organizations.delete`: Archive or remove customer records.
- `users.read`, `users.create`, `users.update`: Platform user operations.
- `providers.read`, `providers.configure`, `providers.test`: AI service provider orchestration.
- `telephony.read`, `telephony.configure`, `telephony.test`: Carrier and SIP trunk diagnostics.
- `pricing.read`, `pricing.update`: Commercial pricing synchronization.
- `billing.read`, `billing.refund`: Revenue metrics and refund issuance.
- `cms.read`, `cms.publish`: Dynamic content and edge cache invalidation.
- `audit.read`: Immutable audit log queries.
- `settings.read`, `settings.update`: Global configuration mutations.

---

## 4. Credential Masking & Safe Diagnostics
1. **Never Return Raw Secrets**: Provider API keys (OpenAI, Sarvam, Azure, Google Cloud) are always masked on retrieval (`sk_live_****9a7f`).
2. **Safe Handshake Diagnostics**: Real ping diagnostics measure sub-500ms network round-trip time without exposing token parameters to the client.
3. **Immutable Audit Trails**: Every state change (status update, refund, priority tweak) records the actor ID, actor IP, timestamp, and entity payload.

