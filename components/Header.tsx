"use client";

"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Menu, Phone, MapPin, Calculator, FileText, LayoutList, X, ArrowUpRight, ChevronDown, LayoutGrid } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { Product } from '../types';
import { BRAND_COLORS, CONTACT_INFO } from '../config';
import { useSiteConfig } from '../contexts/SiteConfigContext';
import { getCategories } from '../services/sanity';
import { optimizeImage } from '../utils/optimizeImage';
import CategoryIcon from './CategoryIcon';

interface Props {
  quoteCount: number;
  onOpenQuote: () => void;
  onOpenPriceList: () => void;
  onSearch?: (query: string) => void;
  products?: Product[];
}

const Header: React.FC<Props> = ({ quoteCount, onOpenQuote, onOpenPriceList, onSearch, products = [] }) => {
  const { siteSettings, headerSettings, colors, contact } = useSiteConfig();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sanityCategories, setSanityCategories] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Cargar categorías desde Sanity
  useEffect(() => {
    getCategories().then(cats => {
      if (cats && cats.length > 0) {
        setSanityCategories(cats);
      }
    });
  }, []);

  // Usar categorías de Sanity si existen, sino usar hardcodeadas
  const categories = sanityCategories.length > 0 ? sanityCategories : CATEGORIES;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 6);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        router.push(`/productos?search=${encodeURIComponent(searchQuery.trim())}`);
      }
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product: any) => {
    setSearchQuery('');
    setShowSuggestions(false);
    router.push(`/producto/${product.slug || product.id || product._id}`);
  };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50 border-b-4" style={{ borderBottomColor: colors.secondary }}>
      <div className="py-1.5 text-xs text-white hidden lg:block" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-1.5 font-medium"><MapPin size={14} style={{ color: colors.secondary }} /> {typeof contact.address === 'string' ? contact.address.toUpperCase() : contact.address.full.toUpperCase()}</span>
            <a href={`tel:${contact.phone.whatsapp}`} className="flex items-center gap-1.5 font-medium hover:underline"><Phone size={14} style={{ color: colors.secondary }} /> CENTRAL: {contact.phone.display}</a>
          </div>
          <div className="flex gap-4 font-bold uppercase tracking-widest text-[9px]">
            <Link href="/calculadora-conductores-electricos" className="flex items-center gap-1.5 hover:text-white transition group" style={{ color: colors.secondary }}>
              <Calculator size={14} /> Calculadora
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-2 md:gap-4">
        <button aria-label="Abrir menú de navegación" className="lg:hidden p-2" style={{ color: colors.primary }} onClick={() => setIsMenuOpen(true)}>
          <Menu size={28} />
        </button>

        <Link href="/" className="flex-shrink-0 flex items-center gap-1 md:gap-2">
          {/* Logo: usa siteSettings.logo si existe, sino muestra icono de fallback */}
          {siteSettings.logo ? (
            <Image
              src={optimizeImage(siteSettings.logo, 400)}
              alt={siteSettings.siteName || 'ELECTRO FLOR'}
              width={180}
              height={56}
              className="h-10 md:h-14 w-auto object-contain"
            />
          ) : (
            <>
              <div className="h-10 md:h-14 flex items-center justify-center p-1.5 md:p-2 rounded-lg" style={{ backgroundColor: colors.primary }}>
                <i className="fas fa-hammer text-lg md:text-2xl" style={{ color: colors.secondary }}></i>
              </div>
              <div className="flex flex-col hidden xs:flex">
                <span className="font-black text-lg md:text-2xl leading-none tracking-tighter uppercase" style={{ color: colors.primary }}>{siteSettings.siteName?.split(' ')[0] || 'ELECTRO'}</span>
                <span className="font-black text-lg md:text-2xl leading-none tracking-tighter uppercase" style={{ color: colors.secondary }}>{siteSettings.siteName?.split(' ')[1] || 'FLOR'}</span>
              </div>
            </>
          )}
        </Link>

        {/* Categories Button & Search */}
        <div className="flex flex-grow max-w-2xl items-center gap-2 relative">
          {/* Category Dropdown Button */}
          <div className="relative" ref={categoryMenuRef}>
            <button
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className={`hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest shrink-0`}
              style={{
                backgroundColor: colors.gray[100],
                color: colors.primary
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.secondary;
                e.currentTarget.style.color = colors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.gray[100];
                e.currentTarget.style.color = colors.primary;
              }}
            >
              <LayoutGrid size={18} /> Categorías <ChevronDown size={14} className={`transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Desktop Category Menu */}
            {isCategoryMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 max-h-[75vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-100 py-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-6 mb-2 border-b border-gray-50 pb-2">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Nuestras Líneas</p>
                </div>
                {categories.filter((cat: any) => cat.featured !== false).map((cat: any) => (
                  <Link
                    key={cat.slug}
                    href={`/productos/${cat.slug}`}
                    onClick={() => setIsCategoryMenuOpen(false)}
                    className="flex items-center justify-between px-6 py-3 transition-colors group hover:bg-gray-50"
                    style={{ color: colors.primary }}
                  >
                    <div className="flex items-center gap-3">
                      <CategoryIcon name={cat.icon} size={18} color={colors.secondary} />
                      <span className="text-[11px] font-black uppercase tracking-tight">{cat.name}</span>
                    </div>
                    <ArrowUpRight size={14} className="text-gray-200 group-hover:text-current transition-colors" style={{ color: colors.secondary }} />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div ref={searchRef} className="flex-grow relative">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="¿Qué material buscas?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.secondary;
                  if (searchQuery.length > 1) setShowSuggestions(true);
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#F3F4F6';
                  // Delay para permitir click en sugerencias
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
                className="w-full border-2 border-gray-100 rounded-full py-2.5 px-6 focus:outline-none bg-gray-50 text-xs font-medium transition-all"
              />
              <button type="submit" aria-label="Buscar productos" className="absolute right-1.5 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:opacity-90 transition-colors" style={{ backgroundColor: colors.primary }}>
                <Search size={16} style={{ color: colors.secondary }} />
              </button>
            </form>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-3 bg-gray-50 border-b border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sugerencias</p>
                </div>
                <div className="max-h-96 overflow-y-auto py-2">
                  {suggestions.map((p) => (
                    <button
                      key={p.slug || p._id || p.id}
                      onClick={() => handleSuggestionClick(p)}
                      className={`w-full flex items-center gap-4 px-4 py-3 hover:bg-[${BRAND_COLORS.secondaryOpacity[10]}] text-left transition-colors group`}
                    >
                      <div className="w-10 h-10 bg-white rounded-lg p-1 border border-gray-100 shrink-0">
                        <Image 
                          src={optimizeImage(p.image, 100)} 
                          alt={p.name} 
                          width={40} 
                          height={40} 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                      <div className="flex-grow overflow-hidden">
                        <p className={`text-[11px] font-black text-[${BRAND_COLORS.primary}] uppercase truncate group-hover:text-[${BRAND_COLORS.secondary}] transition-colors`}>{p.name}</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase">{p.brand}</p>
                      </div>
                      <ArrowUpRight size={14} className={`text-gray-200 group-hover:text-[${BRAND_COLORS.secondary}] transition-colors`} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 md:gap-4">
          <button
            onClick={onOpenQuote}
            aria-label={`Ver lista de cotización${quoteCount > 0 ? ` (${quoteCount} productos)` : ''}`}
            className="relative p-2 md:p-2.5 bg-gray-50 rounded-xl transition-all"
            style={{ color: colors.primary }}
          >
            <FileText size={22} />
            {quoteCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
                style={{ backgroundColor: colors.primary, color: colors.secondary }}
              >
                {quoteCount}
              </span>
            )}
          </button>

          <div className="hidden md:flex flex-col items-end">
            <span className="text-[9px] text-gray-400 font-black uppercase">Ventas</span>
            <a href={`tel:${contact.phone.whatsapp}`} className="font-black text-sm" style={{ color: colors.primary }}>{contact.phone.display}</a>
          </div>
        </div>
      </div>

      <nav className="hidden lg:block max-w-7xl mx-auto px-4 border-t border-gray-50 overflow-x-auto">
        <div className="flex py-3 gap-8 text-[11px] font-black uppercase tracking-widest" style={{ color: colors.primary }}>
          <Link href="/" className="hover:opacity-80 transition-opacity" style={{ borderBottom: `2px solid transparent` }}>Inicio</Link>
          <Link href="/productos" className="hover:opacity-80 transition-opacity">Productos</Link>
          <Link href="/marcas" className="hover:opacity-80 transition-opacity">Marcas</Link>
          <Link href="/nosotros" className="hover:opacity-80 transition-opacity">Nosotros</Link>
          <Link href="/contacto" className="hover:opacity-80 transition-opacity">Contacto</Link>
          <Link href="/faq" className="hover:opacity-80 transition-opacity">Preguntas</Link>
          <Link href="/blog" className="hover:opacity-80 transition-opacity">Blog</Link>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className={`absolute inset-0 bg-[${BRAND_COLORS.primaryOpacity[90]}] backdrop-blur-sm`} onClick={() => setIsMenuOpen(false)}></div>
          <div className="relative w-80 h-full bg-white shadow-2xl flex flex-col p-6 animate-in slide-in-from-left duration-300">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <div className={`bg-[${BRAND_COLORS.primary}] p-1.5 rounded-lg`}><i className={`fas fa-hammer text-[${BRAND_COLORS.secondary}]`}></i></div>
                <span className={`text-[${BRAND_COLORS.primary}] font-black text-xl uppercase tracking-tighter`}>ELECTRO FLOR</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} aria-label="Cerrar menú" className="text-gray-400"><X size={28} /></button>
            </div>

            <div className={`flex flex-col gap-6 font-black uppercase text-[11px] tracking-widest text-[${BRAND_COLORS.primary}]`}>
              <div className="space-y-4">
                <p className={`text-[9px] font-black text-[${BRAND_COLORS.secondary}] border-b border-gray-50 pb-1`}>PRODUCTOS</p>
                {categories.filter((cat: any) => cat.featured !== false).map((cat: any) => (
                  <Link
                    key={cat.slug}
                    href={`/productos/${cat.slug}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 hover:text-[${BRAND_COLORS.secondary}]`}
                  >
                    <CategoryIcon name={cat.icon} size={16} color={BRAND_COLORS.secondary} /> {cat.name}
                  </Link>
                ))}
              </div>
              <div className="h-px bg-gray-100 my-2"></div>
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
              <Link href="/productos" onClick={() => setIsMenuOpen(false)}>Catálogo completo</Link>
              <Link href="/marcas" onClick={() => setIsMenuOpen(false)}>Marcas</Link>
              <Link href="/nosotros" onClick={() => setIsMenuOpen(false)}>Nosotros</Link>
              <Link href="/contacto" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
              <Link href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              <Link href="/calculadora-conductores-electricos" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-left">
                <Calculator size={18} className={`text-[${BRAND_COLORS.secondary}]`} /> Calculadora Técnica
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
