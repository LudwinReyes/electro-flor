
import React from 'react';
import { Product } from '../types';
import { X, Trash2, MessageCircle, FileText } from 'lucide-react';
import { BRAND_COLORS, CONTACT_INFO, SITE_MESSAGES } from '../config';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

const QuoteCart: React.FC<Props> = ({ isOpen, onClose, items, onRemove, onClear }) => {
  const sendQuote = () => {
    if (items.length === 0) return;

    // Construcción del mensaje con saltos de línea claros
    let message = `${SITE_MESSAGES.whatsapp.bulkQuote}\n\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
    });
    message += "\nSolicito precios por volumen y tiempos de entrega. Gracias.";

    const url = `${CONTACT_INFO.phone.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className={`bg-[${BRAND_COLORS.primary}] p-6 text-white flex justify-between items-center border-b-4 border-[${BRAND_COLORS.secondary}]`}>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter">Lista de Cotización</h2>
            <p className={`text-[10px] font-bold text-[${BRAND_COLORS.secondary}] uppercase tracking-widest`}>Solicitud de Volumen Pro</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
              <FileText size={64} className="text-gray-400" />
              <p className="text-sm font-bold uppercase text-gray-400">Tu lista está vacía</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item._id || item.id} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group">
                <div className="w-16 h-16 bg-white rounded-xl p-2 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-grow">
                  <h4 className={`text-[11px] font-black text-[${BRAND_COLORS.primary}] uppercase leading-tight line-clamp-2`}>{item.name}</h4>
                  <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase">Marca: {item.brand}</p>
                </div>
                <button
                  onClick={() => onRemove(item._id || item.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
            <div className="flex justify-between items-center">
              <span className={`text-xs font-black text-[${BRAND_COLORS.primary}] uppercase`}>Total Productos:</span>
              <span className={`text-lg font-black text-[${BRAND_COLORS.secondary}]`}>{items.length}</span>
            </div>

            <button
              onClick={sendQuote}
              className={`w-full bg-[${BRAND_COLORS.success}] text-white py-4 rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-95 transition-all`}
            >
              <i className="fab fa-whatsapp text-2xl"></i> Enviar Lista por WhatsApp
            </button>

            <button
              onClick={onClear}
              className="w-full text-[10px] font-black text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors"
            >
              Limpiar Lista
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteCart;
