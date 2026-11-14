import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
  Body,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AdminLeadsService } from '../services/admin-leads.service';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { RequirePermissions } from '../guards/permissions.decorator';
import { BookingStatus, LeadStatus } from '@talknex/shared';

@ApiTags('Admin - Leads & Enquiries')
@Controller('admin/leads')
@UseGuards(AdminAuthGuard, PermissionsGuard)
export class AdminLeadsController {
  constructor(private readonly leadsService: AdminLeadsService) {}

  @Get('demo-bookings')
  @RequirePermissions('leads.read')
  @ApiOperation({ summary: 'List customer demo bookings' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async listBookings(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    return this.leadsService.listDemoBookings({ search, status, page, limit });
  }

  @Patch('demo-bookings/:id/status')
  @RequirePermissions('leads.update')
  @ApiOperation({ summary: 'Update demo booking status' })
  async updateBookingStatus(@Param('id') id: string, @Body('status') status: BookingStatus) {
    return this.leadsService.updateBookingStatus(id, status);
  }

  @Get('contact-enquiries')
  @RequirePermissions('leads.read')
  @ApiOperation({ summary: 'List general inbound contact enquiries' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async listEnquiries(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    return this.leadsService.listContactEnquiries({ search, status, page, limit });
  }

  @Patch('contact-enquiries/:id/status')
  @RequirePermissions('leads.update')
  @ApiOperation({ summary: 'Update contact enquiry status' })
  async updateEnquiryStatus(@Param('id') id: string, @Body('status') status: LeadStatus) {
    return this.leadsService.updateEnquiryStatus(id, status);
  }
}

