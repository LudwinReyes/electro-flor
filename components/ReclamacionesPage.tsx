
import React from 'react';
import { BRAND_COLORS } from '../config';
import { useSiteConfig } from '../contexts/SiteConfigContext';
import SEOHead from './SEOHead';
import { Book, FileText, Send, User, AtSign, Clock } from 'lucide-react';
import { saveReclamacion } from '../services/sanity';

const ReclamacionesPage: React.FC = () => {
    const { colors } = useSiteConfig();
    const [formData, setFormData] = React.useState({
        name: '',
        dni: '',
        email: '',
        type: 'Reclamo',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message || !formData.dni) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }

        setIsSubmitting(true);
        const result = await saveReclamacion({
            fullName: formData.name,
            dni: formData.dni,
            email: formData.email,
            type: formData.type,
            message: formData.message
        });

        setIsSubmitting(false);
        if (result) {
            setIsSuccess(true);
            setFormData({ name: '', dni: '', email: '', type: 'Reclamo', message: '' });
        } else {
            alert('Hubo un error al enviar tu reclamación. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <SEOHead
                title="Libro de Reclamaciones | ELECTRO FLOR"
                description="Pone a su disposición nuestro Libro de Reclamaciones virtual."
            />

            <div className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-amber-500 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden mb-12">
                        <div className="absolute top-[-20px] right-[-20px] opacity-10">
                            <Book size={300} color="white" />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                            <div className="bg-white/20 p-6 rounded-3xl backdrop-blur-sm">
                                <Book className="text-white w-16 h-16" />
                            </div>
                            <div className="text-white">
                                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 leading-none">
                                    Libro de <br /> <span className="text-[#002D62]">Reclamaciones</span>
                                </h1>
                                <p className="text-white/80 font-bold uppercase text-xs tracking-widest">Conforme a lo establecido en el código de protección y defensa del consumidor.</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8">
                            {isSuccess ? (
                                <div className="bg-green-50 p-12 rounded-[2rem] border-2 border-green-200 text-center">
                                    <div className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
                                        <Send size={40} />
                                    </div>
                                    <h2 className="text-2xl font-black text-green-900 uppercase mb-2">¡Enviado con éxito!</h2>
                                    <p className="text-green-700 font-bold mb-8">Hemos recibido tu reporte. Se ha enviado una copia a tu correo y lo procesaremos en un plazo máximo de 15 días.</p>
                                    <button
                                        type="button"
                                        onClick={() => setIsSuccess(false)}
                                        className="py-4 px-8 bg-green-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all"
                                    >
                                        Enviar otro reporte
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <section className="bg-gray-50 p-8 rounded-[2rem] border-2 border-dashed border-gray-200 text-black">
                                        <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-3" style={{ color: colors.primary }}>
                                            <User size={20} className="text-amber-500" /> Identificación del Consumidor
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Nombres y Apellidos*</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full p-4 rounded-2xl bg-white border border-gray-100 outline-none focus:border-amber-500 transition-all font-bold text-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">DNI / CE*</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.dni}
                                                    onChange={e => setFormData({ ...formData, dni: e.target.value })}
                                                    className="w-full p-4 rounded-2xl bg-white border border-gray-100 outline-none focus:border-amber-500 transition-all font-bold text-sm"
                                                />
                                            </div>
                                            <div className="space-y-2 sm:col-span-2">
                                                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Correo Electrónico*</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full p-4 rounded-2xl bg-white border border-gray-100 outline-none focus:border-amber-500 transition-all font-bold text-sm"
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    <section className="bg-gray-50 p-8 rounded-[2rem] border-2 border-dashed border-gray-200 text-black">
                                        <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-3" style={{ color: colors.primary }}>
                                            <FileText size={20} className="text-amber-500" /> Detalle de la Reclamación
                                        </h2>
                                        <div className="space-y-6">
                                            <div className="flex gap-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, type: 'Reclamo' })}
                                                    className={`flex-1 p-4 rounded-2xl border-2 font-black uppercase text-xs transition-all ${formData.type === 'Reclamo' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200 bg-white text-gray-400'}`}
                                                >
                                                    Reclamo
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, type: 'Queja' })}
                                                    className={`flex-1 p-4 rounded-2xl border-2 font-black uppercase text-xs transition-all ${formData.type === 'Queja' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200 bg-white text-gray-400'}`}
                                                >
                                                    Queja
                                                </button>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Mensaje / Detalle*</label>
                                                <textarea
                                                    rows={6}
                                                    required
                                                    value={formData.message}
                                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                                    className="w-full p-4 rounded-2xl bg-white border border-gray-100 outline-none focus:border-amber-500 transition-all font-bold text-sm resize-none"
                                                ></textarea>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-white shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50"
                                                style={{ backgroundColor: colors.primary }}
                                            >
                                                <Send size={18} /> {isSubmitting ? 'Enviando...' : 'Enviar Reclamación'}
                                            </button>
                                        </div>
                                    </section>
                                </>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div className="bg-[#002D62] p-8 rounded-[2rem] text-white">
                                <h3 className="font-black uppercase text-xs tracking-widest text-amber-500 mb-4">Información Legal</h3>
                                <div className="space-y-4 text-white">
                                    <div>
                                        <p className="text-[9px] font-bold text-white/50 uppercase">Razón Social</p>
                                        <p className="text-xs font-black">ELECTRICIDAD ELECTRONICA FLORES E.I.R.L.</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-white/50 uppercase">RUC</p>
                                        <p className="text-xs font-black">20611899972</p>
                                    </div>
                                    <div className="pt-4 border-t border-white/10">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Clock size={16} className="text-amber-500" />
                                            <p className="text-[10px] font-black uppercase">Plazo de atención</p>
                                        </div>
                                        <p className="text-[11px] font-bold text-white/70">Máximo 15 días hábiles conforme a ley.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-amber-50 p-8 rounded-[2rem] border-2 border-amber-100">
                                <AtSign className="text-amber-600 mb-4" />
                                <h3 className="font-black text-amber-900 uppercase text-xs tracking-widest mb-2">Ayuda Directa</h3>
                                <p className="text-amber-800/70 text-xs font-bold leading-relaxed mb-4">
                                    Si prefieres contactarnos directamente por una incidencia, también puedes escribirnos a:
                                </p>
                                <a href="mailto:elmervazquezguevara@gmail.com" className="text-sm font-black text-amber-900 underline">elmervazquezguevara@gmail.com</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReclamacionesPage;
