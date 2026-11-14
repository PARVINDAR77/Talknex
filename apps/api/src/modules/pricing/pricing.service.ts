import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { CacheService } from '../../infrastructure/cache/cache.service';
import { LocalStoreService } from '../../infrastructure/database/local-store.service';
import { PricingPlanModel } from '@talknex/shared';

@Injectable()
export class PricingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
    private readonly localStore: LocalStoreService
  ) {}

  async getAllPlans(): Promise<PricingPlanModel[]> {
    const cacheKey = 'pricing:plans:all';
    const cached = await this.cache.get<PricingPlanModel[]>(cacheKey);
    if (cached) return cached;

    try {
      const plans = await this.prisma.pricingPlan.findMany({
        where: { isActive: true },
        orderBy: { displayOrder: 'asc' },
        include: {
          featureAssignments: {
            include: { feature: true },
            orderBy: { feature: { orderIndex: 'asc' } }
          }
        }
      });

      if (plans.length > 0) {
        const mapped = plans.map((p) => ({
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
        await this.cache.set(cacheKey, mapped, 3600);
        return mapped;
      }
    } catch {
      // Fallback
    }

    const plans = this.localStore.plans;
    await this.cache.set(cacheKey, plans, 3600);
    return plans;
  }

  async getPlanBySlug(slug: string): Promise<PricingPlanModel> {
    const cacheKey = `pricing:plan:${slug}`;
    const cached = await this.cache.get<PricingPlanModel>(cacheKey);
    if (cached) return cached;

    try {
      const plan = await this.prisma.pricingPlan.findUnique({
        where: { slug },
        include: {
          featureAssignments: {
            include: { feature: true }
          }
        }
      });
      if (plan) {
        const mapped = {
          ...plan,
          features: plan.featureAssignments.map((fa) => ({
            id: fa.id,
            planId: fa.planId,
            featureId: fa.featureId,
            isIncluded: fa.isIncluded,
            valueText: fa.valueText,
            feature: fa.feature
          }))
        } as unknown as PricingPlanModel;
        await this.cache.set(cacheKey, mapped, 3600);
        return mapped;
      }
    } catch {
      // Fallback
    }

    const plan = this.localStore.plans.find((p) => p.slug === slug);
    if (!plan) {
      throw new NotFoundException(`Pricing plan with slug "${slug}" not found`);
    }
    await this.cache.set(cacheKey, plan, 3600);
    return plan;
  }

  async getComparisonMatrix() {
    const plans = await this.getAllPlans();
    return {
      plans: plans.map((p) => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        tagline: p.tagline,
        monthlyPriceInr: p.monthlyPriceInr,
        yearlyPriceInr: p.yearlyPriceInr,
        isPopular: p.isPopular,
        ctaText: p.ctaText,
        ctaHref: p.ctaHref
      })),
      categories: [
        {
          category: 'Calling & Capacity',
          features: [
            {
              id: 'feat_1',
              name: 'Included Call Minutes',
              description: 'Outbound and inbound connected voice minutes',
              planValues: plans.map((p) => ({
                planSlug: p.slug,
                planName: p.name,
                isIncluded: true,
                valueText:
                  p.slug === 'starter'
                    ? 'Up to 500 mins/mo'
                    : p.slug === 'growth'
                    ? 'Up to 2,500 mins/mo'
                    : p.slug === 'business'
                    ? 'Up to 10,000 mins/mo'
                    : 'Unlimited / Custom'
              }))
            },
            {
              id: 'feat_2',
              name: 'Active AI Voice Agents',
              description: 'Independent autonomous bots with unique personalities',
              planValues: plans.map((p) => ({
                planSlug: p.slug,
                planName: p.name,
                isIncluded: true,
                valueText:
                  p.slug === 'starter'
                    ? '1 Agent'
                    : p.slug === 'growth'
                    ? '5 Agents'
                    : p.slug === 'business'
                    ? '10 Agents'
                    : 'Unlimited'
              }))
            }
          ]
        },
        {
          category: 'Languages & Speech Intelligence',
          features: [
            {
              id: 'feat_3',
              name: 'Indian Languages (Hindi, Gujarati, English, etc.)',
              description: 'Full regional voice models with accent comprehension',
              planValues: plans.map((p) => ({
                planSlug: p.slug,
                planName: p.name,
                isIncluded: true,
                valueText:
                  p.slug === 'starter'
                    ? 'Hindi & English'
                    : p.slug === 'growth'
                    ? 'Hindi, Gujarati, English + 4 more'
                    : 'All 12+ Indian Languages'
              }))
            },
            {
              id: 'feat_4',
              name: 'Full-Duplex Interruption Handling',
              description: 'Caller can interrupt AI agent naturally mid-sentence',
              planValues: plans.map((p) => ({
                planSlug: p.slug,
                planName: p.name,
                isIncluded: true,
                valueText: null
              }))
            }
          ]
        },
        {
          category: 'Integrations & CRM',
          features: [
            {
              id: 'feat_5',
              name: 'Lead Capture & CRM Sync',
              description: 'Auto-sync transcripts and qualification data into CRM',
              planValues: plans.map((p) => ({
                planSlug: p.slug,
                planName: p.name,
                isIncluded: p.slug !== 'starter',
                valueText: p.slug === 'starter' ? 'Manual Export' : 'Instant Real-time Sync'
              }))
            },
            {
              id: 'feat_6',
              name: 'Calendar Appointment Booking',
              description: 'Direct integration with Google Calendar and Calendly',
              planValues: plans.map((p) => ({
                planSlug: p.slug,
                planName: p.name,
                isIncluded: p.slug !== 'starter',
                valueText: null
              }))
            }
          ]
        }
      ]
    };
  }
}
