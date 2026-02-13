/**
 * Optimize Sanity CDN image URLs by appending resize/format parameters.
 * Sanity's image CDN supports on-the-fly transformations via URL params.
 * This avoids downloading a 1798x1040 PNG when we only need a 100x56 WebP.
 * 
 * @param url - Original Sanity CDN image URL
 * @param width - Desired display width
 * @param options - Additional options (height, quality, format)
 * @returns Optimized URL with transform parameters
 */
export function optimizeImage(
    url: string | undefined,
    width: number,
    options?: { height?: number; quality?: number; fit?: 'max' | 'crop' | 'fill' | 'clip'; blur?: number }
): string {
    if (!url) return '';

    // Only transform Sanity CDN URLs
    if (!url.includes('cdn.sanity.io')) return url;

    const params = new URLSearchParams();
    params.set('w', String(width));
    if (options?.height) params.set('h', String(options.height));
    params.set('fit', options?.fit || 'max');
    params.set('auto', 'format'); // Auto-converts to WebP/AVIF when browser supports it
    params.set('q', String(options?.quality || 75));

    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${params.toString()}`;
}
