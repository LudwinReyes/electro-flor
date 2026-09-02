import { Suspense } from 'react';
import ProductsPage from '../../../../components/ProductsPage';
import { getBrandBySlug, getProducts, getCategories, getBrands } from '../../../../services/sanity';
import { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ brandSlug: string }> | { brandSlug: string } 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const brandSlug = resolvedParams.brandSlug;
  const brand = await getBrandBySlug(brandSlug);

  const formattedBrand = brand?.name || brandSlug
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  let title = brand?.seoTitle || `Catálogo ${formattedBrand} en Lima Perú | Precios`;
  if (!title.toLowerCase().includes('electro flor')) {
    title = `${title} | Electro Flor`;
  }
  const rawDescription = brand?.seoDescription || brand?.description || `✓ Distribuidor de la marca ${formattedBrand} en Lima, Perú. Stock garantizado, fichas técnicas y precios especiales para contratistas. Cotiza en Electro Flor.`;
  const description = rawDescription.length > 160 ? rawDescription.slice(0, 157).trim() + '...' : rawDescription;

  const canonicalUrl = `https://www.electroflorperu.com/productos/marca/${brandSlug}`;

  return {
    title,
    description,
    keywords: [formattedBrand, `${formattedBrand} perú`, `${formattedBrand} lima`, `productos ${formattedBrand}`, 'distribuidor oficial', 'electro flor'],
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
  params: Promise<{ brandSlug: string }> | { brandSlug: string }
}) {
  const resolvedParams = await params;
  const brandSlug = resolvedParams.brandSlug;

  const [brand, products, categories, brands] = await Promise.all([
    getBrandBySlug(brandSlug),
    getProducts(),
    getCategories(),
    getBrands()
  ]);

  const brandName = brand?.name || brandSlug;
  const brandProducts = (products || []).filter((p: any) => 
    p.brandSlug === brandSlug || p.brand?.toLowerCase() === brandName.toLowerCase()
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
        name: 'Marcas',
        item: 'https://www.electroflorperu.com/marcas'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: brandName,
        item: `https://www.electroflorperu.com/productos/marca/${brandSlug}`
      }
    ]
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: brand?.seoTitle || `Productos ${brandName} en Perú`,
    description: brand?.seoDescription || brand?.description,
    url: `https://www.electroflorperu.com/productos/marca/${brandSlug}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: brandProducts.slice(0, 10).map((prod: any, idx: number) => ({
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
