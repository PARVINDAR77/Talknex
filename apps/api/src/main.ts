import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const logger = new Logger('TalkNexBootstrap');
  const app = await NestFactory.create(AppModule);

  // Security Headers
  app.use(
    helmet({
      contentSecurityPolicy: false, // Managed at edge / reverse proxy for flexibility
      crossOriginEmbedderPolicy: false
    })
  );

  // CORS Configuration
  const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
    : ['http://localhost:3000', 'https://talknex.com'];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        callback(null, true);
      } else {
        callback(null, true); // Allow dev origins gracefully
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  });

  // Global Prefix: /api/v1
  app.setGlobalPrefix('api/v1');

  // Global Pipes & Interceptors
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    })
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // Swagger OpenAPI Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('TalkNex AI Voice SaaS Platform API')
    .setDescription(
      'Complete RESTful API specifications for the TalkNex Public Marketing Platform, Lead Management, Dynamic Content, and Ecosystem Integrations.'
    )
    .setVersion('1.0')
    .addTag('Health', 'Liveness and readiness health checks')
    .addTag('Content & Navigation', 'Dynamic page content, navigation and website settings')
    .addTag('Pricing', 'Tiered plans, call minutes limits and comparison matrix')
    .addTag('Blog & Resources', 'Articles, categories, and related publications')
    .addTag('Industry Use Cases', 'Industry workflows, sample transcripts and benefits')
    .addTag('Integrations', 'Supported software, CRM, and webhook platforms')
    .addTag('Frequently Asked Questions', 'Categorized and featured FAQs')
    .addTag('Leads & Contact', 'Transactional contact enquiries and demo bookings')
    .addTag('Search', 'Global multi-entity search')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'TalkNex API Documentation'
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
  logger.log(`TalkNex API server is listening on http://localhost:${port}/api/v1`);
  logger.log(`Swagger OpenAPI documentation available at http://localhost:${port}/api/docs`);
}

bootstrap();

