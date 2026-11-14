import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { CacheService } from '../../infrastructure/cache/cache.service';
import { LocalStoreService } from '../../infrastructure/database/local-store.service';
import { IntegrationModel } from '@talknex/shared';

@Injectable()
export class IntegrationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
    private readonly localStore: LocalStoreService
  ) { }

  async getAll(): Promise<IntegrationModel[]> {
    const cacheKey = 'integrations:all';
    const cached = await this.cache.get<IntegrationModel[]>(cacheKey);
    if (cached) return cached;

    try {
      const list = await this.prisma.integration.findMany({
        orderBy: { orderIndex: 'asc' }
      });
      if (list.length > 0) {
        await this.cache.set(cacheKey, list, 3600);
        return list as unknown as IntegrationModel[];
      }
    } catch {
      // Fallback
    }

    const list = this.localStore.integrations;
    await this.cache.set(cacheKey, list, 3600);
    return list;
  }

  async getBySlug(slug: string): Promise<IntegrationModel> {
    const cacheKey = `integrations:${slug}`;
    const cached = await this.cache.get<IntegrationModel>(cacheKey);
    if (cached) return cached;

    try {
      const item = await this.prisma.integration.findUnique({
        where: { slug }
      });
      if (item) {
        await this.cache.set(cacheKey, item, 3600);
        return item as unknown as IntegrationModel;
      }
    } catch {
      // Fallback
    }

    const item = this.localStore.integrations.find((i) => i.slug === slug);
    if (!item) {
      throw new NotFoundException(`Integration "${slug}" not found`);
    }
    await this.cache.set(cacheKey, item, 3600);
    return item;
  }
}
