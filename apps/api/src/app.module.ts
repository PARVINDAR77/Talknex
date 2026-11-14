import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/database/prisma.module';
import { CacheModule } from './infrastructure/cache/cache.module';
import { EmailModule } from './infrastructure/email/email.module';
import { HealthModule } from './modules/health/health.module';
import { PagesModule } from './modules/pages/pages.module';
import { PricingModule } from './modules/pricing/pricing.module';
import { BlogModule } from './modules/blog/blog.module';
import { UseCasesModule } from './modules/use-cases/use-cases.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { FaqModule } from './modules/faq/faq.module';
import { LeadsModule } from './modules/leads/leads.module';
import { SearchModule } from './modules/search/search.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env']
    }),
    PrismaModule,
    CacheModule,
    EmailModule,
    HealthModule,
    PagesModule,
    PricingModule,
    BlogModule,
    UseCasesModule,
    IntegrationsModule,
    FaqModule,
    LeadsModule,
    SearchModule,
    AdminModule
  ]
})
export class AppModule {}

