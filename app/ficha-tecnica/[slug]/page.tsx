import { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
      robots: { index: false, follow: false },
    };
  }

  const brandName = typeof product.brand === 'string' ? product.brand : product.brand?.name || 'Electro Flor';
  const title = `Ficha Técnica: ${product.name} | Especificaciones & PDF | Electro Flor`;
  const description = `Ficha técnica oficial de ${product.name} (${brandName}). Descarga especificaciones técnicas, voltaje, potencia y certificación. Cotiza con stock garantizado en Lima en Electro Flor.`;
  
  return {
    title,
    description,
    alternates: {
      canonical: `https://electroflorperu.com/ficha-tecnica/${slug}`,
    },
    openGraph: {
      title,
      description,
      images: product.image ? [product.image] : [],
    },
  };
}

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  let product = await getProductBySlug(slug);
  if (!product) {
    product = PRODUCTS.find(p => p.slug === slug || p.id === slug) || null;
  }

  if (!product) {
    notFound();
  }

  return <FichaTecnicaPage initialProduct={product} />;
}
