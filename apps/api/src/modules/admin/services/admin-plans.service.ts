import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { LocalStoreService } from '../../../infrastructure/database/local-store.service';
import { CacheService } from '../../../infrastructure/cache/cache.service';
import { PricingPlanModel } from '@talknex/shared';

@Injectable()
export class AdminPlansService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly localStore: LocalStoreService,
    private readonly cache: CacheService
  ) {}

  async listPlans(): Promise<PricingPlanModel[]> {
    try {
      const plans = await this.prisma.pricingPlan.findMany({
        orderBy: { displayOrder: 'asc' },
        include: { featureAssignments: { include: { feature: true } } }
      });
      if (plans.length > 0) {
        return plans.map((p) => ({
          ...p,
          features: p.featureAssignments.map((fa) => ({
            id: fa.id,
            planId: fa.planId,
            featureId: fa.featureId,
            isIncluded: fa.isIncluded,
            valueText: fa.valueText,
            feature: fa.feature
          }))
        })) as unknown as PricingPlanModel[];
      }
    } catch {
      // Fallback
    }

    return this.localStore.plans;
  }

  async getPlanById(id: string): Promise<PricingPlanModel> {
    const plans = await this.listPlans();
    const found = plans.find((p) => p.id === id || p.slug === id);
    if (!found) throw new NotFoundException(`Plan '${id}' not found`);
    return found;
  }

  async updatePlan(id: string, updates: Partial<PricingPlanModel>): Promise<PricingPlanModel> {
    try {
      await this.prisma.pricingPlan.update({
        where: { id },
        data: {
          name: updates.name,
          tagline: updates.tagline,
          monthlyPriceInr: updates.monthlyPriceInr,
          yearlyPriceInr: updates.yearlyPriceInr,
          callMinutesIncluded: updates.callMinutesIncluded,
          voiceAgentsLimit: updates.voiceAgentsLimit,
          isPopular: updates.isPopular,
          ctaText: updates.ctaText,
          ctaHref: updates.ctaHref,
          isActive: updates.isActive
        }
      });
    } catch {
      // Handled via local store
    }

    const idx = this.localStore.plans.findIndex((p) => p.id === id || p.slug === id);
    if (idx >= 0) {
      this.localStore.plans[idx] = { ...this.localStore.plans[idx], ...updates };
    }

    // Invalidate public pricing cache immediately
    await this.cache.del('pricing:plans:all');
    await this.cache.del('pricing:compare:matrix');

    this.localStore.logAudit('PLAN_UPDATE', 'PricingPlan', id, updates);
    return this.getPlanById(id);
  }
}

