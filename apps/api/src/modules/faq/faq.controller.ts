import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { FaqService } from './faq.service';

@ApiTags('Frequently Asked Questions')
@Controller('faqs')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  @ApiOperation({ summary: 'List all published FAQs' })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiResponse({ status: 200, description: 'List of FAQs' })
  async getAll(@Query('category') category?: string) {
    return this.faqService.getAll(category);
  }
}

