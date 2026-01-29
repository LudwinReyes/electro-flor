import { createClient } from '@sanity/client';

// CONFIGURACIÓN DE SANITY
// TODO: Reemplaza con tu Project ID real de Sanity Manage
const PROJECT_ID = (import.meta as any).env?.VITE_SANITY_PROJECT_ID || 'your-project-id';
const DATASET = (import.meta as any).env?.VITE_SANITY_DATASET || 'production';
const API_VERSION = (import.meta as any).env?.VITE_SANITY_API_VERSION || '2024-01-01';

export const sanityClient = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: false, // Desactivar CDN temporalmente para evitar CORS
  apiVersion: API_VERSION,
  perspective: 'published', // Solo obtener documentos publicados
  stega: {
    enabled: false,
  },
});

// Helper para verificar si Sanity está configurado
const isSanityConfigured = () => PROJECT_ID !== 'your-project-id';

// Helper para manejar errores
const handleSanityError = (error: any, fallback: any = null) => {
  console.warn('Error al obtener datos de Sanity:', error);
  return fallback;
};

// ==================== PRODUCTOS ====================

export const getProducts = async () => {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "product"] | order(featured desc, name asc) {
    _id,
    name,
    "slug": slug.current,
    "brand": brand->name,
    "brandSlug": brand->slug.current,
    "category": category->name,
    "categorySlug": category->slug.current,
    "image": image.asset->url,
    "images": images[].asset->url,
    description,
    shortDescription,
    specifications,
    featured,
    displaySections,
    "pdfFile": pdfFile.asset->url,
    pdfUrl,
    youtubeVideo
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    return handleSanityError(error);
  }
};

// Obtener productos por sección (top_ventas, ultimo_ingreso, soluciones_destacadas)
export const getProductsBySection = async (section: string) => {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "product" && $section in displaySections] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    "brand": brand->name,
    "category": category->name,
    "image": image.asset->url,
    description,
    shortDescription,
    featured
  }`;

  try {
    return await sanityClient.fetch(query, { section });
  } catch (error) {
    return handleSanityError(error);
  }
};

export const getProductBySlug = async (slug: string) => {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    "brand": brand->name,
    "brandSlug": brand->slug.current,
    "category": category->name,
    "categorySlug": category->slug.current,
    "image": image.asset->url,
    "images": images[].asset->url,
    description[] {
      ...,
      _type,
      style,
      listItem,
      children[] {
        ...,
        _type,
        marks,
        text
      },
      markDefs[]
    },
    shortDescription,
    specifications,
    featured,
    "pdfFile": pdfFile.asset->url,
    pdfUrl,
    youtubeVideo
  }`;

  try {
    return await sanityClient.fetch(query, { slug });
  } catch (error) {
    return handleSanityError(error);
  }
};

export const getFeaturedProducts = async (limit: number = 8) => {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "product" && featured == true][0...${limit}] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    "brand": brand->name,
    "category": category->name,
    "image": image.asset->url,
    description,
    featured
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    return handleSanityError(error);
  }
};

// ==================== CATEGORÍAS ====================

export const getCategories = async () => {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "category"] | order(order asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    "image": image.asset->url,
    description,
    icon,
    order,
    featured,
    "parentCategory": parentCategory->slug.current
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    return handleSanityError(error);
  }
};

export const getCategoryBySlug = async (slug: string) => {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "category" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    icon,
    "image": image.asset->url,
    description,
    "products": *[_type == "product" && references(^._id)] {
      _id,
      name,
      "slug": slug.current,
      "brand": brand->name,
      "image": image.asset->url
    }
  }`;

  try {
    return await sanityClient.fetch(query, { slug });
  } catch (error) {
    return handleSanityError(error);
  }
};

// ==================== MARCAS ====================

export const getBrands = async () => {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "brand"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    "logo": logo.asset->url,
    description
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    return handleSanityError(error);
  }
};

export const getBrandBySlug = async (slug: string) => {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "brand" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    "logo": logo.asset->url,
    description,
    website,
    "products": *[_type == "product" && references(^._id)] {
      _id,
      name,
      "slug": slug.current,
      "category": category->name,
      "image": image.asset->url
    }
  }`;

  try {
    return await sanityClient.fetch(query, { slug });
  } catch (error) {
    return handleSanityError(error);
  }
};

// ==================== PROYECTOS ====================

export const getProjects = async () => {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "project" && featured == true] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    type,
    location,
    "image": image.asset->url,
    description,
    featured,
    order
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    return handleSanityError(error);
  }
};

