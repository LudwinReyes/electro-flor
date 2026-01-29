
import React from 'react';
import { X, FileText, Download, CheckCircle2, Star, MessageCircle } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { CONTACT_INFO, SITE_MESSAGES } from '../config';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PriceListModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 md:p-4">
      <div className="absolute inset-0 bg-[#002D62]/95 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#002D62] p-6 md:p-8 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="bg-[#8CC63F] p-2.5 md:p-3 rounded-2xl">
              <FileText size={24} className="text-[#002D62]" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black uppercase tracking-tighter">Lista de Precios Pro</h2>
              <p className="text-[9px] md:text-[10px] font-bold text-[#8CC63F] uppercase tracking-widest">Stock Real y Consultas</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition text-[#8CC63F]">
            <X size={24} />
          </button>
        </div>

        {/* Content Area - Table on Desktop, Cards on Mobile */}
        <div className="flex-grow overflow-y-auto custom-scrollbar">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-gray-50 z-10 shadow-sm">
                <tr className="border-b border-gray-100">
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Producto / Marca</th>
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">SKU</th>
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Estado</th>
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Cotización</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {PRODUCTS.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-[#002D62] uppercase tracking-tight">{p.name}</span>
                        <span className="text-[9px] font-bold text-[#8CC63F] uppercase">{p.brand}</span>
                      </div>
                    </td>
                    <td className="p-6 text-[10px] font-bold text-gray-400 text-center">{p.code}</td>
                    <td className="p-6">
                      <div className="flex items-center justify-center gap-2 text-[#25d366]">
                        <CheckCircle2 size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">En Stock</span>
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <a 
                        href={`https://wa.me/${CONTACT_INFO.phone.whatsapp}?text=${encodeURIComponent(SITE_MESSAGES.whatsapp.quoteRequest(p.name))}`}
                        target="_blank"
                        className="inline-flex items-center gap-2 text-[#002D62] font-black text-[9px] uppercase tracking-widest bg-gray-100 px-4 py-2 rounded-lg hover:bg-[#8CC63F] transition-all"
                      >
                        <i className="fab fa-whatsapp"></i> Ver Precio
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden p-4 space-y-4">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-black text-[#8CC63F] uppercase tracking-[0.2em]">{p.brand}</span>
                    <h3 className="text-xs font-black text-[#002D62] uppercase tracking-tight leading-tight">{p.name}</h3>
                    <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase">SKU: {p.code}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[#25d366]">
                    <CheckCircle2 size={12} />
                    <span className="text-[8px] font-black uppercase tracking-widest">En Stock</span>
                  </div>
                </div>
                <a 
                  href={`https://wa.me/51999000000?text=Hola,%20solicito%20precio%20para:%20${encodeURIComponent(p.name)}`}
                  target="_blank"
                  className="w-full bg-[#25d366] text-white py-3 rounded-xl font-black text-[10px] uppercase flex items-center justify-center gap-2 shadow-sm"
                >
                  <i className="fab fa-whatsapp"></i> Consultar Precio Inmediato
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Area */}
        <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100 shrink-0">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-[#8CC63F] fill-current" />
              <p className="text-[9px] font-bold text-gray-500 uppercase text-center md:text-left">Descuentos por volumen disponibles para especialistas.</p>
            </div>
            <button className="w-full md:w-auto bg-[#002D62] text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-900 transition-all">
              <Download size={14} className="text-[#8CC63F]" /> Descargar Catálogo PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceListModal;
