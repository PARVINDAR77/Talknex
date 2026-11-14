import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminCmsService } from '../services/admin-cms.service';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { RequirePermissions } from '../guards/permissions.decorator';

@ApiTags('Admin - Content Management System')
@Controller('admin/cms')
@UseGuards(AdminAuthGuard, PermissionsGuard)
export class AdminCmsController {
  constructor(private readonly cmsService: AdminCmsService) {}

  @Get('pages')
  @RequirePermissions('cms.read')
  @ApiOperation({ summary: 'List all dynamic website landing pages' })
  async listPages() {
    return this.cmsService.listPages();
  }

  @Get('blog')
  @RequirePermissions('cms.read')
  @ApiOperation({ summary: 'List published and draft blog articles' })
  async listBlog() {
    return this.cmsService.listBlogPosts();
  }

  @Post('blog')
  @RequirePermissions('cms.publish')
  @ApiOperation({ summary: 'Draft or publish a new article' })
  async createBlogPost(@Body() body: any) {
    return this.cmsService.createBlogPost(body);
  }

  @Get('faqs')
  @RequirePermissions('cms.read')
  @ApiOperation({ summary: 'List FAQs' })
  async listFaqs() {
    return this.cmsService.listFaqs();
  }

  @Post('faqs')
  @RequirePermissions('cms.publish')
  @ApiOperation({ summary: 'Add a new FAQ entry' })
  async createFaq(@Body() body: any) {
    return this.cmsService.createFaq(body);
  }

  @Get('use-cases')
  @RequirePermissions('cms.read')
  @ApiOperation({ summary: 'List industry use cases and dialogue flows' })
  async listUseCases() {
    return this.cmsService.listUseCases();
  }

  @Post('revalidate')
  @RequirePermissions('cms.publish')
  @ApiOperation({ summary: 'Purge platform caches and trigger instant website revalidation' })
  async revalidate() {
    return this.cmsService.revalidateWebsiteCache();
  }
}

