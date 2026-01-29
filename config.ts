
/**
 * Configuración centralizada para la integración de datos.
 * Recomendación: Medusa.js para E-commerce o Directus para gestión de catálogos rápida.
 */

export const API_CONFIG = {
  // Cambiar por la URL de tu Medusa o Directus cuando esté desplegado
  BASE_URL: process.env.VITE_API_URL || 'http://localhost:9000',
  ENABLE_ANALYTICS: true,
  CURRENCY: 'PEN',
  COUNTRY: 'PE'
};

export const SEO_CONFIG = {
  DEFAULT_TITLE: 'ELECTRO FLOR | Material Eléctrico e Iluminación',
  DEFAULT_DESCRIPTION: 'Distribuidor oficial de las mejores marcas eléctricas en Perú.',
  ORGANIZATION_NAME: 'ELECTRO FLOR'
};

/**
 * Información de contacto centralizada
 * Administrable desde Sanity CMS
 */
export const CONTACT_INFO = {
  phone: {
    display: '999 000 000',
    full: '51999000000',
    formatted: '+51 999 000 000',
    link: 'tel:51999000000',
    whatsapp: 'https://wa.me/51999000000'
  },
  email: {
    sales: 'ventas@electroflor.com.pe',
    support: 'soporte@electroflor.com.pe',
    general: 'info@electroflor.com.pe'
  },
  address: {
    street: 'Av. Argentina 245',
    city: 'Lima',
    district: 'Cercado de Lima',
    country: 'Perú',
    full: 'Av. Argentina 245, Lima, Perú',
    maps: 'https://maps.google.com/?q=Av.+Argentina+245+Lima'
  },
  social: {
    facebook: 'https://facebook.com/electroflor',
    instagram: 'https://instagram.com/electroflor',
    linkedin: 'https://linkedin.com/company/electroflor',
    youtube: 'https://youtube.com/@electroflor'
  },
  schedule: {
    weekdays: 'Lunes a Viernes: 8:00 AM - 6:00 PM',
    saturday: 'Sábados: 9:00 AM - 2:00 PM',
    sunday: 'Domingos: Cerrado'
  }
} as const;

/**
 * Configuración de mensajes y textos del sitio
 * Administrable desde Sanity CMS
 */
export const SITE_MESSAGES = {
  whatsapp: {
    defaultGreeting: 'Hola, tengo una consulta sobre materiales eléctricos.',
    quoteRequest: (productName: string) => `Hola, solicito cotización inmediata para: ${productName}`,
    stockInquiry: (productName: string) => `Hola, me interesa el ${productName}, ¿tienen stock para envío?`,
    bulkQuote: 'Hola ELECTRO FLOR, solicito cotización corporativa para la siguiente lista de productos:'
  },
  urgency: {
    shipping: 'Próximo camión sale esta tarde - ¡Pide ahora para recibir mañana!',
    stock: 'STOCK GARANTIZADO',
    delivery: 'ENTREGA INMEDIATA'
  },
  cta: {
    quote: 'COTIZAR',
    addToCart: 'Agregar a Lista',
    sendWhatsApp: 'Enviar por WhatsApp',
    viewDetails: 'Ver Detalles',
    buyNow: 'Comprar Ahora',
    contact: 'Contactar Ventas'
  },
  sections: {
    hero: {
      title: 'LA FUERZA DE TU CONSTRUCCIÓN',
      subtitle: 'Material eléctrico profesional con entrega el mismo día'
    },
    products: {
      title: 'EXPLORA NUESTRO',
      titleHighlight: 'PRODUCTOS',
      filterBy: 'Filtrar por'
    },
    projects: {
      title: 'PROYECTOS',
      titleHighlight: 'DESTACADOS',
      subtitle: 'Casos de éxito'
    },
    brands: {
      title: 'BUSCAR POR',
      titleHighlight: 'MARCA',
      subtitle: 'Nuestras alianzas'
    }
  }
} as const;

/**
 * Configuración de funcionalidades del sitio
 * Administrable desde Sanity CMS
 */
export const SITE_FEATURES = {
  shipping: {
    enabled: true,
    sameDayDelivery: true,
    freeShippingThreshold: 300, // En soles
    deliveryAreas: ['Lima Metropolitana', 'Callao']
  },
  quote: {
    enabled: true,
    requiresAuth: false,
    maxItems: 50
  },
  chat: {
    enabled: true,
    provider: 'whatsapp', // 'whatsapp' | 'gemini' | 'both'
    geminiEnabled: true
  }
} as const;

/**
 * Sistema centralizado de colores de la marca
 * Usar estas variables en lugar de hardcodear colores en los componentes
 */
export const BRAND_COLORS = {
  // Colores principales
  primary: '#002D62',      // Azul oscuro
  secondary: '#8CC63F',    // Verde lima
  
  // Variaciones de primary
  primaryLight: '#003d82',
  primaryDark: '#001d42',
  primaryOpacity: {
    5: 'rgba(0, 45, 98, 0.05)',
    10: 'rgba(0, 45, 98, 0.1)',
    20: 'rgba(0, 45, 98, 0.2)',
    90: 'rgba(0, 45, 98, 0.9)',
  },
  
  // Variaciones de secondary
  secondaryLight: '#a3e04a',
  secondaryDark: '#7ab32e',
  secondaryOpacity: {
    5: 'rgba(140, 198, 63, 0.05)',
    10: 'rgba(140, 198, 63, 0.1)',
    20: 'rgba(140, 198, 63, 0.2)',
    30: 'rgba(140, 198, 63, 0.3)',
  },
  
  // Colores de estado
  success: '#25d366',      // WhatsApp green
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  
  // Colores neutrales
  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Colores de fondo
  background: {
    main: '#fcfdfd',
    alt: '#f4f7f9',
    dark: '#002D62',
  }
} as const;

/**
 * Utilidad para obtener clases de Tailwind con colores de marca
 * Ejemplo: getColorClass('bg', 'primary') => 'bg-[#002D62]'
 */
export const getColorClass = (prefix: string, color: keyof typeof BRAND_COLORS | string) => {
  const colorValue = BRAND_COLORS[color as keyof typeof BRAND_COLORS];
  if (typeof colorValue === 'string') {
    return `${prefix}-[${colorValue}]`;
  }
  return '';
};
