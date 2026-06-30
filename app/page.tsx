import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, Trophy, ShieldCheck, Clock, Building2 } from 'lucide-react';
import { getProducts, getCategories, getPromoBanners } from '../services/sanity';
import { optimizeImage } from '../utils/optimizeImage';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import ProductCarousel from '../components/ProductCarousel';
import DeliveryBanner from '../components/DeliveryBanner';
import ProjectsGallery from '../components/ProjectsGallery';
import { CONTACT_INFO } from '../config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default async function HomePage() {
    const [productsData, categoriesData, promoBannersData] = await Promise.all([
        getProducts(),
        getCategories(),
        getPromoBanners()
    ]);

    const products = productsData || [];
    const categories = categoriesData || [];
    const promoBanner = promoBannersData && promoBannersData.length > 0 ? promoBannersData[0] : null;

    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'HardwareStore',
        name: 'Electro Flor E.I.R.L.',
        alternateName: 'Electro Flor',
        image: 'https://electroflorperu.com/media/logo.png',
        '@id': 'https://electroflorperu.com/#localbusiness',
        url: 'https://electroflorperu.com',
        telephone: ['+51 948 198 701', '+51 904 162 516'],
        email: ['ventas.electroflor@gmail.com', 'elmervazquezguevara@gmail.com'],
        priceRange: '$$',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Av. Argentina 245, Pasaje 2, Puesto AR12, Centro Comercial Nicolini',
            addressLocality: 'Cercado de Lima',
            addressRegion: 'Lima',
            postalCode: '15082',
            addressCountry: 'PE'
        },
        hasMap: 'https://share.google/huOv6gxoYpjgx7mXa',
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ],
            opens: '08:30',
            closes: '19:30'
        },
        sameAs: [
            'https://www.facebook.com/p/Electro-Flor-EIRL-61552203052431/'
        ],
        vatID: '10773519523'
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <h1 className="sr-only">Electro Flor - Distribuidor oficial de material eléctrico en Perú. Iluminación LED, conductores eléctricos y herramientas.</h1>
            {/* Hero Section - Crucial for LCP, eager loaded */}
            <Hero />

            {/* Categories Grid - Crucial for navigation */}
            <section className="max-w-7xl mx-auto px-4 -mt-10 md:-mt-20 relative z-30">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
                    {categories.length > 0 ? (
                        categories.filter((c: any) => c.featured !== false).map((cat: any) => (
                            <Link href={`/productos/${cat.slug}`} key={cat.slug} className="bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] shadow-lg text-center flex flex-col items-center group transition-all hover:-translate-y-1 border-b-4 border-transparent hover:border-[#8CC63F]">
                                <div className="bg-[#002D62] w-14 h-14 md:w-24 md:h-24 rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 md:mb-6 shadow-xl transition-transform group-hover:scale-105">
                                    <i className={`fas ${cat.icon} text-xl md:text-4xl text-[#8CC63F]`}></i>
                                </div>
                                <h3 className="text-[9px] md:text-[12px] font-black uppercase text-[#002D62] leading-tight tracking-tighter h-8 md:h-10 flex items-center justify-center">
                                    {cat.name}
                                </h3>
                            </Link>
                        ))
                    ) : (
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] shadow-lg h-32 md:h-48 animate-pulse flex flex-col items-center justify-center">
                                <div className="w-14 h-14 md:w-24 md:h-24 bg-gray-200 rounded-2xl md:rounded-3xl mb-4 md:mb-6"></div>
                                <div className="h-3 w-16 bg-gray-200 rounded"></div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Top Sales Section */}
            <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-12 gap-4">
                    <div>
                        <span className="text-[#8CC63F] font-black uppercase text-[10px] md:text-xs tracking-widest mb-2 flex items-center gap-2">
                            <Trophy size={14} /> TOP VENTAS SEMANAL
                        </span>
                        <h2 className="text-2xl md:text-5xl font-black text-[#002D62] uppercase tracking-tighter leading-none">LO MÁS <span className="text-[#8CC63F]">PEDIDO</span></h2>
                    </div>
                    <Link href="/productos" className="text-[#002D62] font-black text-xs uppercase border-b-2 border-[#8CC63F] pb-1 hover:text-[#8CC63F] transition-colors">
                        Ver todo el catálogo
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-8">
                    {products.length > 0 ? (
                        products.slice(0, 5).map((product: any) => (
                            <ProductCard key={product._id || product.slug || product.id} product={product} />
                        ))
                    ) : (
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-2xl p-4 shadow-sm h-[300px]">
                                <div className="bg-gray-200 h-40 w-full rounded-xl mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Promo Banner */}
            {promoBanner && (
                <section className="max-w-7xl mx-auto px-4 mb-20">
                    <div className="bg-gradient-to-r from-[#002D62] to-[#00408B] rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border-b-8 border-[#8CC63F]">
                        <div className="relative z-10 text-center md:text-left">
                            {promoBanner.badge && (
                                <div className="flex items-center justify-center md:justify-start gap-2 text-[#8CC63F] font-black text-xs uppercase tracking-widest mb-4">
                                    <Clock size={18} className="animate-pulse" /> {promoBanner.badge}
                                </div>
                            )}
                            <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                                {promoBanner.title} <span className="text-[#8CC63F]">{promoBanner.titleHighlight}</span>
                            </h2>
                            {promoBanner.description && (
                                <p className="text-gray-300 font-medium text-sm md:text-lg mb-8 max-w-md">
                                    {promoBanner.description}
                                </p>
                            )}
                            {promoBanner.buttonText && promoBanner.buttonUrl && (
                                <Link
                                    href={promoBanner.buttonUrl}
                                    className="bg-[#8CC63F] text-[#002D62] px-8 py-4 rounded-xl font-black uppercase text-xs hover:scale-105 transition shadow-lg inline-block"
                                >
                                    {promoBanner.buttonText}
                                </Link>
                            )}
                        </div>
                        {promoBanner.image && (
                            <div className="relative z-10 group">
                                <Image
                                    src={optimizeImage(promoBanner.image, 800)}
                                    className="h-48 md:h-80 object-contain drop-shadow-2xl rounded-3xl rotate-3 group-hover:rotate-0 transition-transform duration-500"
                                    alt={promoBanner.title || 'Promoción'}
                                    width={400}
                                    height={320}
                                />
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* New Arrivals */}
            <section className="bg-gray-100 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-12 gap-4">
                        <div>
                            <span className="text-[#002D62] font-black uppercase text-[10px] md:text-xs tracking-widest mb-2 flex items-center gap-2">
                                <Zap size={14} className="text-[#8CC63F]" /> ÚLTIMO INGRESO
                            </span>
                            <h2 className="text-2xl md:text-5xl font-black text-[#002D62] uppercase tracking-tighter leading-none">NUEVA <span className="text-[#8CC63F]">MERCADERÍA</span></h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-8">
                        {(products.filter((p: any) => p.displaySections?.includes('ultimo_ingreso')).length > 0
                            ? products.filter((p: any) => p.displaySections?.includes('ultimo_ingreso'))
                            : products
                        ).slice(0, 5).map((product: any) => (
                            <ProductCard key={product._id || product.slug || product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            <Suspense fallback={<div className="h-64 flex justify-center items-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div></div>}>
                <section className="mt-8 md:mt-16">
                    <DeliveryBanner />
                </section>

                <ProductCarousel
                    products={products.slice(0, 7)}
                    title="RECOMENDACIONES PRO"
                    subtitle="SOLUCIONES DESTACADAS"
                />

                <ProjectsGallery />
            </Suspense>

            <section className="bg-[#002D62] py-16">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="flex flex-col items-center text-center p-6 bg-white/5 rounded-[2rem] border border-white/10">
                        <div className="bg-[#8CC63F] p-5 rounded-full mb-6">
                            <ShieldCheck size={32} className="text-[#002D62]" />
                        </div>
                        <h3 className="text-white font-black text-xl uppercase mb-3">Garantía Total</h3>
                        <p className="text-gray-400 text-sm">Respaldo oficial de fábrica y certificación técnica.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-white/5 rounded-[2rem] border border-white/10">
                        <div className="bg-[#8CC63F] p-5 rounded-full mb-6">
                            <Trophy size={32} className="text-[#002D62]" />
                        </div>
                        <h3 className="text-white font-black text-xl uppercase mb-3">Marcas Líderes</h3>
                        <p className="text-gray-400 text-sm">Bosch, Schneider, Philips y más.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-white/5 rounded-[2rem] border border-white/10">
                        <div className="bg-[#8CC63F] p-5 rounded-full mb-6">
                            <Building2 size={32} className="text-[#002D62]" />
                        </div>
                        <h3 className="text-white font-black text-xl uppercase mb-3">Soporte Corporativo</h3>
                        <p className="text-gray-400 text-sm">Atención personalizada para constructoras.</p>
                    </div>
                </div>
            </section>
        </>
    );
}
