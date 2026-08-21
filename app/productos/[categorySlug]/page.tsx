import { Suspense } from 'react';
import ProductsPage from '../../../components/ProductsPage';
import { getCategoryBySlug, getProducts, getCategories, getBrands } from '../../../services/sanity';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ categorySlug: string }> | { categorySlug: string } 
}) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.categorySlug;
  const category = await getCategoryBySlug(categorySlug);
  
  const formattedCategory = category?.name || categorySlug
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return {
    title: category?.seoTitle || `${formattedCategory} | Material Eléctrico y Ferretería | Electro Flor`,
    description: category?.seoDescription || category?.description?.slice(0, 160) || `Encuentra una amplia variedad de productos de la categoría ${formattedCategory} en Electro Flor. Stock garantizado, marcas líderes y entregas inmediatas en Lima, Perú.`,
    alternates: {
      canonical: `/productos/${categorySlug}`,
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
