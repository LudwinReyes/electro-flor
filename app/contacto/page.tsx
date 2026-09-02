import ContactPage from '../../components/ContactPage';

export const metadata = {
  title: 'Contacto | Electro Flor',
  description: 'Contáctanos para cotizaciones, soporte técnico o consultas corporativas.',
  alternates: {
    canonical: 'https://www.electroflorperu.com/contacto',
  },
};

export default function Page() {
  return <ContactPage />;
}
