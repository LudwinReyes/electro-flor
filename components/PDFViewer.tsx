import React, { useState } from 'react';
import { FileText, ZoomIn, ZoomOut, X, Maximize2 } from 'lucide-react';

interface PDFViewerProps {
    pdfUrl: string;
    productName?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, productName = 'Ficha Técnica' }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [zoom, setZoom] = useState(100);

    // Convertir URL de Google Drive a formato embebido
    const getEmbedUrl = (url: string) => {
        // Si es Google Drive, convertir a preview
        if (url.includes('drive.google.com')) {
            const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
            if (match) {
                return `https://drive.google.com/file/d/${match[1]}/preview`;
            }
        }
        // Si es Cloudinary u otro, agregar parámetro para embeber
        return url;
    };

    const embedUrl = getEmbedUrl(pdfUrl);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

    return (
        <>
            {/* Visor normal */}
            <div
                className="relative w-full bg-gray-100 rounded-2xl overflow-hidden border border-gray-200"
                style={{ height: '600px' }}
                onContextMenu={(e) => e.preventDefault()} // Deshabilitar clic derecho
            >
                {/* Barra de herramientas */}
                <div className="absolute top-0 left-0 right-0 z-20 bg-[#002D62] px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileText size={18} className="text-[#8CC63F]" />
                        <span className="text-white text-sm font-medium truncate max-w-[200px]">
                            {productName}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleZoomOut}
                            className="p-1.5 rounded hover:bg-white/10 text-white transition-colors"
                            title="Alejar"
                        >
                            <ZoomOut size={18} />
                        </button>
                        <span className="text-white text-xs w-12 text-center">{zoom}%</span>
                        <button
                            onClick={handleZoomIn}
                            className="p-1.5 rounded hover:bg-white/10 text-white transition-colors"
                            title="Acercar"
                        >
                            <ZoomIn size={18} />
                        </button>
                        <button
                            onClick={() => setIsFullscreen(true)}
                            className="p-1.5 rounded hover:bg-white/10 text-white transition-colors ml-2"
                            title="Pantalla completa"
                        >
                            <Maximize2 size={18} />
                        </button>
                    </div>
                </div>

                {/* Contenedor del PDF con zoom */}
                <div
                    className="w-full h-full pt-12 overflow-auto"
                    style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
                >
                    <iframe
                        src={embedUrl}
                        className="w-full h-full"
                        style={{ minHeight: '100%', border: 'none' }}
                        title="Ficha Técnica PDF"
                        sandbox="allow-scripts allow-same-origin"
                    />
                </div>

                {/* Marca de agua con logo - múltiples posiciones */}
                <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                    {/* Centro */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
                        <img
                            src="/media/Logo Electro Flor.png"
                            alt=""
                            className="w-48 h-auto"
                            draggable={false}
                        />
                    </div>
                    {/* Esquina inferior derecha */}
                    <div className="absolute bottom-4 right-4 opacity-30">
                        <img
                            src="/media/Logo Electro Flor.png"
                            alt=""
                            className="w-24 h-auto"
                            draggable={false}
                        />
                    </div>
                    {/* Patrón diagonal repetido */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: `url('/media/Logo Electro Flor.png')`,
                        backgroundSize: '150px',
                        backgroundRepeat: 'repeat',
                        transform: 'rotate(-30deg) scale(1.5)',
                    }} />
                </div>

                {/* Bloqueo de interacción para evitar descarga */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-100 to-transparent z-10"
                />
            </div>

            {/* Modal de pantalla completa */}
            {isFullscreen && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                    onContextMenu={(e) => e.preventDefault()}
                >
                    {/* Botón cerrar */}
                    <button
                        onClick={() => setIsFullscreen(false)}
                        className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                    >
                        <X size={24} />
                    </button>

                    {/* Controles de zoom */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-white/10 rounded-full px-4 py-2">
                        <button onClick={handleZoomOut} className="text-white hover:text-[#8CC63F]">
                            <ZoomOut size={20} />
                        </button>
                        <span className="text-white text-sm">{zoom}%</span>
                        <button onClick={handleZoomIn} className="text-white hover:text-[#8CC63F]">
                            <ZoomIn size={20} />
                        </button>
                    </div>

                    {/* PDF en fullscreen */}
                    <div
                        className="w-full h-full max-w-5xl max-h-[90vh] relative"
                        style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center' }}
                    >
                        <iframe
                            src={embedUrl}
                            className="w-full h-full rounded-lg"
                            style={{ border: 'none' }}
                            title="Ficha Técnica PDF"
                            sandbox="allow-scripts allow-same-origin"
                        />
                    </div>

                    {/* Marca de agua fullscreen */}
                    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
                            <img
                                src="/media/Logo Electro Flor.png"
                                alt=""
                                className="w-64 h-auto"
                                draggable={false}
                            />
                        </div>
                        <div className="absolute inset-0 opacity-[0.03]" style={{
                            backgroundImage: `url('/media/Logo Electro Flor.png')`,
                            backgroundSize: '200px',
                            backgroundRepeat: 'repeat',
                            transform: 'rotate(-30deg) scale(1.5)',
                        }} />
                    </div>
                </div>
            )}
        </>
    );
};

export default PDFViewer;
