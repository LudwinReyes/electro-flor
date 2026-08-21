import { Suspense } from 'react';
import ProductsPage from '../../../../components/ProductsPage';
import { getBrandBySlug, getProducts, getCategories, getBrands } from '../../../../services/sanity';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ brandSlug: string }> | { brandSlug: string } 
}) {
  const resolvedParams = await params;
  const brandSlug = resolvedParams.brandSlug;
  const brand = await getBrandBySlug(brandSlug);

  const formattedBrand = brand?.name || brandSlug
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return {
    title: brand?.seoTitle || `Productos de la Marca ${formattedBrand} | Electro Flor`,
    description: brand?.seoDescription || brand?.description?.slice(0, 160) || `Encuentra el catálogo completo de productos de la marca ${formattedBrand} en Electro Flor. Stock garantizado, fichas técnicas y precios competitivos en el mercado peruano.`,
    alternates: {
      canonical: `/productos/marca/${brandSlug}`,
    },
  };
}

export default async function Page() {
  const [products, categories, brands] = await Promise.all([
    getProducts(),
    getCategories(),
    getBrands()
  ]);

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ProductsPage 
        initialProducts={products || []} 
        initialCategories={categories || []} 
        initialBrands={brands || []} 
      />
    </Suspense>
  );
}
