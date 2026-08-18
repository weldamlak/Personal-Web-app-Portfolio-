import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://weldamlak.vercel.app/sitemap.xml',
  };
}