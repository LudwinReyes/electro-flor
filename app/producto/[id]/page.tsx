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
  
  // 1. Intentar obtener de Sanity
  let product = await getProductBySlug(id);
  
  // 2. Si no se encuentra, buscar en las constantes locales (fallback)
  if (!product) {
    product = PRODUCTS.find(p => p.slug === id || p.id === id) || null;
  }
  
  if (!product) {
    return {
      title: 'Producto no encontrado | Electro Flor',
    };
  }

  const seoTitle = product.seo?.title || `${product.name} | ${product.brand} | Electro Flor`;
  const seoDesc = product.seo?.description || product.shortDescription || `Comprar ${product.name} de la marca ${product.brand} (Cod: ${product.code}). Encuentra stock garantizado, ficha técnica y el mejor precio en Perú en Electro Flor.`;

  return {
    title: seoTitle,
    description: seoDesc,
    keywords: product.seo?.keywords || [product.name, product.brand, 'material eléctrico', 'Perú', 'comprar'],
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      images: [product.image],
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
    const optimizedThumbnails = product.images 
      ? product.images.slice(0, 3) 
      : (product.image ? [product.image] : []);
      
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

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: optimizedThumbnails,
      description: seoDescription,
      sku: product.code,
      brand: {
        '@type': 'Brand',
        name: product.brand,
      },
      offers: {
        '@type': 'Offer',
        url: `https://electroflorperu.com/producto/${product.slug || id}`,
        availability: 'https://schema.org/InStock',
      },
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
          'item': product.category ? `https://electroflorperu.com/productos/${product.category.toLowerCase().replace(/\s+/g, '-')}` : 'https://electroflorperu.com/productos'
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
