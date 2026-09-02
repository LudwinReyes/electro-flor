import FaqPage from '../../components/FaqPage';

export const metadata = {
  title: 'Preguntas Frecuentes | Electro Flor',
  description: 'Resuelve tus dudas sobre envíos, garantías y métodos de pago.',
  alternates: {
    canonical: 'https://www.electroflorperu.com/faq',
  },
};

export default function Page() {
  return <FaqPage />;
}
