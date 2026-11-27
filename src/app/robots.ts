// src/app/robots.ts
import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/api/',
        '/cart',
        '/profile',
        '/favorites',
        '/login',
        '/signup',
        '/search',
        '/crear',
        '/generate-description',
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
