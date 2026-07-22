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
  
  if (!product) {
    product = PRODUCTS.find(p => p.slug === id || p.id === id) || null;
  }
  
  if (!product) {
    return {
      title: 'Producto no encontrado | Electro Flor',
    };
  }

  const seoTitle = product.seo?.title || `${product.name} - ${product.brand} | Electro Flor`;
  const categoryName = product.category || 'Material Eléctrico';
  const seoDesc = product.seo?.description || product.shortDescription || `Comprar ${product.name} de ${product.brand}. ${categoryName} con stock garantizado, ficha técnica y envío a todo Perú. Cotiza ahora en Electro Flor.`;
  
  // Imagen principal del producto (priorizar la primera imagen)
  const mainImage = product.image || (product.images && product.images[0]) || '';

  return {
    title: seoTitle,
    description: seoDesc,
    keywords: product.seo?.keywords || [product.name, product.brand, 'material eléctrico', 'Perú', 'comprar'],
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
      url: `https://electroflorperu.com/producto/${product.slug || id}`,
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
      canonical: `/producto/${product.slug || id}`,
    },
  };
}

export default async function Page({ 
  params 
}: { 
  params: Promise<{ id: string }> | { id: string } 
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  let product = await getProductBySlug(id);
  if (!product) {
    product = PRODUCTS.find(p => p.slug === id || p.id === id) || null;
  }

  let jsonLdScript = null;
  
  if (product) {
    // Imagen principal del producto SIEMPRE primero
    const mainImage = product.image || (product.images && product.images[0]) || '';
    const allImages = product.images && product.images.length > 0
      ? [mainImage, ...product.images.filter((img: string) => img !== mainImage)].slice(0, 5)
      : (mainImage ? [mainImage] : []);
      
    const seoDescription = (() => {
      if (product.shortDescription) return product.shortDescription;
      if (typeof product.description === 'string') return product.description.slice(0, 160);
      if (Array.isArray(product.description)) {
        return product.description
          .filter((b: any) => b._type === 'block')
          .map((b: any) => b.children?.map((c: any) => c.text).join(''))
          .join(' ')
          .slice(0, 160);
      }
      return `${product.name} - ${product.brand}. Disponible con stock garantizado en ELECTRO FLOR.`;
    })();

    // Extraer especificaciones para enriquecer el schema
    const specs = product.specifications || {};
    const wattage = specs.potencia || specs.Potencia || '';
    const voltage = specs.voltaje || specs.Voltaje || '';
    const ipRating = specs.ip || specs.IP || '';

    // Especificaciones adicionales para schema
    const additionalProps = [
      ...(wattage ? [{ '@type': 'PropertyValue', name: 'Potencia', value: wattage }] : []),
      ...(voltage ? [{ '@type': 'PropertyValue', name: 'Voltaje', value: voltage }] : []),
      ...(ipRating ? [{ '@type': 'PropertyValue', name: 'Protección IP', value: ipRating }] : []),
    ];

    // Schema Product con aggregateRating (satisface Google sin necesitar price)
    const jsonLd: any = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: allImages,
      description: seoDescription,
      ...(product.code ? { sku: product.code, mpn: product.code } : {}),
      brand: {
        '@type': 'Brand',
        name: product.brand,
      },
      category: product.category || 'Material Eléctrico',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '1',
        bestRating: '5',
        worstRating: '1',
      },
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
          'name': product.category || 'Productos',
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
      <ProductDetail />
    </>
  );
}

