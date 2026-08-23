/**
 * Utilidad para enviar eventos a Google Tag Manager (DataLayer)
 */
export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window !== 'undefined') {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: eventName,
      ...params,
    });
  }
};
