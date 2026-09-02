import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '../../constants/posts';
import { ChevronRight, Calendar, Clock, User, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Blog de Iluminación y Material Eléctrico | Electro Flor',
  description: 'Artículos de soporte, guías técnicas y comparativas sobre campanas industriales LED, cables eléctricos y distribución en baja tensión. Asesoría experta.',
  keywords: ['blog iluminacion industrial', 'campanas led industriales', 'guias electricas', 'material electrico peru'],
  alternates: {
    canonical: 'https://www.electroflorperu.com/blog',
  },
};

export default function BlogLandingPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      {/* Breadcrumbs - Verde (Diseño consistente con la tienda) */}
      <div className="bg-[#8CC63F] py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-black text-[#002D62] uppercase tracking-tighter">
            <Link href="/" className="hover:opacity-80">INICIO</Link>
            <ChevronRight size={12} strokeWidth={3} />
            <span className="opacity-60">BLOG TÉCNICO</span>
          </div>
        </div>
      </div>

      {/* Hero Sección */}
      <section className="bg-slate-50 py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-[#8CC63F] font-black uppercase text-[10px] md:text-xs tracking-widest mb-2 block">
            APRENDE CON NUESTROS INGENIEROS
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#002D62] uppercase tracking-tighter leading-none mb-6">
            BLOG <span className="text-[#8CC63F]">TÉCNICO</span> Y CONSEJOS
          </h1>
          <p className="text-gray-500 font-medium text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Te ayudamos a calcular, seleccionar e instalar el material eléctrico y de iluminación industrial adecuado para tus proyectos. Información útil y práctica con el respaldo de Electro Flor.
          </p>
        </div>
      </section>

      {/* Grid de Artículos */}
      <main className="max-w-7xl mx-auto px-4 py-16 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article 
              key={post.slug} 
              className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full"
            >
              {/* Imagen del artículo con hover zoom */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Contenido de la Tarjeta */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                {/* Meta info */}
                <div className="flex flex-wrap gap-4 items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-[#8CC63F]" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-[#8CC63F]" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-lg md:text-xl font-black text-[#002D62] uppercase leading-tight tracking-tight mb-4 group-hover:text-[#8CC63F] transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Enlace Leer Más en el fondo */}
                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                    <User size={12} className="text-[#8CC63F]" />
                    POR: {post.author.replace('Dpto. Técnico ', '')}
                  </span>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-[#002D62] font-black text-[10px] uppercase tracking-widest flex items-center gap-1.5 hover:text-[#8CC63F] transition-colors group/link"
                  >
                    LEER MÁS 
                    <ArrowRight size={12} strokeWidth={3} className="transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
