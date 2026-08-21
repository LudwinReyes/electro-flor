import { Suspense } from 'react';
import ProductsPage from '../../components/ProductsPage';
import { getProducts, getCategories, getBrands } from '../../services/sanity';

export const metadata = {
  title: 'Productos | Electro Flor',
  description: 'Navega por nuestro catálogo de materiales eléctricos.',
  alternates: {
    canonical: '/productos',
  },
};

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
