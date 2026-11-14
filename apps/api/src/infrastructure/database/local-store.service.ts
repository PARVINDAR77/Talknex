import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import {
  WebsitePageModel,
  NavigationItemModel,
  PricingPlanModel,
  BlogPostModel,
  BlogCategoryModel,
  UseCaseModel,
  IntegrationModel,
  FaqModel,
  ContactEnquiryModel,
  DemoBookingModel,
  WebsiteSettingModel,
  OrganizationModel,
  AiProviderModel,
  TelephonyProviderModel,
  SubscriptionModel,
  TransactionModel,
  UserModel,
  AuditLogModel,
  MenuLocation,
  IntegrationCategory,
  IntegrationStatus,
  ContentStatus,
  OrganizationStatus,
  OrgMemberRole,
  ProviderCategory,
  ProviderHealthStatus,
  TelephonyProviderType,
  SubscriptionStatus,
  BillingCycle,
  TransactionType,
  TransactionStatus,
  AdminRoleType,
  UserRole
} from '@talknex/shared';

@Injectable()
export class LocalStoreService implements OnModuleInit {
  private readonly logger = new Logger(LocalStoreService.name);
  private dataDir: string;
  private leadsFile: string;
  private bookingsFile: string;
  private subscribersFile: string;
  private organizationsFile: string;
  private aiProvidersFile: string;
  private telephonyFile: string;
  private subscriptionsFile: string;
  private transactionsFile: string;
  private adminUsersFile: string;
  private auditLogsFile: string;

  public pages: WebsitePageModel[] = [];
  public navigation: NavigationItemModel[] = [];
  public plans: PricingPlanModel[] = [];
  public features: any[] = [];
  public useCases: UseCaseModel[] = [];
  public integrations: IntegrationModel[] = [];
  public faqs: FaqModel[] = [];
  public blogPosts: BlogPostModel[] = [];
  public blogCategories: BlogCategoryModel[] = [];
  public websiteSettings: WebsiteSettingModel;
  public contactEnquiries: ContactEnquiryModel[] = [];
  public demoBookings: DemoBookingModel[] = [];
  public newsletterSubscribers: any[] = [];
  public organizations: OrganizationModel[] = [];
  public aiProviders: AiProviderModel[] = [];
  public telephonyProviders: TelephonyProviderModel[] = [];
  public subscriptions: SubscriptionModel[] = [];
  public transactions: TransactionModel[] = [];
  public adminUsers: UserModel[] = [];
  public auditLogs: AuditLogModel[] = [];

  constructor() {
    this.setupStorage();
    this.initSeedData();
    this.loadPersistedRecords();
  }

  onModuleInit() {
    // Re-verify storage
    this.setupStorage();
  }

