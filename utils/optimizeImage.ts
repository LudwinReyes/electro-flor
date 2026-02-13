/**
 * Optimiza URLs de imágenes de Sanity CDN añadiendo parámetros de transformación.
 * Convierte automáticamente a WebP y limita el ancho máximo.
 * 
 * @param url - URL original de la imagen (Sanity CDN)
 * @param width - Ancho máximo deseado en px (default: 800)
 * @returns URL optimizada con parámetros de transformación
 */
export const optimizeImage = (url: string | undefined | null, width: number = 800): string => {
    if (!url) return '';

    // Solo optimizar URLs de Sanity CDN
    if (!url.includes('cdn.sanity.io')) return url;

    // Evitar duplicar parámetros
    if (url.includes('auto=format')) return url;

    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}auto=format&fit=max&w=${width}`;
};

/**
 * Optimiza un array de URLs de imágenes.
 */
export const optimizeImages = (urls: string[] | undefined | null, width: number = 800): string[] => {
    if (!urls) return [];
    return urls.map(url => optimizeImage(url, width));
};
