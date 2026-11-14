import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PricingService } from './pricing.service';

@ApiTags('Pricing')
@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Get('plans')
  @ApiOperation({ summary: 'List all dynamic pricing plans' })
  @ApiResponse({ status: 200, description: 'Active pricing tiers' })
  async getPlans() {
    return this.pricingService.getAllPlans();
  }

  @Get('plans/:slug')
  @ApiOperation({ summary: 'Get details for a specific plan' })
  @ApiParam({ name: 'slug', description: 'Plan slug (e.g. starter, growth, business, enterprise)' })
  @ApiResponse({ status: 200, description: 'Single pricing plan' })
  async getPlan(@Param('slug') slug: string) {
    return this.pricingService.getPlanBySlug(slug);
  }

  @Get('compare')
  @ApiOperation({ summary: 'Get detailed plan comparison feature matrix' })
  @ApiResponse({ status: 200, description: 'Comparison feature matrix' })
  async getComparison() {
    return this.pricingService.getComparisonMatrix();
  }
}

