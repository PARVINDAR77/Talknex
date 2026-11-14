import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { BlogService } from './blog.service';

@ApiTags('Blog & Resources')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @ApiOperation({ summary: 'List published blog articles with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Paginated list of blog articles' })
  async getPosts(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('category') category?: string
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 9;
    return this.blogService.getPosts(pageNum, limitNum, category);
  }

  @Get('categories')
  @ApiOperation({ summary: 'List all blog categories' })
  @ApiResponse({ status: 200, description: 'Blog categories' })
  async getCategories() {
    return this.blogService.getCategories();
  }

  @Get('related/:slug')
  @ApiOperation({ summary: 'Get related articles for a given post' })
  @ApiParam({ name: 'slug', description: 'Post slug' })
  @ApiResponse({ status: 200, description: 'List of related articles' })
  async getRelated(@Param('slug') slug: string) {
    return this.blogService.getRelatedPosts(slug);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get single blog post details' })
  @ApiParam({ name: 'slug', description: 'Post slug' })
  @ApiResponse({ status: 200, description: 'Full blog post' })
  async getPost(@Param('slug') slug: string) {
    return this.blogService.getPostBySlug(slug);
  }
}

