import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AdminOrganizationsService } from '../services/admin-organizations.service';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { RequirePermissions } from '../guards/permissions.decorator';
import { OrganizationStatus } from '@talknex/shared';

@ApiTags('Admin - Organizations')
@Controller('admin/organizations')
@UseGuards(AdminAuthGuard, PermissionsGuard)
export class AdminOrganizationsController {
  constructor(private readonly orgsService: AdminOrganizationsService) {}

  @Get()
  @RequirePermissions('organizations.read')
  @ApiOperation({ summary: 'List customer organizations with filtering, search, and pagination' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'industry', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async list(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('industry') industry?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    return this.orgsService.listOrganizations({ search, status, industry, page, limit });
  }

  @Get(':id')
  @RequirePermissions('organizations.read')
  @ApiOperation({ summary: 'Get detailed organization profile' })
  async getOne(@Param('id') id: string) {
    return this.orgsService.getOrganizationById(id);
  }

  @Post()
  @RequirePermissions('organizations.create')
  @ApiOperation({ summary: 'Create a new customer organization' })
  async create(@Body() body: any) {
    return this.orgsService.createOrganization(body);
  }

  @Patch(':id')
  @RequirePermissions('organizations.update')
  @ApiOperation({ summary: 'Update organization details' })
  async update(@Param('id') id: string, @Body() body: any) {
    return this.orgsService.updateOrganization(id, body);
  }

  @Patch(':id/status')
  @RequirePermissions('organizations.suspend')
  @ApiOperation({ summary: 'Activate, suspend, or reactivate organization' })
  async updateStatus(@Param('id') id: string, @Body('status') status: OrganizationStatus) {
    return this.orgsService.updateStatus(id, status);
  }

  @Delete(':id')
  @RequirePermissions('organizations.delete')
  @ApiOperation({ summary: 'Delete or archive organization' })
  async remove(@Param('id') id: string) {
    return this.orgsService.deleteOrganization(id);
  }
}

