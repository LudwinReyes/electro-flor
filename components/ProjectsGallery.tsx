
import React, { useState, useEffect } from 'react';
import { LayoutGrid, MapPin, Building } from 'lucide-react';
import { BRAND_COLORS } from '../config';
import { getProjects } from '../services/sanity';

interface Project {
  _id?: string;
  title: string;
  location: string;
  image: string;
  type: string;
}

const FALLBACK_PROJECTS: Project[] = [
  {
    title: "Edificio Residencial Sky",
    location: "San Isidro, Lima",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    type: "Iluminación Técnica"
  },
  {
    title: "Almacén Logístico Sur",
    location: "Lurín, Lima",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    type: "Distribución Eléctrica"
  },
  {
    title: "Planta Industrial Textil",
    location: "Santa Anita, Lima",
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=800",
    type: "Conductores de Alta Tensión"
  },
  {
    title: "Mall Plaza Central",
    location: "Cercado de Lima",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    type: "Soluciones de Baja Tensión"
  }
];

const ProjectsGallery: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);

  useEffect(() => {
    const fetchProjects = async () => {
      const sanityProjects = await getProjects();
      if (sanityProjects && sanityProjects.length > 0) {
        setProjects(sanityProjects);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section className="py-16 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 md:mb-20 text-center md:text-left gap-6">
          <div className="flex-1">
            <span className={`text-[${BRAND_COLORS.secondary}] font-black uppercase text-[10px] md:text-xs tracking-widest mb-3 block flex items-center justify-center md:justify-start gap-2`}>
              <Building size={16} /> CASOS DE ÉXITO
            </span>
            <h2 className={`text-3xl md:text-7xl font-black text-[${BRAND_COLORS.primary}] uppercase tracking-tighter leading-none`}>PROYECTOS <span className={`text-[${BRAND_COLORS.secondary}]`}>DESTACADOS</span></h2>
          </div>
          <p className="max-w-md text-gray-500 font-medium text-xs md:text-base leading-relaxed">
            Nuestra huella en las obras más importantes del país. Suministramos materiales certificados que garantizan la longevidad de cada infraestructura.
          </p>
        </div>

        {/* Contenedor: Flex-scroll en móvil, Grid clásico en escritorio */}
        <div className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x md:snap-none gap-5 md:gap-8 pb-10 md:pb-0 no-scrollbar md:grid-cols-2 lg:grid-cols-4">
          {projects.map((proj, idx) => (
            <div
              key={proj._id || idx}
              className="group relative h-[400px] md:h-[500px] min-w-[280px] w-[80vw] md:min-w-0 md:w-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl cursor-pointer snap-center shrink-0 md:shrink"
            >
              {/* Imagen con zoom sutil */}
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Overlay gradiente */}
              <div className={`absolute inset-0 bg-gradient-to-t from-[${BRAND_COLORS.primary}] via-[${BRAND_COLORS.primaryOpacity[20]}] to-transparent opacity-80 group-hover:opacity-95 transition-all duration-500`}></div>

              {/* Información Flotante */}
              <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className={`bg-[${BRAND_COLORS.secondary}] text-[${BRAND_COLORS.primary}] text-[7px] md:text-[9px] font-black px-3 py-1.5 rounded-full uppercase mb-3 inline-block shadow-lg`}>
                  {proj.type}
                </span>
                <h3 className="text-white font-black text-xl md:text-2xl uppercase leading-tight tracking-tight mb-2">
                  {proj.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-300 text-[9px] md:text-[11px] font-bold uppercase tracking-widest">
                  <MapPin size={12} className={`text-[${BRAND_COLORS.secondary}]`} /> {proj.location}
                </div>

                <div className={`mt-6 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-[${BRAND_COLORS.secondary}] text-[10px] font-black uppercase tracking-widest`}>
                  Ver detalle <LayoutGrid size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación visual solo para móviles */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {projects.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGallery;

