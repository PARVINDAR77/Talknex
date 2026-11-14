import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infrastructure/database/prisma.module';
import { CacheModule } from '../../infrastructure/cache/cache.module';

// Controllers
import { AdminOverviewController } from './controllers/admin-overview.controller';
import { AdminOrganizationsController } from './controllers/admin-organizations.controller';
import { AdminUsersController } from './controllers/admin-users.controller';
import { AdminAiProvidersController } from './controllers/admin-ai-providers.controller';
import { AdminTelephonyController } from './controllers/admin-telephony.controller';
import { AdminPlansController } from './controllers/admin-plans.controller';
import { AdminBillingController } from './controllers/admin-billing.controller';
import { AdminCmsController } from './controllers/admin-cms.controller';
import { AdminLeadsController } from './controllers/admin-leads.controller';
import { AdminHealthController } from './controllers/admin-health.controller';
import { AdminAuditController } from './controllers/admin-audit.controller';
import { AdminSettingsController } from './controllers/admin-settings.controller';

// Services
import { AdminOverviewService } from './services/admin-overview.service';
import { AdminOrganizationsService } from './services/admin-organizations.service';
import { AdminUsersService } from './services/admin-users.service';
import { AdminAiProvidersService } from './services/admin-ai-providers.service';
import { AdminTelephonyService } from './services/admin-telephony.service';
import { AdminPlansService } from './services/admin-plans.service';
import { AdminBillingService } from './services/admin-billing.service';
import { AdminCmsService } from './services/admin-cms.service';
import { AdminLeadsService } from './services/admin-leads.service';
import { AdminHealthService } from './services/admin-health.service';
import { AdminAuditService } from './services/admin-audit.service';
import { AdminSettingsService } from './services/admin-settings.service';

// Guards
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';

@Module({
  imports: [PrismaModule, CacheModule],
  controllers: [
    AdminOverviewController,
    AdminOrganizationsController,
    AdminUsersController,
    AdminAiProvidersController,
    AdminTelephonyController,
    AdminPlansController,
    AdminBillingController,
    AdminCmsController,
    AdminLeadsController,
    AdminHealthController,
    AdminAuditController,
    AdminSettingsController
  ],
  providers: [
    AdminOverviewService,
    AdminOrganizationsService,
    AdminUsersService,
    AdminAiProvidersService,
    AdminTelephonyService,
    AdminPlansService,
    AdminBillingService,
    AdminCmsService,
    AdminLeadsService,
    AdminHealthService,
    AdminAuditService,
    AdminSettingsService,
    AdminAuthGuard,
    PermissionsGuard
  ],
  exports: [
    AdminOverviewService,
    AdminOrganizationsService,
    AdminUsersService,
    AdminAiProvidersService
  ]
})
export class AdminModule {}

