import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '../src/modules/health/health.controller';
import { PagesController } from '../src/modules/pages/pages.controller';
import { PricingController } from '../src/modules/pricing/pricing.controller';
import { BlogController } from '../src/modules/blog/blog.controller';
import { UseCasesController } from '../src/modules/use-cases/use-cases.controller';
import { IntegrationsController } from '../src/modules/integrations/integrations.controller';
import { FaqController } from '../src/modules/faq/faq.controller';
import { LeadsController } from '../src/modules/leads/leads.controller';
import { SearchController } from '../src/modules/search/search.controller';
import { AppModule } from '../src/app.module';

describe('TalkNex Unit & Domain Logic Test Suite', () => {
  let moduleRef: TestingModule;
  let healthController: HealthController;
  let pagesController: PagesController;
  let pricingController: PricingController;
  let blogController: BlogController;
  let useCasesController: UseCasesController;
  let integrationsController: IntegrationsController;
  let faqController: FaqController;
  let leadsController: LeadsController;
  let searchController: SearchController;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    healthController = moduleRef.get<HealthController>(HealthController);
    pagesController = moduleRef.get<PagesController>(PagesController);
    pricingController = moduleRef.get<PricingController>(PricingController);
    blogController = moduleRef.get<BlogController>(BlogController);
    useCasesController = moduleRef.get<UseCasesController>(UseCasesController);
    integrationsController = moduleRef.get<IntegrationsController>(IntegrationsController);
    faqController = moduleRef.get<FaqController>(FaqController);
    leadsController = moduleRef.get<LeadsController>(LeadsController);
    searchController = moduleRef.get<SearchController>(SearchController);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('Health Controller', () => {
    it('checkLiveness returns ok status', () => {
      const res = healthController.checkLiveness();
      expect(res.status).toBe('ok');
    });

    it('checkReadiness returns ready status', async () => {
      const res = await healthController.checkReadiness();
      expect(res.status).toBe('ready');
    });
  });

  describe('Pages & Navigation Controller', () => {
    it('getNavigation returns header and footer locations', async () => {
      const res = await pagesController.getNavigation();
      expect(res).toHaveProperty('header');
      expect(res).toHaveProperty('footer');
      expect(res.header.length).toBeGreaterThan(0);
      expect(res.footer.product.length).toBeGreaterThan(0);
    });

    it('getWebsiteSettings returns verified company info', async () => {
      const res = await pagesController.getWebsiteSettings();
      expect(res.companyName).toBe('Emperor Smart Solutions');
      expect(res.brandName).toBe('TalkNex');
    });
  });

  describe('Pricing Controller', () => {
    it('getPlans returns all 4 active plans with pricing matching reference', async () => {
      const plans = await pricingController.getPlans();
      expect(plans.length).toBe(4);

      const starter = plans.find((p) => p.slug === 'starter');
      expect(starter).toBeDefined();
      expect(starter?.monthlyPriceInr).toBe(1499);

      const growth = plans.find((p) => p.slug === 'growth');
      expect(growth).toBeDefined();
      expect(growth?.monthlyPriceInr).toBe(4999);
      expect(growth?.isPopular).toBe(true);

      const business = plans.find((p) => p.slug === 'business');
      expect(business).toBeDefined();
      expect(business?.monthlyPriceInr).toBe(9999);

      const enterprise = plans.find((p) => p.slug === 'enterprise');
      expect(enterprise).toBeDefined();
      expect(enterprise?.monthlyPriceInr).toBe(0);
    });

    it('getComparison returns comprehensive matrix', async () => {
      const compare = await pricingController.getComparison();
      expect(compare).toHaveProperty('plans');
      expect(compare).toHaveProperty('categories');
      expect(compare.categories.length).toBeGreaterThan(0);
    });
  });

  describe('Industry Use Cases & Integrations Controller', () => {
    it('getAll use cases returns 7 industries including Real Estate with Hindi transcript', async () => {
      const list = await useCasesController.getAll();
      expect(list.length).toBeGreaterThanOrEqual(7);

      const realEstate = await useCasesController.getBySlug('real-estate');
      expect(realEstate.title).toContain('Real Estate');
      expect(realEstate.sampleDialogue.length).toBeGreaterThan(0);
      expect(realEstate.sampleDialogue[0].language).toBe('Hindi');
    });

    it('getAll integrations returns supported tools', async () => {
      const list = await integrationsController.getAll();
      expect(list.length).toBeGreaterThanOrEqual(8);
      const hubspot = list.find((i) => i.slug === 'hubspot');
      expect(hubspot).toBeDefined();
    });
  });

  describe('Blog & FAQs Controller', () => {
    it('getPosts returns published blog posts', async () => {
      const res: any = await blogController.getPosts();
      expect(res.data.length).toBeGreaterThanOrEqual(3);
    });

    it('getAll faqs returns required FAQs', async () => {
      const faqs = await faqController.getAll();
      expect(faqs.length).toBeGreaterThanOrEqual(5);
      const traiFaq = faqs.find((f) => f.question.includes('TRAI'));
      expect(traiFaq).toBeDefined();
    });
  });

  describe('Leads & Contact Controller', () => {
    it('createContact persists lead and triggers email dispatch', async () => {
      const mockReq = { ip: '127.0.0.1', headers: {}, socket: {} } as any;
      const res = await leadsController.createContact(
        {
          name: 'Sunil Kumar',
          email: 'sunil@autodrive-motors.in',
          phone: '+91 98450 12345',
          company: 'AutoDrive Motors',
          industry: 'Automotive',
          message: 'Interested in automating test drive follow-ups and service reminders.',
          consent: true
        },
        mockReq
      );
      expect(res).toHaveProperty('id');
      expect(res.message).toContain('Thank you');
    });

    it('createDemo schedules booking slot', async () => {
      const res = await leadsController.createDemo({
        name: 'Kavita Patel',
        email: 'kavita@edusmart.edu.in',
        phone: '+91 97234 56789',
        company: 'EduSmart Academy',
        industry: 'Education',
        preferredDate: '2026-11-28',
        preferredTime: '03:30 PM',
        requirements: 'Student admission inquiries automation in Hindi and English.',
        consent: true
      });
      expect(res).toHaveProperty('id');
      expect(res.bookingDetails.date).toBe('2026-11-28');
    });

    it('getDemoAvailability returns available business slots', () => {
      const res = leadsController.getDemoAvailability();
      expect(res.availableDates.length).toBe(10);
      expect(res.timeZone).toContain('Asia/Kolkata');
    });

    it('subscribeNewsletter records subscriber', async () => {
      const res = await leadsController.subscribeNewsletter({
        email: 'founder@techstartup.in'
      });
      expect(res).toHaveProperty('id');
    });
  });

  describe('Search Controller', () => {
    it('search finds matching items across blog, use cases, FAQs and integrations', async () => {
      const res = await searchController.search('real estate');
      expect(res.totalResults).toBeGreaterThan(0);
      expect(res.items.some((item) => item.type === 'use_case')).toBe(true);
    });
  });
});

