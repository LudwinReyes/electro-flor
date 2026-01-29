
import React, { useRef, useState, useEffect } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface Props {
  products: Product[];
  title: string;
  subtitle: string;
  onAddToQuote: (p: Product) => void;
}

const ProductCarousel: React.FC<Props> = ({ products, title, subtitle, onAddToQuote }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Aseguramos exactamente 7 productos como se pidió
  const displayProducts = products.slice(0, 7);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [displayProducts]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header con navegación estilo captura */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
          <div className="text-center md:text-left">
            <span className="text-[#8CC63F] font-black uppercase text-[10px] md:text-xs tracking-widest mb-2 block flex items-center justify-center md:justify-start gap-2">
              <Sparkles size={14} /> {subtitle}
            </span>
            <div className="h-1 w-24 bg-[#8CC63F] mb-4 mx-auto md:mx-0"></div>
            <h2 className="text-3xl md:text-5xl font-black text-[#002D62] uppercase tracking-tighter leading-none">
              {title.split(' ')[0]} <span className="text-[#8CC63F]">{title.split(' ').slice(1).join(' ')}</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
             {/* Flechas de navegación Desktop - Colores dinámicos según disponibilidad (Azul/Verde activos, Gris inactivos) */}
            <div className="hidden md:flex gap-2">
              <button 
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`p-3 transition-all rounded-full border-2 ${canScrollLeft ? 'text-[#002D62] border-[#002D62] hover:bg-[#002D62] hover:text-[#8CC63F]' : 'text-gray-300 border-gray-100 cursor-not-allowed bg-gray-50'}`}
                aria-label="Anterior"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`p-3 transition-all rounded-full border-2 ${canScrollRight ? 'text-[#002D62] border-[#002D62] hover:bg-[#002D62] hover:text-[#8CC63F]' : 'text-gray-300 border-gray-100 cursor-not-allowed bg-gray-50'}`}
                aria-label="Siguiente"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* 
          Contenedor del Carrusel - Responsive Validado:
          1. MÓVIL (<768px): w-full (1 tarjeta completa, ancho pantalla)
          2. TABLET (>=768px): w-[calc(50%-16px)] (2 tarjetas completas, considerando gap de 32px)
          3. DESKTOP (>=1024px): w-[calc(25%-24px)] (4 tarjetas completas, considerando 3 gaps de 32px)
          
          CORRECCIÓN: Se cambió de 'min-w' a 'w' para forzar ancho fijo y evitar variaciones.
        */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-8 pb-10 no-scrollbar"
        >
          {displayProducts.map((product) => (
            <div 
              key={product.id} 
              className="w-full md:w-[calc(50%-16px)] lg:w-[calc(25%-24px)] snap-start shrink-0 h-full flex-none"
            >
              <ProductCard product={product} onAddToQuote={onAddToQuote} />
            </div>
          ))}
        </div>

        {/* Indicadores móviles (Puntos) */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {displayProducts.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#8CC63F]' : 'bg-gray-200'}`}></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
