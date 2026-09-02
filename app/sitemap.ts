import { MetadataRoute } from 'next';
import { sanityServerClient } from '../services/sanity';
import { BLOG_POSTS } from '../constants/posts';

// Forzar que el sitemap se regenere en cada petición (no cacheado en build)
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.electroflorperu.com';

  // Consultas directas a Sanity SIN caché CDN para datos siempre frescos
  let products: any[] = [];
  let categories: any[] = [];
  let brands: any[] = [];

  try {
    [products, categories, brands] = await Promise.all([
      sanityServerClient.fetch(`*[_type == "product"] | order(name asc) {
        _id,
        _updatedAt,
        "slug": slug.current
      }`),
      sanityServerClient.fetch(`*[_type == "category"] | order(order asc, name asc) {
        _id,
        _updatedAt,
        "slug": slug.current,
        "parentCategory": parentCategory->slug.current
      }`),
      sanityServerClient.fetch(`*[_type == "brand"] | order(name asc) {
        _id,
        _updatedAt,
        "slug": slug.current
      }`),
    ]);
  } catch (error) {
    console.error('Error fetching sitemap data from Sanity:', error);
  }

  // Separar categorías padre y subcategorías
  const parentCategories = categories.filter((c: any) => !c.parentCategory);
  const subCategories = categories.filter((c: any) => c.parentCategory);

  const staticRoutes = [
    { path: '/nosotros', freq: 'monthly' as const, prio: 0.6 },
    { path: '/contacto', freq: 'monthly' as const, prio: 0.7 },
    { path: '/faq', freq: 'monthly' as const, prio: 0.5 },
    { path: '/marcas', freq: 'weekly' as const, prio: 0.8 },
    { path: '/blog', freq: 'daily' as const, prio: 0.8 },
    { path: '/libro-de-reclamaciones', freq: 'yearly' as const, prio: 0.4 },
  ].map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.freq,
    priority: route.prio,
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

    // Categorías padre: /productos/iluminacion
    ...parentCategories.map((c: any) => ({
      url: `${baseUrl}/productos/${c.slug}`,
      lastModified: c._updatedAt ? new Date(c._updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    // Subcategorías: /productos/iluminacion/apliques-de-exterior-decorativo
    ...subCategories.map((c: any) => ({
      url: `${baseUrl}/productos/${c.parentCategory}/${c.slug}`,
      lastModified: c._updatedAt ? new Date(c._updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),

    // Todas las marcas
    ...brands.map((b: any) => ({
      url: `${baseUrl}/productos/marca/${b.slug || b._id}`,
      lastModified: b._updatedAt ? new Date(b._updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),

    // Todos los productos
    ...products.map((p: any) => ({
      url: `${baseUrl}/producto/${p.slug || p._id}`,
      lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),

    // Todos los posts de blog
    ...BLOG_POSTS.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  return sitemap;
}

