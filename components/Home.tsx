
import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Trophy, ShieldCheck, Clock, Building2 } from 'lucide-react';
import { Product, Category } from '../types';
import SEOHead from './SEOHead';
import { optimizeImage } from '../utils/optimizeImage';
import Hero from './Hero';
import ProductCard from './ProductCard';

// Lazy load heavy components
const ProductCarousel = lazy(() => import('./ProductCarousel'));
const DeliveryBanner = lazy(() => import('./DeliveryBanner'));
const ProjectsGallery = lazy(() => import('./ProjectsGallery'));

export interface PromoBanner {
    _id: string;
    badge?: string;
    title?: string;
    titleHighlight?: string;
    description?: string;
    image?: string;
    buttonText?: string;
    buttonUrl?: string;
}

interface HomeProps {
    onAddToQuote: (p: Product) => void;
    products: Product[];
    categories: Category[];
    promoBanner: PromoBanner | null;
}

const Home: React.FC<HomeProps> = ({ onAddToQuote, products, categories, promoBanner }) => {
    return (
        <>
            <SEOHead
                title="Iluminación y Material Eléctrico en Perú"
                description="Distribuidor oficial de material eléctrico en Perú. Iluminación LED industrial, conductores eléctricos, herramientas Bosch, Schneider Electric. Stock garantizado y entrega inmediata en Lima."
                url="/"
            />

            {/* Hero Section - Crucial for LCP, eager loaded */}
            <Hero />

            {/* Categories Grid - Crucial for navigation */}
            <section className="max-w-7xl mx-auto px-4 -mt-10 md:-mt-20 relative z-30">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
                    {categories.length > 0 ? (
                        categories.filter(c => c.featured !== false).map((cat) => (
                            <Link to={`/productos/${cat.slug}`} key={cat.slug} className="bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] shadow-lg text-center flex flex-col items-center group transition-all hover:-translate-y-1 border-b-4 border-transparent hover:border-[#8CC63F]">
                                <div className="bg-[#002D62] w-14 h-14 md:w-24 md:h-24 rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 md:mb-6 shadow-xl transition-transform group-hover:scale-105">
                                    <i className={`fas ${cat.icon} text-xl md:text-4xl text-[#8CC63F]`}></i>
                                </div>
                                <h3 className="text-[9px] md:text-[12px] font-black uppercase text-[#002D62] leading-tight tracking-tighter h-8 md:h-10 flex items-center justify-center">
                                    {cat.name}
                                </h3>
                            </Link>
                        ))
                    ) : (
                        // Skeleton Loader for Categories - 5 items
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
                        <span className="text-[#8CC63F] font-black uppercase text-[10px] md:text-xs tracking-widest mb-2 block flex items-center gap-2">
                            <Trophy size={14} /> TOP VENTAS SEMANAL
                        </span>
                        <h2 className="text-2xl md:text-5xl font-black text-[#002D62] uppercase tracking-tighter leading-none">LO MÁS <span className="text-[#8CC63F]">PEDIDO</span></h2>
                    </div>
                    <Link to="/productos" className="text-[#002D62] font-black text-xs uppercase border-b-2 border-[#8CC63F] pb-1 hover:text-[#8CC63F] transition-colors">
                        Ver todo el catálogo
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-8">
                    {products.length > 0 ? (
                        products.slice(0, 5).map(product => (
                            <ProductCard key={product._id || product.slug || product.id} product={product} onAddToQuote={onAddToQuote} />
                        ))
                    ) : (
                        // Skeleton Loader for Products - 5 items
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

            {/* Promo Banner - Can be heavy, optimize image */}
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
                                    to={promoBanner.buttonUrl}
                                    className="bg-[#8CC63F] text-[#002D62] px-8 py-4 rounded-xl font-black uppercase text-xs hover:scale-105 transition shadow-lg inline-block"
                                >
                                    {promoBanner.buttonText}
                                </Link>
                            )}
                        </div>
                        {promoBanner.image && (
                            <div className="relative z-10 group">
                                <img
                                    src={optimizeImage(promoBanner.image, 800)}
                                    className="h-48 md:h-80 object-contain drop-shadow-2xl rounded-3xl rotate-3 group-hover:rotate-0 transition-transform duration-500"
                                    alt={promoBanner.title || 'Promoción'}
                                    loading="lazy"
                                    decoding="async"
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
                            <span className="text-[#002D62] font-black uppercase text-[10px] md:text-xs tracking-widest mb-2 block flex items-center gap-2">
                                <Zap size={14} className="text-[#8CC63F]" /> ÚLTIMO INGRESO
                            </span>
                            <h2 className="text-2xl md:text-5xl font-black text-[#002D62] uppercase tracking-tighter leading-none">NUEVA <span className="text-[#8CC63F]">MERCADERÍA</span></h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-8">
                        {(products.filter(p => p.displaySections?.includes('ultimo_ingreso')).length > 0
                            ? products.filter(p => p.displaySections?.includes('ultimo_ingreso'))
                            : products
                        ).slice(0, 5).map(product => (
                            <ProductCard key={product._id || product.slug || product.id} product={product} onAddToQuote={onAddToQuote} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Lazy Loaded Sections Below the Fold */}
            <Suspense fallback={<div className="h-64 flex justify-center items-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div></div>}>
                <section className="mt-8 md:mt-16">
                    <DeliveryBanner />
                </section>

                <ProductCarousel
                    products={products.slice(0, 7)}
                    title="RECOMENDACIONES PRO"
                    subtitle="SOLUCIONES DESTACADAS"
                    onAddToQuote={onAddToQuote}
                />

                <ProjectsGallery />
            </Suspense>

            {/* Static Footer Info - Can be lazy if desired, but small enough */}
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
};

export default Home;
