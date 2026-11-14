import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UseCasesService } from './use-cases.service';

@ApiTags('Industry Use Cases')
@Controller('use-cases')
export class UseCasesController {
  constructor(private readonly useCasesService: UseCasesService) {}

  @Get()
  @ApiOperation({ summary: 'List all supported industry use cases' })
  @ApiResponse({ status: 200, description: 'All industry use cases' })
  async getAll() {
    return this.useCasesService.getAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get specific use case details and conversation transcript' })
  @ApiParam({ name: 'slug', description: 'Use case slug (e.g. real-estate, healthcare)' })
  @ApiResponse({ status: 200, description: 'Use case details' })
  async getBySlug(@Param('slug') slug: string) {
    return this.useCasesService.getBySlug(slug);
  }
}

