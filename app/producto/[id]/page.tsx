import ProductDetail from '../../../components/ProductDetail';
import { getProductBySlug } from '../../../services/sanity';
import { PRODUCTS } from '../../../constants';
import { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> | { id: string } 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  let product = await getProductBySlug(id);
  const optimizedSlug = 'campana-led-industrial-philips-smartbright-highbay-g2-100w';
  
  if (id === optimizedSlug || (product && product.slug === optimizedSlug)) {
    const fallbackProduct = PRODUCTS.find(p => p.slug === optimizedSlug);
    if (fallbackProduct) {
      product = { ...product, ...fallbackProduct };
    }
  } else if (!product) {
    product = PRODUCTS.find(p => p.slug === id || p.id === id) || null;
  }
  
  if (!product) {
    return {
      title: 'Producto no encontrado | Electro Flor',
    };
  }

  const codeSuffix = product.code ? ` (${product.code})` : '';
  let seoTitle = product.seo?.title || `${product.name}${codeSuffix} | Stock en Lima & Ficha Técnica`;
  if (!seoTitle.toLowerCase().includes('electro flor')) {
    seoTitle = `${seoTitle} | Electro Flor`;
  }
  const brandName = typeof product.brand === 'string' ? product.brand : product.brand?.name || 'Electro Flor';
  const categoryName = typeof product.category === 'string' ? product.category : product.category?.name || 'Material Eléctrico';
  const rawDesc = product.seo?.description || (product.shortDescription ? `${product.shortDescription}` : `✓ ${product.name} de ${brandName}. ${categoryName} con stock garantizado en Lima y envíos a todo el Perú. Cotiza ahora.`);
  const seoDesc = rawDesc.length > 160 ? rawDesc.slice(0, 157).trim() + '...' : rawDesc;
  
  // Imagen principal del producto (priorizar la primera imagen)
  const mainImage = product.image || (Array.isArray(product.images) && product.images[0]) || '';

  const canonicalUrl = `https://electroflorperu.com/producto/${product.slug || id}`;

  return {
    title: seoTitle,
    description: seoDesc,
    keywords: product.seo?.keywords || [product.name, brandName, 'material eléctrico', 'Perú', 'comprar'],
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    openGraph: {
      type: 'website',
      title: seoTitle,
      description: seoDesc,
      url: canonicalUrl,
      siteName: 'ELECTRO FLOR',
      images: mainImage ? [
        {
          url: mainImage,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ] : [],
      locale: 'es_PE',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDesc,
      images: mainImage ? [mainImage] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

function generateProductSku(product: any): string {
  const code = product.code ? String(product.code).trim() : '';
  if (code && code.length <= 20) {
    return code.toUpperCase();
  }
  
  // Si no tiene código o es muy largo, generar uno único y corto
  const rawBrand = typeof product.brand === 'string' ? product.brand : product.brand?.name || 'EF';
  const rawCategory = typeof product.category === 'string' ? product.category : product.category?.name || 'PROD';
  
  const brand = String(rawBrand || 'EF').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 3) || 'EF';
  const category = String(rawCategory || 'PROD').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 3) || 'PROD';
  
  // Usar un hash simple del slug o del ID para garantizar unicidad y brevedad
  const source = String(product.slug || product._id || product.id || 'PRODUCT');
  let hash = 0;
  for (let i = 0; i < source.length; i++) {
    hash = (hash << 5) - hash + source.charCodeAt(i);
    hash |= 0;
  }
  const uniqueCode = Math.abs(hash).toString(36).toUpperCase().slice(0, 5);
  
  return `${brand}-${category}-${uniqueCode}`;
}

export default async function Page({ 
  params 
}: { 
  params: Promise<{ id: string }> | { id: string } 
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  let product = await getProductBySlug(id);
  const optimizedSlug = 'campana-led-industrial-philips-smartbright-highbay-g2-100w';
  
  if (id === optimizedSlug || (product && product.slug === optimizedSlug)) {
    const fallbackProduct = PRODUCTS.find(p => p.slug === optimizedSlug);
    if (fallbackProduct) {
      product = { ...product, ...fallbackProduct };
    }
  } else if (!product) {
    product = PRODUCTS.find(p => p.slug === id || p.id === id) || null;
  }

  let jsonLdScript = null;
  
  if (product) {
    // Imagen principal del producto SIEMPRE primero
    const mainImage = product.image || (Array.isArray(product.images) && product.images[0]) || '';
    const rawImages = Array.isArray(product.images) ? product.images : [];
    const allImages = rawImages.length > 0
      ? [mainImage, ...rawImages.filter((img: any) => typeof img === 'string' && img !== mainImage)].slice(0, 5)
      : (mainImage ? [mainImage] : []);
      
    const brandName = typeof product.brand === 'string' ? product.brand : product.brand?.name || 'Electro Flor';
    const categoryName = typeof product.category === 'string' ? product.category : product.category?.name || 'Material Eléctrico';

    const seoDescription = (() => {
      if (product.shortDescription) return String(product.shortDescription);
      if (typeof product.description === 'string') return product.description.slice(0, 160);
      if (Array.isArray(product.description)) {
        return product.description
          .filter((b: any) => b && b._type === 'block')
          .map((b: any) => (Array.isArray(b.children) ? b.children.map((c: any) => c?.text || '').join('') : ''))
          .join(' ')
          .slice(0, 160);
      }
      return `${product.name || 'Producto'} - ${brandName}. Disponible con stock garantizado en ELECTRO FLOR.`;
    })();

    // Extraer especificaciones para enriquecer el schema
    const specs = product.specifications || {};
    const normalizedSpecs: Record<string, string> = Array.isArray(specs)
      ? specs.reduce((acc: Record<string, string>, spec: any) => {
        if (spec && spec.label && spec.value) acc[String(spec.label)] = String(spec.value);
        return acc;
      }, {})
      : (typeof specs === 'object' && specs !== null ? specs : {});

    const wattage = normalizedSpecs.potencia || normalizedSpecs.Potencia || '';
    const voltage = normalizedSpecs.voltaje || normalizedSpecs.Voltaje || '';
    const ipRating = normalizedSpecs.ip || normalizedSpecs.IP || '';

    // Especificaciones adicionales para schema
    const additionalProps = [
      ...(wattage ? [{ '@type': 'PropertyValue', name: 'Potencia', value: wattage }] : []),
      ...(voltage ? [{ '@type': 'PropertyValue', name: 'Voltaje', value: voltage }] : []),
      ...(ipRating ? [{ '@type': 'PropertyValue', name: 'Protección IP', value: ipRating }] : []),
    ];

    // Schema Product seguro y conforme a las directrices de Google
    const jsonLd: any = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: allImages,
      description: seoDescription,
      sku: generateProductSku(product),
      mpn: generateProductSku(product),
      brand: {
        '@type': 'Brand',
        name: brandName,
      },
      category: categoryName,
      ...(additionalProps.length > 0 ? { additionalProperty: additionalProps } : {}),
    };

    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Inicio',
          'item': 'https://electroflorperu.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': categoryName || 'Productos',
          'item': product.categorySlug 
            ? `https://electroflorperu.com/productos/${product.categorySlug}` 
            : 'https://electroflorperu.com/productos'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': product.name,
          'item': `https://electroflorperu.com/producto/${product.slug || id}`
        }
      ]
    };

    jsonLdScript = (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </>
    );
  }

  return (
    <>
      {jsonLdScript}
      <ProductDetail initialProduct={product} />
    </>
  );
}


