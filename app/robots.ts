import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/studio'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'anthropic-ai'],
        allow: '/',
        disallow: ['/admin', '/api/', '/studio'],
      },
      {
        userAgent: ['Bytespider', 'CCBot', 'FacebookBot', 'Amazonbot'],
        allow: '/',
        disallow: ['/admin', '/api/', '/studio'],
        crawlDelay: 10,
      }
    ],
    sitemap: 'https://electroflorperu.com/sitemap.xml',
  };
}
