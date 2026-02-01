
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';
import { CONTACT_INFO } from '../config';
import { useSiteConfig } from '../contexts/SiteConfigContext';
import { saveContactForm } from '../services/sanity';

const ContactPage: React.FC = () => {
  const { siteSettings, colors, contact } = useSiteConfig();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    whatsapp: '',
    subject: 'cotizacion_corporativa',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.whatsapp) {
      setError('Por favor completa los campos obligatorios');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await saveContactForm(formData);

      if (result) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          company: '',
          whatsapp: '',
          subject: 'cotizacion_corporativa',
          message: ''
        });
      } else {
        setError('Error al enviar. Por favor intenta nuevamente.');
      }
    } catch (err) {
      setError('Error al enviar. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle size={64} className="mx-auto text-[#8CC63F] mb-4" />
                <h3 className="text-2xl font-black text-[#002D62] mb-2">¡Mensaje Enviado!</h3>
                <p className="text-gray-500 mb-6">Nos pondremos en contacto contigo pronto.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-[#8CC63F] text-[#002D62] px-8 py-3 rounded-xl font-black uppercase text-xs hover:bg-green-400 transition-all"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nombre Completo *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-[#8CC63F] outline-none font-bold text-sm"
                    placeholder="Ej: Juan Pérez"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Empresa / RUC</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-[#8CC63F] outline-none font-bold text-sm"
                    placeholder="Opcional"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">WhatsApp *</label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-[#8CC63F] outline-none font-bold text-sm"
                    placeholder="+51 999 999 999"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Asunto</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-[#8CC63F] outline-none font-bold text-sm"
                  >
                    <option value="cotizacion_corporativa">Cotización Corporativa</option>
                    <option value="consulta_tecnica">Consulta Técnica</option>
                    <option value="post_venta">Atención Post-Venta</option>
                    <option value="otros">Otros</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mensaje / Detalle de Pedido</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-[#8CC63F] outline-none font-bold text-sm"
                    placeholder="Describe los materiales que necesitas..."
                  ></textarea>
                </div>

                {error && (
                  <div className="md:col-span-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-bold">
                    {error}
                  </div>
                )}

                <div className="md:col-span-2 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#002D62] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-blue-900 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      'Enviar Mensaje Directo'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Mapa Real de Google Maps */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <div className="bg-white rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
          <div className="relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d975.5082548834!2d-77.04490407006182!3d-12.044196254288837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c5f0866f76d7%3A0x8c8c8c8c8c8c8c8c!2sCentro%20Comercial%20Nicolini!5e0!3m2!1ses!2spe!4v1706729000000!5m2!1ses!2spe"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
            <div className="absolute bottom-4 left-4 bg-white p-4 rounded-2xl shadow-xl border-2 border-[#8CC63F]">
              <div className="flex items-center gap-3">
                <div className="bg-[#8CC63F] p-3 rounded-xl">
                  <MapPin className="text-[#002D62]" size={24} />
                </div>
                <div>
                  <p className="font-black text-[#002D62] uppercase text-xs">Centro Comercial Nicolini</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Av. Argentina 245, Pasaje 2, Puesto AR12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
