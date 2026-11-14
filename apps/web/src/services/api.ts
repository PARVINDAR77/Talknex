import type {
  PricingPlanModel,
  UseCaseModel,
  IntegrationModel,
  FaqModel,
  BlogPostModel,
  WebsiteSettingModel,
  NavigationItemModel
} from '@talknex/shared';
import type {
  CreateContactEnquiryDto,
  CreateDemoBookingDto,
  SubscribeNewsletterDto,
  SearchResultsResponse
} from '@talknex/contracts';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

let isBackendOffline = false;
let lastOfflineCheck = 0;
const OFFLINE_RETRY_INTERVAL = 10000; // 10 seconds

async function fetchFromApi<T>(endpoint: string, fallbackData: T): Promise<T> {
  const now = Date.now();
  // Fast failover: if the backend was unreachable recently, return fallback data instantly (0ms)
  // to prevent hanging sockets or Next.js SSR fast-refresh stream aborts
  if (isBackendOffline && now - lastOfflineCheck < OFFLINE_RETRY_INTERVAL) {
    return fallbackData;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 600);
  try {
    const url = `${API_BASE}/api/v1${endpoint}`;
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' }
    });
    clearTimeout(timer);
    isBackendOffline = false;
    if (!res.ok) return fallbackData;
    const json = await res.json();
    if (!json) return fallbackData;
    if (json.data !== undefined) return json.data;
    return json;
  } catch {
    clearTimeout(timer);
    isBackendOffline = true;
    lastOfflineCheck = Date.now();
    return fallbackData;
  }
}

