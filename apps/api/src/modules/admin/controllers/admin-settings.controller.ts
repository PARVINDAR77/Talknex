import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AdminSettingsService } from '../services/admin-settings.service';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { RequirePermissions } from '../guards/permissions.decorator';

@ApiTags('Admin - Global Settings')
@Controller('admin/settings')
@UseGuards(AdminAuthGuard, PermissionsGuard)
export class AdminSettingsController {
  constructor(private readonly settingsService: AdminSettingsService) {}

  @Get()
  @RequirePermissions('settings.read')
  @ApiOperation({ summary: 'Get global platform configuration and brand identity' })
  async getSettings() {
    return this.settingsService.getSettings();
  }

  @Patch()
  @RequirePermissions('settings.update')
  @ApiOperation({ summary: 'Update platform brand details and support channels' })
  async updateSettings(@Body() body: any) {
    return this.settingsService.updateSettings(body);
  }
}

