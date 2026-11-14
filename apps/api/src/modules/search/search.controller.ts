import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SearchService } from './search.service';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: 'Global search across articles, use cases, FAQs and integrations' })
  @ApiQuery({ name: 'q', required: true, type: String, description: 'Search term' })
  @ApiResponse({ status: 200, description: 'Search matching results' })
  async search(@Query('q') query: string) {
    return this.searchService.search(query);
  }
}

