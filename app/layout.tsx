import React from 'react';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Script from 'next/script';
import './globals.css';
import { SiteConfigProvider } from '../contexts/SiteConfigContext';
import { QuoteProvider } from '../contexts/QuoteContext';
import Footer from '../components/Footer';
import ShipmentUrgencyBar from '../components/ShipmentUrgencyBar';
import ScrollToTop from '../components/ScrollToTop';
import { getProducts } from '../services/sanity';
import GlobalModalsWrapper from '../components/GlobalModalsWrapper';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

export const metadata: Metadata = {
  metadataBase: new URL('https://electroflorperu.com'),
  title: {
    default: 'ELECTRO FLOR | Material Eléctrico e Iluminación LED en Perú',
    template: '%s',
  },
  description: 'Distribuidor de material eléctrico e iluminación LED en Perú. Venta de cables, reflectores y herramientas. Stock garantizado con entrega inmediata en Lima.',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    type: 'website',
    url: 'https://electroflorperu.com',
    siteName: 'ELECTRO FLOR',
    locale: 'es_PE',
    images: [
      {
        url: 'https://electroflorperu.com/media/Logo%20Electro%20Flor.png',
        width: 1200,
        height: 630,
        alt: 'ELECTRO FLOR | Material Eléctrico e Iluminación LED',
      },
    ],
  },
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
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isStudio = pathname.startsWith('/admin');

  // Si es Sanity Studio, renderizar layout limpio sin Header/Footer
  if (isStudio) {
    return (
      <html lang="es">
        <body style={{ margin: 0, padding: 0, overflow: 'auto' }}>
          {children}
        </body>
      </html>
    );
  }

  // Layout normal del sitio web
  const products = await getProducts() || [];

  return (
    <html lang="es">
      <head>
        {/* Google Tag Manager - beforeInteractive para SSR */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M3JVGCV6');`,
          }}
        />
        {/* Google Analytics GA4 */}
        <Script
          id="ga4-script-src"
          strategy="beforeInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XD6V9M3TRZ"
        />
        <Script
          id="ga4-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XD6V9M3TRZ');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HomeAndConstructionBusiness',
              name: 'Electro Flor E.I.R.L.',
              alternateName: ['Electro Flor', 'Electro Flor Perú', 'ELECTRO FLOR'],
              url: 'https://electroflorperu.com',
              logo: 'https://electroflorperu.com/media/Logo%20Electro%20Flor.png',
              image: 'https://electroflorperu.com/media/Logo%20Electro%20Flor.png',
              description: 'Distribuidor mayorista de material eléctrico, iluminación LED profesional y conductores en Lima, Perú.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Calle 28 de Julio 459',
                addressLocality: 'Magdalena del Mar',
                addressRegion: 'Lima',
                addressCountry: 'PE',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -12.0911,
                longitude: -77.0705,
              },
              telephone: '+51948198701',
              priceRange: '$$',
              sameAs: [
                'https://www.facebook.com/electroflorperu',
                'https://www.instagram.com/electroflorperu',
                'https://pe.linkedin.com/company/electro-flor',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'ELECTRO FLOR',
              url: 'https://electroflorperu.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://electroflorperu.com/productos?search={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <link rel="icon" href="/media/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/media/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/media/favicon.png" type="image/png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className="min-h-screen bg-white font-sans text-gray-900">
        {/* GTM noscript fallback */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M3JVGCV6"
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
        </noscript>
        <SiteConfigProvider>
          <QuoteProvider>
            <ScrollToTop />
            <ShipmentUrgencyBar />
            
            <GlobalModalsWrapper products={products}>
              {children}
            </GlobalModalsWrapper>

            <Footer />

            {/* Floating WhatsApp Button */}
            <FloatingWhatsApp />
          </QuoteProvider>
        </SiteConfigProvider>
      </body>
    </html>
  );
}

