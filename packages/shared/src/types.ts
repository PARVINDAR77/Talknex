import {
  ContentStatus,
  MenuLocation,
  PlanSlug,
  IntegrationStatus,
  IntegrationCategory,
  LeadStatus,
  BookingStatus,
  OrganizationStatus,
  OrgMemberRole,
  ProviderCategory,
  ProviderHealthStatus,
  TelephonyProviderType,
  SubscriptionStatus,
  BillingCycle,
  TransactionType,
  TransactionStatus,
  CallStatus,
  AdminRoleType,
  UserRole
} from './enums';

export interface WebsitePageModel {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  status: ContentStatus;
  publishedAt?: Date | string | null;
  sections?: PageSectionModel[];
}

export interface PageSectionModel {
  id: string;
  pageId: string;
  sectionKey: string;
  heading: string;
  subheading?: string | null;
  content: Record<string, any>;
  orderIndex: number;
  isActive: boolean;
}

export interface NavigationItemModel {
  id: string;
  label: string;
  href: string;
  parentId?: string | null;
  orderIndex: number;
  menuLocation: MenuLocation;
  isActive: boolean;
  children?: NavigationItemModel[];
}

export interface PricingPlanModel {
  id: string;
  slug: PlanSlug | string;
  name: string;
  tagline: string;
  monthlyPriceInr: number;
  yearlyPriceInr: number;
  callMinutesIncluded: number;
  voiceAgentsLimit: number;
  isPopular: boolean;
  ctaText: string;
  ctaHref: string;
  displayOrder: number;
  isActive: boolean;
  features?: PlanFeatureAssignmentModel[];
}

export interface PricingFeatureModel {
  id: string;
  category: string;
  name: string;
  description?: string | null;
  orderIndex: number;
}

export interface PlanFeatureAssignmentModel {
  id: string;
  planId: string;
  featureId: string;
  isIncluded: boolean;
  valueText?: string | null;
  feature?: PricingFeatureModel;
}

export interface BlogCategoryModel {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  postCount?: number;
}

export interface AuthorModel {
  id: string;
  name: string;
  slug: string;
  title: string;
  bio?: string | null;
  avatarUrl?: string | null;
}

export interface BlogPostModel {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string | null;
  readingTimeMinutes: number;
  authorId: string;
  categoryId: string;
  status: ContentStatus;
  publishedAt: Date | string;
  author?: AuthorModel;
  category?: BlogCategoryModel;
}

export interface SampleDialogueTurn {
  speaker: 'Customer' | 'AI Agent';
  time: string;
  text: string;
  language: string;
}

export interface UseCaseModel {
  id: string;
  slug: string;
  title: string;
  industry: string;
  summary: string;
  problemStatement: string;
  solutionOverview: string;
  sampleDialogue: SampleDialogueTurn[];
  benefits: string[];
  orderIndex: number;
  isActive: boolean;
}

export interface IntegrationModel {
  id: string;
  slug: string;
  name: string;
  category: IntegrationCategory | string;
  description: string;
  status: IntegrationStatus;
  logoUrl?: string | null;
  capabilities: string[];
  connectionGuide: string;
  orderIndex: number;
}

export interface FaqModel {
  id: string;
  question: string;
  answer: string;
  category: string;
  orderIndex: number;
  isFeatured: boolean;
}

export interface ContactEnquiryModel {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  message: string;
  sourcePage?: string | null;
  utmParams?: Record<string, string> | null;
  status: LeadStatus;
  ipAddress?: string | null;
  createdAt: Date | string;
}

export interface DemoBookingModel {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  preferredDate: string;
  preferredTime: string;
  timeZone: string;
  requirements?: string | null;
  status: BookingStatus;
  createdAt: Date | string;
}

export interface NewsletterSubscriberModel {
  id: string;
  email: string;
  isActive: boolean;
  subscribedAt: Date | string;
  unsubscribedAt?: Date | string | null;
}

export interface WebsiteSettingModel {
  id: string;
  brandName: string;
  companyName: string;
  tagline: string;
  supportEmail: string;
  salesEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: Record<string, string>;
}

