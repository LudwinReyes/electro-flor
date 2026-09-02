import { Suspense } from 'react';
import ProductsPage from '../../../components/ProductsPage';
import { getCategoryBySlug, getProducts, getCategories, getBrands } from '../../../services/sanity';
import { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ categorySlug: string }> | { categorySlug: string } 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.categorySlug;
  const category = await getCategoryBySlug(categorySlug);
  
  const formattedCategory = category?.name || categorySlug
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  let title = category?.seoTitle || `${formattedCategory} en Lima Perú | Precios por Mayor`;
  if (!title.toLowerCase().includes('electro flor')) {
    title = `${title} | Electro Flor`;
  }
  const rawDescription = category?.seoDescription || category?.description || `Encuentra productos de ${formattedCategory} con stock garantizado en Lima, Perú. Cotiza con los mejores precios de distribuidor en Electro Flor.`;
  const description = rawDescription.length > 160 ? rawDescription.slice(0, 157).trim() + '...' : rawDescription;

  const canonicalUrl = `https://www.electroflorperu.com/productos/${categorySlug}`;

  return {
    title,
    description,
    keywords: [formattedCategory, `${formattedCategory} perú`, `${formattedCategory} lima`, 'material eléctrico', 'electro flor', 'distribuidor mayorista'],
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      locale: 'es_PE',
      siteName: 'ELECTRO FLOR'
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function Page({
  params
}: {
  params: Promise<{ categorySlug: string }> | { categorySlug: string }
}) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.categorySlug;

  const [category, products, categories, brands] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getProducts(),
    getCategories(),
    getBrands()
  ]);

  const categoryName = category?.name || categorySlug;
  const categoryProducts = (products || []).filter((p: any) => 
    p.categorySlug === categorySlug || p.category === categoryName || p.category === category?.name
  );

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://www.electroflorperu.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Productos',
        item: 'https://www.electroflorperu.com/productos'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: categoryName,
        item: `https://www.electroflorperu.com/productos/${categorySlug}`
      }
    ]
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category?.seoTitle || `${categoryName} en Perú`,
    description: category?.seoDescription || category?.description,
    url: `https://www.electroflorperu.com/productos/${categorySlug}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: categoryProducts.slice(0, 10).map((prod: any, idx: number) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `https://www.electroflorperu.com/producto/${prod.slug || prod.id}`,
        name: prod.name
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <Suspense fallback={<div className="h-64 flex justify-center items-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002D62]"></div></div>}>
        <ProductsPage 
          initialProducts={products || []} 
          initialCategories={categories || []} 
          initialBrands={brands || []} 
        />
      </Suspense>
    </>
  );
}
