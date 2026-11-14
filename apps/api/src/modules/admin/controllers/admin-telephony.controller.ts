import {
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Body,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminTelephonyService } from '../services/admin-telephony.service';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { RequirePermissions } from '../guards/permissions.decorator';

@ApiTags('Admin - Telephony Providers')
@Controller('admin/telephony-providers')
@UseGuards(AdminAuthGuard, PermissionsGuard)
export class AdminTelephonyController {
  constructor(private readonly telephonyService: AdminTelephonyService) {}

  @Get()
  @RequirePermissions('telephony.read')
  @ApiOperation({ summary: 'List telecom gateways, SIP trunks, channels, and numbers' })
  async list() {
    return this.telephonyService.listProviders();
  }

  @Get(':id')
  @RequirePermissions('telephony.read')
  @ApiOperation({ summary: 'Get telephony provider configuration and active channels' })
  async getOne(@Param('id') id: string) {
    return this.telephonyService.getProviderById(id);
  }

  @Patch(':id')
  @RequirePermissions('telephony.configure')
  @ApiOperation({ summary: 'Update telephony concurrency limit, channels, or SIP endpoint' })
  async update(@Param('id') id: string, @Body() body: any) {
    return this.telephonyService.updateProvider(id, body);
  }

  @Post(':id/test-sip')
  @RequirePermissions('telephony.test')
  @ApiOperation({ summary: 'Test SIP OPTIONS handshake' })
  async testSip(@Param('id') id: string) {
    return this.telephonyService.testSipHandshake(id);
  }
}

