// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/data';
import { categorySeo, siteUrl } from '@/lib/site';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const now = new Date();

  return [
    { url: siteUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/ofertas`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    ...Object.keys(categorySeo).map((category) => ({
      url: `${siteUrl}/?category=${encodeURIComponent(category)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...products.map((p) => ({
      url: `${siteUrl}/products/${p.id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
