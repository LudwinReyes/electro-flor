
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronLeft, Lightbulb, Zap, Waves, Building2 } from 'lucide-react';

const SLIDES = [
  {
    title: "Luminarias <br/> de Hogar",
    subtitle: "ESTILO Y CONFORT",
    description: "Diseños modernos que transforman tus espacios interiores con eficiencia energética y calidez.",
    image: "/media/hogar.webp",
    icon: <Lightbulb size={24} />,
    color: "#8CC63F"
  },
  {
    title: "Iluminación <br/> Pública",
    subtitle: "SEGURIDAD URBANA",
    description: "Sistemas LED de alta potencia para avenidas, parques e industrias con máxima durabilidad.",
    image: "/media/publico.webp",
    icon: <Building2 size={24} />,
    color: "#002D62"
  },
  {
    title: "Luminarias <br/> para Piscina",
    subtitle: "RESISTENCIA TOTAL",
    description: "Equipos subacuáticos IP68 con tecnología RGB para ambientes acuáticos espectaculares.",
    image: "/media/piscina.webp",
    icon: <Waves size={24} />,
    color: "#00E5FF"
  }
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[500px] md:h-[650px] lg:h-[750px] bg-[#002D62] overflow-hidden">
      {/* Slides */}
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === current ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.image}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#002D62] via-[#002D62]/70 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center pb-40 md:pb-64">
            <div className={`max-w-2xl text-white transition-all duration-700 delay-300 ${
              index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#8CC63F] text-[#002D62] p-2 rounded-lg shadow-lg">
                  {slide.icon}
                </span>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-[#8CC63F]">
                  {slide.subtitle}
                </span>
              </div>
              
              <h2 
                className="text-4xl md:text-6xl lg:text-8xl font-black mb-4 leading-tight md:leading-none uppercase tracking-tighter"
                dangerouslySetInnerHTML={{ __html: slide.title }}
              />
              
              <p className="text-sm md:text-lg text-gray-200 mb-8 md:mb-10 max-w-lg leading-relaxed font-medium">
                {slide.description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#8CC63F] text-[#002D62] px-8 py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all shadow-xl uppercase text-xs hover:scale-105 active:scale-95 group">
                  Ver Colección <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white/10 border-2 border-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-black uppercase text-xs hover:bg-white/20 transition-colors">
                  Solicitar Asesoría
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls - Hidden on small mobile */}
      <div className="absolute bottom-48 md:bottom-72 right-4 md:right-10 z-30 flex items-center gap-2 md:gap-4">
        <button 
          onClick={prevSlide}
          className="p-3 md:p-4 rounded-full border-2 border-white/20 text-white hover:bg-[#8CC63F] hover:text-[#002D62] hover:border-[#8CC63F] transition-all active:scale-90"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="p-3 md:p-4 rounded-full border-2 border-white/20 text-white hover:bg-[#8CC63F] hover:text-[#002D62] hover:border-[#8CC63F] transition-all active:scale-90"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-44 md:bottom-64 left-1/2 md:left-auto md:right-10 -translate-x-1/2 md:translate-x-0 z-30 flex gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? 'w-10 h-3 bg-[#8CC63F]' : 'w-3 h-3 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Overlay Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-20 hidden lg:block">
        <div className="w-full h-full border-l border-white/10 flex items-center justify-center">
            <Zap size={300} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
