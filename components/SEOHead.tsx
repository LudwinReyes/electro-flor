import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    noindex?: boolean;
    keywords?: string;
}

const SITE_NAME = 'ELECTRO FLOR';
const DEFAULT_TITLE = 'ELECTRO FLOR | Iluminación y Material Eléctrico en Perú';
const DEFAULT_DESCRIPTION = 'Distribuidor líder de material eléctrico en Perú. Iluminación LED, conductores, tableros y herramientas. Marcas líderes con stock garantizado y entrega inmediata.';
const DEFAULT_IMAGE = 'https://electroflorperu.com/media/Logo%20Electro%20Flor.png';
const SITE_URL = 'https://electroflorperu.com';

const SEOHead: React.FC<SEOHeadProps> = ({
    title,
    description = DEFAULT_DESCRIPTION,
    image = DEFAULT_IMAGE,
    url,
    type = 'website',
    noindex = false,
    keywords
}) => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;

    // Si la URL es la home (/), usamos SITE_URL directamente
    const cleanUrl = url === '/' ? '' : (url || '');
    const fullUrl = `${SITE_URL}${cleanUrl}`;

    return (
        <Helmet>
            {/* Básicos */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            {noindex && <meta name="robots" content="noindex, nofollow" />}
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:image" content={image} />
            <meta property="og:image:secure_url" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="es_PE" />

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEOHead;
