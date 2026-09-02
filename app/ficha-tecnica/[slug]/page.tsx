import { Metadata } from 'next';
import FichaTecnicaPage from '../../../components/FichaTecnicaPage';
import { getProductBySlug } from '../../../services/sanity';
import { PRODUCTS } from '../../../constants';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> | { slug: string } 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  let product = await getProductBySlug(slug);
  if (!product) {
    product = PRODUCTS.find(p => p.slug === slug || p.id === slug) || null;
  }
  
  if (!product) {
    return {
      title: 'Ficha Técnica no encontrada | Electro Flor',
    };
  }

  const title = `Ficha Técnica: ${product.name} | Electro Flor`;
  const description = `Descarga o visualiza la ficha técnica oficial del producto ${product.name} de la marca ${product.brand}. Especificaciones y detalles completos en Electro Flor.`;
  
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.electroflorperu.com/ficha-tecnica/${slug}`,
    },
    openGraph: {
      title,
      description,
      images: [product.image],
    },
  };
}

export default function Page() {
  return <FichaTecnicaPage />;
}
