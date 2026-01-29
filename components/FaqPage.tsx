
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Truck, ShieldCheck, CreditCard, FileText } from 'lucide-react';
import { CONTACT_INFO } from '../config';
import { getFAQs } from '../services/sanity';

const FaqPage: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);
  const [sanityFaqs, setSanityFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Intentar obtener FAQs desde Sanity
    getFAQs().then(data => {
      if (data && data.length > 0) {
        setSanityFaqs(data);
      }
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  // FAQs hardcodeadas como fallback

  const faqs = [
    {
      icon: <Truck size={20} />,
      q: "¿Cómo funcionan los envíos a provincias?",
      a: "Realizamos envíos diarios a todo el Perú a través de las principales agencias (Shalom, Marvisur, Olva Courier). El material viaja con seguro y guía de remisión oficial. El tiempo estimado es de 24 a 48 horas dependiendo del destino."
    },
    {
      icon: <ShieldCheck size={20} />,
      q: "¿Los productos cuentan con garantía de fábrica?",
      a: "Absolutamente. Al ser distribuidores autorizados de marcas como Bosch, Schneider y Philips, todos nuestros productos incluyen garantía oficial de fábrica que oscila entre los 12 y 24 meses según el modelo."
    },
    {
      icon: <CreditCard size={20} />,
      q: "¿Qué medios de pago aceptan?",
      a: "Aceptamos transferencias bancarias directas (BCP, BBVA, Interbank), Yape, Plin y todas las tarjetas de crédito/débito a través de nuestro POS en tienda. Para clientes corporativos, manejamos créditos previa evaluación."
    },
    {
      icon: <FileText size={20} />,
      q: "¿Emiten facturas y guías de remisión?",
      a: "Sí, somos una empresa formal. Emitimos factura electrónica, boleta y todas las guías de remisión necesarias para el transporte de material pesado a obra."
    },
    {
      icon: <HelpCircle size={20} />,
      q: "¿Puedo realizar cambios o devoluciones?",
      a: "Los cambios se aceptan dentro de los primeros 7 días hábiles siempre que el producto esté sellado en su empaque original y cuente con el comprobante de pago correspondiente."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-[#8CC63F] py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-[#002D62] uppercase tracking-tighter">PREGUNTAS <span className="text-white">FRECUENTES</span></h1>
          <p className="text-[#002D62] mt-4 font-bold uppercase tracking-widest text-xs">Despejamos tus dudas técnicas</p>
        </div>
        <HelpCircle className="absolute right-[-20px] top-[-20px] text-white opacity-20" size={200} />
      </section>

      <section className="max-w-3xl mx-auto px-4 py-20">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002D62] mx-auto"></div>
            <p className="text-gray-400 mt-4">Cargando preguntas...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(sanityFaqs.length > 0 ? sanityFaqs.map((faq: any, idx: number) => ({
              icon: <HelpCircle size={20} />,
              q: faq.question,
              a: faq.answer
            })) : faqs).map((faq, idx) => (
            <div key={idx} className={`border-2 rounded-3xl overflow-hidden transition-all ${activeIdx === idx ? 'border-[#002D62] shadow-xl' : 'border-gray-100 hover:border-gray-200'}`}>
              <button 
                onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
                className="w-full p-6 text-left flex justify-between items-center bg-white"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl ${activeIdx === idx ? 'bg-[#8CC63F] text-[#002D62]' : 'bg-gray-100 text-gray-400'}`}>
                    {faq.icon}
                  </div>
                  <span className={`text-xs md:text-sm font-black uppercase tracking-tight ${activeIdx === idx ? 'text-[#002D62]' : 'text-gray-500'}`}>
                    {faq.q}
                  </span>
                </div>
                {activeIdx === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {activeIdx === idx && (
                <div className="p-6 pt-0 bg-white text-gray-500 text-sm font-medium leading-relaxed animate-in slide-in-from-top-2">
                  <div className="h-px bg-gray-50 mb-6"></div>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
          </div>
        )}

        <div className="mt-20 bg-gray-50 p-12 rounded-[3rem] text-center border-2 border-dashed border-gray-200">
           <h3 className="text-[#002D62] font-black text-xl uppercase mb-4">¿Tu duda no está aquí?</h3>
           <p className="text-gray-400 text-sm mb-8">Escríbenos directamente y un especialista te responderá en minutos.</p>
           <a href={`https://wa.me/${CONTACT_INFO.phone.whatsapp}?text=${encodeURIComponent('Hola, tengo una consulta')}`} className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-black uppercase text-xs shadow-lg hover:scale-105 transition-all">
              Consultar ahora por WhatsApp
           </a>
        </div>
      </section>
    </div>
  );
};

export default FaqPage;