// ==================== CONFIGURACIÓN DEL SITIO ====================

export const getSiteSettings = async () => {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    "logo": logo.asset->url,
    primaryColor,
    secondaryColor,
    phone,
    whatsapp,
    email,
    address,
    "facebook": socialMedia.facebook,
    "instagram": socialMedia.instagram,
    "linkedin": socialMedia.linkedin,
    "schedule": businessHours
  }`;

  try {
    const result = await sanityClient.fetch(query);
    console.log('🔍 Query result from Sanity:', result);
    return result;
  } catch (error) {
    console.error('❌ Error fetching site settings:', error);
    return handleSanityError(error);
  }
};

export const getHeaderSettings = async () => {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "headerSettings"][0] {
    "logo": logo.asset->url,
    brandName,
    navigation,
    urgencyBar
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    return handleSanityError(error);
  }
};

export const getFooterSettings = async () => {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "footerSettings"][0] {
    "featuredCategories": featuredCategories[]-> {
      _id,
      name,
      "slug": slug.current
    },
    institutionalLinks,
    copyrightText
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    return handleSanityError(error);
  }
};

// ==================== PÁGINAS ====================

export const getHomePage = async () => {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "homePage"][0] {
    hero {
      title,
      subtitle,
      ctaText,
      ctaLink,
      "backgroundImage": backgroundImage.asset->url
    },
    featuredProducts {
      enabled,
      title,
      "products": products[]->{ 
        _id, 
        name, 
        "slug": slug.current,
        "brand": brand->name,
        "image": image.asset->url 
      }
    },
    categoriesSection,
    projectsSection,
    features,
    seo
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    return handleSanityError(error);
  }
};

export const getAboutPage = async () => {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "aboutPage"][0] {
    title,
    "heroImage": heroImage.asset->url,
    introduction,
    mission,
    vision,
    values,
    history,
    team[] {
      name,
      position,
      "photo": photo.asset->url,
      bio
    },
    certifications[] {
      title,
      "image": image.asset->url,
      year
    },
    seo
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    return handleSanityError(error);
  }
};

export const getFAQs = async () => {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "faqPage" && published == true] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    return handleSanityError(error);
  }
};

export const getFAQsByCategory = async (category: string) => {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "faqPage" && published == true && category == $category] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }`;

  try {
    return await sanityClient.fetch(query, { category });
  } catch (error) {
    return handleSanityError(error);
  }
};

// ==================== PROGRAMA ESPECIALISTA ====================

export const getProgramaEspecialista = async () => {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "programaEspecialista"][0] {
    badge,
    title,
    titleHighlight,
    benefits,
    inputPlaceholder,
    buttonText,
    successMessage
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    return handleSanityError(error);
  }
};

// ==================== LEADS / PROSPECTOS ====================

// Cliente con token de escritura (necesitas agregar VITE_SANITY_TOKEN en .env)
const sanityWriteClient = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: false,
  apiVersion: API_VERSION,
  token: (import.meta as any).env?.VITE_SANITY_TOKEN || '',
});

export const saveLead = async (whatsapp: string, source: string = 'programa_especialista') => {
  if (!isSanityConfigured()) {
    console.warn('Sanity no está configurado para guardar leads');
    return null;
  }

  try {
    const result = await sanityWriteClient.create({
      _type: 'lead',
      whatsapp,
      source,
      status: 'nuevo',
      createdAt: new Date().toISOString()
    });
    console.log('✅ Lead guardado:', result);
    return result;
  } catch (error) {
    console.error('❌ Error al guardar lead:', error);
    return null;
  }
};

// ==================== BANNERS Y BARRA DE URGENCIA ====================

export const getPromoBanners = async () => {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "promoBanner" && isActive == true] | order(_createdAt desc) {
    _id,
    name,
    position,
    badge,
    title,
    titleHighlight,
    description,
    "image": image.asset->url,
    buttonText,
    buttonUrl
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    return handleSanityError(error);
  }
};

export const getUrgencyBar = async () => {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "urgencyBar" && isActive == true][0] {
    message,
    highlightText,
    linkUrl
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    return handleSanityError(error);
  }
};

export const getDeliveryBanner = async () => {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "deliveryBanner" && isActive == true][0] {
    "truckImage": truckImage.asset->url,
    mainTitle,
    subtitle,
    promoTitle,
    promoAmount,
    badgeText
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    return handleSanityError(error);
  }
};
