import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '../../../constants/posts';
import { ChevronRight, Calendar, Clock, User, ArrowLeft, Star } from 'lucide-react';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Artículo no encontrado | Electro Flor',
    };
  }

  return {
    title: `${post.title} | Blog de Electro Flor`,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.electroflorperu.com/blog/${slug}`,
    },
    openGraph: {
      type: 'article',
      title: `${post.title} | Blog de Electro Flor`,
      description: post.excerpt,
      url: `https://www.electroflorperu.com/blog/${slug}`,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Artículos recomendados (otros artículos diferentes al actual)
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  // Schema JSON-LD de BlogPosting para mejorar SEO técnico
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'image': [post.image],
    'datePublished': `${post.date}T08:00:00Z`,
    'dateModified': `${post.date}T08:00:00Z`,
    'author': {
      '@type': 'Organization',
      'name': 'Electro Flor',
      'url': 'https://electroflorperu.com'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Electro Flor',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://electroflorperu.com/media/favicon.png'
      }
    },
    'description': post.excerpt
  };

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      {/* Script estructurado JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs - Verde (Diseño consistente con la tienda) */}
      <div className="bg-[#8CC63F] py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-black text-[#002D62] uppercase tracking-tighter">
            <Link href="/" className="hover:opacity-80">INICIO</Link>
            <ChevronRight size={12} strokeWidth={3} />
            <Link href="/blog" className="hover:opacity-80">BLOG TÉCNICO</Link>
            <ChevronRight size={12} strokeWidth={3} />
            <span className="opacity-60 truncate max-w-[150px] md:max-w-none">{post.title.toUpperCase()}</span>
          </div>
          <Link href="/blog" className="bg-white px-4 py-1.5 rounded-sm flex items-center gap-1.5 text-[10px] font-black text-[#002D62] shadow-sm hover:bg-gray-50 transition-all uppercase tracking-tighter">
            <ArrowLeft size={14} strokeWidth={3} /> VOLVER
          </Link>
        </div>
      </div>

      {/* Contenedor Principal */}
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-20 flex-grow">
        <article className="bg-white">
          {/* Cabecera del Post */}
          <header className="mb-10 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-black text-[#002D62] uppercase leading-tight tracking-tighter mb-6">
              {post.title}
            </h1>
            
            {/* Meta Datos */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6 items-center text-[10px] md:text-[11px] text-gray-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-[#8CC63F]" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-[#8CC63F]" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <User size={14} className="text-[#8CC63F]" />
                {post.author}
              </span>
            </div>
          </header>

          {/* Imagen Destacada */}
          <div className="relative aspect-[21/9] w-full rounded-[2.5rem] overflow-hidden mb-12 shadow-sm">
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Contenido HTML del Artículo */}
          <div 
            className="text-gray-600 font-medium leading-relaxed max-w-none 
              [&_p]:mb-6 [&_p]:text-sm [&_p]:md:text-base 
              [&_strong]:font-black [&_strong]:text-[#002D62] 
              [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:font-black [&_h3]:text-[#002D62] [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:uppercase [&_h3]:tracking-tight
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-6
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-6
              [&_li]:text-sm [&_li]:md:text-base
              [&_a]:text-[#8CC63F] [&_a]:underline [&_a]:font-black hover:[&_a]:opacity-85"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Sección de Recomendados al final */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-gray-100">
            <span className="text-[#8CC63F] font-black uppercase text-[10px] md:text-xs tracking-widest mb-2 flex items-center gap-2">
              <Star size={14} className="fill-[#8CC63F]" /> SIGUE APRENDIENDO
            </span>
            <h2 className="text-xl md:text-3xl font-black text-[#002D62] uppercase tracking-tighter leading-none mb-10">
              OTROS ARTÍCULOS <span className="text-[#8CC63F]">INTERESANTES</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  href={`/blog/${relatedPost.slug}`} 
                  key={relatedPost.slug}
                  className="group bg-slate-50 border border-gray-100/50 p-6 rounded-3xl hover:bg-white hover:border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                >
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-2 block">
                    {relatedPost.date}
                  </span>
                  <h3 className="text-sm md:text-base font-black text-[#002D62] uppercase leading-tight line-clamp-2 mb-2 group-hover:text-[#8CC63F] transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-2 mb-4">
                    {relatedPost.excerpt}
                  </p>
                  <span className="text-[9px] font-black text-[#002D62] uppercase tracking-widest mt-auto group-hover:underline">
                    LEER MÁS →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
