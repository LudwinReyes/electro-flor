
import React from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../config';
import { useSiteConfig } from '../contexts/SiteConfigContext';

const ContactPage: React.FC = () => {
  const { siteSettings, colors, contact } = useSiteConfig();

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <section className="bg-[#002D62] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">CENTRO DE <span className="text-[#8CC63F]">CONTACTO</span></h1>
          <p className="text-gray-300 mt-4 font-medium">Estamos listos para cotizar tus proyectos de gran escala.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info Cards */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="flex gap-4 items-center mb-6">
              <div className="bg-[#8CC63F] p-4 rounded-2xl">
                <Phone className="text-[#002D62]" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Atención Inmediata</p>
                <p className="text-xl font-black text-[#002D62] tracking-tighter">948 198 701</p>
              </div>
            </div>
            <div className="flex gap-4 items-center mb-6">
              <div className="bg-[#8CC63F] p-4 rounded-2xl">
                <Mail className="text-[#002D62]" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Correo Corporativo</p>
                <p className="text-sm font-black text-[#002D62]">{siteSettings.email || (typeof contact.email === 'string' ? contact.email : contact.email.sales)}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-[#8CC63F] p-4 rounded-2xl">
                <Clock className="text-[#002D62]" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Horario de Atención</p>
                <p className="text-sm font-black text-[#002D62] whitespace-pre-line">{siteSettings.schedule || 'LUN - SÁB: 8AM - 6PM'}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#002D62] p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-black uppercase mb-4">¿Necesitas Visita Técnica?</h3>
              <p className="text-gray-300 text-sm mb-6">Nuestros ingenieros pueden visitar tu obra para dimensionar el material eléctrico necesario.</p>
              <a href={`https://wa.me/51948198701?text=${encodeURIComponent('Hola, necesito agendar una visita técnica')}`} className="flex items-center justify-center gap-3 bg-[#8CC63F] text-[#002D62] py-4 rounded-xl font-black uppercase text-xs transition-transform hover:scale-105">
                <MessageSquare size={18} /> Agendar Visita
              </a>
            </div>
            <MapPin className="absolute bottom-[-20px] right-[-20px] text-white opacity-5" size={150} />
          </div>
        </div>

        {/* Formulario */}
        <div className="lg:col-span-2">
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-black text-[#002D62] uppercase mb-8 flex items-center gap-3">
              <Send className="text-[#8CC63F]" /> Formulario de Cotización
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nombre Completo</label>
                <input type="text" className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-[#8CC63F] outline-none font-bold text-sm" placeholder="Ej: Juan Pérez" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Empresa / RUC</label>
                <input type="text" className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-[#8CC63F] outline-none font-bold text-sm" placeholder="Opcional" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">WhatsApp</label>
                <input type="text" className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-[#8CC63F] outline-none font-bold text-sm" placeholder="+51" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Asunto</label>
                <select className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-[#8CC63F] outline-none font-bold text-sm">
                  <option>Cotización Corporativa</option>
                  <option>Consulta Técnica</option>
                  <option>Atención Post-Venta</option>
                  <option>Otros</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mensaje / Detalle de Pedido</label>
                <textarea rows={4} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-[#8CC63F] outline-none font-bold text-sm" placeholder="Describe los materiales que necesitas..."></textarea>
              </div>
              <div className="md:col-span-2 pt-4">
                <button className="w-full bg-[#002D62] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-blue-900 transition-all active:scale-95">
                  Enviar Mensaje Directo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Mapa Simulado */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <div className="bg-gray-200 h-96 rounded-[3rem] overflow-hidden relative border-8 border-white shadow-2xl">
          <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover opacity-60 grayscale" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-2xl border-4 border-[#8CC63F] text-center">
              <MapPin className="mx-auto text-[#002D62] mb-2" size={32} />
              <p className="font-black text-[#002D62] uppercase text-xs">Visítanos en nuestra sede central</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase">AV. ARGENTINA 245 - LIMA</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
