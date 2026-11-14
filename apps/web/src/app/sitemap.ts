import { MetadataRoute } from 'next';
import { api } from '../services/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://talknex.com';

  const [blogData, useCases, integrations] = await Promise.all([
    api.getBlogPosts(1, 100),
    api.getUseCases(),
    api.getIntegrations()
  ]);

  const staticRoutes = [
    '',
    '/product',
    '/product/ai-voice-agents',
    '/product/outbound-calling',
    '/product/inbound-calling',
    '/product/lead-qualification',
    '/product/appointment-booking',
    '/product/analytics',
    '/product/integrations',
    '/use-cases',
    '/how-it-works',
    '/pricing',
    '/pricing/compare',
    '/integrations',
    '/resources',
    '/blog',
    '/guides',
    '/case-studies',
    '/about',
    '/contact',
    '/book-demo',
    '/careers',
    '/partners',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-policy',
    '/data-protection',
    '/compliance'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route.startsWith('/product') || route.startsWith('/pricing') ? 0.9 : 0.7
  }));

  const blogRoutes = blogData.posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));

  const useCaseRoutes = useCases.map((uc) => ({
    url: `${baseUrl}/use-cases/${uc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));

  const integrationRoutes = integrations.map((item) => ({
    url: `${baseUrl}/integrations/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));

  return [...staticRoutes, ...blogRoutes, ...useCaseRoutes, ...integrationRoutes];
}

