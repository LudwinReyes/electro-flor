
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, ArrowRight, Construction, CheckCircle2 } from 'lucide-react';
import { BRAND_COLORS, CONTACT_INFO } from '../config';
import { useSiteConfig } from '../contexts/SiteConfigContext';
import { saveLead, getProgramaEspecialista } from '../services/sanity';

const Footer: React.FC = () => {
  const { siteSettings, footerSettings, colors, contact } = useSiteConfig();
  const [whatsappInput, setWhatsappInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [programaConfig, setProgramaConfig] = useState<any>(null);

  useEffect(() => {
    getProgramaEspecialista().then(config => {
      if (config) setProgramaConfig(config);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappInput.trim()) return;

    setIsSubmitting(true);
    const result = await saveLead(whatsappInput, 'programa_especialista');
    setIsSubmitting(false);

    if (result) {
      setSubmitSuccess(true);
      setWhatsappInput('');
      setTimeout(() => setSubmitSuccess(false), 5000);
    }
  };

  return (
    <footer className="pt-16 border-t-8" style={{ backgroundColor: colors.background.main, borderTopColor: colors.primary }}>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
        {/* Programa Especialista */}
        <div className="p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group border-2" style={{ backgroundColor: colors.primary, borderColor: colors.secondaryOpacity[30] }}>
          <div className="absolute top-[-20px] right-[-20px] group-hover:rotate-12 transition-transform duration-700" style={{ color: colors.secondaryOpacity[5] }}>
            <Construction size={200} />
          </div>
          <div className="relative z-10">
            <span className="font-black text-[10px] uppercase tracking-[0.3em] mb-2 block" style={{ color: colors.secondary }}>
              {programaConfig?.badge || 'Programa Especialista'}
            </span>
            <h3 className="text-white font-black text-2xl mb-4 uppercase tracking-tighter leading-none">
              {programaConfig?.title || '¿ERES MAESTRO'} <br />
              <span style={{ color: colors.secondary }}>{programaConfig?.titleHighlight || 'DE OBRA?'}</span>
            </h3>

            <div className="space-y-2 mb-8">
              {(programaConfig?.benefits || ['PRECIOS DE DISTRIBUIDOR', 'ENTREGA EN OBRA HOY']).map((benefit: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2 text-[10px] text-gray-300 font-bold uppercase">
                  <CheckCircle2 size={14} style={{ color: colors.secondary }} /> {benefit}
                </div>
              ))}
            </div>

            {submitSuccess ? (
              <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-center">
                <p className="text-green-400 font-bold text-sm">
                  {programaConfig?.successMessage || '¡Gracias! Te contactaremos pronto.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder={programaConfig?.inputPlaceholder || 'WhatsApp'}
                  value={whatsappInput}
                  onChange={(e) => setWhatsappInput(e.target.value)}
                  className="w-full py-3.5 px-5 rounded-xl text-xs font-bold outline-none bg-white/5 text-white placeholder:text-white/30 border border-white/10 transition-all"
                  style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                  onFocus={(e) => e.currentTarget.style.borderColor = colors.secondary}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-black uppercase text-xs transition-all shadow-lg disabled:opacity-50"
                  style={{ backgroundColor: colors.secondary, color: colors.primary }}
                >
                  {isSubmitting ? 'Enviando...' : (programaConfig?.buttonText || 'Quiero Beneficios Pro')}
                </button>
              </form>
            )}
          </div>
        </div>


        {/* Nuestras Líneas */}
        <div>
          <h4 className="font-black mb-8 uppercase text-sm tracking-widest flex items-center gap-2" style={{ color: colors.primary }}>
            <span className="w-8 h-1 rounded-full" style={{ backgroundColor: colors.secondary }}></span> NUESTRAS LÍNEAS
          </h4>
          <ul className="space-y-4 text-xs font-black uppercase" style={{ color: colors.primary }}>
            {(footerSettings as any)?.featuredCategories?.length > 0 ? (
              (footerSettings as any).featuredCategories.map((cat: any) => (
                <li key={cat._id}>
                  <Link to={`/productos?category=${encodeURIComponent(cat.name)}`} className="flex items-center gap-3 hover:opacity-80 group">
                    <ArrowRight size={14} style={{ color: colors.secondary }} className="group-hover:translate-x-1 transition-transform" /> {cat.name}
                  </Link>
                </li>
              ))
            ) : (
              <>
                <li><Link to="/productos" className="flex items-center gap-3 hover:opacity-80 group"><ArrowRight size={14} style={{ color: colors.secondary }} className="group-hover:translate-x-1 transition-transform" /> Iluminación Industrial</Link></li>
                <li><Link to="/productos" className="flex items-center gap-3 hover:opacity-80 group"><ArrowRight size={14} style={{ color: colors.secondary }} className="group-hover:translate-x-1 transition-transform" /> Conductores Eléctricos</Link></li>
                <li><Link to="/productos" className="flex items-center gap-3 hover:opacity-80 group"><ArrowRight size={14} style={{ color: colors.secondary }} className="group-hover:translate-x-1 transition-transform" /> Baja Tensión</Link></li>
                <li><Link to="/productos" className="flex items-center gap-3 hover:opacity-80 group"><ArrowRight size={14} style={{ color: colors.secondary }} className="group-hover:translate-x-1 transition-transform" /> Gasfitería Técnica</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* Ayuda */}
        <div>
          <h4 className="font-black mb-8 uppercase text-sm tracking-widest flex items-center gap-2" style={{ color: colors.primary }}>
            <span className="w-8 h-1 rounded-full" style={{ backgroundColor: colors.secondary }}></span> INSTITUCIONAL
          </h4>
          <ul className="space-y-4 text-xs text-gray-500 font-bold uppercase">
            <li><Link to="/nosotros" className="hover:opacity-80">Sobre Nosotros</Link></li>
            <li><Link to="/faq" className="hover:opacity-80">Preguntas Frecuentes</Link></li>
            <li><Link to="/contacto" className="hover:opacity-80">Contacto Corporativo</Link></li>
            <li><Link to="/faq" className="hover:opacity-80">Garantías y Cambios</Link></li>
          </ul>
        </div>

        {/* Contacto */}
        <div className="space-y-8">
          <div className="flex items-center gap-2 group cursor-pointer">
            {/* Logo: usa siteSettings.logo si existe */}
            {siteSettings.logo ? (
              <img
                src={siteSettings.logo}
                alt={siteSettings.siteName || 'ELECTRO FLOR'}
                className="h-12 w-auto object-contain"
              />
            ) : (
              <>
                <div className="p-2 rounded-lg group-hover:rotate-12 transition" style={{ backgroundColor: colors.primary }}>
                  <i className="fas fa-hammer text-xl" style={{ color: colors.secondary }}></i>
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-xl leading-none uppercase tracking-tighter" style={{ color: colors.primary }}>{siteSettings.siteName?.split(' ')[0] || 'ELECTRO'}</span>
                  <span className="font-black text-xl leading-none uppercase tracking-tighter" style={{ color: colors.secondary }}>{siteSettings.siteName?.split(' ')[1] || 'FLOR'}</span>
                </div>
              </>
            )}
          </div>
          <div className="space-y-5">
            <div className="flex gap-4">
              <div className="bg-gray-100 p-3 rounded-2xl" style={{ color: colors.primary }}><Phone size={20} /></div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Central:</p>
                <a href={`tel:${contact.phone.whatsapp}`} className="text-sm font-black hover:opacity-80" style={{ color: colors.primary }}>{contact.phone.display}</a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-gray-100 p-3 rounded-2xl" style={{ color: colors.primary }}><Mail size={20} /></div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email:</p>
                <a href={`mailto:${siteSettings.email || (typeof contact.email === 'string' ? contact.email : contact.email.sales)}`} className="text-sm font-black hover:opacity-80" style={{ color: colors.primary }}>{siteSettings.email || (typeof contact.email === 'string' ? contact.email : contact.email.sales)}</a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-gray-100 p-3 rounded-2xl" style={{ color: colors.primary }}><MapPin size={20} /></div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ubicación:</p>
                <p className="text-sm font-black" style={{ color: colors.primary }}>{siteSettings.address || (typeof contact.address === 'string' ? contact.address : contact.address.full)}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            {(siteSettings.facebook || contact.social.facebook) && (
              <a href={siteSettings.facebook || contact.social.facebook} target="_blank" rel="noopener noreferrer" className="text-white p-3.5 rounded-2xl transition-all" style={{ backgroundColor: colors.primary }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.secondary} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}><Facebook size={20} /></a>
            )}
          </div>
        </div>
      </div>

      <div className={`bg-[${colors.primary}] py-8`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">
            ELECTRO FLOR PERÚ © 2024 Desarrollado por LR Digital Solutions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

