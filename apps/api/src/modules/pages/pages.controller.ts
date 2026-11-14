import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PagesService } from './pages.service';

@ApiTags('Content & Navigation')
@Controller()
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get('pages/:slug')
  @ApiOperation({ summary: 'Get page content and sections by slug' })
  @ApiParam({ name: 'slug', description: 'Page slug (e.g. home, about, how-it-works)' })
  @ApiResponse({ status: 200, description: 'Page content retrieved successfully' })
  async getPage(@Param('slug') slug: string) {
    return this.pagesService.getPageBySlug(slug);
  }

  @Get('navigation')
  @ApiOperation({ summary: 'Get global navigation hierarchy for header and footer' })
  @ApiResponse({ status: 200, description: 'Navigation menu items' })
  async getNavigation() {
    return this.pagesService.getNavigation();
  }

  @Get('website-settings')
  @ApiOperation({ summary: 'Get website metadata, contacts and social links' })
  @ApiResponse({ status: 200, description: 'Website configuration settings' })
  async getWebsiteSettings() {
    return this.pagesService.getWebsiteSettings();
  }
}

