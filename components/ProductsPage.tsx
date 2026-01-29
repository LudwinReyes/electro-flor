
import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES, BRANDS } from '../constants';
import { Search, Filter, ChevronRight, X, Check, SlidersHorizontal, Award } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { BRAND_COLORS } from '../config';
import { getProducts, getCategories, getBrands } from '../services/sanity';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchUrl = searchParams.get('search') || '';
  const categoryUrl = searchParams.get('category') || '';

  const [activeCategory, setActiveCategory] = useState<string | null>(categoryUrl || null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('A a la Z');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const productsTopRef = useRef<HTMLDivElement>(null);

  // Estados para datos de Sanity
  const [sanityProducts, setSanityProducts] = useState<any[]>([]);
  const [sanityCategories, setSanityCategories] = useState<any[]>([]);
  const [sanityBrands, setSanityBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [products, categories, brands] = await Promise.all([
        getProducts(),
        getCategories(),
        getBrands()
      ]);

      if (products && products.length > 0) setSanityProducts(products);
      if (categories && categories.length > 0) setSanityCategories(categories);
      if (brands && brands.length > 0) setSanityBrands(brands);

      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (categoryUrl) setActiveCategory(categoryUrl);
  }, [categoryUrl]);

  // Usar datos de Sanity si existen, sino usar hardcodeados
  const products = sanityProducts.length > 0 ? sanityProducts : PRODUCTS;
  const categories = sanityCategories.length > 0 ? sanityCategories : CATEGORIES;
  const brands = sanityBrands.length > 0 ? sanityBrands : BRANDS;

  const filteredProducts = products.filter((p: any) => {
    const productCategory = p.category?.name || p.category || '';
    const productBrand = p.brand?.name || p.brand || '';

    const categoryMatch = !activeCategory || productCategory === activeCategory;
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(productBrand);
    const searchMatch = !searchUrl ||
      p.name?.toLowerCase().includes(searchUrl.toLowerCase()) ||
      productBrand.toLowerCase().includes(searchUrl.toLowerCase());
    return categoryMatch && brandMatch && searchMatch;
  });

  if (sortBy === 'A a la Z') filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === 'Z a la A') filteredProducts.sort((a, b) => b.name.localeCompare(a.name));

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const selectSingleBrand = (brand: string) => {
    setSelectedBrands([brand]);
    setActiveCategory(null);
    productsTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const clearFilters = () => {
    setActiveCategory(null);
    setSelectedBrands([]);
    setSearchParams({});
  };

  useEffect(() => {
    if (isFilterDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isFilterDrawerOpen]);

  const FilterContent = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className={`text-[${BRAND_COLORS.primary}] font-black text-xs uppercase tracking-widest flex items-center gap-2`}>
          <div className={`w-4 h-1 bg-[${BRAND_COLORS.secondary}] rounded-full`}></div> Categorías
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {categories.map((cat: any) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.name === activeCategory ? null : cat.name)}
              className={`w-full text-left px-4 py-3 rounded-xl text-[11px] font-black uppercase transition-all flex justify-between items-center border ${activeCategory === cat.name ? `bg-[${BRAND_COLORS.secondary}] text-[${BRAND_COLORS.primary}] border-[${BRAND_COLORS.secondary}]` : 'text-gray-500 bg-gray-50 border-transparent hover:border-gray-200'}`}
            >
              {cat.name}
              {activeCategory === cat.name && <Check size={14} />}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className={`text-[${BRAND_COLORS.primary}] font-black text-xs uppercase tracking-widest flex items-center gap-2`}>
          <div className={`w-4 h-1 bg-[${BRAND_COLORS.secondary}] rounded-full`}></div> Marcas
        </h3>
        <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
          {brands.map((brand: any) => (
            <label key={brand.name} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${selectedBrands.includes(brand.name) ? `bg-[${BRAND_COLORS.primaryOpacity[5]}] border-[${BRAND_COLORS.primary}]` : 'bg-white border-gray-100 hover:border-gray-200'}`}>
              <span className={`text-[10px] font-black uppercase ${selectedBrands.includes(brand.name) ? `text-[${BRAND_COLORS.primary}]` : 'text-gray-400'}`}>
                {brand.name}
              </span>
              <input
                type="checkbox"
                className={`w-4 h-4 accent-[${BRAND_COLORS.primary}]`}
                onChange={() => toggleBrand(brand.name)}
                checked={selectedBrands.includes(brand.name)}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`bg-[${BRAND_COLORS.background.alt}] min-h-screen relative pb-10`}>
      <div className={`bg-[${BRAND_COLORS.primary}] py-12 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-6 h-full">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="border-r border-white/20"></div>)}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className={`flex items-center gap-2 text-[${BRAND_COLORS.secondary}] text-[10px] font-black uppercase tracking-widest mb-2`}>
            <Link to="/" className="hover:underline">Inicio</Link>
            <ChevronRight size={12} />
            <span>Catálogo</span>
          </div>
          <h1 className={`text-4xl md:text-5xl font-black text-white uppercase tracking-tighter`}>EXPLORA NUESTRO <span className={`text-[${BRAND_COLORS.secondary}]`}>PRODUCTOS</span></h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col lg:flex-row gap-8" ref={productsTopRef}>
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 sticky top-40">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-50">
              <h2 className={`font-black text-[${BRAND_COLORS.primary}] uppercase text-sm`}>Filtros</h2>
              <button onClick={clearFilters} className="text-[10px] font-bold text-gray-400 hover:text-red-500 uppercase transition-colors">Limpiar</button>
            </div>
            <FilterContent />
          </div>
        </aside>

        <div className="flex-grow space-y-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest hidden sm:inline">Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`bg-gray-50 border-none rounded-xl px-4 py-2 text-[10px] font-black text-[${BRAND_COLORS.primary}] uppercase focus:ring-2 focus:ring-[${BRAND_COLORS.secondary}]`}
              >
                <option>A a la Z</option>
                <option>Z a la A</option>
              </select>
            </div>
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className={`lg:hidden flex items-center gap-2 bg-[${BRAND_COLORS.primary}] text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase active:scale-95 transition-all`}
            >
              <SlidersHorizontal size={14} className={`text-[${BRAND_COLORS.secondary}]`} /> Filtros
            </button>
          </div>

          {loading ? (
            <div className="bg-white rounded-3xl p-20 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002D62] mx-auto mb-4"></div>
              <p className="text-gray-400 font-medium text-sm">Cargando productos...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-8">
              {filteredProducts.map((product: any) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
              <h3 className={`text-[${BRAND_COLORS.primary}] font-black uppercase text-xl mb-2`}>Sin resultados</h3>
              <button onClick={clearFilters} className={`mt-8 text-[${BRAND_COLORS.secondary}] font-black text-xs uppercase border-b-2 border-[${BRAND_COLORS.secondary}] pb-1`}>Reiniciar búsqueda</button>
            </div>
          )}
        </div>
      </div>

      {/* Brand Selector Section */}
      <section className="max-w-7xl mx-auto px-4 mt-20 pt-20 border-t border-gray-100">
        <div className="text-center mb-12">
          <span className={`text-[${BRAND_COLORS.secondary}] font-black uppercase text-xs tracking-widest mb-2 block flex items-center justify-center gap-2`}>
            <Award size={16} /> NUESTRAS ALIANZAS
          </span>
          <h2 className={`text-3xl md:text-5xl font-black text-[${BRAND_COLORS.primary}] uppercase tracking-tighter`}>BUSCAR POR <span className={`text-[${BRAND_COLORS.secondary}]`}>MARCA</span></h2>
          <p className="text-gray-400 font-medium text-sm mt-4">Haz clic en una marca para ver sus productos especializados</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-8">
          {brands.map((brand: any) => (
            <button
              key={brand.name}
              onClick={() => selectSingleBrand(brand.name)}
              className={`bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[${BRAND_COLORS.secondary}] transition-all flex items-center justify-center group h-32`}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-12 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </button>
          ))}
        </div>
      </section>

      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFilterDrawerOpen(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className={`bg-[${BRAND_COLORS.primary}] p-6 text-white flex justify-between items-center`}>
              <h2 className="font-black uppercase text-sm">Filtros</h2>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="bg-white/10 p-2 rounded-full"><X size={20} /></button>
            </div>
            <div className="flex-grow overflow-y-auto p-6"><FilterContent /></div>
            <div className="p-6 border-t border-gray-100"><button onClick={() => setIsFilterDrawerOpen(false)} className={`w-full bg-[${BRAND_COLORS.primary}] text-white py-4 rounded-2xl font-black uppercase text-[10px]`}>Ver Resultados</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
