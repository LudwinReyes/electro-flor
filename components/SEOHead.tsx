import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    noindex?: boolean;
}

const SITE_NAME = 'ELECTRO FLOR';
const DEFAULT_TITLE = 'ELECTRO FLOR | Iluminación y Material Eléctrico en Perú';
const DEFAULT_DESCRIPTION = 'Distribuidor oficial de material eléctrico en Perú. Especialistas en iluminación LED industrial, conductores eléctricos, herramientas Bosch y Schneider Electric. Stock garantizado y entrega inmediata en Lima.';
const DEFAULT_IMAGE = 'https://www.electroflor.com.pe/media/Logo%20Electro%20Flor.png';
const SITE_URL = 'https://www.electroflor.com.pe';

const SEOHead: React.FC<SEOHeadProps> = ({
    title,
    description = DEFAULT_DESCRIPTION,
    image = DEFAULT_IMAGE,
    url,
    type = 'website',
    noindex = false
}) => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
    const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;

    return (
        <Helmet>
            {/* Básicos */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:image" content={image} />
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
