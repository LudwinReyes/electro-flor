import BrandsPage from '../../components/BrandsPage';

export const metadata = {
  title: 'Nuestras Marcas | Electro Flor',
  description: 'Trabajamos con las mejores marcas del mercado: Bosch, Schneider Electric, Indeco y más.',
  alternates: {
    canonical: '/marcas',
  },
};

export default function Page() {
  return <BrandsPage />;
}
