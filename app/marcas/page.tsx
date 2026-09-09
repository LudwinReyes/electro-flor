import BrandsPage from '../../components/BrandsPage';
import { getBrands } from '../../services/sanity';

export const metadata = {
  title: 'Nuestras Marcas | Electro Flor',
  description: 'Trabajamos con las mejores marcas del mercado: Bosch, Schneider Electric, Indeco y más.',
  alternates: {
    canonical: 'https://electroflorperu.com/marcas',
  },
};

export default async function Page() {
  const brands = await getBrands();
  return <BrandsPage initialBrands={brands || []} />;
}
