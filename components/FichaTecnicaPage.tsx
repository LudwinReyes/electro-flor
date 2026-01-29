import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug } from '../services/sanity';
import { ChevronLeft, ZoomIn, ZoomOut, FileText, Home, ExternalLink } from 'lucide-react';

const FichaTecnicaPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [zoom, setZoom] = useState(100);

    console.log('FichaTecnicaPage - slug:', slug); // DEBUG

    useEffect(() => {
        if (slug) {
            console.log('Fetching product with slug:', slug); // DEBUG
            getProductBySlug(slug).then(data => {
                console.log('Product data:', data); // DEBUG
                setProduct(data);
                setLoading(false);
            });
        }
    }, [slug]);

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
                <div className="animate-pulse text-[#8CC63F] text-xl">Cargando ficha técnica...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#0a0b0d] flex flex-col items-center justify-center text-white">
                <FileText size={80} className="text-[#8CC63F] mb-6 opacity-50" />
                <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
                <Link to="/" className="text-[#8CC63F] hover:underline flex items-center gap-2">
                    <Home size={18} /> Volver al inicio
                </Link>
            </div>
        );
    }

    const pdfUrl = product.pdfFile || product.pdfUrl;

    if (!pdfUrl) {
        return (
            <div className="min-h-screen bg-[#0a0b0d] flex flex-col items-center justify-center text-white">
                <FileText size={80} className="text-[#8CC63F] mb-6 opacity-50" />
                <h1 className="text-2xl font-bold mb-4">Ficha técnica no disponible</h1>
                <p className="text-gray-400 mb-6">Este producto aún no tiene ficha técnica cargada.</p>
                <Link to={`/productos/${slug}`} className="text-[#8CC63F] hover:underline flex items-center gap-2">
                    <ChevronLeft size={18} /> Volver al producto
                </Link>
            </div>
        );
    }

    const embedUrl = getEmbedUrl(pdfUrl);

    return (
        <div
            className="min-h-screen bg-[#0a0b0d] flex flex-col"
            onContextMenu={(e) => e.preventDefault()}
        >
            {/* Header */}
            <header className="bg-[#002D62] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <Link
                        to={`/productos/${slug}`}
                        className="flex items-center gap-2 text-white hover:text-[#8CC63F] transition-colors"
                    >
                        <ChevronLeft size={20} />
                        <span className="hidden sm:inline text-sm">Volver al producto</span>
                    </Link>
                    <div className="h-6 w-px bg-white/20 hidden sm:block" />
                    <div className="flex items-center gap-2">
                        <FileText size={18} className="text-[#8CC63F]" />
                        <span className="text-white font-medium text-sm truncate max-w-[200px] sm:max-w-[400px]">
                            {product.name}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleZoomOut}
                        className="p-2 rounded hover:bg-white/10 text-white transition-colors"
                        title="Alejar"
                    >
                        <ZoomOut size={18} />
                    </button>
                    <span className="text-white text-xs w-12 text-center">{zoom}%</span>
                    <button
                        onClick={handleZoomIn}
                        className="p-2 rounded hover:bg-white/10 text-white transition-colors"
                        title="Acercar"
                    >
                        <ZoomIn size={18} />
                    </button>
                </div>
            </header>

            {/* Contenedor del PDF */}
            <div className="flex-1 relative overflow-hidden">
                {/* Marca de agua con logo - patrón diagonal */}
                <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                    {/* Logo central grande */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
                        <img
                            src="/media/Logo Electro Flor.png"
                            alt=""
                            className="w-64 h-auto"
                            draggable={false}
                        />
                    </div>
                    {/* Logo esquina inferior derecha */}
                    <div className="absolute bottom-8 right-8 opacity-40">
                        <img
                            src="/media/Logo Electro Flor.png"
                            alt=""
                            className="w-32 h-auto"
                            draggable={false}
                        />
                    </div>
                    {/* Patrón diagonal repetido */}
                    <div className="absolute inset-0 opacity-[0.04]" style={{
                        backgroundImage: `url('/media/Logo Electro Flor.png')`,
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
                        src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                        className="w-full h-full"
                        style={{ minHeight: 'calc(100vh - 56px)', border: 'none' }}
                        title="Ficha Técnica PDF"
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
