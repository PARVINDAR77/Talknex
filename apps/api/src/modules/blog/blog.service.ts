import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { CacheService } from '../../infrastructure/cache/cache.service';
import { LocalStoreService } from '../../infrastructure/database/local-store.service';
import { BlogPostModel, BlogCategoryModel } from '@talknex/shared';

@Injectable()
export class BlogService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
    private readonly localStore: LocalStoreService
  ) {}

  async getPosts(page = 1, limit = 9, categorySlug?: string) {
    try {
      const skip = (page - 1) * limit;
      const where: any = { status: 'PUBLISHED' };
      if (categorySlug) {
        where.category = { slug: categorySlug };
      }
      const [total, posts] = await Promise.all([
        this.prisma.blogPost.count({ where }),
        this.prisma.blogPost.findMany({
          where,
          skip,
          take: limit,
          orderBy: { publishedAt: 'desc' },
          include: { author: true, category: true }
        })
      ]);
      if (posts.length > 0) {
        const totalPages = Math.ceil(total / limit);
        return {
          __isEnvelope: true,
          success: true,
          statusCode: 200,
          data: posts as unknown as BlogPostModel[],
          pagination: {
            total,
            page,
            limit,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
          }
        };
      }
    } catch {
      // Fallback
    }

    let filtered = this.localStore.blogPosts;
    if (categorySlug) {
      filtered = filtered.filter((p) => p.category?.slug === categorySlug);
    }
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return {
      __isEnvelope: true,
      success: true,
      statusCode: 200,
      data: paginated,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  }

  async getPostBySlug(slug: string): Promise<BlogPostModel> {
    const cacheKey = `blog:post:${slug}`;
    const cached = await this.cache.get<BlogPostModel>(cacheKey);
    if (cached) return cached;

    try {
      const post = await this.prisma.blogPost.findUnique({
        where: { slug },
        include: { author: true, category: true }
      });
      if (post && post.status === 'PUBLISHED') {
        await this.cache.set(cacheKey, post, 600);
        return post as unknown as BlogPostModel;
      }
    } catch {
      // Fallback
    }

    const post = this.localStore.blogPosts.find((p) => p.slug === slug);
    if (!post) {
      throw new NotFoundException(`Blog post "${slug}" not found`);
    }
    await this.cache.set(cacheKey, post, 600);
    return post;
  }

  async getCategories(): Promise<BlogCategoryModel[]> {
    const cacheKey = 'blog:categories:all';
    const cached = await this.cache.get<BlogCategoryModel[]>(cacheKey);
    if (cached) return cached;

    try {
      const categories = await this.prisma.blogCategory.findMany({
        include: {
          _count: {
            select: { posts: { where: { status: 'PUBLISHED' } } }
          }
        }
      });
      if (categories.length > 0) {
        const mapped = categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
          postCount: c._count.posts
        }));
        await this.cache.set(cacheKey, mapped, 3600);
        return mapped;
      }
    } catch {
      // Fallback
    }

    const categories = this.localStore.blogCategories;
    await this.cache.set(cacheKey, categories, 3600);
    return categories;
  }

  async getRelatedPosts(slug: string, limit = 3): Promise<BlogPostModel[]> {
    const all = this.localStore.blogPosts;
    const current = all.find((p) => p.slug === slug);
    if (!current) return all.slice(0, limit);
    return all.filter((p) => p.slug !== slug).slice(0, limit);
  }
}
