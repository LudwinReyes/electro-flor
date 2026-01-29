
import React from 'react';
import { Product } from '../types';
import { Star, Plus, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND_COLORS, CONTACT_INFO, SITE_MESSAGES } from '../config';

interface Props {
  product: Product;
  onAddToQuote?: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAddToQuote }) => {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all group flex flex-col h-full overflow-hidden relative p-4">
      {/* Badges Superiores */}
      <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
        {product.isNew && (
          <div className={`bg-[${BRAND_COLORS.secondary}] text-[${BRAND_COLORS.primary}] text-[9px] font-black px-4 py-1.5 rounded-full shadow-sm uppercase tracking-tighter`}>
            NUEVO
          </div>
        )}
        <div className={`bg-[${BRAND_COLORS.primary}] text-[${BRAND_COLORS.secondary}] text-[9px] font-black px-4 py-1.5 rounded-full shadow-sm uppercase tracking-tighter flex items-center gap-1.5`}>
          <CheckCircle2 size={12} fill={BRAND_COLORS.secondary} className={`text-[${BRAND_COLORS.primary}]`} />
          STOCK GARANTIZADO
        </div>
      </div>

      {/* Imagen del Producto - Altura fija para consistencia visual */}
      <div className="relative h-52 md:h-64 p-4 flex items-center justify-center bg-white mb-4 w-full">
        <Link to={`/producto/${product.slug || product.id}`} className="w-full h-full flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
      </div>
      
      {/* Información */}
      <div className="flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[11px] font-black text-[${BRAND_COLORS.secondary}] uppercase tracking-tight`}>{product.brand}</span>
          <span className="text-[10px] text-gray-300 font-bold uppercase tracking-tight">SKU: {product.code}</span>
        </div>

        <Link to={`/producto/${product.slug || product.id}`}>
          <h3 className={`text-[14px] font-black text-[${BRAND_COLORS.primary}] line-clamp-2 mb-3 h-[42px] leading-[1.2] uppercase tracking-tighter hover:text-[${BRAND_COLORS.secondary}] transition-colors`}>
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(i => <Star key={i} size={16} className={`text-[${BRAND_COLORS.secondary}] fill-current`} />)}
          </div>
          <div className="flex flex-col items-end leading-none text-right">
             <span className={`text-[9px] text-[${BRAND_COLORS.primary}] font-black uppercase`}>ENTREGA</span>
             <span className={`text-[9px] text-[${BRAND_COLORS.primary}] font-black uppercase`}>INMEDIATA</span>
          </div>
        </div>

        {/* Botones de Acción - Diseño según captura */}
        <div className="mt-auto space-y-3">
          <div className="flex gap-2 h-12">
            <a 
              href={`${CONTACT_INFO.phone.whatsapp}?text=${encodeURIComponent(SITE_MESSAGES.whatsapp.quoteRequest(product.name))}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-grow bg-[${BRAND_COLORS.success}] hover:bg-[#20bd5c] text-white rounded-2xl text-[11px] font-black flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 uppercase tracking-tight`}
            >
              <i className="fab fa-whatsapp text-xl"></i> {SITE_MESSAGES.cta.quote}
            </a>
            <button 
              onClick={(e) => {
                e.preventDefault();
                onAddToQuote?.(product);
              }}
              className={`w-12 bg-[${BRAND_COLORS.primary}] text-[${BRAND_COLORS.secondary}] rounded-2xl flex items-center justify-center hover:bg-blue-950 transition-all shadow-sm group/btn`}
            >
              <Plus size={24} className="group-hover/btn:scale-110 transition-transform" />
            </button>
          </div>
          
          <Link 
            to={`/producto/${product.slug || product.id}`}
            className="w-full block text-center text-[#002D62] text-[11px] font-black hover:bg-gray-100 transition-colors uppercase tracking-widest py-3 bg-[#f8f9fa] rounded-2xl"
          >
            Ver mas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
