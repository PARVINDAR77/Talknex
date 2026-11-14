import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { CacheService } from '../../infrastructure/cache/cache.service';
import { LocalStoreService } from '../../infrastructure/database/local-store.service';
import { WebsitePageModel, NavigationItemModel, WebsiteSettingModel } from '@talknex/shared';

@Injectable()
export class PagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
    private readonly localStore: LocalStoreService
  ) {}

  async getPageBySlug(slug: string): Promise<WebsitePageModel> {
    const cacheKey = `page:${slug}`;
    const cached = await this.cache.get<WebsitePageModel>(cacheKey);
    if (cached) return cached;

    try {
      const page = await this.prisma.websitePage.findUnique({
        where: { slug },
        include: {
          sections: {
            where: { isActive: true },
            orderBy: { orderIndex: 'asc' }
          }
        }
      });
      if (page) {
        await this.cache.set(cacheKey, page, 3600);
        return page as unknown as WebsitePageModel;
      }
    } catch {
      // Fallback to local store
    }

    const localPage = this.localStore.pages.find((p) => p.slug === slug);
    if (!localPage) {
      throw new NotFoundException(`Page with slug "${slug}" not found`);
    }
    await this.cache.set(cacheKey, localPage, 3600);
    return localPage;
  }

  async getNavigation(): Promise<{ header: NavigationItemModel[]; footer: Record<string, NavigationItemModel[]> }> {
    const cacheKey = 'navigation:all';
    const cached = await this.cache.get<any>(cacheKey);
    if (cached) return cached;

    try {
      const items = await this.prisma.navigationItem.findMany({
        where: { isActive: true },
        orderBy: { orderIndex: 'asc' }
      });
      if (items.length > 0) {
        const header = items.filter((item) => item.menuLocation === 'HEADER');
        const footer = {
          product: items.filter((item) => item.menuLocation === 'FOOTER_PRODUCT'),
          useCases: items.filter((item) => item.menuLocation === 'FOOTER_USE_CASES'),
          resources: items.filter((item) => item.menuLocation === 'FOOTER_RESOURCES'),
          company: items.filter((item) => item.menuLocation === 'FOOTER_COMPANY')
        };
        const result = { header, footer } as unknown as { header: NavigationItemModel[]; footer: Record<string, NavigationItemModel[]> };
        await this.cache.set(cacheKey, result, 3600);
        return result;
      }
    } catch {
      // Fallback
    }

    const items = this.localStore.navigation;
    const header = items.filter((item) => item.menuLocation === 'HEADER');
    const footer = {
      product: items.filter((item) => item.menuLocation === 'FOOTER_PRODUCT'),
      useCases: items.filter((item) => item.menuLocation === 'FOOTER_USE_CASES'),
      resources: items.filter((item) => item.menuLocation === 'FOOTER_RESOURCES'),
      company: items.filter((item) => item.menuLocation === 'FOOTER_COMPANY')
    };
    const result = { header, footer };
    await this.cache.set(cacheKey, result, 3600);
    return result;
  }

  async getWebsiteSettings(): Promise<WebsiteSettingModel> {
    const cacheKey = 'settings:default';
    const cached = await this.cache.get<WebsiteSettingModel>(cacheKey);
    if (cached) return cached;

    try {
      const settings = await this.prisma.websiteSetting.findFirst();
      if (settings) {
        await this.cache.set(cacheKey, settings, 3600);
        return settings as unknown as WebsiteSettingModel;
      }
    } catch {
      // Fallback
    }

    const settings = this.localStore.websiteSettings;
    await this.cache.set(cacheKey, settings, 3600);
    return settings;
  }
}
