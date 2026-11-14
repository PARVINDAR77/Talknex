import { PrismaClient, ContentStatus, MenuLocation, IntegrationStatus, LeadStatus, BookingStatus, UserRole } from '@prisma/client';
import { IntegrationCategory } from '@talknex/shared';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding TalkNex database...');

  // 1. Website Settings
  await prisma.websiteSetting.upsert({
    where: { id: 'default-settings' },
    update: {},
    create: {
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
    }
  });

  // 2. Navigation Items
  const navItems = [
    // Header Navigation
    { label: 'Product', href: '/product', menuLocation: MenuLocation.HEADER, orderIndex: 1 },
    { label: 'Use Cases', href: '/use-cases', menuLocation: MenuLocation.HEADER, orderIndex: 2 },
    { label: 'Pricing', href: '/pricing', menuLocation: MenuLocation.HEADER, orderIndex: 3 },
    { label: 'Resources', href: '/resources', menuLocation: MenuLocation.HEADER, orderIndex: 4 },
    { label: 'Company', href: '/about', menuLocation: MenuLocation.HEADER, orderIndex: 5 },

    // Footer - Product
    { label: 'AI Voice Agents', href: '/product/ai-voice-agents', menuLocation: MenuLocation.FOOTER_PRODUCT, orderIndex: 1 },
    { label: 'Outbound Calling', href: '/product/outbound-calling', menuLocation: MenuLocation.FOOTER_PRODUCT, orderIndex: 2 },
    { label: 'Inbound Calling', href: '/product/inbound-calling', menuLocation: MenuLocation.FOOTER_PRODUCT, orderIndex: 3 },
    { label: 'Lead Qualification', href: '/product/lead-qualification', menuLocation: MenuLocation.FOOTER_PRODUCT, orderIndex: 4 },
    { label: 'Appointment Booking', href: '/product/appointment-booking', menuLocation: MenuLocation.FOOTER_PRODUCT, orderIndex: 5 },
    { label: 'Analytics & Reports', href: '/product/analytics', menuLocation: MenuLocation.FOOTER_PRODUCT, orderIndex: 6 },
    { label: 'Integrations', href: '/product/integrations', menuLocation: MenuLocation.FOOTER_PRODUCT, orderIndex: 7 },

    // Footer - Use Cases
    { label: 'Real Estate', href: '/use-cases/real-estate', menuLocation: MenuLocation.FOOTER_USE_CASES, orderIndex: 1 },
    { label: 'Healthcare', href: '/use-cases/healthcare', menuLocation: MenuLocation.FOOTER_USE_CASES, orderIndex: 2 },
    { label: 'Education', href: '/use-cases/education', menuLocation: MenuLocation.FOOTER_USE_CASES, orderIndex: 3 },
    { label: 'E-commerce', href: '/use-cases/ecommerce', menuLocation: MenuLocation.FOOTER_USE_CASES, orderIndex: 4 },
    { label: 'Manufacturing', href: '/use-cases/manufacturing', menuLocation: MenuLocation.FOOTER_USE_CASES, orderIndex: 5 },
    { label: 'Automotive', href: '/use-cases/automotive', menuLocation: MenuLocation.FOOTER_USE_CASES, orderIndex: 6 },

    // Footer - Resources
    { label: 'Blog & Articles', href: '/blog', menuLocation: MenuLocation.FOOTER_RESOURCES, orderIndex: 1 },
    { label: 'How It Works', href: '/how-it-works', menuLocation: MenuLocation.FOOTER_RESOURCES, orderIndex: 2 },
    { label: 'Guides & Manuals', href: '/guides', menuLocation: MenuLocation.FOOTER_RESOURCES, orderIndex: 3 },
    { label: 'Compare Plans', href: '/pricing/compare', menuLocation: MenuLocation.FOOTER_RESOURCES, orderIndex: 4 },
    { label: 'Frequently Asked Questions', href: '/#faq', menuLocation: MenuLocation.FOOTER_RESOURCES, orderIndex: 5 },

    // Footer - Company
    { label: 'About Emperor Smart Solutions', href: '/about', menuLocation: MenuLocation.FOOTER_COMPANY, orderIndex: 1 },
    { label: 'Contact Us', href: '/contact', menuLocation: MenuLocation.FOOTER_COMPANY, orderIndex: 2 },
    { label: 'Book a Demonstration', href: '/book-demo', menuLocation: MenuLocation.FOOTER_COMPANY, orderIndex: 3 },
    { label: 'Careers', href: '/careers', menuLocation: MenuLocation.FOOTER_COMPANY, orderIndex: 4 },
    { label: 'Partners & Agencies', href: '/partners', menuLocation: MenuLocation.FOOTER_COMPANY, orderIndex: 5 },
    { label: 'Privacy Policy', href: '/privacy-policy', menuLocation: MenuLocation.FOOTER_COMPANY, orderIndex: 6 },
    { label: 'Terms of Service', href: '/terms-of-service', menuLocation: MenuLocation.FOOTER_COMPANY, orderIndex: 7 },
    { label: 'Compliance & Regulations', href: '/compliance', menuLocation: MenuLocation.FOOTER_COMPANY, orderIndex: 8 }
  ];

  for (const item of navItems) {
    const existing = await prisma.navigationItem.findFirst({
      where: { label: item.label, menuLocation: item.menuLocation }
    });
    if (!existing) {
      await prisma.navigationItem.create({ data: item });
    }
  }

  // 3. Pricing Plans
  const plans = [
    {
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
      displayOrder: 1
    },
    {
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
      displayOrder: 2
    },
    {
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
      displayOrder: 3
    },
    {
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
      displayOrder: 4
    }
  ];

  for (const plan of plans) {
    await prisma.pricingPlan.upsert({
      where: { slug: plan.slug },
      update: plan,
      create: plan
    });
  }

  // 4. Pricing Features and Feature Matrix
  const features = [
    { category: 'Calling & Capacity', name: 'Included Call Minutes', orderIndex: 1 },
    { category: 'Calling & Capacity', name: 'Active AI Voice Agents', orderIndex: 2 },
    { category: 'Calling & Capacity', name: 'Concurrent Calls', orderIndex: 3 },
    { category: 'Languages & Voice', name: 'Indian Languages (Hindi, Gujarati, etc.)', orderIndex: 4 },
    { category: 'Languages & Voice', name: 'Human-like Voice Synthesizer', orderIndex: 5 },
    { category: 'Features', name: 'Outbound Calling Campaigns', orderIndex: 6 },
    { category: 'Features', name: 'Inbound Call Reception', orderIndex: 7 },
    { category: 'Features', name: 'Lead Qualification & CRM Push', orderIndex: 8 },
    { category: 'Features', name: 'Automated Calendar Appointment Booking', orderIndex: 9 },
    { category: 'Features', name: 'Call Recording & Bilingual Transcription', orderIndex: 10 },
    { category: 'Features', name: 'Analytics, Sentiment & Reports', orderIndex: 11 },
    { category: 'Support & Infrastructure', name: 'API & Webhook Access', orderIndex: 12 },
    { category: 'Support & Infrastructure', name: 'Dedicated Account Manager & SLA', orderIndex: 13 }
  ];

  for (const feat of features) {
    const existing = await prisma.pricingFeature.findFirst({
      where: { name: feat.name }
    });
    if (!existing) {
      await prisma.pricingFeature.create({ data: feat });
    }
  }

  // Assign features to plans
  const starterPlan = await prisma.pricingPlan.findUnique({ where: { slug: 'starter' } });
  const growthPlan = await prisma.pricingPlan.findUnique({ where: { slug: 'growth' } });
  const businessPlan = await prisma.pricingPlan.findUnique({ where: { slug: 'business' } });
  const enterprisePlan = await prisma.pricingPlan.findUnique({ where: { slug: 'enterprise' } });
  const allFeatures = await prisma.pricingFeature.findMany();

  if (starterPlan && growthPlan && businessPlan && enterprisePlan) {
    for (const feat of allFeatures) {
      // Starter
      let starterIncluded = false;
      let starterVal: string | null = null;
      if (feat.name === 'Included Call Minutes') { starterIncluded = true; starterVal = 'Up to 500 mins/mo'; }
      else if (feat.name === 'Active AI Voice Agents') { starterIncluded = true; starterVal = '1 Agent'; }
      else if (feat.name === 'Concurrent Calls') { starterIncluded = true; starterVal = '5 Concurrent'; }
      else if (feat.name === 'Indian Languages (Hindi, Gujarati, etc.)') { starterIncluded = true; starterVal = 'Hindi & English'; }
      else if (feat.name === 'Human-like Voice Synthesizer') { starterIncluded = true; }
      else if (feat.name === 'Outbound Calling Campaigns') { starterIncluded = true; starterVal = 'Basic'; }
      else if (feat.name === 'Call Recording & Bilingual Transcription') { starterIncluded = true; }

      await prisma.planFeatureAssignment.upsert({
        where: { planId_featureId: { planId: starterPlan.id, featureId: feat.id } },
        update: { isIncluded: starterIncluded, valueText: starterVal },
        create: { planId: starterPlan.id, featureId: feat.id, isIncluded: starterIncluded, valueText: starterVal }
      });

      // Growth
      let growthIncluded = true;
      let growthVal: string | null = null;
      if (feat.name === 'Included Call Minutes') growthVal = 'Up to 2,500 mins/mo';
      else if (feat.name === 'Active AI Voice Agents') growthVal = '5 Agents';
      else if (feat.name === 'Concurrent Calls') growthVal = '25 Concurrent';
      else if (feat.name === 'Indian Languages (Hindi, Gujarati, etc.)') growthVal = 'Hindi, Gujarati, English + 4 more';
      else if (feat.name === 'Dedicated Account Manager & SLA') growthIncluded = false;

      await prisma.planFeatureAssignment.upsert({
        where: { planId_featureId: { planId: growthPlan.id, featureId: feat.id } },
        update: { isIncluded: growthIncluded, valueText: growthVal },
        create: { planId: growthPlan.id, featureId: feat.id, isIncluded: growthIncluded, valueText: growthVal }
      });

      // Business
      let bizIncluded = true;
      let bizVal: string | null = null;
      if (feat.name === 'Included Call Minutes') bizVal = 'Up to 10,000 mins/mo';
      else if (feat.name === 'Active AI Voice Agents') bizVal = '10 Agents';
      else if (feat.name === 'Concurrent Calls') bizVal = '100 Concurrent';
      else if (feat.name === 'Indian Languages (Hindi, Gujarati, etc.)') bizVal = 'All 12+ Indian Languages';
      else if (feat.name === 'Dedicated Account Manager & SLA') bizVal = 'Priority 24/7 Support';

      await prisma.planFeatureAssignment.upsert({
        where: { planId_featureId: { planId: businessPlan.id, featureId: feat.id } },
        update: { isIncluded: bizIncluded, valueText: bizVal },
        create: { planId: businessPlan.id, featureId: feat.id, isIncluded: bizIncluded, valueText: bizVal }
      });

      // Enterprise
      await prisma.planFeatureAssignment.upsert({
        where: { planId_featureId: { planId: enterprisePlan.id, featureId: feat.id } },
        update: { isIncluded: true, valueText: 'Unlimited / Custom' },
        create: { planId: enterprisePlan.id, featureId: feat.id, isIncluded: true, valueText: 'Unlimited / Custom' }
      });
    }
  }

  // 5. Industry Use Cases
  const useCases = [
    {
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
      orderIndex: 1
    },
    {
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
      orderIndex: 2
    },
    {
      slug: 'education',
      title: 'Education Admissions & Student Counseling',
      industry: 'Education',
      summary: 'Counsel prospective applicants, explain syllabus & fee structures, verify entrance eligibility, and book admissions counselor calls.',
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
      orderIndex: 3
    },
    {
      slug: 'ecommerce',
      title: 'E-commerce COD Verification & Order Logistics',
      industry: 'E-commerce & Retail',
      summary: 'Automate Cash-On-Delivery (COD) address confirmations, deliver dispatch updates, and reduce Return-to-Origin (RTO) expenses.',
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
      orderIndex: 4
    },
    {
      slug: 'automotive',
      title: 'Automotive Test Drive Leads & Service Reminders',
      industry: 'Automotive',
      summary: 'Engage car and EV buyers, book showroom test drives, and coordinate recurring periodic service appointments.',
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
      orderIndex: 5
    },
    {
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
      orderIndex: 6
    },
    {
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
      orderIndex: 7
    }
  ];

  for (const uc of useCases) {
    await prisma.useCase.upsert({
      where: { slug: uc.slug },
      update: uc,
      create: uc
    });
  }

  // 6. Integrations
  const integrations = [
    {
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

  for (const integ of integrations) {
    await prisma.integration.upsert({
      where: { slug: integ.slug },
      update: integ,
      create: integ
    });
  }

  // 7. Frequently Asked Questions
  const faqs = [
    {
      question: 'What is TalkNex?',
      answer: 'TalkNex is an enterprise-grade AI voice platform built by Emperor Smart Solutions that enables businesses to deploy human-like conversational voice agents. TalkNex agents handle both inbound customer support and high-volume outbound calling campaigns, qualifying leads, booking calendar appointments, and answering customer queries in natural human speech.',
      category: 'General',
      isFeatured: true,
      orderIndex: 1
    },
    {
      question: 'Does it support Indian languages like Hindi and Gujarati?',
      answer: 'Yes! TalkNex is engineered from the ground up for the Indian market, supporting Hindi, Gujarati, Indian English, Marathi, Tamil, Telugu, Kannada, Bengali, and code-mixed speech (Hinglish/Gujlish). Our voice models comprehend regional accents and nuances with high transcription accuracy.',
      category: 'General',
      isFeatured: true,
      orderIndex: 2
    },
    {
      question: 'Can I use my existing phone number?',
      answer: 'Yes. TalkNex supports Bring-Your-Own-Carrier (BYOC) through SIP trunking, as well as call forwarding from your existing business landline, mobile, or cloud telephony numbers (such as Exotel, Tata Tele, Airtel, or Twilio). Incoming calls can seamlessly ring your AI voice agent.',
      category: 'Technical',
      isFeatured: true,
      orderIndex: 3
    },
    {
      question: 'How is it different from a call center or IVR?',
      answer: 'Traditional IVRs force callers through rigid, frustrating keypad trees ("Press 1 for Sales, Press 2 for Support"). TalkNex provides dynamic, two-way conversational AI that listens, understands intent, interrupts naturally if the user speaks, and answers questions intelligently without rigid menus.',
      category: 'General',
      isFeatured: true,
      orderIndex: 4
    },
    {
      question: 'Is it compliant with TRAI and Indian regulations?',
      answer: 'Yes. TalkNex strictly complies with Telecom Regulatory Authority of India (TRAI) guidelines and TCCCPR regulations. We support DND (Do-Not-Disturb) scrubbing, authorized 140-series commercial calling prefixes, consent management, calling time-window enforcement (9 AM to 9 PM), and transparent caller identification.',
      category: 'Compliance',
      isFeatured: true,
      orderIndex: 5
    },
    {
      question: 'How does TalkNex integrate with our existing CRM?',
      answer: 'TalkNex provides one-click native integrations for popular CRMs including Zoho CRM, Salesforce, and HubSpot, as well as webhook triggers for Zapier and custom database systems. Every call transcript, audio recording, and qualified lead status is synchronized automatically.',
      category: 'Technical',
      isFeatured: false,
      orderIndex: 6
    },
    {
      question: 'What happens if a caller asks a question the AI does not know?',
      answer: 'TalkNex can be configured with graceful escalation paths. When a conversation exceeds the agent’s knowledge boundaries or requires human intervention, the AI agent can seamlessly transfer the live call to your human team or schedule an immediate callback with notes.',
      category: 'Technical',
      isFeatured: false,
      orderIndex: 7
    }
  ];

  for (const faq of faqs) {
    const existing = await prisma.faq.findFirst({ where: { question: faq.question } });
    if (!existing) {
      await prisma.faq.create({ data: faq });
    }
  }

  // 8. Blog Categories, Authors, and Posts
  const author = await prisma.author.upsert({
    where: { slug: 'emperor-ai-research' },
    update: {},
    create: {
      slug: 'emperor-ai-research',
      name: 'Emperor Smart Solutions AI Research',
      title: 'Voice Engineering & AI Research Team',
      bio: 'Pioneering speech synthesis, regional language understanding, and conversational AI automation for enterprise applications.'
    }
  });

  const catTech = await prisma.blogCategory.upsert({
    where: { slug: 'technology' },
    update: {},
    create: { slug: 'technology', name: 'Technology & AI', description: 'Deep dives into voice AI, low-latency LLMs, and speech recognition.' }
  });

  const catBusiness = await prisma.blogCategory.upsert({
    where: { slug: 'business-growth' },
    update: {},
    create: { slug: 'business-growth', name: 'Business Growth', description: 'Strategies for scaling sales outreach and customer conversions.' }
  });

  const catCompliance = await prisma.blogCategory.upsert({
    where: { slug: 'compliance' },
    update: {},
    create: { slug: 'compliance', name: 'Compliance & Regulations', description: 'TRAI regulations, consumer consent, and ethical telecommunication standards.' }
  });

  const blogPosts = [
    {
      slug: 'what-are-ai-voice-agents-and-how-do-they-work',
      title: 'What Are AI Voice Agents and How Do They Work?',
      excerpt: 'Explore the underlying architecture of human-like AI voice agents: automatic speech recognition, ultra-low latency LLMs, and expressive neural speech synthesis.',
      content: `## The Evolution of Automated Business Conversations

For decades, automated telephone interactions were synonymous with rigid Interactive Voice Response (IVR) systems. Customers were forced to endure robotic menus ("Press 1 for Support, Press 2 for Billing") that offered no contextual comprehension.

With the advent of high-throughput Large Language Models (LLMs) and sub-500ms neural voice synthesis, a new paradigm has emerged: **Autonomous AI Voice Agents**.

### The Core Technology Stack

A modern AI Voice Agent operating on the TalkNex platform consists of three tightly coupled real-time pipelines:

1. **Automatic Speech Recognition (ASR)**: Transcribing spoken Hindi, English, Gujarati, and regional dialects into textual tokens within under 150 milliseconds.
2. **Contextual Intelligence Engine (LLM)**: Interpreting intent, recalling conversation history, consulting enterprise knowledge bases via RAG (Retrieval-Augmented Generation), and formulating concise, natural responses.
3. **Neural Text-to-Speech (TTS)**: Synthesizing expressive, human-like voice with natural pauses, breathing, and prosody that responds in real time.

### Real-Time Interruption Handling (Full-Duplex Audio)

Unlike turn-based walkie-talkie bots, TalkNex agents support **Full-Duplex Audio**. If a customer speaks while the AI agent is mid-sentence, the agent immediately stops speaking, listens to the user's interruption, and pivots its answer accordingly.`,
      readingTimeMinutes: 6,
      authorId: author.id,
      categoryId: catTech.id,
      publishedAt: new Date('2026-11-10T09:00:00Z')
    },
    {
      slug: '10-real-business-use-cases-for-ai-voice-calling-in-india',
      title: '10 Real Business Use Cases for AI Voice Calling in India',
      excerpt: 'Discover practical, high-ROI applications of autonomous voice calling across real estate, healthcare, education, retail, and financial services.',
      content: `## Transforming High-Touch Industries Across India

In India, voice is the undisputed primary channel of commerce. Whether booking a doctor's appointment, verifying a property site visit, or confirming an e-commerce delivery, Indian consumers strongly prefer speaking over typing.

Here are 10 concrete, production-proven business use cases where TalkNex AI Voice Agents drive measurable revenue growth and cost efficiency.

### 1. Instant Real Estate Lead Qualification
When prospective home buyers submit an inquiry on portals like 99acres or MagicBricks, speed-to-lead is critical. An automated call triggered within 30 seconds can qualify budget, preferred configuration (2 BHK / 3 BHK), and book a physical site visit before the lead cools down.

### 2. E-commerce Cash-on-Delivery (COD) Address Verification
Fake COD orders cost Indian e-commerce merchants crores of rupees in return freight (RTO). An automated conversational check immediately confirms customer intent and pin code accuracy.

### 3. Patient Appointment Scheduling & Care Reminders
Specialty hospitals and dental clinics prevent costly 25% no-show rates with courteous automated confirmation calls in the patient's preferred mother tongue.

### 4. EdTech Course Enrollment & Counseling Calls
EdTech platforms engage thousands of entrance exam aspirants with automated syllabus explanations and scholarship counseling.`,
      readingTimeMinutes: 8,
      authorId: author.id,
      categoryId: catBusiness.id,
      publishedAt: new Date('2026-11-05T09:00:00Z')
    },
    {
      slug: 'ai-calling-in-india-compliance-trai-rules-and-best-practices',
      title: 'AI Calling in India: Compliance, TRAI Rules and Best Practices',
      excerpt: 'A comprehensive operational guide to navigating TRAI regulations, DND scrubbing, DLT registration, and lawful voice automation in India.',
      content: `## Operating Lawfully and Ethically in the Indian Telecommunications Landscape

Automated calling offers tremendous leverage for businesses, but it must be conducted with rigorous compliance with Indian regulatory bodies, specifically the **Telecom Regulatory Authority of India (TRAI)** and the **Telecom Commercial Communications Customer Preference Regulations (TCCCPR)**.

### 1. The 140-Series Calling Prefix Requirement
Under TRAI mandates, all commercial promotional and transactional calls originating from automated systems must utilize approved telecom headers and prefixes (such as the 140-series allocated for telemarketing and commercial communications).

### 2. Do-Not-Disturb (DND) scrubbing
Before initiating any outbound promotional campaign, phone numbers must be scrubbed in real-time against the National Customer Preference Register (NCPR). TalkNex builds automated DND verification directly into campaign launch workflows.

### 3. Time Windows for Commercial Calls
TRAI strictly prohibits promotional calling outside the 9:00 AM to 9:00 PM IST window. TalkNex includes hard policy enforcement that prevents automated outbound campaigns from executing outside legal calling hours.

### 4. Explicit Consent Management
Under the Digital Personal Data Protection (DPDP) Act, businesses must maintain demonstrable proof of customer opt-in consent for promotional follow-ups.`,
      readingTimeMinutes: 7,
      authorId: author.id,
      categoryId: catCompliance.id,
      publishedAt: new Date('2026-10-28T09:00:00Z')
    }
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post
    });
  }

  // 9. Website Pages
  await prisma.websitePage.upsert({
    where: { slug: 'home' },
    update: {
      title: 'Turn Conversations into Business Growth with AI Voice Agents',
      metaTitle: 'TalkNex — AI Voice Calling & Conversation Automation Platform',
      metaDescription: 'Create human-like AI voice agents to handle calls, qualify leads, convert customers, provide support and automate business conversations at scale.'
    },
    create: {
      slug: 'home',
      title: 'Turn Conversations into Business Growth with AI Voice Agents',
      metaTitle: 'TalkNex — AI Voice Calling & Conversation Automation Platform',
      metaDescription: 'Create human-like AI voice agents to handle calls, qualify leads, convert customers, provide support and automate business conversations at scale.',
      status: ContentStatus.PUBLISHED
    }
  });

  console.log('TalkNex database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during database seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
