import ReclamacionesPage from '../../components/ReclamacionesPage';

export const metadata = {
  title: 'Libro de Reclamaciones | Electro Flor',
  description: 'Libro de reclamaciones virtual de Electro Flor.',
  alternates: {
    canonical: 'https://www.electroflorperu.com/libro-de-reclamaciones',
  },
};

export default function Page() {
  return <ReclamacionesPage />;
}
