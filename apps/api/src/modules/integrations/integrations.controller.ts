import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { IntegrationsService } from './integrations.service';

@ApiTags('Integrations')
@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Get()
  @ApiOperation({ summary: 'List all software & CRM integrations' })
  @ApiResponse({ status: 200, description: 'List of integrations' })
  async getAll() {
    return this.integrationsService.getAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get integration specifications and setup guide' })
  @ApiParam({ name: 'slug', description: 'Integration slug (e.g. hubspot, salesforce)' })
  @ApiResponse({ status: 200, description: 'Integration details' })
  async getBySlug(@Param('slug') slug: string) {
    return this.integrationsService.getBySlug(slug);
  }
}

