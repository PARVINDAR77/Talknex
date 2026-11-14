import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AdminBillingService } from '../services/admin-billing.service';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { RequirePermissions } from '../guards/permissions.decorator';

@ApiTags('Admin - Billing & Revenue')
@Controller('admin/billing')
@UseGuards(AdminAuthGuard, PermissionsGuard)
export class AdminBillingController {
  constructor(private readonly billingService: AdminBillingService) {}

  @Get('transactions')
  @RequirePermissions('billing.read')
  @ApiOperation({ summary: 'List financial transactions with invoice status and amounts' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async listTransactions(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    return this.billingService.listTransactions({ search, status, page, limit });
  }

  @Get('metrics')
  @RequirePermissions('billing.read')
  @ApiOperation({ summary: 'Get MRR, ARR, and financial performance totals' })
  async getMetrics() {
    return this.billingService.getRevenueMetrics();
  }

  @Post('transactions/:id/refund')
  @RequirePermissions('billing.refund')
  @ApiOperation({ summary: 'Authorize transaction refund' })
  async refund(@Param('id') id: string, @Body('reason') reason?: string) {
    return this.billingService.processRefund(id, reason);
  }
}

