
import React, { useState, useEffect } from 'react';
import { Target, Eye, ShieldCheck, History, Users, Globe } from 'lucide-react';
import { getAboutPage } from '../services/sanity';

const AboutUsPage: React.FC = () => {
  const [aboutData, setAboutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Intentar obtener datos desde Sanity
    getAboutPage().then(data => {
      if (data) {
        setAboutData(data);
      }
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  // Contenido hardcodeado como fallback
  const defaultContent = {
    mission: "Proveer soluciones eléctricas integrales de la más alta calidad, facilitando el acceso a tecnología de vanguardia para constructoras, ingenieros y especialistas, garantizando siempre la seguridad y eficiencia en cada conexión.",
    vision: "Ser el referente número uno en el mercado peruano para la adquisición de material eléctrico e iluminación, reconocidos por nuestra integridad técnica, rapidez logística y por ser el aliado estratégico de los grandes proyectos de infraestructura del país."
  };

  const mission = aboutData?.mission?.content || defaultContent.mission;
  const vision = aboutData?.vision?.content || defaultContent.vision;
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-[#002D62] py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <span className="text-[#8CC63F] font-black text-xs uppercase tracking-widest mb-4 block">Más de 15 años de experiencia</span>
          <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-tight">
            LA FUERZA DE TU <span className="text-[#8CC63F]">CONSTRUCCIÓN</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto mt-6 text-sm md:text-lg font-medium leading-relaxed">
            Somos Electro Flor, distribuidores líderes de material eléctrico e iluminación técnica en el Perú. Nuestra pasión es equipar los proyectos que mueven al país.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-3xl md:text-5xl font-black text-[#002D62]">15k+</p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Productos en Stock</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-5xl font-black text-[#8CC63F]">500+</p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Obras Equipadas</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-5xl font-black text-[#002D62]">100%</p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Garantía Oficial</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-5xl font-black text-[#8CC63F]">24h</p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Entrega Express</p>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-[#002D62] p-12 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl">
            <div className="absolute top-[-20px] right-[-20px] opacity-5 group-hover:rotate-12 transition-transform">
              <Target size={200} />
            </div>
            <h2 className="text-3xl font-black uppercase mb-6 flex items-center gap-4">
              <Target className="text-[#8CC63F]" size={40} /> Nuestra Misión
            </h2>
            <p className="text-gray-300 font-medium leading-relaxed">
              {mission}
            </p>
          </div>

          <div className="bg-white border-4 border-gray-100 p-12 rounded-[3rem] text-[#002D62] relative overflow-hidden group shadow-xl">
            <div className="absolute top-[-20px] right-[-20px] opacity-5 group-hover:rotate-12 transition-transform">
              <Eye size={200} />
            </div>
            <h2 className="text-3xl font-black uppercase mb-6 flex items-center gap-4">
              <Eye className="text-[#8CC63F]" size={40} /> Nuestra Visión
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              {vision}
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#002D62] uppercase tracking-tighter">NUESTROS <span className="text-[#8CC63F]">VALORES</span></h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <ShieldCheck size={48} />, title: "Calidad Técnica", text: "Solo distribuimos marcas certificadas que cumplen con normativas internacionales." },
            { icon: <Users size={48} />, title: "Compromiso Pro", text: "Entendemos la urgencia de la obra. Si tú no te detienes, nosotros tampoco." },
            { icon: <Globe size={48} />, title: "Cobertura Nacional", text: "Llegamos a cada rincón del Perú para que tu proyecto nunca le falte energía." }
          ].map((v, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform text-center">
              <div className="text-[#8CC63F] flex justify-center mb-6">{v.icon}</div>
              <h3 className="text-xl font-black text-[#002D62] uppercase mb-4">{v.title}</h3>
              <p className="text-gray-500 text-sm font-medium">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
