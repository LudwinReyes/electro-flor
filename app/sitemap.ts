import { MetadataRoute } from 'next';
import { getProducts, getCategories, getBrands } from '../services/sanity';
import { PRODUCTS } from '../constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://electroflorperu.com';

  let products = await getProducts();
  if (!products || products.length === 0) products = PRODUCTS;

  const categories = await getCategories() || [];
  const brands = await getBrands() || [];

  const staticRoutes = [
    '/nosotros',
    '/contacto',
    '/faq',
    '/marcas',
    '/libro-de-reclamaciones',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/productos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculadora-conductores-electricos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...staticRoutes,
    ...products.map((p: any) => ({
      url: `${baseUrl}/producto/${p.slug || p.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...categories.map((c: any) => ({
      url: `${baseUrl}/productos/${c.parentCategory ? `${c.parentCategory}/` : ''}${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: c.parentCategory ? 0.6 : 0.7,
    })),
    ...brands.map((b: any) => ({
      url: `${baseUrl}/productos/marca/${b.slug || b._id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];

  return sitemap;
}
