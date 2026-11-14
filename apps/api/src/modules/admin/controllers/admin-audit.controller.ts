import {
  Controller,
  Get,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AdminAuditService } from '../services/admin-audit.service';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { RequirePermissions } from '../guards/permissions.decorator';

@ApiTags('Admin - Audit Logs')
@Controller('admin/audit-logs')
@UseGuards(AdminAuthGuard, PermissionsGuard)
export class AdminAuditController {
  constructor(private readonly auditService: AdminAuditService) {}

  @Get()
  @RequirePermissions('audit.read')
  @ApiOperation({ summary: 'Query immutable administrator audit logs' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'entityType', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async list(
    @Query('search') search?: string,
    @Query('entityType') entityType?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    return this.auditService.listAuditLogs({ search, entityType, page, limit });
  }
}

