
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, Phone, MapPin, Calculator, FileText, LayoutList, X, ArrowUpRight, ChevronDown, LayoutGrid } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { Product } from '../types';
import { BRAND_COLORS, CONTACT_INFO } from '../config';
import { useSiteConfig } from '../contexts/SiteConfigContext';

interface Props {
  quoteCount: number;
  onOpenQuote: () => void;
  onOpenCalc: () => void;
  onOpenPriceList: () => void;
  onSearch?: (query: string) => void;
  products?: Product[];
}

const Header: React.FC<Props> = ({ quoteCount, onOpenQuote, onOpenCalc, onOpenPriceList, onSearch, products = [] }) => {
  const { siteSettings, headerSettings, colors, contact } = useSiteConfig();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product: Product) => {
    setSearchQuery('');
    setShowSuggestions(false);
    navigate(`/producto/${product.id}`);
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
            <button onClick={onOpenCalc} className="flex items-center gap-1.5 hover:text-white transition group" style={{ color: colors.secondary }}>
              <Calculator size={14} /> Calculadora
            </button>
            <button onClick={onOpenPriceList} className="flex items-center gap-1.5 text-white bg-white/10 px-3 py-1 rounded-lg transition group hover:text-white" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.secondary; e.currentTarget.style.color = colors.primary; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }}>
              <LayoutList size={14} style={{ color: colors.secondary }} /> Lista Pro
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-2 md:gap-4">
        <button className="lg:hidden p-2" style={{ color: colors.primary }} onClick={() => setIsMenuOpen(true)}>
          <Menu size={28} />
        </button>

        <Link to="/" className="flex-shrink-0 flex items-center gap-1 md:gap-2">
          {/* Logo: usa siteSettings.logo si existe, sino muestra icono de fallback */}
          {siteSettings.logo ? (
            <img
              src={siteSettings.logo}
              alt={siteSettings.siteName || 'ELECTRO FLOR'}
              className="h-10 md:h-14 w-auto object-contain"
            />
          ) : (
            <>
              <div className="p-1.5 md:p-2 rounded-lg" style={{ backgroundColor: colors.primary }}>
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
              className={`hidden md:flex items-center gap-2 bg-gray-100 hover:bg-[${BRAND_COLORS.secondary}] hover:text-[${BRAND_COLORS.primary}] text-[${BRAND_COLORS.primary}] px-4 py-2.5 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest shrink-0`}
            >
              <LayoutGrid size={18} /> Categorías <ChevronDown size={14} className={`transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Desktop Category Menu */}
            {isCategoryMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-6 mb-2 border-b border-gray-50 pb-2">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Nuestras Líneas</p>
                </div>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/productos?category=${encodeURIComponent(cat.name)}`}
                    onClick={() => setIsCategoryMenuOpen(false)}
                    className={`flex items-center justify-between px-6 py-3 hover:bg-[${BRAND_COLORS.secondaryOpacity[10]}] text-[${BRAND_COLORS.primary}] transition-colors group`}
                  >
                    <div className="flex items-center gap-3">
                      <i className={`fas ${cat.icon} text-[${BRAND_COLORS.secondary}] group-hover:scale-110 transition-transform w-5 text-center`}></i>
                      <span className="text-[11px] font-black uppercase tracking-tight">{cat.name}</span>
                    </div>
                    <ArrowUpRight size={14} className={`text-gray-200 group-hover:text-[${BRAND_COLORS.secondary}] transition-colors`} />
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
                onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                className={`w-full border-2 border-gray-100 rounded-full py-2.5 px-6 focus:outline-none focus:border-[${BRAND_COLORS.secondary}] bg-gray-50 text-xs font-medium transition-all`}
              />
              <button type="submit" className={`absolute right-1.5 top-1/2 -translate-y-1/2 bg-[${BRAND_COLORS.primary}] text-white p-2 rounded-full hover:bg-blue-900 transition-colors`}>
                <Search size={16} className={`text-[${BRAND_COLORS.secondary}]`} />
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
                      key={p.id}
                      onClick={() => handleSuggestionClick(p)}
                      className={`w-full flex items-center gap-4 px-4 py-3 hover:bg-[${BRAND_COLORS.secondaryOpacity[10]}] text-left transition-colors group`}
                    >
                      <div className="w-10 h-10 bg-white rounded-lg p-1 border border-gray-100 shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
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
            className={`relative p-2 md:p-2.5 bg-gray-50 text-[${BRAND_COLORS.primary}] rounded-xl hover:bg-[${BRAND_COLORS.secondary}] transition-all`}
          >
            <FileText size={22} />
            {quoteCount > 0 && (
              <span className={`absolute -top-1.5 -right-1.5 bg-[${BRAND_COLORS.primary}] text-[${BRAND_COLORS.secondary}] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white`}>
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
        <div className={`flex py-3 gap-8 text-[11px] font-black text-[${BRAND_COLORS.primary}] uppercase tracking-widest`}>
          <Link to="/" className={`hover:text-[${BRAND_COLORS.secondary}] border-b-2 border-transparent hover:border-[${BRAND_COLORS.secondary}]`}>Inicio</Link>
          <Link to="/productos" className={`hover:text-[${BRAND_COLORS.secondary}] border-b-2 border-transparent hover:border-[${BRAND_COLORS.secondary}]`}>Productos</Link>
          <Link to="/marcas" className={`hover:text-[${BRAND_COLORS.secondary}] border-b-2 border-transparent hover:border-[${BRAND_COLORS.secondary}]`}>Marcas</Link>
          <Link to="/nosotros" className={`hover:text-[${BRAND_COLORS.secondary}] border-b-2 border-transparent hover:border-[${BRAND_COLORS.secondary}]`}>Nosotros</Link>
          <Link to="/contacto" className={`hover:text-[${BRAND_COLORS.secondary}] border-b-2 border-transparent hover:border-[${BRAND_COLORS.secondary}]`}>Contacto</Link>
          <Link to="/faq" className={`hover:text-[${BRAND_COLORS.secondary}] border-b-2 border-transparent hover:border-[${BRAND_COLORS.secondary}]`}>Preguntas</Link>
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
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-400"><X size={28} /></button>
            </div>

            <div className={`flex flex-col gap-6 font-black uppercase text-[11px] tracking-widest text-[${BRAND_COLORS.primary}]`}>
              <div className="space-y-4">
                <p className={`text-[9px] font-black text-[${BRAND_COLORS.secondary}] border-b border-gray-50 pb-1`}>PRODUCTOS</p>
                {CATEGORIES.map(cat => (
                  <Link
                    key={cat.slug}
                    to={`/productos?category=${encodeURIComponent(cat.name)}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 hover:text-[${BRAND_COLORS.secondary}]`}
                  >
                    <i className={`fas ${cat.icon} text-[${BRAND_COLORS.secondary}] w-4`}></i> {cat.name}
                  </Link>
                ))}
              </div>
              <div className="h-px bg-gray-100 my-2"></div>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
              <Link to="/productos" onClick={() => setIsMenuOpen(false)}>Catálogo completo</Link>
              <Link to="/marcas" onClick={() => setIsMenuOpen(false)}>Marcas</Link>
              <Link to="/nosotros" onClick={() => setIsMenuOpen(false)}>Nosotros</Link>
              <Link to="/contacto" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
              <button onClick={() => { onOpenCalc(); setIsMenuOpen(false); }} className="flex items-center gap-3 text-left">
                <Calculator size={18} className={`text-[${BRAND_COLORS.secondary}]`} /> Calculadora Técnica
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