// ==========================================
// TALKNEX SUPER ADMIN PLATFORM MODELS
// ==========================================

export interface UserModel {
  id: string;
  email: string;
  name: string;
  role: UserRole | string;
  adminRole?: AdminRoleType | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  status?: 'ACTIVE' | 'INACTIVE' | 'LOCKED';
  lastLoginAt?: Date | string | null;
}

export interface OrganizationModel {
  id: string;
  name: string;
  slug: string;
  businessEmail: string;
  phone?: string | null;
  industry: string;
  status: OrganizationStatus;
  planId?: string | null;
  planName?: string;
  walletBalanceInr: number;
  usersCount?: number;
  calls30d?: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  members?: OrganizationMemberModel[];
}

export interface OrganizationMemberModel {
  id: string;
  organizationId: string;
  userId: string;
  role: OrgMemberRole;
  user?: UserModel;
  createdAt: Date | string;
}

export interface AiProviderModel {
  id: string;
  name: string;
  category: ProviderCategory;
  adapterId: string;
  endpointUrl?: string | null;
  apiKeyMasked: string;
  supportedModels: string[];
  supportedLanguages: string[];
  status: ProviderHealthStatus;
  priority: number;
  latencyMs: number;
  errorRatePercent: number;
  usageSharePercent: number;
  estimatedCostPerUnit: number;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface TelephonyProviderModel {
  id: string;
  name: string;
  providerType: TelephonyProviderType;
  sipTrunkEndpoint?: string | null;
  phoneNumbers: string[];
  concurrencyLimit: number;
  activeChannels: number;
  status: ProviderHealthStatus;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface SubscriptionModel {
  id: string;
  organizationId: string;
  organizationName?: string;
  planId: string;
  planName?: string;
  status: SubscriptionStatus;
  billingCycle: BillingCycle;
  currentPeriodStart: Date | string;
  currentPeriodEnd: Date | string;
  autoRenew: boolean;
  amountInr?: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface TransactionModel {
  id: string;
  organizationId: string;
  organizationName?: string;
  referenceId: string;
  amountInr: number;
  type: TransactionType;
  status: TransactionStatus;
  paymentMethod: string;
  description?: string | null;
  invoiceUrl?: string | null;
  createdAt: Date | string;
}

export interface AuditLogModel {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  actorId?: string | null;
  actorName?: string | null;
  actorEmail?: string | null;
  payload?: any;
  createdAt: Date | string;
}

export interface PlatformHealthMetric {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  description: string;
  uptimePercent: number;
  latencyMs?: number;
}

export interface OverviewDashboardData {
  timeRange: string;
  metrics: {
    totalOrganizations: number;
    organizationsTrendPercent: number;
    totalUsers: number;
    usersTrendPercent: number;
    totalCalls: number;
    callsTrendPercent: number;
    callMinutes: number;
    callMinutesTrendPercent: number;
    totalRevenueInr: number;
    revenueTrendPercent: number;
  };
  callTrend: Array<{
    date: string;
    totalCalls: number;
    callMinutes: number;
  }>;
  subscriptionDistribution: Array<{
    planName: string;
    percentage: number;
    count: number;
    color: string;
  }>;
  platformHealth: {
    uptime: string;
    services: PlatformHealthMetric[];
  };
  recentOrganizations: Array<{
    id: string;
    name: string;
    plan: string;
    planColor: string;
    users: number;
    calls30d: number;
    status: string;
    statusColor: string;
  }>;
  recentActivities: Array<{
    id: string;
    title: string;
    description: string;
    timeAgo: string;
    type: 'org' | 'plan' | 'payment' | 'provider' | 'lead';
    iconColor: string;
  }>;
  usageSummary: {
    sttMinutes: number;
    sttTrendPercent: number;
    ttsMinutes: number;
    ttsTrendPercent: number;
    llmTokens: string;
    llmTrendPercent: number;
    storageTb: string;
    storageTrendPercent: number;
  };
  topAiProviders: Array<{
    name: string;
    category: string;
    percentage: number;
    color: string;
  }>;
}


