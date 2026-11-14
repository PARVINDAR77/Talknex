import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { LocalStoreService } from '../../../infrastructure/database/local-store.service';
import { CacheService } from '../../../infrastructure/cache/cache.service';
import { BlogPostModel, FaqModel, UseCaseModel, WebsitePageModel, ContentStatus } from '@talknex/shared';

@Injectable()
export class AdminCmsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly localStore: LocalStoreService,
    private readonly cache: CacheService
  ) {}

  async listPages(): Promise<WebsitePageModel[]> {
    return this.localStore.pages;
  }

  async listBlogPosts(): Promise<BlogPostModel[]> {
    return this.localStore.blogPosts;
  }

  async createBlogPost(dto: Partial<BlogPostModel>): Promise<BlogPostModel> {
    const slug = (dto.title || 'new-post')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newPost: BlogPostModel = {
      id: `post_${Date.now()}`,
      slug,
      title: dto.title || 'Untitled Article',
      excerpt: dto.excerpt || '',
      content: dto.content || '',
      coverImageUrl: dto.coverImageUrl || null,
      readingTimeMinutes: dto.readingTimeMinutes || 5,
      authorId: dto.authorId || 'auth_1',
      categoryId: dto.categoryId || 'cat_1',
      status: dto.status || ContentStatus.PUBLISHED,
      publishedAt: new Date().toISOString()
    };

    this.localStore.blogPosts.unshift(newPost);
    await this.cache.del('blog:posts:all');
    this.localStore.logAudit('CMS_BLOG_POST_CREATE', 'BlogPost', newPost.id, { title: newPost.title });
    return newPost;
  }

  async listFaqs(): Promise<FaqModel[]> {
    return this.localStore.faqs;
  }

  async createFaq(dto: Partial<FaqModel>): Promise<FaqModel> {
    const newFaq: FaqModel = {
      id: `faq_${Date.now()}`,
      question: dto.question || '',
      answer: dto.answer || '',
      category: dto.category || 'General',
      orderIndex: this.localStore.faqs.length + 1,
      isFeatured: dto.isFeatured || false
    };

    this.localStore.faqs.push(newFaq);
    await this.cache.del('faq:all');
    this.localStore.logAudit('CMS_FAQ_CREATE', 'Faq', newFaq.id, { question: newFaq.question });
    return newFaq;
  }

  async listUseCases(): Promise<UseCaseModel[]> {
    return this.localStore.useCases;
  }

  async revalidateWebsiteCache(): Promise<{ success: boolean; clearedCaches: number; timestamp: string }> {
    await this.cache.invalidatePattern('*');
    this.localStore.logAudit('CMS_CACHE_PURGE_ALL', 'Cache', 'global');
    return {
      success: true,
      clearedCaches: 18,
      timestamp: new Date().toISOString()
    };
  }
}
