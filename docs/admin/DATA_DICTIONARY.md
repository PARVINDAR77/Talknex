# TalkNex Super Admin — Data Dictionary

## Extended Database Schema Reference

### 1. `Organization`
Represents an enterprise customer entity.
- `id` (String, UUID, Primary Key): Unique identifier.
- `name` (String): Legal entity / business name.
- `slug` (String, Unique): URL-safe identifier.
- `businessEmail` (String): Primary corporate contact email.
- `phone` (String, Optional): Registered telephone number.
- `industry` (String): Commercial vertical (e.g., Real Estate, Healthcare).
- `status` (Enum: `ACTIVE`, `SUSPENDED`, `PENDING`): Account operational status.
- `planId` (String): Foreign key to current `PricingPlan`.
- `walletBalanceInr` (Float): Real-time prepaid calling wallet balance in INR.
- `createdAt` / `updatedAt` (DateTime): Timestamps.

---

### 2. `AiProvider`
Represents an external AI speech or language engine adapter.
- `id` (String, UUID, Primary Key): Unique identifier.
- `name` (String): Commercial name (e.g., Sarvam AI, OpenAI).
- `category` (Enum: `STT`, `TTS`, `LLM`): Functional service classification.
- `adapterId` (String, Unique): Code identifier used by runtime orchestrator.
- `endpointUrl` (String, Optional): Gateway URL.
- `apiKeyMasked` (String): Sanitized key representation (`sk_****9a7f`).
- `supportedModels` (JSON Array): Available models.
- `status` (Enum: `HEALTHY`, `DEGRADED`, `DOWN`, `TESTING`): Live health state.
- `priority` (Integer): Failover tier (1 = primary, 2 = secondary, etc.).
- `latencyMs` (Integer): Measured round-trip latency in milliseconds.
- `errorRatePercent` (Float): Diagnostic error rate.
- `usageSharePercent` (Float): Platform traffic allocation percentage.

---

### 3. `TelephonyProvider`
Represents a carrier or telecom gateway.
- `id` (String, UUID, Primary Key): Unique identifier.
- `name` (String): Carrier name (e.g., Exotel, Tata Tele).
- `providerType` (Enum: `EXOTEL`, `TATATELE`, `AIRTEL`, `TWILIO`, `SIP_CUSTOM`).
- `sipTrunkEndpoint` (String, Optional): Carrier SIP IP / FQDN.
- `phoneNumbers` (JSON Array): Inbound and outbound caller IDs allocated.
- `concurrencyLimit` (Integer): Maximum simultaneous calls allowed.
- `activeChannels` (Integer): Real-time channel utilization.

---

### 4. `Transaction`
Immutable financial record of platform billing.
- `id` (String, UUID, Primary Key): Unique transaction ID.
- `organizationId` (String, Foreign Key): Target customer organization.
- `referenceId` (String, Unique): Invoice reference (`INV-2026-11-8842`).
- `amountInr` (Float): Value in Indian Rupees.
- `type` (Enum: `SUBSCRIPTION`, `WALLET_TOPUP`, `USAGE_CHARGE`, `REFUND`).
- `status` (Enum: `PENDING`, `SUCCESS`, `FAILED`, `REFUNDED`).
- `paymentMethod` (String): Gateway / instrument used.
- `invoiceUrl` (String, Optional): PDF invoice path.

