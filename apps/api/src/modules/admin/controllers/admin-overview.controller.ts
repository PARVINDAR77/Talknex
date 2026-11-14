import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AdminOverviewService } from '../services/admin-overview.service';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { RequirePermissions } from '../guards/permissions.decorator';

@ApiTags('Admin - Platform Overview')
@Controller('admin/overview')
@UseGuards(AdminAuthGuard, PermissionsGuard)
export class AdminOverviewController {
  constructor(private readonly overviewService: AdminOverviewService) {}

  @Get()
  @RequirePermissions('overview.read')
  @ApiOperation({ summary: 'Get complete platform overview KPI metrics, trends, and recent events' })
  @ApiQuery({ name: 'timeRange', required: false, description: 'Reporting period: Today, Last 7 Days, Last 30 Days, Last 90 Days' })
  @ApiResponse({ status: 200, description: 'Platform Overview Dashboard metrics and charts payload' })
  async getOverview(@Query('timeRange') timeRange?: string) {
    return this.overviewService.getOverviewMetrics(timeRange || 'Last 30 Days');
  }
}

