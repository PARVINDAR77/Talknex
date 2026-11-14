export enum ContentStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

export enum MenuLocation {
  HEADER = 'HEADER',
  FOOTER_PRODUCT = 'FOOTER_PRODUCT',
  FOOTER_USE_CASES = 'FOOTER_USE_CASES',
  FOOTER_RESOURCES = 'FOOTER_RESOURCES',
  FOOTER_COMPANY = 'FOOTER_COMPANY'
}

export enum PlanSlug {
  STARTER = 'starter',
  GROWTH = 'growth',
  BUSINESS = 'business',
  ENTERPRISE = 'enterprise'
}

export enum IntegrationStatus {
  AVAILABLE = 'AVAILABLE',
  BETA = 'BETA',
  PLANNED = 'PLANNED'
}

export enum IntegrationCategory {
  CRM = 'CRM',
  CALENDAR = 'CALENDAR',
  ADS = 'ADS',
  ECOMMERCE = 'ECOMMERCE',
  MESSAGING = 'MESSAGING',
  WEBHOOKS = 'WEBHOOKS'
}

export enum LeadStatus {
  NEW = 'NEW',
  IN_REVIEW = 'IN_REVIEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  CLOSED = 'CLOSED'
}

export enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  RESCHEDULED = 'RESCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER'
}

export enum OrganizationStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING = 'PENDING'
}

export enum OrgMemberRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  BILLING = 'BILLING'
}

export enum ProviderCategory {
  STT = 'STT',
  TTS = 'TTS',
  LLM = 'LLM'
}

export enum ProviderHealthStatus {
  HEALTHY = 'HEALTHY',
  DEGRADED = 'DEGRADED',
  DOWN = 'DOWN',
  TESTING = 'TESTING'
}

export enum TelephonyProviderType {
  EXOTEL = 'EXOTEL',
  TATATELE = 'TATATELE',
  AIRTEL = 'AIRTEL',
  TWILIO = 'TWILIO',
  SIP_CUSTOM = 'SIP_CUSTOM'
}

export enum SubscriptionStatus {
  TRIAL = 'TRIAL',
  ACTIVE = 'ACTIVE',
  PAST_DUE = 'PAST_DUE',
  SUSPENDED = 'SUSPENDED',
  CANCELLED = 'CANCELLED'
}

export enum BillingCycle {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

export enum TransactionType {
  SUBSCRIPTION = 'SUBSCRIPTION',
  WALLET_TOPUP = 'WALLET_TOPUP',
  USAGE_CHARGE = 'USAGE_CHARGE',
  REFUND = 'REFUND'
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export enum CallStatus {
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  BUSY = 'BUSY',
  NO_ANSWER = 'NO_ANSWER',
  IN_PROGRESS = 'IN_PROGRESS'
}

export enum AdminRoleType {
  SUPER_ADMIN = 'SUPER_ADMIN',
  PLATFORM_ADMIN = 'PLATFORM_ADMIN',
  FINANCE_ADMIN = 'FINANCE_ADMIN',
  TECHNICAL_ADMIN = 'TECHNICAL_ADMIN',
  SUPPORT_ADMIN = 'SUPPORT_ADMIN',
  CONTENT_ADMIN = 'CONTENT_ADMIN',
  COMPLIANCE_ADMIN = 'COMPLIANCE_ADMIN',
  READONLY_AUDITOR = 'READONLY_AUDITOR'
}

