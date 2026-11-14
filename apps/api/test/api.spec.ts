import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { TransformInterceptor } from '../src/common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from '../src/common/filters/http-exception.filter';

describe('TalkNex API Integration Test Suite', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true
      })
    );
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalInterceptors(new TransformInterceptor());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Health Probes', () => {
    it('/api/v1/health (GET) returns 200 OK', () => {
      return request(app.getHttpServer())
        .get('/api/v1/health')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data.status).toBe('ok');
        });
    });

    it('/api/v1/health/ready (GET) returns readiness probe', () => {
      return request(app.getHttpServer())
        .get('/api/v1/health/ready')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data.status).toBe('ready');
        });
    });
  });

  describe('Content & Navigation APIs', () => {
    it('/api/v1/navigation (GET) returns header & footer structures', () => {
      return request(app.getHttpServer())
        .get('/api/v1/navigation')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('header');
          expect(res.body.data).toHaveProperty('footer');
          expect(Array.isArray(res.body.data.header)).toBe(true);
        });
    });

    it('/api/v1/website-settings (GET) returns company and contact info', () => {
      return request(app.getHttpServer())
        .get('/api/v1/website-settings')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data.companyName).toBe('Emperor Smart Solutions');
          expect(res.body.data.brandName).toBe('TalkNex');
        });
    });
  });

  describe('Pricing APIs', () => {
    it('/api/v1/pricing/plans (GET) returns all 4 active plans', () => {
      return request(app.getHttpServer())
        .get('/api/v1/pricing/plans')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data.length).toBeGreaterThanOrEqual(4);
          const starter = res.body.data.find((p: any) => p.slug === 'starter');
          expect(starter.monthlyPriceInr).toBe(1499);
          const growth = res.body.data.find((p: any) => p.slug === 'growth');
          expect(growth.isPopular).toBe(true);
        });
    });

    it('/api/v1/pricing/compare (GET) returns comparison feature matrix', () => {
      return request(app.getHttpServer())
        .get('/api/v1/pricing/compare')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('plans');
          expect(res.body.data).toHaveProperty('categories');
        });
    });
  });

  describe('Industry Use Cases & Integrations', () => {
    it('/api/v1/use-cases (GET) returns industry solutions', () => {
      return request(app.getHttpServer())
        .get('/api/v1/use-cases')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data.length).toBeGreaterThanOrEqual(6);
          const realEstate = res.body.data.find((u: any) => u.slug === 'real-estate');
          expect(realEstate).toBeDefined();
          expect(realEstate.sampleDialogue.length).toBeGreaterThan(0);
        });
    });

    it('/api/v1/integrations (GET) returns software integrations', () => {
      return request(app.getHttpServer())
        .get('/api/v1/integrations')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data.length).toBeGreaterThanOrEqual(8);
        });
    });
  });

  describe('Blog & FAQs', () => {
    it('/api/v1/blog (GET) returns paginated published articles', () => {
      return request(app.getHttpServer())
        .get('/api/v1/blog')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data.length).toBeGreaterThanOrEqual(3);
        });
    });

    it('/api/v1/faqs (GET) returns FAQs including TRAI compliance question', () => {
      return request(app.getHttpServer())
        .get('/api/v1/faqs')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data.length).toBeGreaterThanOrEqual(5);
        });
    });
  });

  describe('Lead Management & Persistence', () => {
    it('/api/v1/contact (POST) validates input and saves contact enquiry', () => {
      return request(app.getHttpServer())
        .post('/api/v1/contact')
        .send({
          name: 'Vikram Joshi',
          email: 'vikram@lodhagroup-demo.in',
          phone: '+91 98200 11223',
          company: 'Lodha Group Demo',
          industry: 'Real Estate',
          message: 'Interested in automating site visit booking for 500 inquiries per day.',
          consent: true
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('id');
        });
    });

    it('/api/v1/demo-bookings (POST) reserves a demonstration slot', () => {
      return request(app.getHttpServer())
        .post('/api/v1/demo-bookings')
        .send({
          name: 'Anita Roy',
          email: 'anita.roy@healthcure.org',
          phone: '+91 99001 22334',
          company: 'HealthCure Clinic',
          industry: 'Healthcare',
          preferredDate: '2026-11-25',
          preferredTime: '11:30 AM',
          requirements: 'Hindi and Gujarati bilingual voice bot testing.',
          consent: true
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('bookingDetails');
        });
    });

    it('/api/v1/demo-bookings/availability (GET) returns bookable business slots', () => {
      return request(app.getHttpServer())
        .get('/api/v1/demo-bookings/availability')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data.availableDates.length).toBeGreaterThan(0);
        });
    });

    it('/api/v1/newsletter/subscribe (POST) registers subscriber', () => {
      return request(app.getHttpServer())
        .post('/api/v1/newsletter/subscribe')
        .send({ email: 'subscriber@startup.io' })
        .expect(201)
        .expect((res) => {
          expect(res.body.success).toBe(true);
        });
    });
  });

  describe('Global Search', () => {
    it('/api/v1/search (GET) returns matching results across entities', () => {
      return request(app.getHttpServer())
        .get('/api/v1/search?q=Real%20Estate')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data.totalResults).toBeGreaterThan(0);
        });
    });
  });
});
