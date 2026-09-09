"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug } from '../services/sanity';
import { ChevronLeft, ZoomIn, ZoomOut, FileText, Home, ExternalLink } from 'lucide-react';

interface Props {
    initialProduct?: any;
    slug?: string;
}

const FichaTecnicaPage: React.FC<Props> = ({ initialProduct }) => {
    const params = useParams<{ slug: string }>();
    const slug = initialProduct?.slug || params?.slug || '';
    const [product, setProduct] = useState<any>(initialProduct || null);
    const [loading, setLoading] = useState(!initialProduct);
    const [zoom, setZoom] = useState(100);

    useEffect(() => {
        if (!initialProduct && slug) {
            getProductBySlug(slug).then(data => {
                setProduct(data);
                setLoading(false);
            });
        }
    }, [slug, initialProduct]);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

    // Convertir URL de Google Drive a formato embebido
    const getEmbedUrl = (url: string) => {
        if (!url) return '';
        if (url.includes('drive.google.com')) {
            const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
            if (match) {
                return `https://drive.google.com/file/d/${match[1]}/preview`;
            }
        }
        // Para URLs de Sanity o Cloudinary, usar directamente
        return url;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0b0d] flex items-center justify-center">
                <div className="animate-pulse text-[#8CC63F] text-xl font-bold">Cargando ficha técnica oficial...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#0a0b0d] flex flex-col items-center justify-center text-white p-6">
                <FileText size={80} className="text-[#8CC63F] mb-6 opacity-50" />
                <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
                <p className="text-gray-400 mb-6 text-center max-w-md">No hemos encontrado la ficha técnica del producto solicitado.</p>
                <Link href="/productos" className="bg-[#8CC63F] text-[#002D62] font-black px-6 py-3 rounded-xl hover:opacity-90 flex items-center gap-2">
                    <Home size={18} /> Explorar Catálogo de Productos
                </Link>
            </div>
        );
    }

    const pdfUrl = product.pdfFile || product.pdfUrl;
    const embedUrl = getEmbedUrl(pdfUrl || '');
    const iframeSrc = embedUrl
        ? (embedUrl.includes('drive.google.com')
            ? embedUrl
            : (embedUrl.includes('#') ? embedUrl : `${embedUrl}#toolbar=0&navpanes=0&scrollbar=1`))
        : '';
    const brandName = typeof product.brand === 'string' ? product.brand : product.brand?.name || 'Electro Flor';
    const whatsappText = encodeURIComponent(`Hola Electro Flor, estoy revisando la ficha técnica de ${product.name} y quisiera solicitar una cotización con precio por mayor.`);

    return (
        <div
            className="min-h-screen bg-[#0a0b0d] flex flex-col"
            onContextMenu={(e) => e.preventDefault()}
        >
            {/* Header Técnico y Comercial */}
            <header className="bg-[#002D62] px-4 py-3 sticky top-0 z-50 shadow-md">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link
                            href="/"
                            className="flex items-center gap-1.5 text-white hover:text-[#8CC63F] transition-colors text-xs font-bold bg-white/10 px-2.5 py-1.5 rounded-lg"
                            title="Ir al inicio de Electro Flor"
                        >
                            <Home size={15} />
                            <span className="hidden md:inline">Inicio</span>
                        </Link>
                        <Link
                            href={`/producto/${slug || product.slug || ''}`}
                            className="flex items-center gap-1.5 text-white hover:text-[#8CC63F] transition-colors text-xs font-bold bg-white/10 px-3 py-1.5 rounded-lg"
                        >
                            <ChevronLeft size={16} />
                            <span>Ver Producto</span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <FileText size={18} className="text-[#8CC63F] flex-shrink-0" />
                            <h1 className="text-white font-bold text-xs sm:text-sm md:text-base truncate max-w-[220px] sm:max-w-[360px] md:max-w-[550px]">
                                Ficha Técnica: {product.name}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {pdfUrl && (
                            <a
                                href={pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
                            >
                                <ExternalLink size={14} />
                                <span>Abrir PDF</span>
                            </a>
                        )}
                        <a
                            href={`https://wa.me/51948198701?text=${whatsappText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] text-white hover:bg-[#20bd5a] text-xs font-black px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
                        >
                            <span>Cotizar por Mayor</span>
                        </a>
                    </div>
                </div>
            </header>

            {/* Barra de Especificaciones Rápidas */}
            <div className="bg-[#0f172a] border-b border-white/10 px-4 py-2 text-xs text-white/80">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-4">
                        <span className="font-semibold text-white">Marca: <span className="text-[#8CC63F]">{brandName}</span></span>
                        {product.code && <span className="font-semibold text-white">Código/SKU: <span className="text-gray-300">{product.code}</span></span>}
                        {product.category && <span className="font-semibold text-white">Categoría: <span className="text-gray-300">{typeof product.category === 'string' ? product.category : product.category?.name}</span></span>}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                        <button
                            onClick={handleZoomOut}
                            className="p-1 rounded hover:bg-white/10 text-white transition-colors"
                            title="Alejar"
                        >
                            <ZoomOut size={16} />
                        </button>
                        <span className="text-white text-xs w-10 text-center">{zoom}%</span>
                        <button
                            onClick={handleZoomIn}
                            className="p-1 rounded hover:bg-white/10 text-white transition-colors"
                            title="Acercar"
                        >
                            <ZoomIn size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {!pdfUrl ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-white text-center">
                    <FileText size={64} className="text-[#8CC63F] mb-4 opacity-70" />
                    <h2 className="text-xl font-bold mb-2">Ficha Técnica en Proceso de Digitalización</h2>
                    <p className="text-gray-400 max-w-lg mb-6">
                        La ficha técnica oficial en PDF para <span className="text-white font-medium">{product.name}</span> se encuentra en actualización por nuestro equipo de ingeniería. Puedes solicitar las especificaciones directas a nuestro equipo técnico.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href={`https://wa.me/51948198701?text=${whatsappText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] text-white font-bold px-5 py-2.5 rounded-xl hover:bg-[#20bd5a] transition-all"
                        >
                            Solicitar Ficha Técnica por WhatsApp
                        </a>
                        <Link
                            href={`/producto/${slug || product.slug || ''}`}
                            className="bg-white/10 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-white/20 transition-all"
                        >
                            Ver Ficha de Producto y Especificaciones
                        </Link>
                    </div>
                </div>
            ) : (
                /* Contenedor del PDF */
                <div className="flex-1 relative overflow-hidden">
                {/* Marca de agua con logo - patrón diagonal */}
                <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                    {/* Logo central grande */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
                        <img
                            src="/media/Logo%20Electro%20Flor.png"
                            alt="Logo Electro Flor"
                            className="w-64 h-auto"
                            draggable={false}
                        />
                    </div>
                    {/* Logo esquina inferior derecha */}
                    <div className="absolute bottom-8 right-8 opacity-40">
                        <img
                            src="/media/Logo%20Electro%20Flor.png"
                            alt="Logo Electro Flor Decorativo"
                            className="w-32 h-auto"
                            draggable={false}
                        />
                    </div>
                    {/* Patrón diagonal repetido */}
                    <div className="absolute inset-0 opacity-[0.04]" style={{
                        backgroundImage: `url('/media/Logo%20Electro%20Flor.png')`,
                        backgroundSize: '180px',
                        backgroundRepeat: 'repeat',
                        transform: 'rotate(-30deg) scale(1.5)',
                    }} />
                </div>

                {/* Bloqueador SUPERIOR para ocultar barra de herramientas del navegador */}
                <div className="absolute top-0 left-0 right-0 h-14 bg-[#1a1a1a] z-30 flex items-center justify-center">
                    <span className="text-white/30 text-xs uppercase tracking-widest">Solo visualización - Documento protegido</span>
                </div>

                {/* PDF embebido - usando iframe para scroll nativo */}
                <div
                    className="w-full h-full flex items-center justify-center bg-gray-100 relative"
                    style={{
                        transform: `scale(${zoom / 100})`,
                        transformOrigin: 'top center',
                        minHeight: 'calc(100vh - 56px)'
                    }}
                >
                    <iframe
                        src={iframeSrc}
                        className="w-full h-full"
                        style={{ minHeight: 'calc(100vh - 56px)', border: 'none' }}
                        title={`Ficha Técnica PDF - ${product.name}`}
                    />

                    {/* Overlay transparente - pointer-events:none permite scroll */}
                    <div
                        className="absolute inset-0 z-20 pointer-events-none"
                        style={{
                            background: 'transparent'
                        }}
                    />
                </div>

                {/* Bloqueador inferior para ocultar controles del navegador */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0b0d] to-transparent z-20 pointer-events-none" />
            </div>
            )}

            {/* Footer con branding */}
            <footer className="bg-[#002D62] px-4 py-2 flex items-center justify-between">
                <span className="text-white/50 text-xs">
                    Documento protegido - Solo visualización
                </span>
                <div className="flex items-center gap-2">
                    <span className="text-white/50 text-xs">Powered by</span>
                    <span className="text-[#8CC63F] font-bold text-xs">ELECTRO FLOR</span>
                </div>
            </footer>
        </div>
    );
};

export default FichaTecnicaPage;
