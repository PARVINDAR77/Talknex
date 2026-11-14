import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { CacheService } from '../../infrastructure/cache/cache.service';
import { LocalStoreService } from '../../infrastructure/database/local-store.service';
import { UseCaseModel } from '@talknex/shared';

@Injectable()
export class UseCasesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
    private readonly localStore: LocalStoreService
  ) {}

  async getAll(): Promise<UseCaseModel[]> {
    const cacheKey = 'use_cases:all';
    const cached = await this.cache.get<UseCaseModel[]>(cacheKey);
    if (cached) return cached;

    try {
      const list = await this.prisma.useCase.findMany({
        where: { isActive: true },
        orderBy: { orderIndex: 'asc' }
      });
      if (list.length > 0) {
        await this.cache.set(cacheKey, list, 3600);
        return list as unknown as UseCaseModel[];
      }
    } catch {
      // Fallback
    }

    const list = this.localStore.useCases;
    await this.cache.set(cacheKey, list, 3600);
    return list;
  }

  async getBySlug(slug: string): Promise<UseCaseModel> {
    const cacheKey = `use_cases:${slug}`;
    const cached = await this.cache.get<UseCaseModel>(cacheKey);
    if (cached) return cached;

    try {
      const uc = await this.prisma.useCase.findUnique({
        where: { slug }
      });
      if (uc && uc.isActive) {
        await this.cache.set(cacheKey, uc, 3600);
        return uc as unknown as UseCaseModel;
      }
    } catch {
      // Fallback
    }

    const uc = this.localStore.useCases.find((u) => u.slug === slug);
    if (!uc) {
      throw new NotFoundException(`Use case "${slug}" not found`);
    }
    await this.cache.set(cacheKey, uc, 3600);
    return uc;
  }
}
