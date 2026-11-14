import { ContentStatus, MenuLocation, PlanSlug, IntegrationStatus, IntegrationCategory, LeadStatus, BookingStatus } from './enums';
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
