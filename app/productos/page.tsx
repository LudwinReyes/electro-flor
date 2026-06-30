import { Suspense } from 'react';
import ProductsPage from '../../components/ProductsPage';

export const metadata = {
  title: 'Productos | Electro Flor',
  description: 'Navega por nuestro catálogo de materiales eléctricos.',
  alternates: {
    canonical: '/productos',
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ProductsPage />
    </Suspense>
  );
}
