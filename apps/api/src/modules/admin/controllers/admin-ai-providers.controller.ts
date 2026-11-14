import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AdminAiProvidersService } from '../services/admin-ai-providers.service';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { RequirePermissions } from '../guards/permissions.decorator';

@ApiTags('Admin - AI Providers')
@Controller('admin/ai-providers')
@UseGuards(AdminAuthGuard, PermissionsGuard)
export class AdminAiProvidersController {
  constructor(private readonly providersService: AdminAiProvidersService) {}

  @Get()
  @RequirePermissions('providers.read')
  @ApiOperation({ summary: 'List all speech-to-text, LLM, and text-to-speech providers' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by category: STT, TTS, LLM' })
  async list(@Query('category') category?: string) {
    return this.providersService.listProviders(category);
  }

  @Get(':id')
  @RequirePermissions('providers.read')
  @ApiOperation({ summary: 'Get AI provider details and model configuration' })
  async getOne(@Param('id') id: string) {
    return this.providersService.getProviderById(id);
  }

  @Post()
  @RequirePermissions('providers.configure')
  @ApiOperation({ summary: 'Register and configure a new AI provider adapter' })
  async create(@Body() body: any) {
    return this.providersService.createProvider(body);
  }

  @Patch(':id')
  @RequirePermissions('providers.configure')
  @ApiOperation({ summary: 'Update provider priority, status, or credentials' })
  async update(@Param('id') id: string, @Body() body: any) {
    return this.providersService.updateProvider(id, body);
  }

  @Post(':id/test-connection')
  @RequirePermissions('providers.test')
  @ApiOperation({ summary: 'Execute live endpoint handshake and latency diagnostic' })
  async testConnection(@Param('id') id: string) {
    return this.providersService.testConnection(id);
  }
}

