import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminPlansService } from '../services/admin-plans.service';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { RequirePermissions } from '../guards/permissions.decorator';

@ApiTags('Admin - Plans & Pricing')
@Controller('admin/plans')
@UseGuards(AdminAuthGuard, PermissionsGuard)
export class AdminPlansController {
  constructor(private readonly plansService: AdminPlansService) {}

  @Get()
  @RequirePermissions('pricing.read')
  @ApiOperation({ summary: 'List all commercial plans and feature allowances' })
  async list() {
    return this.plansService.listPlans();
  }

  @Get(':id')
  @RequirePermissions('pricing.read')
  @ApiOperation({ summary: 'Get plan details' })
  async getOne(@Param('id') id: string) {
    return this.plansService.getPlanById(id);
  }

  @Patch(':id')
  @RequirePermissions('pricing.update')
  @ApiOperation({ summary: 'Update plan price, included minutes, or voice agent limits' })
  async update(@Param('id') id: string, @Body() body: any) {
    return this.plansService.updatePlan(id, body);
  }
}

