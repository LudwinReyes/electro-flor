import { Suspense } from 'react';
import ProductsPage from '../../../../components/ProductsPage';
import { getCategoryBySlug, getProducts, getCategories, getBrands } from '../../../../services/sanity';
import { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ categorySlug: string, subcategorySlug: string }> | { categorySlug: string, subcategorySlug: string } 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.categorySlug;
  const subcategorySlug = resolvedParams.subcategorySlug;

  const category = await getCategoryBySlug(categorySlug);
  const subcategory = await getCategoryBySlug(subcategorySlug);

  const formattedCategory = category?.name || categorySlug
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  const formattedSubcategory = subcategory?.name || subcategorySlug
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  let title = subcategory?.seoTitle || `${formattedSubcategory} (${formattedCategory}) en Lima`;
  if (!title.toLowerCase().includes('electro flor')) {
    title = `${title} | Electro Flor`;
  }
  const rawDescription = subcategory?.seoDescription || subcategory?.description || `Descubre productos de ${formattedSubcategory} en ${formattedCategory} con stock garantizado en Lima, Perú. Cotiza con precios de distribuidor mayorista en Electro Flor.`;
  const description = rawDescription.length > 160 ? rawDescription.slice(0, 157).trim() + '...' : rawDescription;

  const canonicalUrl = `https://www.electroflorperu.com/productos/${categorySlug}/${subcategorySlug}`;

  return {
    title,
    description,
    keywords: [formattedSubcategory, formattedCategory, `${formattedSubcategory} perú`, 'material eléctrico', 'electro flor'],
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
  params: Promise<{ categorySlug: string, subcategorySlug: string }> | { categorySlug: string, subcategorySlug: string }
}) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.categorySlug;
  const subcategorySlug = resolvedParams.subcategorySlug;

  const [category, subcategory, products, categories, brands] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getCategoryBySlug(subcategorySlug),
    getProducts(),
    getCategories(),
    getBrands()
  ]);

  const categoryName = category?.name || categorySlug;
  const subcategoryName = subcategory?.name || subcategorySlug;

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
        name: categoryName,
        item: `https://www.electroflorperu.com/productos/${categorySlug}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: subcategoryName,
        item: `https://www.electroflorperu.com/productos/${categorySlug}/${subcategorySlug}`
      }
    ]
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: subcategory?.seoTitle || `${subcategoryName} en Perú`,
    description: subcategory?.seoDescription || subcategory?.description,
    url: `https://www.electroflorperu.com/productos/${categorySlug}/${subcategorySlug}`,
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
