import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { LocalStoreService } from '../../infrastructure/database/local-store.service';
import { SearchResultsResponse, SearchResultItem } from '@talknex/contracts';

@Injectable()
export class SearchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly localStore: LocalStoreService
  ) { }

  async search(query: string): Promise<SearchResultsResponse> {
    const q = query ? query.trim() : '';
    if (!q || q.length < 2) {
      throw new BadRequestException('Search query must be at least 2 characters long');
    }

    try {
      const [blogPosts, useCases, faqs, integrations] = await Promise.all([
        this.prisma.blogPost.findMany({
          where: {
            status: 'PUBLISHED',
            OR: [
              { title: { contains: q, mode: 'insensitive' } },
              { excerpt: { contains: q, mode: 'insensitive' } },
              { content: { contains: q, mode: 'insensitive' } }
            ]
          },
          take: 5
        }),
        this.prisma.useCase.findMany({
          where: {
            isActive: true,
            OR: [
              { title: { contains: q, mode: 'insensitive' } },
              { industry: { contains: q, mode: 'insensitive' } },
              { summary: { contains: q, mode: 'insensitive' } }
            ]
          },
          take: 5
        }),
        this.prisma.faq.findMany({
          where: {
            OR: [
              { question: { contains: q, mode: 'insensitive' } },
              { answer: { contains: q, mode: 'insensitive' } }
            ]
          },
          take: 5
        }),
        this.prisma.integration.findMany({
          where: {
            OR: [
              { name: { contains: q, mode: 'insensitive' } },
              { description: { contains: q, mode: 'insensitive' } }
            ]
          },
          take: 5
        })
      ]);

      const items: SearchResultItem[] = [
        ...blogPosts.map((b) => ({
          id: b.id,
          type: 'blog' as const,
          title: b.title,
          snippet: b.excerpt,
          url: `/blog/${b.slug}`
        })),
        ...useCases.map((u) => ({
          id: u.id,
          type: 'use_case' as const,
          title: `${u.industry}: ${u.title}`,
          snippet: u.summary,
          url: `/use-cases/${u.slug}`
        })),
        ...faqs.map((f) => ({
          id: f.id,
          type: 'faq' as const,
          title: f.question,
          snippet: f.answer.substring(0, 160) + '...',
          url: `/#faq`
        })),
        ...integrations.map((i) => ({
          id: i.id,
          type: 'integration' as const,
          title: `${i.name} Integration`,
          snippet: i.description,
          url: `/integrations/${i.slug}`
        }))
      ];

      return {
        query: q,
        totalResults: items.length,
        items
      };
    } catch {
      // Fallback to local store search
      const qLower = q.toLowerCase();
      const blogMatches = this.localStore.blogPosts
        .filter(
          (b) =>
            b.title.toLowerCase().includes(qLower) ||
            b.excerpt.toLowerCase().includes(qLower) ||
            b.content.toLowerCase().includes(qLower)
        )
        .map((b) => ({
          id: b.id,
          type: 'blog' as const,
          title: b.title,
          snippet: b.excerpt,
          url: `/blog/${b.slug}`
        }));

      const ucMatches = this.localStore.useCases
        .filter(
          (u) =>
            u.title.toLowerCase().includes(qLower) ||
            u.industry.toLowerCase().includes(qLower) ||
            u.summary.toLowerCase().includes(qLower)
        )
        .map((u) => ({
          id: u.id,
          type: 'use_case' as const,
          title: `${u.industry}: ${u.title}`,
          snippet: u.summary,
          url: `/use-cases/${u.slug}`
        }));

      const faqMatches = this.localStore.faqs
        .filter((f) => f.question.toLowerCase().includes(qLower) || f.answer.toLowerCase().includes(qLower))
        .map((f) => ({
          id: f.id,
          type: 'faq' as const,
          title: f.question,
          snippet: f.answer.substring(0, 160) + '...',
          url: `/#faq`
        }));

      const intMatches = this.localStore.integrations
        .filter((i) => i.name.toLowerCase().includes(qLower) || i.description.toLowerCase().includes(qLower))
        .map((i) => ({
          id: i.id,
          type: 'integration' as const,
          title: `${i.name} Integration`,
          snippet: i.description,
          url: `/integrations/${i.slug}`
        }));

      const items = [...blogMatches, ...ucMatches, ...faqMatches, ...intMatches];
      return {
        query: q,
        totalResults: items.length,
        items
      };
    }
  }
}
