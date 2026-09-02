import { Suspense } from 'react';
import ProductsPage from '../../components/ProductsPage';
import { getProducts, getCategories, getBrands } from '../../services/sanity';

export const metadata = {
  title: 'Catálogo de Productos de Iluminación y Material Eléctrico | Electro Flor',
  description: 'Navega por nuestro catálogo de materiales eléctricos e iluminación LED en Perú. Precios por mayor, stock garantizado y envíos a todo el país.',
  alternates: {
    canonical: 'https://www.electroflorperu.com/productos',
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
