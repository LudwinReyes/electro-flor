import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { SiteConfigProvider } from '../contexts/SiteConfigContext';
import { QuoteProvider } from '../contexts/QuoteContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ShipmentUrgencyBar from '../components/ShipmentUrgencyBar';
import ScrollToTop from '../components/ScrollToTop';
import QuoteCart from '../components/QuoteCart';
import PriceListModal from '../components/PriceListModal';
import { getProducts } from '../services/sanity';
import GlobalModalsWrapper from '../components/GlobalModalsWrapper'; // We'll create this to wrap the client-side modals state

export const metadata: Metadata = {
  metadataBase: new URL('https://electroflorperu.com'),
  title: 'Electro Flor - Ferretería y Material Eléctrico',
  description: 'Distribuidor oficial de material eléctrico en Perú. Iluminación LED industrial, conductores eléctricos, herramientas Bosch, Schneider Electric. Stock garantizado y entrega inmediata en Lima.',
  icons: {
    icon: '/media/favicon.png',
    shortcut: '/media/favicon.png',
    apple: '/media/favicon.png',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await getProducts() || [];

  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/media/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/media/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/media/favicon.png" type="image/png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className="min-h-screen bg-white font-sans text-gray-900">
        <SiteConfigProvider>
          <QuoteProvider>
            <ScrollToTop />
            <ShipmentUrgencyBar />
            
            <GlobalModalsWrapper products={products}>
              {children}
            </GlobalModalsWrapper>

            <Footer />

            {/* Floating WhatsApp Button */}
            <a
              href={`https://wa.me/51948198701?text=Hola,%20quisiera%20hacer%20una%20consulta`}
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-6 right-6 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all group border-4 border-white animate-bounce"
              aria-label="Contactar por WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-[#002D62] text-[10px] font-black px-4 py-2 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none border border-gray-100 uppercase tracking-widest">
                ¿Tienes dudas? ¡Escríbenos! 🛠️
              </span>
            </a>
          </QuoteProvider>
        </SiteConfigProvider>
      </body>
    </html>
  );
}
