import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { CacheService } from '../../infrastructure/cache/cache.service';
import { LocalStoreService } from '../../infrastructure/database/local-store.service';
import { FaqModel } from '@talknex/shared';

@Injectable()
export class FaqService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
    private readonly localStore: LocalStoreService
  ) {}

  async getAll(category?: string): Promise<FaqModel[]> {
    const cacheKey = category ? `faqs:cat:${category}` : 'faqs:all';
    const cached = await this.cache.get<FaqModel[]>(cacheKey);
    if (cached) return cached;

    try {
      const where = category ? { category } : {};
      const faqs = await this.prisma.faq.findMany({
        where,
        orderBy: [{ isFeatured: 'desc' }, { orderIndex: 'asc' }]
      });
      if (faqs.length > 0) {
        await this.cache.set(cacheKey, faqs, 3600);
        return faqs as unknown as FaqModel[];
      }
    } catch {
      // Fallback
    }

    let faqs = this.localStore.faqs;
    if (category) {
      faqs = faqs.filter((f) => f.category === category);
    }
    await this.cache.set(cacheKey, faqs, 3600);
    return faqs;
  }
}
