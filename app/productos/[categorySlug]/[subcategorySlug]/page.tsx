import { Suspense } from 'react';
import ProductsPage from '../../../../components/ProductsPage';
import { getCategoryBySlug } from '../../../../services/sanity';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ categorySlug: string, subcategorySlug: string }> | { categorySlug: string, subcategorySlug: string } 
}) {
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

  return {
    title: subcategory?.seoTitle || `${formattedSubcategory} - ${formattedCategory} | Electro Flor`,
    description: subcategory?.seoDescription || subcategory?.description?.slice(0, 160) || `Descubre los mejores productos de la subcategoría ${formattedSubcategory} dentro de ${formattedCategory} en Electro Flor. Calidad garantizada y entregas inmediatas.`,
    alternates: {
      canonical: `/productos/${categorySlug}/${subcategorySlug}`,
    },
  };
}

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ProductsPage />
    </Suspense>
  );
}
