import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AdminHealthService } from '../services/admin-health.service';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { RequirePermissions } from '../guards/permissions.decorator';

@ApiTags('Admin - System Health')
@Controller('admin/health')
@UseGuards(AdminAuthGuard, PermissionsGuard)
export class AdminHealthController {
  constructor(private readonly healthService: AdminHealthService) {}

  @Get()
  @RequirePermissions('system.read')
  @ApiOperation({ summary: 'Get comprehensive real-time cluster health, memory, and workers' })
  async getHealth() {
    return this.healthService.getHealthStatus();
  }
}

