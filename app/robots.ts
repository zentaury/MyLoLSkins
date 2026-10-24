import { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        // /my-skins and /wishlist are noindex via metadata, not disallowed here: a blocked URL can't be crawled, so the noindex would never be read
        allow: '/',
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}