  private setupStorage() {
    this.dataDir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(this.dataDir)) {
      try {
        fs.mkdirSync(this.dataDir, { recursive: true });
      } catch {
        // Ignore
      }
    }
    this.leadsFile = path.join(this.dataDir, 'contact_enquiries.json');
    this.bookingsFile = path.join(this.dataDir, 'demo_bookings.json');
    this.subscribersFile = path.join(this.dataDir, 'newsletter_subscribers.json');
    this.organizationsFile = path.join(this.dataDir, 'organizations.json');
    this.aiProvidersFile = path.join(this.dataDir, 'ai_providers.json');
    this.telephonyFile = path.join(this.dataDir, 'telephony_providers.json');
    this.subscriptionsFile = path.join(this.dataDir, 'subscriptions.json');
    this.transactionsFile = path.join(this.dataDir, 'transactions.json');
    this.adminUsersFile = path.join(this.dataDir, 'admin_users.json');
    this.auditLogsFile = path.join(this.dataDir, 'audit_logs.json');
  }

  private loadPersistedRecords() {
    try {
      if (this.leadsFile && fs.existsSync(this.leadsFile)) {
        this.contactEnquiries = JSON.parse(fs.readFileSync(this.leadsFile, 'utf-8'));
      }
      if (this.bookingsFile && fs.existsSync(this.bookingsFile)) {
        this.demoBookings = JSON.parse(fs.readFileSync(this.bookingsFile, 'utf-8'));
      }
      if (this.subscribersFile && fs.existsSync(this.subscribersFile)) {
        this.newsletterSubscribers = JSON.parse(fs.readFileSync(this.subscribersFile, 'utf-8'));
      }
      if (this.organizationsFile && fs.existsSync(this.organizationsFile)) {
        this.organizations = JSON.parse(fs.readFileSync(this.organizationsFile, 'utf-8'));
      }
      if (this.aiProvidersFile && fs.existsSync(this.aiProvidersFile)) {
        this.aiProviders = JSON.parse(fs.readFileSync(this.aiProvidersFile, 'utf-8'));
      }
      if (this.telephonyFile && fs.existsSync(this.telephonyFile)) {
        this.telephonyProviders = JSON.parse(fs.readFileSync(this.telephonyFile, 'utf-8'));
      }
      if (this.subscriptionsFile && fs.existsSync(this.subscriptionsFile)) {
        this.subscriptions = JSON.parse(fs.readFileSync(this.subscriptionsFile, 'utf-8'));
      }
      if (this.transactionsFile && fs.existsSync(this.transactionsFile)) {
        this.transactions = JSON.parse(fs.readFileSync(this.transactionsFile, 'utf-8'));
      }
      if (this.adminUsersFile && fs.existsSync(this.adminUsersFile)) {
        this.adminUsers = JSON.parse(fs.readFileSync(this.adminUsersFile, 'utf-8'));
      }
      if (this.auditLogsFile && fs.existsSync(this.auditLogsFile)) {
        this.auditLogs = JSON.parse(fs.readFileSync(this.auditLogsFile, 'utf-8'));
      }
    } catch (e) {
      this.logger.warn('Error reading persisted local records:', e);
    }
  }

  public saveContactEnquiry(enquiry: ContactEnquiryModel) {
    this.contactEnquiries.push(enquiry);
    try {
      if (this.leadsFile) {
        fs.writeFileSync(this.leadsFile, JSON.stringify(this.contactEnquiries, null, 2));
      }
    } catch (e) {
      this.logger.error('Failed to write contact enquiry to disk', e);
    }
    return enquiry;
  }

  public saveDemoBooking(booking: DemoBookingModel) {
    this.demoBookings.push(booking);
    try {
      if (this.bookingsFile) {
        fs.writeFileSync(this.bookingsFile, JSON.stringify(this.demoBookings, null, 2));
      }
    } catch (e) {
      this.logger.error('Failed to write demo booking to disk', e);
    }
    return booking;
  }

  public saveNewsletterSubscriber(email: string) {
    const existing = this.newsletterSubscribers.find((s) => s.email === email);
    if (!existing) {
      const subscriber = { id: `sub_${Date.now()}`, email, isActive: true, subscribedAt: new Date().toISOString() };
      this.newsletterSubscribers.push(subscriber);
      try {
        if (this.subscribersFile) {
          fs.writeFileSync(this.subscribersFile, JSON.stringify(this.newsletterSubscribers, null, 2));
        }
      } catch (e) {
        this.logger.error('Failed to write newsletter subscriber to disk', e);
      }
      return subscriber;
    }
    return existing;
  }

  // Admin Entities Persistence Methods
  public saveOrganization(org: OrganizationModel): OrganizationModel {
    const existingIdx = this.organizations.findIndex((o) => o.id === org.id);
    if (existingIdx >= 0) {
      this.organizations[existingIdx] = { ...this.organizations[existingIdx], ...org, updatedAt: new Date().toISOString() };
    } else {
      this.organizations.unshift(org);
    }
    this.persistFile(this.organizationsFile, this.organizations);
    return org;
  }

  public updateOrganization(id: string, updates: Partial<OrganizationModel>): OrganizationModel | null {
    const idx = this.organizations.findIndex((o) => o.id === id);
    if (idx === -1) return null;
    this.organizations[idx] = { ...this.organizations[idx], ...updates, updatedAt: new Date().toISOString() };
    this.persistFile(this.organizationsFile, this.organizations);
    return this.organizations[idx];
  }

  public deleteOrganization(id: string): boolean {
    const initLen = this.organizations.length;
    this.organizations = this.organizations.filter((o) => o.id !== id);
    if (this.organizations.length !== initLen) {
      this.persistFile(this.organizationsFile, this.organizations);
      return true;
    }
    return false;
  }

  public saveAiProvider(provider: AiProviderModel): AiProviderModel {
    const idx = this.aiProviders.findIndex((p) => p.id === provider.id);
    if (idx >= 0) {
      this.aiProviders[idx] = { ...this.aiProviders[idx], ...provider, updatedAt: new Date().toISOString() };
    } else {
      this.aiProviders.push(provider);
    }
    this.persistFile(this.aiProvidersFile, this.aiProviders);
    return provider;
  }

  public updateAiProvider(id: string, updates: Partial<AiProviderModel>): AiProviderModel | null {
    const idx = this.aiProviders.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.aiProviders[idx] = { ...this.aiProviders[idx], ...updates, updatedAt: new Date().toISOString() };
    this.persistFile(this.aiProvidersFile, this.aiProviders);
    return this.aiProviders[idx];
  }

  public saveTelephonyProvider(provider: TelephonyProviderModel): TelephonyProviderModel {
    const idx = this.telephonyProviders.findIndex((p) => p.id === provider.id);
    if (idx >= 0) {
      this.telephonyProviders[idx] = { ...this.telephonyProviders[idx], ...provider, updatedAt: new Date().toISOString() };
    } else {
      this.telephonyProviders.push(provider);
    }
    this.persistFile(this.telephonyFile, this.telephonyProviders);
    return provider;
  }

  public updateTelephonyProvider(id: string, updates: Partial<TelephonyProviderModel>): TelephonyProviderModel | null {
    const idx = this.telephonyProviders.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.telephonyProviders[idx] = { ...this.telephonyProviders[idx], ...updates, updatedAt: new Date().toISOString() };
    this.persistFile(this.telephonyFile, this.telephonyProviders);
    return this.telephonyProviders[idx];
  }

  public saveSubscription(sub: SubscriptionModel): SubscriptionModel {
    const idx = this.subscriptions.findIndex((s) => s.id === sub.id);
    if (idx >= 0) {
      this.subscriptions[idx] = { ...this.subscriptions[idx], ...sub, updatedAt: new Date().toISOString() };
    } else {
      this.subscriptions.unshift(sub);
    }
    this.persistFile(this.subscriptionsFile, this.subscriptions);
    return sub;
  }

  public updateSubscription(id: string, updates: Partial<SubscriptionModel>): SubscriptionModel | null {
    const idx = this.subscriptions.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    this.subscriptions[idx] = { ...this.subscriptions[idx], ...updates, updatedAt: new Date().toISOString() };
    this.persistFile(this.subscriptionsFile, this.subscriptions);
    return this.subscriptions[idx];
  }

  public saveTransaction(tx: TransactionModel): TransactionModel {
    this.transactions.unshift(tx);
    this.persistFile(this.transactionsFile, this.transactions);
    return tx;
  }

  public saveAdminUser(user: UserModel): UserModel {
    const idx = this.adminUsers.findIndex((u) => u.id === user.id);
    if (idx >= 0) {
      this.adminUsers[idx] = { ...this.adminUsers[idx], ...user, updatedAt: new Date().toISOString() };
    } else {
      this.adminUsers.push(user);
    }
    this.persistFile(this.adminUsersFile, this.adminUsers);
    return user;
  }

  public updateAdminUser(id: string, updates: Partial<UserModel>): UserModel | null {
    const idx = this.adminUsers.findIndex((u) => u.id === id);
    if (idx === -1) return null;
    this.adminUsers[idx] = { ...this.adminUsers[idx], ...updates, updatedAt: new Date().toISOString() };
    this.persistFile(this.adminUsersFile, this.adminUsers);
    return this.adminUsers[idx];
  }

  public logAudit(action: string, entityType: string, entityId: string, payload?: any, actor?: { id?: string; name?: string; email?: string }): AuditLogModel {
    const log: AuditLogModel = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      action,
      entityType,
      entityId,
      actorId: actor?.id || 'admin_super',
      actorName: actor?.name || 'Admin',
      actorEmail: actor?.email || 'admin@talknex.com',
      payload: payload || null,
      createdAt: new Date().toISOString()
    };
    this.auditLogs.unshift(log);
    if (this.auditLogs.length > 500) this.auditLogs.pop();
    this.persistFile(this.auditLogsFile, this.auditLogs);
    return log;
  }

  private persistFile(filePath: string, data: any) {
    try {
      if (filePath) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      }
    } catch (e) {
      this.logger.error(`Failed to persist data to ${filePath}`, e);
    }
  }

  public initSeedData() {
    this.websiteSettings = {
      id: 'default-settings',
      brandName: 'TalkNex',
      companyName: 'Emperor Smart Solutions',
      tagline: 'Turn Conversations into Business Growth with AI Voice Agents.',
      supportEmail: 'support@talknex.com',
      salesEmail: 'sales@talknex.com',
      contactPhone: '+91 98765 43210',
      address: 'Emperor Smart Solutions, High-Tech Business District, India',
      socialLinks: {
        twitter: 'https://twitter.com/talknex',
        linkedin: 'https://linkedin.com/company/talknex',
        youtube: 'https://youtube.com/@talknex',
        instagram: 'https://instagram.com/talknex'
      }
    };

    this.navigation = [
      { id: '1', label: 'Product', href: '/product', menuLocation: MenuLocation.HEADER, orderIndex: 1, isActive: true },
      { id: '2', label: 'Use Cases', href: '/use-cases', menuLocation: MenuLocation.HEADER, orderIndex: 2, isActive: true },
      { id: '3', label: 'Pricing', href: '/pricing', menuLocation: MenuLocation.HEADER, orderIndex: 3, isActive: true },
      { id: '4', label: 'Resources', href: '/resources', menuLocation: MenuLocation.HEADER, orderIndex: 4, isActive: true },
      { id: '5', label: 'Company', href: '/about', menuLocation: MenuLocation.HEADER, orderIndex: 5, isActive: true },

      { id: '6', label: 'AI Voice Agents', href: '/product/ai-voice-agents', menuLocation: MenuLocation.FOOTER_PRODUCT, orderIndex: 1, isActive: true },
      { id: '7', label: 'Outbound Calling', href: '/product/outbound-calling', menuLocation: MenuLocation.FOOTER_PRODUCT, orderIndex: 2, isActive: true },
      { id: '8', label: 'Inbound Calling', href: '/product/inbound-calling', menuLocation: MenuLocation.FOOTER_PRODUCT, orderIndex: 3, isActive: true },
      { id: '9', label: 'Lead Qualification', href: '/product/lead-qualification', menuLocation: MenuLocation.FOOTER_PRODUCT, orderIndex: 4, isActive: true },
      { id: '10', label: 'Appointment Booking', href: '/product/appointment-booking', menuLocation: MenuLocation.FOOTER_PRODUCT, orderIndex: 5, isActive: true },
      { id: '11', label: 'Analytics & Reports', href: '/product/analytics', menuLocation: MenuLocation.FOOTER_PRODUCT, orderIndex: 6, isActive: true },
      { id: '12', label: 'Integrations', href: '/product/integrations', menuLocation: MenuLocation.FOOTER_PRODUCT, orderIndex: 7, isActive: true },

      { id: '13', label: 'Real Estate', href: '/use-cases/real-estate', menuLocation: MenuLocation.FOOTER_USE_CASES, orderIndex: 1, isActive: true },
      { id: '14', label: 'Healthcare', href: '/use-cases/healthcare', menuLocation: MenuLocation.FOOTER_USE_CASES, orderIndex: 2, isActive: true },
      { id: '15', label: 'Education', href: '/use-cases/education', menuLocation: MenuLocation.FOOTER_USE_CASES, orderIndex: 3, isActive: true },
      { id: '16', label: 'E-commerce', href: '/use-cases/ecommerce', menuLocation: MenuLocation.FOOTER_USE_CASES, orderIndex: 4, isActive: true },
      { id: '17', label: 'Manufacturing', href: '/use-cases/manufacturing', menuLocation: MenuLocation.FOOTER_USE_CASES, orderIndex: 5, isActive: true },
      { id: '18', label: 'Automotive', href: '/use-cases/automotive', menuLocation: MenuLocation.FOOTER_USE_CASES, orderIndex: 6, isActive: true },

      { id: '19', label: 'Blog & Articles', href: '/blog', menuLocation: MenuLocation.FOOTER_RESOURCES, orderIndex: 1, isActive: true },
      { id: '20', label: 'How It Works', href: '/how-it-works', menuLocation: MenuLocation.FOOTER_RESOURCES, orderIndex: 2, isActive: true },
      { id: '21', label: 'Guides & Manuals', href: '/guides', menuLocation: MenuLocation.FOOTER_RESOURCES, orderIndex: 3, isActive: true },
      { id: '22', label: 'Compare Plans', href: '/pricing/compare', menuLocation: MenuLocation.FOOTER_RESOURCES, orderIndex: 4, isActive: true },
      { id: '23', label: 'Frequently Asked Questions', href: '/#faq', menuLocation: MenuLocation.FOOTER_RESOURCES, orderIndex: 5, isActive: true },

      { id: '24', label: 'About Emperor Smart Solutions', href: '/about', menuLocation: MenuLocation.FOOTER_COMPANY, orderIndex: 1, isActive: true },
      { id: '25', label: 'Contact Us', href: '/contact', menuLocation: MenuLocation.FOOTER_COMPANY, orderIndex: 2, isActive: true },
      { id: '26', label: 'Book a Demonstration', href: '/book-demo', menuLocation: MenuLocation.FOOTER_COMPANY, orderIndex: 3, isActive: true },
      { id: '27', label: 'Careers', href: '/careers', menuLocation: MenuLocation.FOOTER_COMPANY, orderIndex: 4, isActive: true },
      { id: '28', label: 'Partners & Agencies', href: '/partners', menuLocation: MenuLocation.FOOTER_COMPANY, orderIndex: 5, isActive: true },
      { id: '29', label: 'Privacy Policy', href: '/privacy-policy', menuLocation: MenuLocation.FOOTER_COMPANY, orderIndex: 6, isActive: true },
      { id: '30', label: 'Terms of Service', href: '/terms-of-service', menuLocation: MenuLocation.FOOTER_COMPANY, orderIndex: 7, isActive: true },
      { id: '31', label: 'Compliance & Regulations', href: '/compliance', menuLocation: MenuLocation.FOOTER_COMPANY, orderIndex: 8, isActive: true }
    ];

    this.plans = [
      {
        id: 'plan_starter',
        slug: 'starter',
        name: 'Starter',
        tagline: 'Ideal for small businesses starting with voice automation.',
        monthlyPriceInr: 1499,
        yearlyPriceInr: 14390,
        callMinutesIncluded: 500,
        voiceAgentsLimit: 1,
        isPopular: false,
        ctaText: 'Get Started',
        ctaHref: '/book-demo?plan=starter',
        displayOrder: 1,
        isActive: true,
        features: [
          { id: 'f1', planId: 'plan_starter', featureId: 'feat_1', isIncluded: true, valueText: 'Up to 500 call minutes' },
          { id: 'f2', planId: 'plan_starter', featureId: 'feat_2', isIncluded: true, valueText: '1 AI Voice Agent' },
          { id: 'f3', planId: 'plan_starter', featureId: 'feat_3', isIncluded: true, valueText: 'Basic Campaigns' },
          { id: 'f4', planId: 'plan_starter', featureId: 'feat_4', isIncluded: true, valueText: 'Call Recordings' }
        ]
      },
      {
        id: 'plan_growth',
        slug: 'growth',
        name: 'Growth',
        tagline: 'Most popular plan for growing businesses scaling outreach.',
        monthlyPriceInr: 4999,
        yearlyPriceInr: 47990,
        callMinutesIncluded: 2500,
        voiceAgentsLimit: 5,
        isPopular: true,
        ctaText: 'Start Free Trial',
        ctaHref: '/book-demo?plan=growth',
        displayOrder: 2,
        isActive: true,
        features: [
          { id: 'f5', planId: 'plan_growth', featureId: 'feat_1', isIncluded: true, valueText: 'Up to 2,500 call minutes' },
          { id: 'f6', planId: 'plan_growth', featureId: 'feat_2', isIncluded: true, valueText: '5 AI Voice Agents' },
          { id: 'f7', planId: 'plan_growth', featureId: 'feat_3', isIncluded: true, valueText: 'Advanced Campaigns' },
          { id: 'f8', planId: 'plan_growth', featureId: 'feat_4', isIncluded: true, valueText: 'Lead & CRM' },
          { id: 'f9', planId: 'plan_growth', featureId: 'feat_5', isIncluded: true, valueText: 'Analytics & Reports' }
        ]
      },
      {
        id: 'plan_business',
        slug: 'business',
        name: 'Business',
        tagline: 'Comprehensive capabilities for high-volume sales and operations teams.',
        monthlyPriceInr: 9999,
        yearlyPriceInr: 95990,
        callMinutesIncluded: 10000,
        voiceAgentsLimit: 10,
        isPopular: false,
        ctaText: 'Get Started',
        ctaHref: '/book-demo?plan=business',
        displayOrder: 3,
        isActive: true,
        features: [
          { id: 'f10', planId: 'plan_business', featureId: 'feat_1', isIncluded: true, valueText: 'Up to 10,000 call minutes' },
          { id: 'f11', planId: 'plan_business', featureId: 'feat_2', isIncluded: true, valueText: '10 AI Voice Agents' },
          { id: 'f12', planId: 'plan_business', featureId: 'feat_3', isIncluded: true, valueText: 'Team Collaboration' },
          { id: 'f13', planId: 'plan_business', featureId: 'feat_4', isIncluded: true, valueText: 'Integrations (CRM, Calendar)' },
          { id: 'f14', planId: 'plan_business', featureId: 'feat_5', isIncluded: true, valueText: 'Priority Support' }
        ]
      },
      {
        id: 'plan_enterprise',
        slug: 'enterprise',
        name: 'Enterprise',
        tagline: 'Dedicated infrastructure, custom integrations and guaranteed SLAs.',
        monthlyPriceInr: 0,
        yearlyPriceInr: 0,
        callMinutesIncluded: 0,
        voiceAgentsLimit: 0,
        isPopular: false,
        ctaText: 'Talk to Sales',
        ctaHref: '/contact?subject=Enterprise+Inquiry',
        displayOrder: 4,
        isActive: true,
        features: [
          { id: 'f15', planId: 'plan_enterprise', featureId: 'feat_1', isIncluded: true, valueText: 'High-volume & custom needs' },
          { id: 'f16', planId: 'plan_enterprise', featureId: 'feat_2', isIncluded: true, valueText: 'Unlimited Agents' },
          { id: 'f17', planId: 'plan_enterprise', featureId: 'feat_3', isIncluded: true, valueText: 'Dedicated Infrastructure' },
          { id: 'f18', planId: 'plan_enterprise', featureId: 'feat_4', isIncluded: true, valueText: 'Custom Integrations' },
          { id: 'f19', planId: 'plan_enterprise', featureId: 'feat_5', isIncluded: true, valueText: 'SLA & Priority Support' }
        ]
      }
    ];

    this.useCases = [
      {
        id: 'uc_1',
        slug: 'real-estate',
        title: 'Real Estate Lead Qualification & Site Visits',
        industry: 'Real Estate',
        summary: 'Qualify buyer leads, share project amenities, verify budgets, and automatically schedule physical site visits with sales agents.',
        problemStatement: 'Real estate developers and brokers receive hundreds of portal inquiries daily. 80% of leads drop off because sales agents take more than 30 minutes to call back, or fail to follow up consistently.',
        solutionOverview: 'TalkNex triggers automated calls within 30 seconds of enquiry submission, answers queries about 2 BHK / 3 BHK configurations, checks budget, and seamlessly locks calendar slots for site tours.',
        sampleDialogue: [
          { speaker: 'Customer', time: '00:00:06', text: 'क्या आप प्रोजेक्ट के बारे में जानकारी दे सकते हैं?', language: 'Hindi' },
          { speaker: 'AI Agent', time: '00:00:10', text: 'ज़रूर! हमारे पास 2 BHK और 3 BHK के अपार्टमेंट्स उपलब्ध हैं। क्या आप अपना बजट बताना चाहेंगे?', language: 'Hindi' },
          { speaker: 'Customer', time: '00:00:18', text: 'मेरा बजट लगभग 75 लाख के आसपास है।', language: 'Hindi' },
          { speaker: 'AI Agent', time: '00:00:23', text: 'बहुत बढ़िया! 75 लाख के बजट में हमारे पास प्रीमियम टावर में शानदार विकल्प उपलब्ध हैं। क्या हम कल दोपहर 3 बजे साइट विज़िट बुक करें?', language: 'Hindi' }
        ],
        benefits: [
          'Instant response to incoming portal enquiries (99.8% contact rate)',
          'Filters out unqualified leads and price-shoppers automatically',
          'Direct synchronization into CRM (HubSpot, Salesforce, Zoho)',
          'Bilingual communication in Hindi, Gujarati and English'
        ],
        orderIndex: 1,
        isActive: true
      },
      {
        id: 'uc_2',
        slug: 'healthcare',
        title: 'Healthcare Patient Appointments & Care Follow-ups',
        industry: 'Healthcare',
        summary: 'Handle clinic bookings, outpatient reminders, post-consultation check-ins, and diagnostic lab scheduling with compassionate voice AI.',
        problemStatement: 'Hospitals and specialty clinics experience a 20-30% patient no-show rate and struggle with overburdened front-desk reception staff.',
        solutionOverview: 'TalkNex automates patient booking confirmations, pre-procedure diet checks, and empathetic post-discharge follow-ups 24/7 in regional languages.',
        sampleDialogue: [
          { speaker: 'Customer', time: '00:00:04', text: 'I need to check if Dr. Sharma is available tomorrow morning.', language: 'English' },
          { speaker: 'AI Agent', time: '00:00:08', text: 'Dr. Sharma has openings tomorrow at 10:30 AM and 11:45 AM. Which time suits you better?', language: 'English' }
        ],
        benefits: [
          'Reduces patient appointment no-shows by up to 45%',
          'Zero waiting time for patients calling clinic desk',
          'Strict patient privacy and consent protocols',
          'Direct calendar locking with clinic management software'
        ],
        orderIndex: 2,
        isActive: true
      },
      {
        id: 'uc_3',
        slug: 'education',
        title: 'Education Admissions & Student Counseling',
        industry: 'Education',
        summary: 'Counsel prospective applicants, share course details, verify entrance eligibility, and book admissions counselor calls.',
        problemStatement: 'EdTech platforms and universities lose high-intent admission applicants during seasonal peaks due to insufficient counseling bandwidth.',
        solutionOverview: 'TalkNex conducts natural, informative admissions guidance calls, explains scholarship options, and routes verified applicants to university counselors.',
        sampleDialogue: [
          { speaker: 'Customer', time: '00:00:05', text: 'Can you tell me about the eligibility criteria for the Data Science diploma?', language: 'English' },
          { speaker: 'AI Agent', time: '00:00:10', text: 'Certainly! The Data Science diploma requires a Bachelor’s degree with mathematics or statistics. Would you like me to email you the complete curriculum?', language: 'English' }
        ],
        benefits: [
          'Scales instantly during high-volume admissions intake cycles',
          'Answers frequently asked questions about syllabus and placement records',
          'Personalized follow-ups based on student interests',
          'Higher conversion rate from inquiry to enrolled application'
        ],
        orderIndex: 3,
        isActive: true
      },
      {
        id: 'uc_4',
        slug: 'ecommerce',
        title: 'E-commerce COD Verification & Order Logistics',
        industry: 'E-commerce',
        summary: 'Order updates, support, and customer engagement. Slashing Return-to-Origin expenses with instant automated address confirmations.',
        problemStatement: 'E-commerce merchants in India face high Return-to-Origin (RTO) rates on COD orders, costing substantial reverse-logistics freight.',
        solutionOverview: 'TalkNex calls COD buyers immediately post-checkout to confirm shipping address and delivery readiness, drastically slashing fake or accidental orders.',
        sampleDialogue: [
          { speaker: 'AI Agent', time: '00:00:03', text: 'नमस्ते! मैं ShopKart से बोल रहा हूँ। क्या आपने ₹1,899 का लेदर जैकेट ऑर्डर किया है?', language: 'Hindi' },
          { speaker: 'Customer', time: '00:00:08', text: 'हाँ, मैंने किया है। कब तक डिलीवरी होगी?', language: 'Hindi' },
          { speaker: 'AI Agent', time: '00:00:12', text: 'आपका ऑर्डर शुक्रवार तक पहुँच जाएगा। कृपया डिलीवरी के समय सही राशि तैयार रखें। धन्यवाद!', language: 'Hindi' }
        ],
        benefits: [
          'Reduces RTO rates by over 35% on COD orders',
          'Verifies customer presence and delivery pin codes',
          'Triggers automated SMS / WhatsApp confirmation links',
          'Instant Shopify and WooCommerce integration'
        ],
        orderIndex: 4,
        isActive: true
      },
      {
        id: 'uc_5',
        slug: 'automotive',
        title: 'Automotive Test Drive Leads & Service Reminders',
        industry: 'Automotive',
        summary: 'Generate test drive leads, share offers, and follow up with vehicle buyers across showrooms.',
        problemStatement: 'Automotive dealerships lose prospective buyers when website test-drive requests are not contacted within minutes.',
        solutionOverview: 'TalkNex calls interested car buyers right after digital ad submission, answers basic vehicle spec queries, and books test drive appointments at the nearest dealer.',
        sampleDialogue: [
          { speaker: 'AI Agent', time: '00:00:04', text: 'Hello! Thank you for your interest in the new electric SUV. Would you prefer a test drive at your residence or at our Andheri showroom?', language: 'English' },
          { speaker: 'Customer', time: '00:00:11', text: 'At my residence on Saturday morning, please.', language: 'English' }
        ],
        benefits: [
          'Higher test-drive completion rates',
          'Automated 6-month vehicle maintenance reminders',
          'Syncs with Dealer Management Systems (DMS)',
          'Local language options for regional dealer hubs'
        ],
        orderIndex: 5,
        isActive: true
      },
      {
        id: 'uc_6',
        slug: 'manufacturing',
        title: 'Manufacturing Dealer Inquiries & Supply Updates',
        industry: 'Manufacturing',
        summary: 'Handle B2B dealer inquiries, dispatch status notifications, and supplier order confirmations reliably.',
        problemStatement: 'Manufacturers spend excessive manual staff hours answering routine dealer inventory and dispatch queries.',
        solutionOverview: 'TalkNex connects to ERP systems to provide automated, 24/7 status updates and dispatch timelines to authorized distributors.',
        sampleDialogue: [
          { speaker: 'Customer', time: '00:00:05', text: 'हमारे पिछले हफ्ते के 500 यूनिट्स का डिस्पैच कब होगा?', language: 'Hindi' },
          { speaker: 'AI Agent', time: '00:00:10', text: 'आपकी कंसाइनमेंट कल शाम पुणे वेयरहाउस से रवाना हो चुकी है और कल दोपहर तक आपके डिपो पहुंचेगी।', language: 'Hindi' }
        ],
        benefits: [
          '24/7 dealer inquiry resolution without extra staff',
          'Reduces shipment disputes and follow-up overhead',
          'Secure distributor verification via registered mobile number',
          'Real-time ERP webhook connectivity'
        ],
        orderIndex: 6,
        isActive: true
      },
      {
        id: 'uc_7',
        slug: 'hospitality',
        title: 'Hospitality Reservations & Guest Concierge',
        industry: 'Hospitality',
        summary: 'Automate table and room reservations, guest concierge inquiries, and post-stay feedback collection.',
        problemStatement: 'Hotels and fine-dining restaurants lose reservations when front desks are busy managing on-premise guests.',
        solutionOverview: 'TalkNex answers every reservation call instantly, captures party size, dietary requests, and confirms bookings with zero wait time.',
        sampleDialogue: [
          { speaker: 'Customer', time: '00:00:04', text: 'Can I book a table for 4 tonight around 8:30 PM?', language: 'English' },
          { speaker: 'AI Agent', time: '00:00:09', text: 'We have a table available at 8:30 PM in our outdoor patio or main dining hall. Which do you prefer?', language: 'English' }
        ],
        benefits: [
          'Zero dropped reservation phone calls during peak rush',
          'Collects guest dietary preferences in advance',
          'Immediate SMS / WhatsApp confirmation delivery',
          'Integrates with table management software'
        ],
        orderIndex: 7,
        isActive: true
      }
    ];

    this.integrations = [
      {
        id: 'int_1',
        slug: 'hubspot',
        name: 'HubSpot CRM',
        category: IntegrationCategory.CRM,
        description: 'Automatically log calls, update lead status, and sync conversational transcripts directly to HubSpot contacts and deals.',
        status: IntegrationStatus.AVAILABLE,
        capabilities: ['Two-way Contact Sync', 'Automated Call Logging', 'Transcript & Recording Attachment', 'Deal Stage Automation'],
        connectionGuide: 'Connect via OAuth with your HubSpot account in one click. Map custom fields and configure trigger webhooks.',
        orderIndex: 1
      },
      {
        id: 'int_2',
        slug: 'salesforce',
        name: 'Salesforce Sales Cloud',
        category: IntegrationCategory.CRM,
        description: 'Enterprise-grade integration with Salesforce leads, contacts, and custom objects with full field mapping.',
        status: IntegrationStatus.AVAILABLE,
        capabilities: ['Lead Creation', 'Task & Activity Logging', 'Custom Object Mapping', 'Role Hierarchy Permissions'],
        connectionGuide: 'Authorize your Salesforce organization using Connected App credentials. Set up field routing rules.',
        orderIndex: 2
      },
      {
        id: 'int_3',
        slug: 'zoho-crm',
        name: 'Zoho CRM',
        category: IntegrationCategory.CRM,
        description: 'Native connection with Zoho CRM for seamless lead intake, notes attachment, and sales pipeline updates across India.',
        status: IntegrationStatus.AVAILABLE,
        capabilities: ['Instant Lead Capture', 'Module Field Mapping', 'Call Status Webhooks', 'Blueprint Automation'],
        connectionGuide: 'Authenticate with Zoho API tokens and select target modules for contact and deal synchronization.',
        orderIndex: 3
      },
      {
        id: 'int_4',
        slug: 'google-calendar',
        name: 'Google Calendar',
        category: IntegrationCategory.CALENDAR,
        description: 'Allow your AI voice agent to query real-time availability and schedule meetings directly into Google Calendars.',
        status: IntegrationStatus.AVAILABLE,
        capabilities: ['Real-time Conflict Checking', 'Instant Invite Dispatch', 'Timezone Conversion', 'Google Meet Link Generation'],
        connectionGuide: 'Sign in with your Google Workspace admin or personal calendar account and set availability windows.',
        orderIndex: 4
      },
      {
        id: 'int_5',
        slug: 'calendly',
        name: 'Calendly',
        category: IntegrationCategory.CALENDAR,
        description: 'Leverage your existing Calendly event types to let AI agents lock meetings without double-booking.',
        status: IntegrationStatus.AVAILABLE,
        capabilities: ['Event Type Routing', 'Availability Checking', 'Invitee Question Answering', 'Rescheduling Automation'],
        connectionGuide: 'Paste your Calendly Personal Access Token and select your default event type.',
        orderIndex: 5
      },
      {
        id: 'int_6',
        slug: 'whatsapp-business',
        name: 'WhatsApp Business API',
        category: IntegrationCategory.MESSAGING,
        description: 'Send instant follow-up brochures, appointment confirmations, and location pins via official WhatsApp templates immediately after a call.',
        status: IntegrationStatus.AVAILABLE,
        capabilities: ['Template Messaging', 'Document & Location Dispatch', 'Opt-in Verification', 'Status Webhooks'],
        connectionGuide: 'Configure your Meta WhatsApp Cloud API credentials and verify your approved notification templates.',
        orderIndex: 6
      },
      {
        id: 'int_7',
        slug: 'meta-lead-ads',
        name: 'Meta Lead Ads (Facebook & Instagram)',
        category: IntegrationCategory.ADS,
        description: 'Trigger immediate automated voice calls within 15 seconds of a user submitting an Instagram or Facebook lead ad form.',
        status: IntegrationStatus.AVAILABLE,
        capabilities: ['Instant Lead Webhook', 'Sub-30-Second Call Trigger', 'UTM & Campaign Attribute Tracking', 'Form Field Mapping'],
        connectionGuide: 'Connect your Facebook Page and select the active lead generation forms to monitor.',
        orderIndex: 7
      },
      {
        id: 'int_8',
        slug: 'shopify',
        name: 'Shopify',
        category: IntegrationCategory.ECOMMERCE,
        description: 'Automate COD order confirmation calls, shipping address validation, and customer support queries for Shopify merchants.',
        status: IntegrationStatus.AVAILABLE,
        capabilities: ['Order Status Querying', 'COD Confirmation Calls', 'Address Validation', 'Tag & Fulfillment Triggering'],
        connectionGuide: 'Install the TalkNex Shopify private app and enable automated webhook event listeners.',
        orderIndex: 8
      },
      {
        id: 'int_9',
        slug: 'webhooks',
        name: 'Custom REST Webhooks',
        category: IntegrationCategory.WEBHOOKS,
        description: 'Send real-time JSON payloads to your custom backend API, Zapier, or Make.com whenever calls conclude.',
        status: IntegrationStatus.AVAILABLE,
        capabilities: ['Custom HMAC Signatures', 'Retry Logic with Exponential Backoff', 'Full Transcript Payload', 'Configurable Event Triggers'],
        connectionGuide: 'Enter your HTTPS webhook endpoint URL and select the call events you wish to receive.',
        orderIndex: 9
      }
    ];

    this.faqs = [
      {
        id: 'faq_1',
        question: 'What is TalkNex?',
        answer: 'TalkNex is an enterprise-grade AI voice platform built by Emperor Smart Solutions that enables businesses to deploy human-like conversational voice agents. TalkNex agents handle both inbound customer support and high-volume outbound calling campaigns, qualifying leads, booking calendar appointments, and answering customer queries in natural human speech.',
        category: 'General',
        isFeatured: true,
        orderIndex: 1
      },
      {
        id: 'faq_2',
        question: 'Does it support Indian languages like Hindi and Gujarati?',
        answer: 'Yes! TalkNex is engineered from the ground up for the Indian market, supporting Hindi, Gujarati, Indian English, Marathi, Tamil, Telugu, Kannada, Bengali, and code-mixed speech (Hinglish/Gujlish). Our voice models comprehend regional accents and nuances with high transcription accuracy.',
        category: 'General',
        isFeatured: true,
        orderIndex: 2
      },
      {
        id: 'faq_3',
        question: 'Can I use my existing phone number?',
        answer: 'Yes. TalkNex supports Bring-Your-Own-Carrier (BYOC) through SIP trunking, as well as call forwarding from your existing business landline, mobile, or cloud telephony numbers (such as Exotel, Tata Tele, Airtel, or Twilio). Incoming calls can seamlessly ring your AI voice agent.',
        category: 'Technical',
        isFeatured: true,
        orderIndex: 3
      },
      {
        id: 'faq_4',
        question: 'How is it different from a call center or IVR?',
        answer: 'Traditional IVRs force callers through rigid, frustrating keypad trees ("Press 1 for Sales, Press 2 for Support"). TalkNex provides dynamic, two-way conversational AI that listens, understands intent, interrupts naturally if the user speaks, and answers questions intelligently without rigid menus.',
        category: 'General',
        isFeatured: true,
        orderIndex: 4
      },
      {
        id: 'faq_5',
        question: 'Is it compliant with TRAI and Indian regulations?',
        answer: 'Yes. TalkNex strictly complies with Telecom Regulatory Authority of India (TRAI) guidelines and TCCCPR regulations. We support DND (Do-Not-Disturb) scrubbing, authorized 140-series commercial calling prefixes, consent management, calling time-window enforcement (9 AM to 9 PM), and transparent caller identification.',
        category: 'Compliance',
        isFeatured: true,
        orderIndex: 5
      },
      {
        id: 'faq_6',
        question: 'How does TalkNex integrate with our existing CRM?',
        answer: 'TalkNex provides one-click native integrations for popular CRMs including Zoho CRM, Salesforce, and HubSpot, as well as webhook triggers for Zapier and custom database systems. Every call transcript, audio recording, and qualified lead status is synchronized automatically.',
        category: 'Technical',
        isFeatured: false,
        orderIndex: 6
      },
      {
        id: 'faq_7',
        question: 'What happens if a caller asks a question the AI does not know?',
        answer: 'TalkNex can be configured with graceful escalation paths. When a conversation exceeds the agent’s knowledge boundaries or requires human intervention, the AI agent can seamlessly transfer the live call to your human team or schedule an immediate callback with notes.',
        category: 'Technical',
        isFeatured: false,
        orderIndex: 7
      }
    ];

    this.blogCategories = [
      { id: 'cat_1', name: 'Technology & AI', slug: 'technology', description: 'Deep dives into voice AI, low-latency LLMs, and speech recognition.', postCount: 1 },
      { id: 'cat_2', name: 'Business Growth', slug: 'business-growth', description: 'Strategies for scaling sales outreach and customer conversions.', postCount: 1 },
      { id: 'cat_3', name: 'Compliance & Regulations', slug: 'compliance', description: 'TRAI regulations, consumer consent, and ethical telecommunication standards.', postCount: 1 }
    ];

    const author = {
      id: 'auth_1',
      name: 'Emperor Smart Solutions AI Research',
      slug: 'emperor-ai-research',
      title: 'Voice Engineering & AI Research Team',
      bio: 'Pioneering speech synthesis, regional language understanding, and conversational AI automation for enterprise applications.'
    };

    this.blogPosts = [
      {
        id: 'post_1',
        slug: 'what-are-ai-voice-agents-and-how-do-they-work',
        title: 'What Are AI Voice Agents and How Do They Work?',
        excerpt: 'Explore the underlying architecture of human-like AI voice agents: automatic speech recognition, ultra-low latency LLMs, and expressive neural speech synthesis.',
        content: `## The Evolution of Automated Business Conversations\n\nFor decades, automated telephone interactions were synonymous with rigid Interactive Voice Response (IVR) systems. Customers were forced to endure robotic menus ("Press 1 for Support, Press 2 for Billing") that offered no contextual comprehension.\n\nWith the advent of high-throughput Large Language Models (LLMs) and sub-500ms neural voice synthesis, a new paradigm has emerged: **Autonomous AI Voice Agents**.\n\n### The Core Technology Stack\n\nA modern AI Voice Agent operating on the TalkNex platform consists of three tightly coupled real-time pipelines:\n\n1. **Automatic Speech Recognition (ASR)**: Transcribing spoken Hindi, English, Gujarati, and regional dialects into textual tokens within under 150 milliseconds.\n2. **Contextual Intelligence Engine (LLM)**: Interpreting intent, recalling conversation history, consulting enterprise knowledge bases via RAG (Retrieval-Augmented Generation), and formulating concise, natural responses.\n3. **Neural Text-to-Speech (TTS)**: Synthesizing expressive, human-like voice with natural pauses, breathing, and prosody that responds in real time.\n\n### Real-Time Interruption Handling (Full-Duplex Audio)\n\nUnlike turn-based walkie-talkie bots, TalkNex agents support **Full-Duplex Audio**. If a customer speaks while the AI agent is mid-sentence, the agent immediately stops speaking, listens to the user's interruption, and pivots its answer accordingly.`,
        coverImageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop',
        readingTimeMinutes: 6,
        authorId: author.id,
        categoryId: 'cat_1',
        status: ContentStatus.PUBLISHED,
        publishedAt: '2026-11-10T09:00:00Z',
        author,
        category: this.blogCategories[0]
      },
      {
        id: 'post_2',
        slug: '10-real-business-use-cases-for-ai-voice-calling-in-india',
        title: '10 Real Business Use Cases for AI Voice Calling in India',
        excerpt: 'Discover practical, high-ROI applications of autonomous voice calling across real estate, healthcare, education, retail, and financial services.',
        content: `## Transforming High-Touch Industries Across India\n\nIn India, voice is the undisputed primary channel of commerce. Whether booking a doctor's appointment, verifying a property site visit, or confirming an e-commerce delivery, Indian consumers strongly prefer speaking over typing.\n\nHere are 10 concrete, production-proven business use cases where TalkNex AI Voice Agents drive measurable revenue growth and cost efficiency.\n\n### 1. Instant Real Estate Lead Qualification\nWhen prospective home buyers submit an inquiry on portals like 99acres or MagicBricks, speed-to-lead is critical. An automated call triggered within 30 seconds can qualify budget, preferred configuration (2 BHK / 3 BHK), and book a physical site visit before the lead cools down.\n\n### 2. E-commerce Cash-on-Delivery (COD) Address Verification\nFake COD orders cost Indian e-commerce merchants crores of rupees in return freight (RTO). An automated conversational check immediately confirms customer intent and pin code accuracy.\n\n### 3. Patient Appointment Scheduling & Care Reminders\nSpecialty hospitals and dental clinics prevent costly 25% no-show rates with courteous automated confirmation calls in the patient's preferred mother tongue.\n\n### 4. EdTech Course Enrollment & Counseling Calls\nEdTech platforms engage thousands of entrance exam aspirants with automated syllabus explanations and scholarship counseling.`,
        coverImageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop',
        readingTimeMinutes: 8,
        authorId: author.id,
        categoryId: 'cat_2',
        status: ContentStatus.PUBLISHED,
        publishedAt: '2026-11-05T09:00:00Z',
        author,
        category: this.blogCategories[1]
      },
      {
        id: 'post_3',
        slug: 'ai-calling-in-india-compliance-trai-rules-and-best-practices',
        title: 'AI Calling in India: Compliance, TRAI Rules and Best Practices',
        excerpt: 'A comprehensive operational guide to navigating TRAI regulations, DND scrubbing, DLT registration, and lawful voice automation in India.',
        content: `## Operating Lawfully and Ethically in the Indian Telecommunications Landscape\n\nAutomated calling offers tremendous leverage for businesses, but it must be conducted with rigorous compliance with Indian regulatory bodies, specifically the **Telecom Regulatory Authority of India (TRAI)** and the **Telecom Commercial Communications Customer Preference Regulations (TCCCPR)**.\n\n### 1. The 140-Series Calling Prefix Requirement\nUnder TRAI mandates, all commercial promotional and transactional calls originating from automated systems must utilize approved telecom headers and prefixes (such as the 140-series allocated for telemarketing and commercial communications).\n\n### 2. Do-Not-Disturb (DND) scrubbing\nBefore initiating any outbound promotional campaign, phone numbers must be scrubbed in real-time against the National Customer Preference Register (NCPR). TalkNex builds automated DND verification directly into campaign launch workflows.\n\n### 3. Time Windows for Commercial Calls\nTRAI strictly prohibits promotional calling outside the 9:00 AM to 9:00 PM IST window. TalkNex includes hard policy enforcement that prevents automated outbound campaigns from executing outside legal calling hours.\n\n### 4. Explicit Consent Management\nUnder the Digital Personal Data Protection (DPDP) Act, businesses must maintain demonstrable proof of customer opt-in consent for promotional follow-ups.`,
        coverImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop',
        readingTimeMinutes: 7,
        authorId: author.id,
        categoryId: 'cat_3',
        status: ContentStatus.PUBLISHED,
        publishedAt: '2026-10-28T09:00:00Z',
        author,
        category: this.blogCategories[2]
      }
    ];

    this.pages = [
      {
        id: 'p_home',
        slug: 'home',
        title: 'Turn Conversations into Business Growth with AI Voice Agents',
        metaTitle: 'TalkNex — AI Voice Calling & Conversation Automation SaaS',
        metaDescription: 'Create human-like AI voice agents to handle calls, qualify leads, convert customers, provide support and automate business conversations at scale.',
        status: ContentStatus.PUBLISHED,
        publishedAt: '2026-11-13T00:00:00Z',
        sections: []
      }
    ];

    // Seed Admin Entities
    this.seedAdminData();
  }

  private seedAdminData() {
    if (this.organizations.length === 0) {
      this.organizations = [
        {
          id: 'org_realvista',
          name: 'RealVista Properties',
          slug: 'realvista-properties',
          businessEmail: 'contact@realvistaproperties.in',
          phone: '+91 98200 12345',
          industry: 'Real Estate',
          status: OrganizationStatus.ACTIVE,
          planId: 'growth',
          planName: 'Growth',
          walletBalanceInr: 12450.0,
          usersCount: 22,
          calls30d: 38420,
          createdAt: '2026-08-15T10:00:00Z',
          updatedAt: '2026-11-13T10:00:00Z'
        },
        {
          id: 'org_medicare',
          name: 'Medicare Health Services',
          slug: 'medicare-health-services',
          businessEmail: 'operations@medicarehealth.in',
          phone: '+91 99300 23456',
          industry: 'Healthcare',
          status: OrganizationStatus.ACTIVE,
          planId: 'business',
          planName: 'Business',
          walletBalanceInr: 34200.0,
          usersCount: 48,
          calls30d: 72560,
          createdAt: '2026-07-20T08:30:00Z',
          updatedAt: '2026-11-13T11:15:00Z'
        },
        {
          id: 'org_edusmart',
          name: 'EduSmart Academy',
          slug: 'edusmart-academy',
          businessEmail: 'admissions@edusmart.edu.in',
          phone: '+91 98111 34567',
          industry: 'Education',
          status: OrganizationStatus.ACTIVE,
          planId: 'starter',
          planName: 'Starter',
          walletBalanceInr: 4500.0,
          usersCount: 14,
          calls30d: 18230,
          createdAt: '2026-09-01T11:45:00Z',
          updatedAt: '2026-11-12T16:20:00Z'
        },
        {
          id: 'org_autodrive',
          name: 'AutoDrive Motors',
          slug: 'autodrive-motors',
          businessEmail: 'sales@autodriveindia.com',
          phone: '+91 98400 45678',
          industry: 'Automotive',
          status: OrganizationStatus.ACTIVE,
          planId: 'growth',
          planName: 'Growth',
          walletBalanceInr: 8900.0,
          usersCount: 10,
          calls30d: 9840,
          createdAt: '2026-09-15T09:10:00Z',
          updatedAt: '2026-11-13T09:40:00Z'
        },
        {
          id: 'org_shopkart',
          name: 'ShopKart Retail',
          slug: 'shopkart-retail',
          businessEmail: 'logistics@shopkartretail.in',
          phone: '+91 98555 56789',
          industry: 'E-commerce',
          status: OrganizationStatus.ACTIVE,
          planId: 'business',
          planName: 'Business',
          walletBalanceInr: 28500.0,
          usersCount: 26,
          calls30d: 35120,
          createdAt: '2026-06-10T14:00:00Z',
          updatedAt: '2026-11-13T12:00:00Z'
        },
        {
          id: 'org_aarav',
          name: 'Aarav Industries',
          slug: 'aarav-industries',
          businessEmail: 'helpdesk@aaravindustries.com',
          phone: '+91 98777 67890',
          industry: 'Manufacturing',
          status: OrganizationStatus.ACTIVE,
          planId: 'enterprise',
          planName: 'Enterprise',
          walletBalanceInr: 75000.0,
          usersCount: 55,
          calls30d: 42100,
          createdAt: '2026-11-13T14:40:00Z',
          updatedAt: '2026-11-13T14:40:00Z'
        }
      ];

      // Add remaining organizations to reach exactly 248 total organizations
      const industries = ['Financial Services', 'Hospitality', 'Real Estate', 'Logistics', 'Healthcare', 'Legal Services', 'Travel & Tourism'];
      const planPool = ['growth', 'growth', 'business', 'business', 'starter', 'starter', 'enterprise'];
      for (let i = 7; i <= 248; i++) {
        const pId = planPool[i % planPool.length];
        this.organizations.push({
          id: `org_${i}`,
          name: `Enterprise Client ${i}`,
          slug: `enterprise-client-${i}`,
          businessEmail: `admin@client${i}.in`,
          phone: `+91 98000 ${String(10000 + i).slice(1)}`,
          industry: industries[i % industries.length],
          status: OrganizationStatus.ACTIVE,
          planId: pId,
          planName: pId.charAt(0).toUpperCase() + pId.slice(1),
          walletBalanceInr: 5000 + (i * 120),
          usersCount: 5 + (i % 25),
          calls30d: 200 + (i * 35),
          createdAt: new Date(Date.now() - (i * 86400000 * 1.2)).toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
      this.persistFile(this.organizationsFile, this.organizations);
    }

    if (this.aiProviders.length === 0) {
      this.aiProviders = [
        {
          id: 'prov_sarvam',
          name: 'Sarvam AI (STT/TTS)',
          category: ProviderCategory.STT,
          adapterId: 'sarvam-ai',
          endpointUrl: 'https://api.sarvam.ai/v1',
          apiKeyMasked: 'sk_live_sarvam_****9a7f',
          supportedModels: ['saarika:v1 (Hindi/English)', 'bulbul:v1 (TTS Neural)'],
          supportedLanguages: ['Hindi', 'English', 'Gujarati', 'Marathi', 'Tamil', 'Telugu', 'Bengali', 'Kannada'],
          status: ProviderHealthStatus.HEALTHY,
          priority: 1,
          latencyMs: 120,
          errorRatePercent: 0.04,
          usageSharePercent: 42.6,
          estimatedCostPerUnit: 0.22,
          isActive: true,
          createdAt: '2026-06-01T00:00:00Z',
          updatedAt: '2026-11-13T13:45:00Z'
        },
        {
          id: 'prov_openai',
          name: 'OpenAI (LLM)',
          category: ProviderCategory.LLM,
          adapterId: 'openai-gpt4o',
          endpointUrl: 'https://api.openai.com/v1',
          apiKeyMasked: 'sk_proj_open_****4bc1',
          supportedModels: ['gpt-4o-realtime', 'gpt-4o-mini', 'whisper-large-v3'],
          supportedLanguages: ['Multilingual (50+ Languages)'],
          status: ProviderHealthStatus.HEALTHY,
          priority: 1,
          latencyMs: 240,
          errorRatePercent: 0.02,
          usageSharePercent: 28.7,
          estimatedCostPerUnit: 0.85,
          isActive: true,
          createdAt: '2026-06-01T00:00:00Z',
          updatedAt: '2026-11-13T10:00:00Z'
        },
        {
          id: 'prov_google',
          name: 'Google Cloud',
          category: ProviderCategory.STT,
          adapterId: 'google-cloud-speech',
          endpointUrl: 'https://speech.googleapis.com/v1',
          apiKeyMasked: 'AIzaSyB7****2m9k',
          supportedModels: ['Chirp v2', 'Gemini 1.5 Flash', 'Cloud Text-to-Speech Journey'],
          supportedLanguages: ['Multilingual Indic Focus'],
          status: ProviderHealthStatus.HEALTHY,
          priority: 2,
          latencyMs: 180,
          errorRatePercent: 0.05,
          usageSharePercent: 18.2,
          estimatedCostPerUnit: 0.35,
          isActive: true,
          createdAt: '2026-06-01T00:00:00Z',
          updatedAt: '2026-11-13T09:00:00Z'
        },
        {
          id: 'prov_azure',
          name: 'Azure Speech',
          category: ProviderCategory.TTS,
          adapterId: 'azure-speech-cognitive',
          endpointUrl: 'https://centralindia.tts.speech.microsoft.com',
          apiKeyMasked: 'az_cog_****7811',
          supportedModels: ['Neural Multilingual HD', 'Custom Neural Voice'],
          supportedLanguages: ['Hindi Neural', 'Indian English (Neerja/Prabhat)', 'Regional Dialects'],
          status: ProviderHealthStatus.HEALTHY,
          priority: 2,
          latencyMs: 150,
          errorRatePercent: 0.06,
          usageSharePercent: 10.5,
          estimatedCostPerUnit: 0.40,
          isActive: true,
          createdAt: '2026-06-01T00:00:00Z',
          updatedAt: '2026-11-13T08:30:00Z'
        },
        {
          id: 'prov_deepgram',
          name: 'Deepgram Nova-2',
          category: ProviderCategory.STT,
          adapterId: 'deepgram-nova-2',
          endpointUrl: 'https://api.deepgram.com/v1',
          apiKeyMasked: 'dg_sec_****3301',
          supportedModels: ['nova-2-general', 'nova-2-phonecall'],
          supportedLanguages: ['English (US/UK/IN)', 'Global Accents'],
          status: ProviderHealthStatus.HEALTHY,
          priority: 3,
          latencyMs: 95,
          errorRatePercent: 0.03,
          usageSharePercent: 5.0,
          estimatedCostPerUnit: 0.18,
          isActive: true,
          createdAt: '2026-07-01T00:00:00Z',
          updatedAt: '2026-11-12T10:00:00Z'
        },
        {
          id: 'prov_elevenlabs',
          name: 'ElevenLabs Turbo',
          category: ProviderCategory.TTS,
          adapterId: 'elevenlabs-multilingual-v2',
          endpointUrl: 'https://api.elevenlabs.io/v1',
          apiKeyMasked: 'xi_api_****8892',
          supportedModels: ['eleven_turbo_v2_5', 'eleven_multilingual_v2'],
          supportedLanguages: ['Ultra-Realistic Emotion Voices (29 languages)'],
          status: ProviderHealthStatus.HEALTHY,
          priority: 3,
          latencyMs: 190,
          errorRatePercent: 0.08,
          usageSharePercent: 6.0,
          estimatedCostPerUnit: 1.20,
          isActive: true,
          createdAt: '2026-07-15T00:00:00Z',
          updatedAt: '2026-11-11T14:00:00Z'
        }
      ];
      this.persistFile(this.aiProvidersFile, this.aiProviders);
    }

    if (this.telephonyProviders.length === 0) {
      this.telephonyProviders = [
        {
          id: 'tel_exotel',
          name: 'Exotel Telecom Gateway',
          providerType: TelephonyProviderType.EXOTEL,
          sipTrunkEndpoint: 'sip.in.exotel.com:5060',
          phoneNumbers: ['+91 80 4712 3456', '+91 80 4712 3457', '+91 80 4712 3458'],
          concurrencyLimit: 250,
          activeChannels: 74,
          status: ProviderHealthStatus.HEALTHY,
          isActive: true,
          createdAt: '2026-06-01T00:00:00Z',
          updatedAt: '2026-11-13T14:00:00Z'
        },
        {
          id: 'tel_tatatele',
          name: 'Tata Tele Business Services (TTBS)',
          providerType: TelephonyProviderType.TATATELE,
          sipTrunkEndpoint: 'sip.mumbai.tatatele.co.in:5060',
          phoneNumbers: ['+91 22 6890 1200', '+91 22 6890 1201'],
          concurrencyLimit: 500,
          activeChannels: 142,
          status: ProviderHealthStatus.HEALTHY,
          isActive: true,
          createdAt: '2026-06-15T00:00:00Z',
          updatedAt: '2026-11-13T13:30:00Z'
        },
        {
          id: 'tel_airtel',
          name: 'Airtel IQ Cloud Telephony',
          providerType: TelephonyProviderType.AIRTEL,
          sipTrunkEndpoint: 'sip.airteliq.com',
          phoneNumbers: ['+91 11 4123 7890'],
          concurrencyLimit: 200,
          activeChannels: 48,
          status: ProviderHealthStatus.HEALTHY,
          isActive: true,
          createdAt: '2026-07-01T00:00:00Z',
          updatedAt: '2026-11-13T12:00:00Z'
        },
        {
          id: 'tel_twilio',
          name: 'Twilio Voice SIP Trunking',
          providerType: TelephonyProviderType.TWILIO,
          sipTrunkEndpoint: 'talknex.pstn.twilio.com',
          phoneNumbers: ['+1 (415) 800-4321', '+44 20 7946 0912'],
          concurrencyLimit: 100,
          activeChannels: 18,
          status: ProviderHealthStatus.HEALTHY,
          isActive: true,
          createdAt: '2026-08-01T00:00:00Z',
          updatedAt: '2026-11-13T11:00:00Z'
        }
      ];
      this.persistFile(this.telephonyFile, this.telephonyProviders);
    }

    if (this.adminUsers.length === 0) {
      this.adminUsers = [
        {
          id: 'user_super_admin',
          email: 'admin@talknex.com',
          name: 'Admin',
          role: UserRole.SUPER_ADMIN,
          adminRole: AdminRoleType.SUPER_ADMIN,
          status: 'ACTIVE',
          createdAt: '2026-01-01T00:00:00Z',
          updatedAt: '2026-11-13T14:00:00Z',
          lastLoginAt: '2026-11-13T14:35:00Z'
        },
        {
          id: 'user_platform_admin',
          email: 'vikram.mehta@talknex.com',
          name: 'Vikram Mehta',
          role: UserRole.ADMIN,
          adminRole: AdminRoleType.PLATFORM_ADMIN,
          status: 'ACTIVE',
          createdAt: '2026-02-15T00:00:00Z',
          updatedAt: '2026-11-13T10:00:00Z',
          lastLoginAt: '2026-11-13T09:20:00Z'
        },
        {
          id: 'user_finance_admin',
          email: 'pooja.sharma@talknex.com',
          name: 'Pooja Sharma',
          role: UserRole.ADMIN,
          adminRole: AdminRoleType.FINANCE_ADMIN,
          status: 'ACTIVE',
          createdAt: '2026-03-01T00:00:00Z',
          updatedAt: '2026-11-12T16:00:00Z',
          lastLoginAt: '2026-11-13T11:05:00Z'
        },
        {
          id: 'user_tech_admin',
          email: 'rohan.verma@talknex.com',
          name: 'Rohan Verma',
          role: UserRole.ADMIN,
          adminRole: AdminRoleType.TECHNICAL_ADMIN,
          status: 'ACTIVE',
          createdAt: '2026-03-10T00:00:00Z',
          updatedAt: '2026-11-13T12:00:00Z',
          lastLoginAt: '2026-11-13T13:10:00Z'
        },
        {
          id: 'user_support_admin',
          email: 'ananya.gupta@talknex.com',
          name: 'Ananya Gupta',
          role: UserRole.ADMIN,
          adminRole: AdminRoleType.SUPPORT_ADMIN,
          status: 'ACTIVE',
          createdAt: '2026-04-01T00:00:00Z',
          updatedAt: '2026-11-13T08:00:00Z',
          lastLoginAt: '2026-11-13T12:30:00Z'
        }
      ];
      this.persistFile(this.adminUsersFile, this.adminUsers);
    }

    if (this.transactions.length === 0) {
      this.transactions = [
        {
          id: 'tx_medicare_1',
          organizationId: 'org_medicare',
          organizationName: 'Medicare Health Services',
          referenceId: 'INV-2026-11-8842',
          amountInr: 49999.0,
          type: TransactionType.SUBSCRIPTION,
          status: TransactionStatus.SUCCESS,
          paymentMethod: 'Razorpay HDFC Corporate NetBanking',
          description: 'Business Annual Enterprise Plan Subscription Renewal',
          invoiceUrl: '/invoices/INV-2026-11-8842.pdf',
          createdAt: '2026-11-13T14:02:00Z'
        },
        {
          id: 'tx_realvista_1',
          organizationId: 'org_realvista',
          organizationName: 'RealVista Properties',
          referenceId: 'INV-2026-11-8835',
          amountInr: 9999.0,
          type: TransactionType.SUBSCRIPTION,
          status: TransactionStatus.SUCCESS,
          paymentMethod: 'Corporate Credit Card ****4242',
          description: 'Growth Plan Monthly + Telephony Minutes Pack',
          invoiceUrl: '/invoices/INV-2026-11-8835.pdf',
          createdAt: '2026-11-13T12:15:00Z'
        },
        {
          id: 'tx_shopkart_1',
          organizationId: 'org_shopkart',
          organizationName: 'ShopKart Retail',
          referenceId: 'INV-2026-11-8820',
          amountInr: 15000.0,
          type: TransactionType.WALLET_TOPUP,
          status: TransactionStatus.SUCCESS,
          paymentMethod: 'UPI AutoPay (Axis Bank)',
          description: 'Prepaid Calling Wallet Balance Top-up',
          invoiceUrl: '/invoices/INV-2026-11-8820.pdf',
          createdAt: '2026-11-12T18:40:00Z'
        },
        {
          id: 'tx_edusmart_1',
          organizationId: 'org_edusmart',
          organizationName: 'EduSmart Academy',
          referenceId: 'INV-2026-11-8804',
          amountInr: 1499.0,
          type: TransactionType.SUBSCRIPTION,
          status: TransactionStatus.SUCCESS,
          paymentMethod: 'ICICI UPI',
          description: 'Starter Tier Monthly Subscription',
          invoiceUrl: '/invoices/INV-2026-11-8804.pdf',
          createdAt: '2026-11-12T10:20:00Z'
        }
      ];
      this.persistFile(this.transactionsFile, this.transactions);
    }

    if (this.auditLogs.length === 0) {
      this.auditLogs = [
        {
          id: 'audit_01',
          action: 'ORGANIZATION_REGISTERED',
          entityType: 'Organization',
          entityId: 'org_aarav',
          actorId: 'system',
          actorName: 'Aarav Industries',
          actorEmail: 'helpdesk@aaravindustries.com',
          payload: { name: 'Aarav Industries', plan: 'enterprise' },
          createdAt: '2026-11-13T14:40:00Z'
        },
        {
          id: 'audit_02',
          action: 'PLAN_UPGRADE',
          entityType: 'Subscription',
          entityId: 'sub_realvista',
          actorId: 'user_super_admin',
          actorName: 'Admin',
          actorEmail: 'admin@talknex.com',
          payload: { organization: 'RealVista Properties', from: 'Growth', to: 'Business' },
          createdAt: '2026-11-13T14:17:00Z'
        },
        {
          id: 'audit_03',
          action: 'PAYMENT_RECEIVED',
          entityType: 'Transaction',
          entityId: 'tx_medicare_1',
          actorId: 'system_razorpay',
          actorName: 'Razorpay Gateway',
          actorEmail: 'billing@talknex.com',
          payload: { amountInr: 49999, org: 'Medicare Health Services', status: 'SUCCESS' },
          createdAt: '2026-11-13T14:02:00Z'
        },
        {
          id: 'audit_04',
          action: 'AI_PROVIDER_UPDATE',
          entityType: 'AiProvider',
          entityId: 'prov_sarvam',
          actorId: 'user_super_admin',
          actorName: 'Admin',
          actorEmail: 'admin@talknex.com',
          payload: { provider: 'Sarvam AI (STT)', status: 'HEALTHY', priority: 1 },
          createdAt: '2026-11-13T13:45:00Z'
        },
        {
          id: 'audit_05',
          action: 'DEMO_ENQUIRY_RECEIVED',
          entityType: 'DemoBooking',
          entityId: 'lead_brightfuture',
          actorId: 'guest_visitor',
          actorName: 'Bright Future Education',
          actorEmail: 'principal@brightfuture.edu.in',
          payload: { company: 'Bright Future Education', requirement: '10k inbound admissions calls' },
          createdAt: '2026-11-13T12:45:00Z'
        }
      ];
      this.persistFile(this.auditLogsFile, this.auditLogs);
    }
  }

  public getOverviewData(timeRange: string = 'Last 30 Days'): any {
    return {
      timeRange,
      metrics: {
        totalOrganizations: 248,
        organizationsTrendPercent: 12.4,
        totalUsers: 3420,
        usersTrendPercent: 18.1,
        totalCalls: 124560,
        callsTrendPercent: 27.6,
        callMinutes: 386420,
        callMinutesTrendPercent: 25.8,
        totalRevenueInr: 1875420,
        revenueTrendPercent: 31.2
      },
      callTrend: [
        { date: 'Oct 1', totalCalls: 12400, callMinutes: 38200 },
        { date: 'Oct 4', totalCalls: 15600, callMinutes: 42100 },
        { date: 'Oct 7', totalCalls: 19800, callMinutes: 51200 },
        { date: 'Oct 10', totalCalls: 22400, callMinutes: 58900 },
        { date: 'Oct 13', totalCalls: 24100, callMinutes: 62400 },
        { date: 'Oct 16', totalCalls: 26800, callMinutes: 69800 },
        { date: 'Oct 19', totalCalls: 29500, callMinutes: 76400 },
        { date: 'Oct 22', totalCalls: 33200, callMinutes: 84200 },
        { date: 'Oct 25', totalCalls: 38900, callMinutes: 98600 },
        { date: 'Oct 28', totalCalls: 44200, callMinutes: 112400 },
        { date: 'Oct 30', totalCalls: 50400, callMinutes: 128500 }
      ],
      subscriptionDistribution: [
        { planName: 'Growth', percentage: 34.1, count: 85, color: '#00f59b' },
        { planName: 'Business', percentage: 28.4, count: 70, color: '#38bdf8' },
        { planName: 'Starter', percentage: 22.6, count: 56, color: '#a855f7' },
        { planName: 'Enterprise', percentage: 14.9, count: 37, color: '#f59e0b' }
      ],
      platformHealth: {
        uptime: '100% Uptime',
        services: [
          { name: 'API Services', status: 'operational', description: 'All systems operational', uptimePercent: 100 },
          { name: 'Background Jobs', status: 'operational', description: 'Processing normally', uptimePercent: 100 },
          { name: 'Database', status: 'operational', description: 'Healthy', uptimePercent: 100 },
          { name: 'Cache (Redis)', status: 'operational', description: 'Connected', uptimePercent: 100 }
        ]
      },
      recentOrganizations: [
        { id: 'org_realvista', name: 'RealVista Properties', plan: 'Growth', planColor: 'blue', users: 22, calls30d: 38420, status: 'Active', statusColor: 'green' },
        { id: 'org_medicare', name: 'Medicare Health Services', plan: 'Business', planColor: 'purple', users: 48, calls30d: 72560, status: 'Active', statusColor: 'green' },
        { id: 'org_edusmart', name: 'EduSmart Academy', plan: 'Starter', planColor: 'grey', users: 14, calls30d: 18230, status: 'Active', statusColor: 'green' },
        { id: 'org_autodrive', name: 'AutoDrive Motors', plan: 'Growth', planColor: 'blue', users: 10, calls30d: 9840, status: 'Active', statusColor: 'green' },
        { id: 'org_shopkart', name: 'ShopKart Retail', plan: 'Business', planColor: 'purple', users: 26, calls30d: 35120, status: 'Active', statusColor: 'green' }
      ],
      recentActivities: [
        { id: 'act_1', title: 'New organization registered', description: 'Aarav Industries created an account', timeAgo: '5 min ago', type: 'org', iconColor: 'purple' },
        { id: 'act_2', title: 'Plan upgraded', description: 'RealVista Properties upgraded to Business plan', timeAgo: '28 min ago', type: 'plan', iconColor: 'green' },
        { id: 'act_3', title: 'Payment received', description: '₹ 49,999 from Medicare Health Services', timeAgo: '45 min ago', type: 'payment', iconColor: 'amber' },
        { id: 'act_4', title: 'AI provider updated', description: 'Sarvam AI (STT) configuration updated', timeAgo: '1 hr ago', type: 'provider', iconColor: 'purple' },
        { id: 'act_5', title: 'New demo enquiry', description: 'Demo request from Bright Future Education', timeAgo: '2 hrs ago', type: 'lead', iconColor: 'rose' }
      ],
      usageSummary: {
        sttMinutes: 386420,
        sttTrendPercent: 24.6,
        ttsMinutes: 392780,
        ttsTrendPercent: 26.1,
        llmTokens: '24.8M tokens',
        llmTrendPercent: 19.4,
        storageTb: '1.24 TB',
        storageTrendPercent: 11.8
      },
      topAiProviders: [
        { name: 'Sarvam AI (STT/TTS)', category: 'STT/TTS', percentage: 42.6, color: '#00f59b' },
        { name: 'OpenAI (LLM)', category: 'LLM', percentage: 28.7, color: '#a855f7' },
        { name: 'Google Cloud', category: 'STT/LLM', percentage: 18.2, color: '#38bdf8' },
        { name: 'Azure Speech', category: 'TTS', percentage: 10.5, color: '#3b82f6' }
      ]
    };
  }
}
