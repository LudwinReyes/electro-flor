
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { getProductBySlug } from '../services/sanity';
import { PortableText } from '@portabletext/react';
import PDFViewer from './PDFViewer';
import { Star, ChevronLeft, Mail, Facebook, Twitter, Linkedin, ChevronRight, PlayCircle, FileText, Image as ImageIcon, Search, Download, Share2, ExternalLink } from 'lucide-react';
import { BRAND_COLORS, CONTACT_INFO, SITE_MESSAGES } from '../config';
import { useSiteConfig } from '../contexts/SiteConfigContext';

interface Product {
  id?: string;
  _id?: string;
  slug?: string;
  name: string;
  description: any;
  shortDescription?: string;
  image: string;
  images?: string[];
  category: string;
  brand: string;
  code?: string;
  specifications: Record<string, string> | Array<{ _key?: string; label: string; value: string }>;
  pdfFile?: string;
  pdfUrl?: string;
  youtubeVideo?: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams(); // id es realmente el slug
  const { siteSettings, contact } = useSiteConfig();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('especificaciones');
  const [selectedImage, setSelectedImage] = useState('');
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', transformOrigin: '0% 0%' });

  // Cargar producto desde Sanity o usar fallback de constantes
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        // Intentar cargar desde Sanity usando el slug
        const sanityProduct = await getProductBySlug(id || '');
        if (sanityProduct) {
          setProduct(sanityProduct);
          setSelectedImage(sanityProduct.image);
        } else {
          // Fallback: buscar en productos hardcodeados
          const fallbackProduct = PRODUCTS.find(p => p.slug === id || p.id === id);
          if (fallbackProduct) {
            setProduct(fallbackProduct);
            setSelectedImage(fallbackProduct.image);
          }
        }
      } catch (error) {
        console.error('Error al cargar producto:', error);
        // Usar producto hardcodeado como fallback
        const fallbackProduct = PRODUCTS.find(p => p.slug === id || p.id === id) || PRODUCTS[0];
        setProduct(fallbackProduct);
        setSelectedImage(fallbackProduct.image);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`animate-spin rounded-full h-16 w-16 border-b-2 border-[${BRAND_COLORS.primary}]`}></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className={`text-2xl font-black text-[${BRAND_COLORS.primary}] mb-4`}>Producto no encontrado</h2>
          <Link to="/productos" className={`text-[${BRAND_COLORS.secondary}] hover:underline`}>
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  /* Logic updated to ensure main image is always selectable */
  const thumbnails = product.images ? [product.image, ...product.images.filter(img => img !== product.image)] : [product.image];

  // Normalizar especificaciones: convertir array de Sanity a objeto
  const normalizedSpecs: Record<string, string> = Array.isArray(product.specifications)
    ? product.specifications.reduce((acc: Record<string, string>, spec: any) => {
      if (spec.label && spec.value) {
        acc[spec.label] = spec.value;
      }
      return acc;
    }, {}) : (product.specifications || {});

  const whatsappMessage = SITE_MESSAGES.whatsapp.stockInquiry(product.name);
  const whatsappUrl = `https://wa.me/51948198701?text=${encodeURIComponent(whatsappMessage)}`;

  // Extraer ID del video de YouTube
  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      display: 'block',
      transformOrigin: `${x}% ${y}%`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none', transformOrigin: '0% 0%' });
  };

  return (
    <div className="bg-white pb-20 relative font-sans">
      {/* Breadcrumbs - Verde (Captura) */}
      <div className="bg-[#8CC63F] py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-black text-[#002D62] uppercase tracking-tighter">
            <Link to="/" className="hover:opacity-80">INICIO</Link>
            <ChevronRight size={12} strokeWidth={3} />
            <Link to="/productos" className="hover:opacity-80">{product.category.toUpperCase()}</Link>
            <ChevronRight size={12} strokeWidth={3} />
            <span className="opacity-60 truncate max-w-[150px] md:max-w-none">{product.name}</span>
          </div>
          <Link to="/" className="bg-white px-4 py-1.5 rounded-sm flex items-center gap-1.5 text-[10px] font-black text-[#002D62] shadow-sm hover:bg-gray-50 transition-all uppercase tracking-tighter">
            <ChevronLeft size={14} strokeWidth={3} /> REGRESAR
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* LADO IZQUIERDO: IMAGEN Y MINIATURAS */}
          <div className="flex flex-col gap-4">
            <div
              className="relative border border-gray-100 rounded-xl overflow-hidden bg-white flex items-center justify-center aspect-[4/3] shadow-sm group cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={selectedImage}
                alt={product.name}
                className="max-w-[75%] h-auto object-contain transition-transform duration-200"
                style={zoomStyle.display === 'block' ? { transform: 'scale(2)', transformOrigin: zoomStyle.transformOrigin } : {}}
              />

              <div className="absolute top-4 right-4 bg-gray-50 p-1.5 rounded-full border border-gray-100 text-gray-400">
                <Search size={18} />
              </div>

              {/* Marca de agua */}
              <div className="absolute bottom-6 right-6 opacity-10 pointer-events-none select-none text-right">
                <p className="text-xl md:text-3xl font-black uppercase tracking-widest text-[#002D62] leading-none">ELECTRO</p>
                <p className="text-xl md:text-3xl font-black uppercase tracking-widest text-[#002D62] leading-none">FLOR</p>
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {thumbnails.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-lg border-2 p-1.5 transition-all bg-white ${selectedImage === img ? 'border-[#8CC63F]' : 'border-gray-100'}`}
                >
                  <img src={img} alt={`Vista ${idx}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* LADO DERECHO: INFO Y COTIZACIÓN */}
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <span className="bg-[#002D62] text-white text-[11px] font-black px-5 py-1.5 rounded-full uppercase tracking-widest">
                {product.brand}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                CÓDIGO: {product.code}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-[#002D62] uppercase leading-[1.1] tracking-tighter mb-6">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} className="text-[#8CC63F] fill-current" />)}
              </div>
              <span className="text-[11px] text-gray-400 font-bold">(0 opiniones)</span>
              <span className="text-[11px] text-[#8CC63F] font-black uppercase flex items-center gap-1 ml-2">
                DISPONIBLE: EN STOCK
              </span>
            </div>

            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-10 max-w-xl">
              {product.shortDescription || `${product.description} Ideal para instalaciones industriales y domésticas que requieren la máxima seguridad y durabilidad que solo ${product.brand} puede ofrecer.`}
            </p>

            {/* Botones de PDFs */}
            {(product.pdfFile || product.pdfUrl) && (
              <div className="flex flex-wrap gap-4 mb-12">
                <a
                  href={`/#/ficha-tecnica/${product.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 text-[#002D62] px-6 py-3 rounded-xl flex items-center gap-3 font-black uppercase text-[10px] tracking-widest hover:bg-gray-200 transition-all border border-gray-200"
                >
                  <FileText size={18} /> FICHA TÉCNICA (PDF)
                </a>
              </div>
            )}

            {/* SECCIÓN COTIZACIÓN (Captura) */}
            <div className="bg-[#f8f9fa] border border-gray-100 rounded-[2.5rem] p-10 md:p-12 shadow-sm">
              <h3 className="text-[#002D62] font-black text-xl uppercase mb-8 flex items-center gap-2">
                SOLICITA UNA <span className="text-[#8CC63F]">COTIZACIÓN:</span>
              </h3>

              <div className="flex flex-col gap-4">
                <a href={whatsappUrl} target="_blank" className="bg-[#25D366] text-white px-8 py-5 rounded-2xl flex items-center justify-center gap-4 font-black uppercase text-xs hover:opacity-90 transition-all shadow-lg shadow-green-500/10">
                  <i className="fab fa-whatsapp text-2xl"></i>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[8px] opacity-90 mb-1">WHATSAPP VENTAS:</span>
                    <span className="text-sm md:text-base">948 198 701</span>
                  </div>
                </a>

                <a href={`mailto:${siteSettings.email || (typeof contact.email === 'string' ? contact.email : contact.email.sales)}`} className="bg-[#002D62] text-white px-8 py-5 rounded-2xl flex items-center justify-center gap-4 font-black uppercase text-xs hover:opacity-90 transition-all">
                  <Mail size={24} />
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[8px] opacity-90 mb-1">ESCRÍBENOS:</span>
                    <span className="text-sm md:text-base">VENTAS@ELECTROFLOR.COM.PE</span>
                  </div>
                </a>
              </div>

              <div className="mt-10 pt-6 border-t border-gray-200 flex items-center gap-4">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">COMPARTIR:</span>
                <div className="flex gap-4 text-gray-400">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#002D62]"
                    title="Compartir en Facebook"
                  ><Facebook size={18} /></a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Mira este producto: ${product.name} - ELECTRO FLOR ${window.location.href}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#25D366]"
                    title="Compartir en WhatsApp"
                  ><i className="fab fa-whatsapp text-lg"></i></a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#002D62]"
                    title="Compartir en LinkedIn"
                  ><Linkedin size={18} /></a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Enlace copiado al portapapeles');
                    }}
                    className="hover:text-[#002D62]"
                    title="Copiar enlace"
                  ><Share2 size={18} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PESTAÑAS INFERIORES - Corregido para no desbordar en móvil */}
        <div className="mt-20">
          <div className="flex border-b border-gray-100 mb-0 overflow-x-auto no-scrollbar scroll-smooth">
            {[
              { id: 'especificaciones', label: 'ESPECIFICACIONES', icon: <ImageIcon size={16} /> },
              { id: 'descripcion', label: 'DESCRIPCIÓN', icon: <FileText size={16} /> },
              { id: 'video', label: 'VIDEO DEMOSTRATIVO', icon: <PlayCircle size={16} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 md:px-12 py-5 text-[10px] md:text-[11px] font-black uppercase tracking-tight transition-all relative flex items-center gap-3 shrink-0 whitespace-nowrap ${activeTab === tab.id ? 'text-[#002D62] bg-gray-50/50' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {tab.icon} {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#002D62]"></div>}
              </button>
            ))}
          </div>

          <div className="p-10 md:p-16 border-x border-b border-gray-50 min-h-[300px] bg-white">
            {activeTab === 'especificaciones' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-20 max-w-5xl">
                {Object.entries(normalizedSpecs).map(([key, val]) => (
                  <div key={key} className="flex flex-col border-b border-gray-100 pb-4">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2">{key}:</span>
                    <span className="text-base font-black text-[#002D62] uppercase">{val}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'descripcion' && (
              <div className="text-gray-600 font-medium leading-relaxed max-w-4xl [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:ml-2 [&_p]:mb-4 [&_strong]:font-bold [&_strong]:text-[#002D62] [&_em]:italic [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#002D62] [&_h3]:mb-3 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mb-2 [&_blockquote]:border-l-4 [&_blockquote]:border-[#8CC63F] [&_blockquote]:pl-4 [&_blockquote]:italic [&_a]:text-[#8CC63F] [&_a]:underline">
                {product.description ? (
                  <PortableText value={product.description} />
                ) : (
                  <p>No hay descripción disponible para este producto.</p>
                )}
              </div>
            )}
            {activeTab === 'video' && (
              <div className="flex flex-col items-center justify-center">
                {product.youtubeVideo ? (
                  <div className="w-full max-w-4xl aspect-video">
                    <iframe
                      className="w-full h-full rounded-2xl shadow-lg"
                      src={getYouTubeEmbedUrl(product.youtubeVideo) || ''}
                      title="Video Demostrativo"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-100 rounded-3xl w-full">
                    <PlayCircle size={80} className="text-[#8CC63F] mb-6 opacity-30" />
                    <p className="text-[12px] font-black text-[#002D62] uppercase tracking-[0.2em]">Video Demostrativo Próximamente</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};

export default ProductDetail;
