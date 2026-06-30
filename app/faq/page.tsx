import FaqPage from '../../components/FaqPage';

export const metadata = {
  title: 'Preguntas Frecuentes | Electro Flor',
  description: 'Resuelve tus dudas sobre envíos, garantías y métodos de pago.',
  alternates: {
    canonical: '/faq',
  },
};

export default function Page() {
  return <FaqPage />;
}