export const api = {
  // Navigation & Settings
  async getNavigation(): Promise<{ header: NavigationItemModel[]; footer: Record<string, NavigationItemModel[]> }> {
    return fetchFromApi('/navigation', {
      header: [
        { id: '1', label: 'Product', href: '/product', menuLocation: 'HEADER' as any, orderIndex: 1, isActive: true },
        { id: '2', label: 'Use Cases', href: '/use-cases', menuLocation: 'HEADER' as any, orderIndex: 2, isActive: true },
        { id: '3', label: 'Pricing', href: '/pricing', menuLocation: 'HEADER' as any, orderIndex: 3, isActive: true },
        { id: '4', label: 'Resources', href: '/resources', menuLocation: 'HEADER' as any, orderIndex: 4, isActive: true },
        { id: '5', label: 'Company', href: '/about', menuLocation: 'HEADER' as any, orderIndex: 5, isActive: true }
      ],
      footer: {
        product: [
          { id: '6', label: 'AI Voice Agents', href: '/product/ai-voice-agents', menuLocation: 'FOOTER_PRODUCT' as any, orderIndex: 1, isActive: true },
          { id: '7', label: 'Campaigns', href: '/product/outbound-calling', menuLocation: 'FOOTER_PRODUCT' as any, orderIndex: 2, isActive: true },
          { id: '8', label: 'Analytics', href: '/product/analytics', menuLocation: 'FOOTER_PRODUCT' as any, orderIndex: 3, isActive: true },
          { id: '9', label: 'Integrations', href: '/product/integrations', menuLocation: 'FOOTER_PRODUCT' as any, orderIndex: 4, isActive: true }
        ],
        useCases: [
          { id: '10', label: 'Real Estate', href: '/use-cases/real-estate', menuLocation: 'FOOTER_USE_CASES' as any, orderIndex: 1, isActive: true },
          { id: '11', label: 'Healthcare', href: '/use-cases/healthcare', menuLocation: 'FOOTER_USE_CASES' as any, orderIndex: 2, isActive: true },
          { id: '12', label: 'Education', href: '/use-cases/education', menuLocation: 'FOOTER_USE_CASES' as any, orderIndex: 3, isActive: true },
          { id: '13', label: 'E-commerce', href: '/use-cases/ecommerce', menuLocation: 'FOOTER_USE_CASES' as any, orderIndex: 4, isActive: true }
        ],
        resources: [
          { id: '14', label: 'Blog', href: '/blog', menuLocation: 'FOOTER_RESOURCES' as any, orderIndex: 1, isActive: true },
          { id: '15', label: 'Guides', href: '/guides', menuLocation: 'FOOTER_RESOURCES' as any, orderIndex: 2, isActive: true },
          { id: '16', label: 'Case Studies', href: '/case-studies', menuLocation: 'FOOTER_RESOURCES' as any, orderIndex: 3, isActive: true },
          { id: '17', label: 'FAQs', href: '/#faq', menuLocation: 'FOOTER_RESOURCES' as any, orderIndex: 4, isActive: true }
        ],
        company: [
          { id: '18', label: 'About Us', href: '/about', menuLocation: 'FOOTER_COMPANY' as any, orderIndex: 1, isActive: true },
          { id: '19', label: 'Careers', href: '/careers', menuLocation: 'FOOTER_COMPANY' as any, orderIndex: 2, isActive: true },
          { id: '20', label: 'Contact Us', href: '/contact', menuLocation: 'FOOTER_COMPANY' as any, orderIndex: 3, isActive: true },
          { id: '21', label: 'Press', href: '/about#press', menuLocation: 'FOOTER_COMPANY' as any, orderIndex: 4, isActive: true }
        ]
      }
    });
  },

  async getWebsiteSettings(): Promise<WebsiteSettingModel> {
    return fetchFromApi('/website-settings', {
      id: 'default',
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
    });
  },

  // Pricing
  async getPricingPlans(): Promise<PricingPlanModel[]> {
    const fallbackPlans: PricingPlanModel[] = [
      {
        id: '1',
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
          { id: '1', planId: '1', featureId: 'f1', isIncluded: true, valueText: 'Up to 500 call minutes' },
          { id: '2', planId: '1', featureId: 'f2', isIncluded: true, valueText: '1 AI Voice Agent' },
          { id: '3', planId: '1', featureId: 'f3', isIncluded: true, valueText: 'Basic Campaigns' },
          { id: '4', planId: '1', featureId: 'f4', isIncluded: true, valueText: 'Call Recordings' }
        ]
      },
      {
        id: '2',
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
          { id: '5', planId: '2', featureId: 'f1', isIncluded: true, valueText: 'Up to 2,500 call minutes' },
          { id: '6', planId: '2', featureId: 'f2', isIncluded: true, valueText: '5 AI Voice Agents' },
          { id: '7', planId: '2', featureId: 'f3', isIncluded: true, valueText: 'Advanced Campaigns' },
          { id: '8', planId: '2', featureId: 'f4', isIncluded: true, valueText: 'Lead & CRM' },
          { id: '9', planId: '2', featureId: 'f5', isIncluded: true, valueText: 'Analytics & Reports' }
        ]
      },
      {
        id: '3',
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
          { id: '10', planId: '3', featureId: 'f1', isIncluded: true, valueText: 'Up to 10,000 call minutes' },
          { id: '11', planId: '3', featureId: 'f2', isIncluded: true, valueText: '10 AI Voice Agents' },
          { id: '12', planId: '3', featureId: 'f3', isIncluded: true, valueText: 'Team Collaboration' },
          { id: '13', planId: '3', featureId: 'f4', isIncluded: true, valueText: 'Integrations (CRM, Calendar)' },
          { id: '14', planId: '3', featureId: 'f5', isIncluded: true, valueText: 'Priority Support' }
        ]
      },
      {
        id: '4',
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
          { id: '15', planId: '4', featureId: 'f1', isIncluded: true, valueText: 'High-volume & custom needs' },
          { id: '16', planId: '4', featureId: 'f2', isIncluded: true, valueText: 'Unlimited Agents' },
          { id: '17', planId: '4', featureId: 'f3', isIncluded: true, valueText: 'Dedicated Infrastructure' },
          { id: '18', planId: '4', featureId: 'f4', isIncluded: true, valueText: 'Custom Integrations' },
          { id: '19', planId: '4', featureId: 'f5', isIncluded: true, valueText: 'SLA & Priority Support' }
        ]
      }
    ];

    try {
      const res = await fetchFromApi('/pricing/plans', fallbackPlans);
      if (Array.isArray(res) && res.length > 0) return res;
      if (res && Array.isArray((res as any).data) && (res as any).data.length > 0) return (res as any).data;
    } catch {}

    return fallbackPlans;
  },

  async getPricingComparison() {
    const plans = await this.getPricingPlans();
    const fallbackCategories = [
      {
        category: 'Calling & Capacity',
        features: [
          {
            id: 'feat_1',
            name: 'Included Call Minutes',
            description: 'Outbound and inbound connected voice minutes',
            planValues: plans.map((p) => ({
              planSlug: p.slug,
              planName: p.name,
              isIncluded: true,
              valueText:
                p.slug === 'starter'
                  ? 'Up to 500 mins/mo'
                  : p.slug === 'growth'
                  ? 'Up to 2,500 mins/mo'
                  : p.slug === 'business'
                  ? 'Up to 10,000 mins/mo'
                  : 'Unlimited / Custom'
            }))
          },
          {
            id: 'feat_2',
            name: 'Active AI Voice Agents',
            description: 'Independent autonomous bots with unique personalities',
            planValues: plans.map((p) => ({
              planSlug: p.slug,
              planName: p.name,
              isIncluded: true,
              valueText:
                p.slug === 'starter'
                  ? '1 Agent'
                  : p.slug === 'growth'
                  ? '5 Agents'
                  : p.slug === 'business'
                  ? '10 Agents'
                  : 'Unlimited'
            }))
          },
          {
            id: 'feat_concurrency',
            name: 'Concurrent Call Channels',
            description: 'Simultaneous simultaneous inbound and outbound conversations',
            planValues: plans.map((p) => ({
              planSlug: p.slug,
              planName: p.name,
              isIncluded: true,
              valueText:
                p.slug === 'starter'
                  ? '5 lines'
                  : p.slug === 'growth'
                  ? '25 lines'
                  : p.slug === 'business'
                  ? '100 lines'
                  : '1,000+ lines'
            }))
          }
        ]
      },
      {
        category: 'Languages & Speech Intelligence',
        features: [
          {
            id: 'feat_3',
            name: 'Indian Languages (Hindi, Gujarati, English, etc.)',
            description: 'Full regional voice models with accent comprehension',
            planValues: plans.map((p) => ({
              planSlug: p.slug,
              planName: p.name,
              isIncluded: true,
              valueText:
                p.slug === 'starter'
                  ? 'Hindi & English'
                  : p.slug === 'growth'
                  ? 'Hindi, Gujarati, English + 4 more'
                  : 'All 12+ Indian Languages'
            }))
          },
          {
            id: 'feat_4',
            name: 'Full-Duplex Interruption Handling',
            description: 'Caller can interrupt AI agent naturally mid-sentence',
            planValues: plans.map((p) => ({
              planSlug: p.slug,
              planName: p.name,
              isIncluded: true,
              valueText: null
            }))
          },
          {
            id: 'feat_latency',
            name: 'Sub-600ms Response Latency',
            description: 'Ultra-low turn-taking latency mimicking human conversation',
            planValues: plans.map((p) => ({
              planSlug: p.slug,
              planName: p.name,
              isIncluded: true,
              valueText: null
            }))
          }
        ]
      },
      {
        category: 'Integrations & Telephony',
        features: [
          {
            id: 'feat_5',
            name: 'Lead Capture & CRM Sync',
            description: 'Auto-sync transcripts and qualification data into CRM',
            planValues: plans.map((p) => ({
              planSlug: p.slug,
              planName: p.name,
              isIncluded: p.slug !== 'starter',
              valueText: p.slug === 'starter' ? 'Manual Export' : 'Instant Real-time Sync'
            }))
          },
          {
            id: 'feat_6',
            name: 'Calendar Appointment Booking',
            description: 'Direct integration with Google Calendar and Calendly',
            planValues: plans.map((p) => ({
              planSlug: p.slug,
              planName: p.name,
              isIncluded: p.slug !== 'starter',
              valueText: null
            }))
          },
          {
            id: 'feat_telephony',
            name: 'Bring-Your-Own-Carrier (BYOC / SIP Trunking)',
            description: 'Connect existing telecom carrier or virtual numbers',
            planValues: plans.map((p) => ({
              planSlug: p.slug,
              planName: p.name,
              isIncluded: p.slug === 'business' || p.slug === 'enterprise',
              valueText: p.slug === 'starter' || p.slug === 'growth' ? 'TalkNex Numbers' : 'Supported'
            }))
          }
        ]
      },
      {
        category: 'Compliance & Support',
        features: [
          {
            id: 'feat_trai',
            name: 'TRAI & DND Scrubbing Engine',
            description: 'Automated 140 prefix compliance and DND registration checks',
            planValues: plans.map((p) => ({
              planSlug: p.slug,
              planName: p.name,
              isIncluded: true,
              valueText: 'Built-in'
            }))
          },
          {
            id: 'feat_support',
            name: 'Customer Support & SLA',
            description: 'Technical assistance and uptime guarantees',
            planValues: plans.map((p) => ({
              planSlug: p.slug,
              planName: p.name,
              isIncluded: true,
              valueText:
                p.slug === 'starter'
                  ? 'Email (48h)'
                  : p.slug === 'growth'
                  ? 'Priority Email & Chat (12h)'
                  : p.slug === 'business'
                  ? 'Dedicated Slack & Phone (2h)'
                  : '24/7 Dedicated TAM & 99.99% SLA'
            }))
          }
        ]
      }
    ];

    try {
      const res = await fetchFromApi('/pricing/compare', { plans, categories: fallbackCategories });
      if (res && (res as any).plans && Array.isArray((res as any).categories) && (res as any).categories.length > 0) return res as any;
      if (res && (res as any).data && Array.isArray((res as any).data.categories) && (res as any).data.categories.length > 0) return (res as any).data;
    } catch {}

    return { plans, categories: fallbackCategories };
  },

  // Use Cases
  async getUseCases(): Promise<UseCaseModel[]> {
    return fetchFromApi('/use-cases', [
      {
        id: '1',
        slug: 'real-estate',
        title: 'Real Estate Lead Qualification & Site Visits',
        industry: 'Real Estate',
        summary: 'Qualify leads, share project details, and book site visits.',
        problemStatement: '80% of property inquiries go cold because agents call back too late.',
        solutionOverview: 'TalkNex calls within 30 seconds, qualifies budget, and books tours.',
        sampleDialogue: [
          { speaker: 'Customer', time: '00:00:06', text: 'क्या आप प्रोजेक्ट के बारे में जानकारी दे सकते हैं?', language: 'Hindi' },
          { speaker: 'AI Agent', time: '00:00:10', text: 'ज़रूर! हमारे पास 2 BHK और 3 BHK के अपार्टमेंट्स उपलब्ध हैं। क्या आप अपना बजट बताना चाहेंगे?', language: 'Hindi' }
        ],
        benefits: ['Instant 30s response', 'Verified buyer budgets', 'Direct CRM sync'],
        orderIndex: 1,
        isActive: true
      },
      {
        id: '2',
        slug: 'healthcare',
        title: 'Healthcare Patient Appointments & Care Follow-ups',
        industry: 'Healthcare',
        summary: 'Handle appointments, reminders, and patient support.',
        problemStatement: 'Clinics lose revenue due to 25% appointment no-show rates.',
        solutionOverview: 'Empathetic automated reminders and scheduling in regional languages.',
        sampleDialogue: [
          { speaker: 'Customer', time: '00:00:05', text: 'मुझे कल डॉक्टर शर्मा से मिलना है, क्या अपॉइंटमेंट मिल सकता है?', language: 'Hindi' },
          { speaker: 'AI Agent', time: '00:00:09', text: 'नमस्ते! डॉक्टर शर्मा कल दोपहर 3:30 और शाम 5:00 बजे उपलब्ध हैं। कौन सा समय आपके लिए ठीक रहेगा?', language: 'Hindi' }
        ],
        benefits: ['40% fewer no-shows', 'Zero front-desk queues', '24/7 patient booking'],
        orderIndex: 2,
        isActive: true
      },
      {
        id: '3',
        slug: 'education',
        title: 'Education Admissions & Student Counseling',
        industry: 'Education',
        summary: 'Counsel students, share course details, and book campus tours.',
        problemStatement: 'High-intent admission leads drop off without timely counseling, resulting in unfilled seats across academic programs.',
        solutionOverview: 'Intelligent admission guidance and syllabus explanation at scale with automated counsellor appointment locking.',
        sampleDialogue: [
          { speaker: 'Customer', time: '00:00:04', text: 'Hi, I saw your Data Science & AI postgraduate program. What is the fee structure and eligibility?', language: 'English' },
          { speaker: 'AI Agent', time: '00:00:08', text: 'Hello! The 2-year Data Science Master program requires a 60% graduation score in STEM. The fee is ₹2.4 Lakhs with zero-cost EMI options. Would you like me to book a 1-on-1 counseling session with our academic dean?', language: 'English' },
          { speaker: 'Customer', time: '00:00:15', text: 'हाँ, शनिवार को दोपहर का समय ठीक रहेगा।', language: 'Hindi' },
          { speaker: 'AI Agent', time: '00:00:19', text: 'बिल्कुल! मैंने शनिवार दोपहर 2:30 बजे आपकी काउंसलिंग कॉल बुक कर दी है। आपके व्हाट्सएप पर कन्फर्मेशन और ब्रोशर लिंक भेज दिया गया है।', language: 'Hindi' }
        ],
        benefits: ['Instant counseling (<30s)', 'Bilingual syllabus FAQ answers', '42% higher enrollments'],
        orderIndex: 3,
        isActive: true
      },
      {
        id: '4',
        slug: 'ecommerce',
        title: 'E-commerce COD Verification & Order Logistics',
        industry: 'E-commerce',
        summary: 'Confirm COD orders, verify address accuracy, and reduce RTO losses.',
        problemStatement: 'Return-to-Origin (RTO) expenses erode up to 30% of D2C e-commerce margins due to unverified orders and fake addresses.',
        solutionOverview: 'Instant automated address verification and Cash-on-Delivery confirmation calls dispatched immediately upon checkout.',
        sampleDialogue: [
          { speaker: 'AI Agent', time: '00:00:03', text: 'नमस्ते राहुल जी! Emperor Fashion से आपका ₹1,899 का लेदर जैकेट ऑर्डर मिला है। क्या आप कैश ऑन डिलीवरी कन्फर्म करना चाहते हैं?', language: 'Hindi' },
          { speaker: 'Customer', time: '00:00:09', text: 'हाँ, मैं ऑर्डर कन्फर्म करना चाहता हूँ। डिलीवरी कब तक होगी?', language: 'Hindi' },
          { speaker: 'AI Agent', time: '00:00:13', text: 'आपका ऑर्डर कन्फर्म हो गया है और यह 3 दिनों में आपके अंधेरी वेस्ट वाले पते पर पहुँच जाएगा। ट्रैकिंग लिंक हमने SMS और WhatsApp पर शेयर कर दिया है!', language: 'Hindi' }
        ],
        benefits: ['35% RTO reduction', 'Instant address validation', 'Shopify & WooCommerce synced'],
        orderIndex: 4,
        isActive: true
      },
      {
        id: '5',
        slug: 'automotive',
        title: 'Automotive Test Drive Leads & Service Reminders',
        industry: 'Automotive',
        summary: 'Generate test drive leads, schedule showroom visits, and automate periodic service alerts.',
        problemStatement: 'Car buyers look at competitors if test drive inquiries are not responded to within the first 15 minutes.',
        solutionOverview: 'Sub-30 second test drive booking, variant availability lookup, and automated maintenance reminders linked with DMS.',
        sampleDialogue: [
          { speaker: 'Customer', time: '00:00:05', text: 'नमस्ते, मुझे नई SUV के टॉप मॉडल की टेस्ट ड्राइव लेनी थी। क्या वीकेंड पर स्लॉट मिल सकता है?', language: 'Hindi' },
          { speaker: 'AI Agent', time: '00:00:10', text: 'नमस्ते! हमारे नवरंगपुरा शोरूम में शनिवार को सुबह 11:30 बजे और रविवार को शाम 4:00 बजे टेस्ट ड्राइव स्लॉट खाली हैं। कौन सा समय आपके लिए सुविधाजनक रहेगा?', language: 'Hindi' },
          { speaker: 'Customer', time: '00:00:17', text: 'Saturday 11:30 AM works great for me.', language: 'English' },
          { speaker: 'AI Agent', time: '00:00:21', text: 'Confirmed! We have reserved your test drive for Saturday at 11:30 AM. Your relationship manager Mr. Patel will have the vehicle ready. See you soon!', language: 'English' }
        ],
        benefits: ['3.4x higher showroom visits', 'Automated service maintenance alerts', 'Dealer DMS two-way sync'],
        orderIndex: 5,
        isActive: true
      },
      {
        id: '6',
        slug: 'manufacturing',
        title: 'Manufacturing Dealer Inquiries & Supply Updates',
        industry: 'Manufacturing',
        summary: 'Dealer enquiries, raw material dispatch status, and supply logistics.',
        problemStatement: 'Distributors face hours of delay tracking dispatch schedules and inventory quotes through busy phone lines.',
        solutionOverview: '24/7 automated ERP inquiry resolution for commercial dealers and regional warehouse distribution partners.',
        sampleDialogue: [
          { speaker: 'Customer', time: '00:00:04', text: 'नमस्ते, गुजरात प्लांट से ऑर्डर नंबर 4082 का डिस्पैच स्टेटस क्या है?', language: 'Hindi' },
          { speaker: 'AI Agent', time: '00:00:09', text: 'ऑर्डर नंबर 4082 कल रात 10 बजे डिस्पैच हो चुका है। ट्रक का लाइव GPS लोकेशन सूरत हाइवे पर है और कल सुबह 9 बजे तक आपके वेयरहाउस पहुँच जाएगा।', language: 'Hindi' }
        ],
        benefits: ['Automated dispatch tracking', 'Zero hold times for distributors', 'SAP & Oracle ERP webhook support'],
        orderIndex: 6,
        isActive: true
      }
    ]);
  },

  async getUseCaseBySlug(slug: string): Promise<UseCaseModel | null> {
    const list = await this.getUseCases();
    return (
      list.find(
        (u) =>
          u.slug === slug ||
          (slug === 'e-commerce' && u.slug === 'ecommerce') ||
          (slug === 'ecommerce' && u.slug === 'e-commerce')
      ) || list[0]
    );
  },

  // Integrations
  async getIntegrations(): Promise<IntegrationModel[]> {
    return fetchFromApi('/integrations', [
      {
        id: '1',
        slug: 'hubspot',
        name: 'HubSpot CRM',
        category: 'CRM',
        description: 'Synchronize live call recordings, full transcripts, and lead qualification scores directly into HubSpot.',
        status: 'AVAILABLE' as any,
        capabilities: ['Two-way Contact Sync', 'Call Recording Attachment', 'Deal Stage Updates'],
        connectionGuide: 'Connect via OAuth with your HubSpot portal.',
        orderIndex: 1
      },
      {
        id: '2',
        slug: 'salesforce',
        name: 'Salesforce',
        category: 'CRM',
        description: 'Enterprise integration with Salesforce leads, contacts, and custom object records.',
        status: 'AVAILABLE' as any,
        capabilities: ['Lead Creation', 'Task Logging', 'Custom Field Mapping'],
        connectionGuide: 'Authorize via Connected App credentials.',
        orderIndex: 2
      },
      {
        id: '3',
        slug: 'zoho-crm',
        name: 'Zoho CRM',
        category: 'CRM',
        description: 'Native connection for lead capture and notes attachment across India.',
        status: 'AVAILABLE' as any,
        capabilities: ['Instant Lead Capture', 'Field Mapping'],
        connectionGuide: 'Authenticate with Zoho API tokens.',
        orderIndex: 3
      },
      {
        id: '4',
        slug: 'google-calendar',
        name: 'Google Calendar',
        category: 'CALENDAR',
        description: 'Let voice agents query real-time availability and schedule meetings.',
        status: 'AVAILABLE' as any,
        capabilities: ['Conflict Checking', 'Meet Link Generation'],
        connectionGuide: 'Sign in with Google Workspace.',
        orderIndex: 4
      },
      {
        id: '5',
        slug: 'whatsapp-business',
        name: 'WhatsApp Business',
        category: 'MESSAGING',
        description: 'Send brochures and pins via official WhatsApp templates immediately after calls.',
        status: 'AVAILABLE' as any,
        capabilities: ['Template Messaging', 'Document Dispatch'],
        connectionGuide: 'Configure Meta Cloud API credentials.',
        orderIndex: 5
      },
      {
        id: '6',
        slug: 'meta-lead-ads',
        name: 'Meta Lead Ads',
        category: 'ADS',
        description: 'Trigger automated voice calls within 15 seconds of Facebook & Instagram ad submissions.',
        status: 'AVAILABLE' as any,
        capabilities: ['Instant Lead Webhook', 'Sub-30s Call Trigger'],
        connectionGuide: 'Connect your Facebook Page.',
        orderIndex: 6
      },
      {
        id: '7',
        slug: 'shopify',
        name: 'Shopify',
        category: 'ECOMMERCE',
        description: 'Automate COD confirmation and address validation calls for Indian merchants.',
        status: 'AVAILABLE' as any,
        capabilities: ['COD Verification', 'Order Status Querying'],
        connectionGuide: 'Install via Shopify app store.',
        orderIndex: 7
      },
      {
        id: '8',
        slug: 'webhooks',
        name: 'Custom REST Webhooks',
        category: 'WEBHOOKS',
        description: 'Stream real-time call events and transcripts to your proprietary backend or Zapier.',
        status: 'AVAILABLE' as any,
        capabilities: ['HMAC Authentication', 'Full JSON Payload', 'Instant Trigger'],
        connectionGuide: 'Enter your HTTPS webhook URL in the dashboard.',
        orderIndex: 8
      }
    ]);
  },

  async getIntegrationBySlug(slug: string): Promise<IntegrationModel | null> {
    const list = await this.getIntegrations();
    return list.find((i) => i.slug === slug) || list[0];
  },

  // FAQs
  async getFaqs(): Promise<FaqModel[]> {
    const fallbackFaqs: FaqModel[] = [
      {
        id: '1',
        question: 'What is TalkNex?',
        answer: 'TalkNex is an enterprise-grade AI voice platform built by Emperor Smart Solutions that enables businesses to deploy human-like conversational voice agents. TalkNex agents handle both inbound customer support and high-volume outbound calling campaigns, qualifying leads, booking calendar appointments, and answering customer queries in natural human speech.',
        category: 'General',
        orderIndex: 1,
        isFeatured: true
      },
      {
        id: '2',
        question: 'Does it support Indian languages like Hindi and Gujarati?',
        answer: 'Yes! TalkNex is engineered from the ground up for the Indian market, supporting Hindi, Gujarati, Indian English, Marathi, Tamil, Telugu, Kannada, Bengali, and code-mixed speech (Hinglish/Gujlish). Our voice models comprehend regional accents and nuances with high transcription accuracy.',
        category: 'General',
        orderIndex: 2,
        isFeatured: true
      },
      {
        id: '3',
        question: 'Can I use my existing phone number?',
        answer: 'Yes. TalkNex supports Bring-Your-Own-Carrier (BYOC) through SIP trunking, as well as call forwarding from your existing business landline, mobile, or cloud telephony numbers (such as Exotel, Tata Tele, Airtel, or Twilio). Incoming calls can seamlessly ring your AI voice agent.',
        category: 'Technical',
        orderIndex: 3,
        isFeatured: true
      },
      {
        id: '4',
        question: 'How is it different from a call center or IVR?',
        answer: 'Traditional IVRs force callers through rigid, frustrating keypad trees ("Press 1 for Sales, Press 2 for Support"). TalkNex provides dynamic, two-way conversational AI that listens, understands intent, interrupts naturally if the user speaks, and answers questions intelligently without rigid menus.',
        category: 'General',
        orderIndex: 4,
        isFeatured: true
      },
      {
        id: '5',
        question: 'Is it compliant with TRAI and Indian regulations?',
        answer: 'Yes. TalkNex strictly complies with Telecom Regulatory Authority of India (TRAI) guidelines and TCCCPR regulations. We support DND (Do-Not-Disturb) scrubbing, authorized 140-series commercial calling prefixes, consent management, calling time-window enforcement (9 AM to 9 PM), and transparent caller identification.',
        category: 'Compliance',
        orderIndex: 5,
        isFeatured: true
      }
    ];

    try {
      const res = await fetchFromApi('/faqs', fallbackFaqs);
      if (Array.isArray(res) && res.length > 0) return res;
      if (res && Array.isArray((res as any).data) && (res as any).data.length > 0) return (res as any).data;
    } catch {}

    return fallbackFaqs;
  },

  // Blog
  async getBlogPosts(page = 1, limit = 9): Promise<{ posts: BlogPostModel[]; total: number }> {
    const fallbackPosts: BlogPostModel[] = [
      {
        id: '1',
        slug: 'what-are-ai-voice-agents-and-how-do-they-work',
        title: 'What Are AI Voice Agents and How Do They Work?',
        excerpt: 'Explore the underlying architecture of human-like AI voice agents: automatic speech recognition, ultra-low latency LLMs, and expressive neural speech synthesis.',
        content: 'Full article content on speech models, neural prosody, and real-time full-duplex conversational audio.',
        coverImageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop',
        readingTimeMinutes: 6,
        authorId: 'auth_1',
        categoryId: 'cat_1',
        status: 'PUBLISHED' as any,
        publishedAt: '2026-11-10T09:00:00Z',
        author: { id: 'auth_1', name: 'Emperor AI Research', slug: 'emperor-ai-research', title: 'AI Research Team' },
        category: { id: 'cat_1', name: 'Technology & AI', slug: 'technology' }
      },
      {
        id: '2',
        slug: '10-real-business-use-cases-for-ai-voice-calling-in-india',
        title: '10 Real Business Use Cases for AI Voice Calling in India',
        excerpt: 'Discover practical, high-ROI applications of autonomous voice calling across real estate, healthcare, education, retail, and financial services.',
        content: 'Real business applications driving high conversions in high-touch Indian sectors.',
        coverImageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop',
        readingTimeMinutes: 8,
        authorId: 'auth_1',
        categoryId: 'cat_2',
        status: 'PUBLISHED' as any,
        publishedAt: '2026-11-05T09:00:00Z',
        author: { id: 'auth_1', name: 'Emperor AI Research', slug: 'emperor-ai-research', title: 'AI Research Team' },
        category: { id: 'cat_2', name: 'Business Growth', slug: 'business-growth' }
      },
      {
        id: '3',
        slug: 'ai-calling-in-india-compliance-trai-rules-and-best-practices',
        title: 'AI Calling in India: Compliance, TRAI Rules and Best Practices',
        excerpt: 'A comprehensive operational guide to navigating TRAI regulations, DND scrubbing, DLT registration, and lawful voice automation in India.',
        content: 'Compliance standards, DND scrubbing, 140 prefixes, and calling time windows.',
        coverImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop',
        readingTimeMinutes: 7,
        authorId: 'auth_1',
        categoryId: 'cat_3',
        status: 'PUBLISHED' as any,
        publishedAt: '2026-10-28T09:00:00Z',
        author: { id: 'auth_1', name: 'Emperor AI Research', slug: 'emperor-ai-research', title: 'AI Research Team' },
        category: { id: 'cat_3', name: 'Compliance & Regulations', slug: 'compliance' }
      }
    ];

    try {
      const res = await fetchFromApi<{ data: BlogPostModel[]; pagination: any }>(`/blog?page=${page}&limit=${limit}`, {
        data: fallbackPosts,
        pagination: { total: 3 }
      });

      return {
        posts: Array.isArray((res as any)?.data) ? (res as any).data : Array.isArray(res) ? (res as any) : fallbackPosts,
        total: (res as any)?.pagination?.total || 3
      };
    } catch {
      return { posts: fallbackPosts, total: 3 };
    }
  },

  async getBlogPostBySlug(slug: string): Promise<BlogPostModel | null> {
    const list = await this.getBlogPosts();
    return list.posts.find((p) => p.slug === slug) || list.posts[0];
  },

  // Leads & Contact
  async submitContact(dto: CreateContactEnquiryDto) {
    const res = await fetch(`${API_BASE}/api/v1/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const detailedMsg = Array.isArray(err.errors)
        ? err.errors.map((e: any) => e.message || e).join(', ')
        : Array.isArray(err.message)
        ? err.message.join(', ')
        : err.message || 'Failed to submit contact enquiry';
      throw new Error(detailedMsg);
    }
    return res.json();
  },

  async submitDemoBooking(dto: CreateDemoBookingDto) {
    const res = await fetch(`${API_BASE}/api/v1/demo-bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to schedule demo booking');
    }
    return res.json();
  },

  async getDemoAvailability() {
    return fetchFromApi('/demo-bookings/availability', {
      timeZone: 'Asia/Kolkata (IST)',
      availableDates: [
        { date: '2026-11-14', dayName: 'Friday', slots: ['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '05:30 PM'] },
        { date: '2026-11-15', dayName: 'Saturday', slots: ['11:00 AM', '01:00 PM', '03:00 PM'] },
        { date: '2026-11-17', dayName: 'Monday', slots: ['09:30 AM', '11:00 AM', '02:30 PM', '04:30 PM'] },
        { date: '2026-11-18', dayName: 'Tuesday', slots: ['10:00 AM', '12:00 PM', '03:00 PM', '05:00 PM'] }
      ]
    });
  },

  async subscribeNewsletter(dto: SubscribeNewsletterDto) {
    const res = await fetch(`${API_BASE}/api/v1/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to subscribe');
    }
    return res.json();
  },

  async search(query: string): Promise<SearchResultsResponse> {
    return fetchFromApi(`/search?q=${encodeURIComponent(query)}`, {
      query,
      items: [],
      totalResults: 0
    });
  }
};
