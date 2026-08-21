"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { optimizeImage } from '../utils/optimizeImage';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { PRODUCTS, CATEGORIES, BRANDS } from '../constants';
import { Search, Filter, ChevronRight, X, Check, SlidersHorizontal, Award } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { BRAND_COLORS } from '../config';
import { getProducts, getCategories, getBrands } from '../services/sanity';


interface Props {
  initialProducts?: any[];
  initialCategories?: any[];
  initialBrands?: any[];
}

const ProductsPage: React.FC<Props> = ({
  initialProducts,
  initialCategories,
  initialBrands
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { categorySlug, subcategorySlug, brandSlug } = useParams<{ categorySlug?: string; subcategorySlug?: string; brandSlug?: string }>();

  const searchUrl = searchParams.get('search') || '';
  const categoryUrl = searchParams.get('category') || '';
  const brandUrl = searchParams.get('brand') || '';

  const [sortBy, setSortBy] = useState('A a la Z');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const productsTopRef = useRef<HTMLDivElement>(null);

  // Estados para datos de Sanity
  const [sanityProducts, setSanityProducts] = useState<any[]>(initialProducts || []);
  const [sanityCategories, setSanityCategories] = useState<any[]>(initialCategories || []);
  const [sanityBrands, setSanityBrands] = useState<any[]>(initialBrands || []);
  const [loading, setLoading] = useState(
    (!initialProducts || initialProducts.length === 0) &&
    (!initialCategories || initialCategories.length === 0) &&
    (!initialBrands || initialBrands.length === 0)
  );

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(brandUrl ? [brandUrl] : []);

  useEffect(() => {
    const loadData = async () => {
      const fetchProducts = !initialProducts || initialProducts.length === 0;
      const fetchCategories = !initialCategories || initialCategories.length === 0;
      const fetchBrands = !initialBrands || initialBrands.length === 0;

      if (!fetchProducts && !fetchCategories && !fetchBrands) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const [products, categories, brands] = await Promise.all([
        fetchProducts ? getProducts() : Promise.resolve(initialProducts),
        fetchCategories ? getCategories() : Promise.resolve(initialCategories),
        fetchBrands ? getBrands() : Promise.resolve(initialBrands)
      ]);

      if (products && products.length > 0) setSanityProducts(products);
      if (categories && categories.length > 0) setSanityCategories(categories);
      if (brands && brands.length > 0) setSanityBrands(brands);

      setLoading(false);
    };
    loadData();
  }, [initialProducts, initialCategories, initialBrands]);

  // Usar datos de Sanity si existen, sino usar hardcodeados
  const products = sanityProducts.length > 0 ? sanityProducts : PRODUCTS;
  const categories = sanityCategories.length > 0 ? sanityCategories : CATEGORIES;
  const brands = sanityBrands.length > 0 ? sanityBrands : BRANDS;

  // Sincronizar activeCategory y activeBrand basado en URL (slug o params)
  useEffect(() => {
    if (subcategorySlug) {
      const subCat = categories.find((c: any) => c.slug === subcategorySlug);
      if (subCat) {
        setActiveCategory(subCat.name);
        setActiveBrand(null);
        setSelectedBrands([]);
      }
    } else if (categorySlug) {
      const cat = categories.find((c: any) => c.slug === categorySlug);
      if (cat) {
        setActiveCategory(cat.name);
        setActiveBrand(null);
        setSelectedBrands([]);
      }
    } else if (brandSlug) {
      const brand = brands.find((b: any) => b.slug === brandSlug);
      if (brand) {
        setActiveBrand(brand.name);
        setSelectedBrands([brand.name]);
        setActiveCategory(null);
      }
    } else if (categoryUrl) {
      setActiveCategory(categoryUrl);
      setActiveBrand(null);
    } else if (brandUrl) {
      setSelectedBrands([brandUrl]);
      setActiveBrand(brandUrl);
      setActiveCategory(null);
    } else {
      setActiveCategory(null);
      setActiveBrand(null);
      setSelectedBrands([]);
    }
  }, [categorySlug, subcategorySlug, brandSlug, categoryUrl, brandUrl, categories, brands]);

  // Obtener nombres de subcategorías de una categoría padre
  const getSubcategoryNames = (parentCategoryName: string): string[] => {
    const parentCat = categories.find((c: any) => c.name === parentCategoryName);
    if (!parentCat) return [];

    const subcategories = categories.filter((c: any) => c.parentCategory === parentCat.slug);
    return subcategories.map((c: any) => c.name);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p: any) => {
      const productCategory = p.category?.name || p.category || '';
      const productBrand = p.brand?.name || p.brand || '';

      let categoryMatch = !activeCategory;
      if (activeCategory) {
        if (productCategory === activeCategory) {
          categoryMatch = true;
        } else {
          const subcategoryNames = getSubcategoryNames(activeCategory);
          categoryMatch = subcategoryNames.includes(productCategory);
        }
      }

      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(productBrand);
      const searchMatch = !searchUrl ||
        p.name?.toLowerCase().includes(searchUrl.toLowerCase()) ||
        productBrand.toLowerCase().includes(searchUrl.toLowerCase());

      return categoryMatch && brandMatch && searchMatch;
    });
  }, [products, activeCategory, selectedBrands, searchUrl, categories]);

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
    router.push(window.location.pathname);
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
          {/* Categorías principales (sin parentCategory) */}
          {categories.filter((cat: any) => !cat.parentCategory).map((parentCat: any) => {
            // Orden personalizado de subcategorías por categoría padre
            const subcategoryOrder: Record<string, string[]> = {
              'Iluminación': [
                'Reflectores',
                'Highbay',
                'Alumbrado Público Led',
                'Alumbrado Público Solar',
                'Reflectores Solares',
                'Luces de Emergencia',
                'Paneles y Downlights',
                'Focos'
              ]
            };

            const subcats = categories.filter((sub: any) => sub.parentCategory === parentCat.slug);

            // Ordenar subcategorías: si hay orden personalizado, usarlo; sino por order/nombre
            const customOrder = subcategoryOrder[parentCat.name];
            if (customOrder) {
              subcats.sort((a: any, b: any) => {
                const indexA = customOrder.findIndex(name => a.name.toLowerCase() === name.toLowerCase());
                const indexB = customOrder.findIndex(name => b.name.toLowerCase() === name.toLowerCase());
                const posA = indexA === -1 ? 999 : indexA;
                const posB = indexB === -1 ? 999 : indexB;
                return posA - posB;
              });
            }

            return (
              <div key={parentCat.slug}>
                <Link
                  href={activeCategory === parentCat.name ? "/productos" : `/productos/${parentCat.slug}`}
                  className={`w-full text-left px-4 py-3 rounded-xl text-[11px] font-black uppercase transition-all flex justify-between items-center border ${activeCategory === parentCat.name ? `bg-[${BRAND_COLORS.secondary}] text-[${BRAND_COLORS.primary}] border-[${BRAND_COLORS.secondary}]` : 'text-gray-500 bg-gray-50 border-transparent hover:border-gray-200'}`}
                >
                  {parentCat.name}
                  {activeCategory === parentCat.name && <Check size={14} />}
                </Link>
                {/* Subcategorías */}
                {subcats.map((subCat: any) => (
                  <Link
                    key={subCat.slug}
                    href={activeCategory === subCat.name ? `/productos/${parentCat.slug}` : `/productos/${parentCat.slug}/${subCat.slug}`}
                    className={`w-full text-left pl-8 pr-4 py-2.5 rounded-xl text-[10px] font-bold uppercase transition-all flex justify-between items-center border mt-1 ${activeCategory === subCat.name ? `bg-[${BRAND_COLORS.primary}] text-white border-[${BRAND_COLORS.primary}]` : 'text-gray-400 bg-white border-gray-100 hover:border-gray-200'}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-gray-300">└</span> {subCat.name}
                    </span>
                    {activeCategory === subCat.name && <Check size={12} />}
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className={`text-[${BRAND_COLORS.primary}] font-black text-xs uppercase tracking-widest flex items-center gap-2`}>
          <div className={`w-4 h-1 bg-[${BRAND_COLORS.secondary}] rounded-full`}></div> Marcas
        </h3>
        <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
          {brands.map((brand: any) => (
            <Link
              key={brand.name}
              href={activeBrand === brand.name ? "/productos" : `/productos/marca/${brand.slug}`}
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${selectedBrands.includes(brand.name) ? `bg-[${BRAND_COLORS.primaryOpacity[5]}] border-[${BRAND_COLORS.primary}]` : 'bg-white border-gray-100 hover:border-gray-200'}`}
            >
              <span className={`text-[10px] font-black uppercase ${selectedBrands.includes(brand.name) ? `text-[${BRAND_COLORS.primary}]` : 'text-gray-400'}`}>
                {brand.name}
              </span>
              <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedBrands.includes(brand.name) ? `bg-[${BRAND_COLORS.primary}] border-[${BRAND_COLORS.primary}]` : 'border-gray-300'}`}>
                {selectedBrands.includes(brand.name) && <Check size={10} className="text-white" />}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  const activeCategoryData = useMemo(() => {
    if (!activeCategory) return null;
    return categories.find((c: any) => c.name === activeCategory);
  }, [activeCategory, categories]);

  const activeBrandData = useMemo(() => {
    if (!activeBrand) return null;
    return brands.find((b: any) => b.name === activeBrand);
  }, [activeBrand, brands]);

  const parentCategoryData = useMemo(() => {
    if (!activeCategoryData || !activeCategoryData.parentCategory) return null;
    return categories.find((c: any) => c.slug === activeCategoryData.parentCategory);
  }, [activeCategoryData, categories]);

  const seoTitle = useMemo(() => {
    if (activeBrandData?.seoTitle) return activeBrandData.seoTitle;
    if (activeBrandData) {
      return `${activeBrand && activeBrand.toUpperCase()} - Distribuidor Oficial | Electro Flor`;
    }
    if (activeCategoryData?.seoTitle) return activeCategoryData.seoTitle;
    if (subcategorySlug && activeCategoryData) {
      return `${activeCategoryData.name} - ${parentCategoryData?.name || 'Catálogo'} | Electro Flor`;
    }
    if (categorySlug && activeCategoryData) {
      return `${activeCategoryData.name} - Especialistas en Material Eléctrico | Electro Flor`;
    }
    if (searchUrl) return `Resultados para "${searchUrl}" | Electro Flor`;
    return "Catálogo de Productos - Material Eléctrico e Iluminación | Electro Flor";
  }, [activeCategoryData, parentCategoryData, activeBrandData, activeBrand, categorySlug, subcategorySlug, searchUrl]);

  const seoDescription = useMemo(() => {
    if (activeBrandData?.seoDescription) return activeBrandData.seoDescription;
    if (activeBrandData?.description) return activeBrandData.description;
    if (activeCategoryData?.seoDescription) return activeCategoryData.seoDescription;
    if (activeCategoryData?.description) return activeCategoryData.description;
    return "Catálogo completo de material eléctrico: iluminación LED, conductores y herramientas. Stock garantizado en Lima, Perú con entrega inmediata.";
  }, [activeCategoryData, activeBrandData]);

  const seoKeywords = useMemo(() => {
    const baseKeywords = "material eléctrico, ferretería, iluminación led, lima perú, electro flor";
    if (activeBrandData) {
      return `${activeBrandData.name.toLowerCase()}, ${activeBrandData.name.toLowerCase()} perú, productos ${activeBrandData.name.toLowerCase()}, ${baseKeywords}`;
    }
    if (activeCategoryData) {
      return `${activeCategoryData.name.toLowerCase()}, comprar ${activeCategoryData.name.toLowerCase()}, ${activeCategoryData.name.toLowerCase()} industrial, ${baseKeywords}`;
    }
    return baseKeywords;
  }, [activeCategoryData, activeBrandData]);

  const currentUrl = useMemo(() => {
    if (brandSlug) return `/productos/marca/${brandSlug}`;
    if (subcategorySlug && categorySlug) return `/productos/${categorySlug}/${subcategorySlug}`;
    if (categorySlug) return `/productos/${categorySlug}`;
    return "/productos";
  }, [categorySlug, subcategorySlug, brandSlug]);

  const pageTitle = useMemo(() => {
    if (activeBrandData) return activeBrandData.name;
    if (activeCategoryData) return activeCategoryData.name;
    return 'EXPLORA NUESTROS';
  }, [activeBrandData, activeCategoryData]);

  const pageTitleHighlight = useMemo(() => {
    if (activeBrandData || activeCategoryData) return '';
    return 'PRODUCTOS';
  }, [activeBrandData, activeCategoryData]);

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
            <Link href="/" className="hover:underline">Inicio</Link>
            <ChevronRight size={12} />
            <Link href="/productos" className="hover:underline">Catálogo</Link>
            {activeBrandData && (
              <>
                <ChevronRight size={12} />
                <span className="opacity-60">MARCA: {activeBrandData.name}</span>
              </>
            )}
            {parentCategoryData && (
              <>
                <ChevronRight size={12} />
                <Link href={`/productos/${parentCategoryData.slug}`} className="hover:underline">{parentCategoryData.name}</Link>
              </>
            )}
            {!activeBrandData && activeCategoryData && (
              <>
                <ChevronRight size={12} />
                <span className="opacity-60">{activeCategoryData.name}</span>
              </>
            )}
          </div>
          <h1 className={`text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4`}>
            {pageTitle} <span className={`text-[${BRAND_COLORS.secondary}]`}>{pageTitleHighlight}</span>
          </h1>
          {seoDescription && (
            <p className="text-white/70 text-sm max-w-2xl font-medium leading-relaxed">
              {seoDescription}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col lg:flex-row gap-8" ref={productsTopRef}>
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 sticky top-40 max-h-[calc(100vh-11rem)] overflow-y-auto custom-scrollbar">
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

      {/* Category SEO Content & Buyer's Guide */}
      {activeCategoryData && activeCategoryData.description && (
        <section className="max-w-7xl mx-auto px-4 mt-16">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 space-y-8">
            <div>
              <span className={`text-[${BRAND_COLORS.secondary}] font-black uppercase text-[10px] md:text-xs tracking-widest mb-2 block`}>
                GUÍA TÉCNICA Y ESPECIFICACIONES
              </span>
              <h2 className={`text-2xl md:text-4xl font-black text-[${BRAND_COLORS.primary}] uppercase tracking-tighter mb-4`}>
                Todo sobre {activeCategoryData.name} en Perú
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed font-normal">
                {activeCategoryData.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
              <div className="flex items-start gap-4">
                <div className={`bg-[${BRAND_COLORS.primary}] text-[${BRAND_COLORS.secondary}] p-3 rounded-2xl flex-shrink-0 font-black text-lg`}>
                  ✓
                </div>
                <div>
                  <h3 className={`text-[${BRAND_COLORS.primary}] font-black text-sm uppercase`}>Stock Inmediato</h3>
                  <p className="text-gray-500 text-xs mt-1">Disponibilidad asegurada en tienda física en C.C. Nicolini, Cercado de Lima.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className={`bg-[${BRAND_COLORS.primary}] text-[${BRAND_COLORS.secondary}] p-3 rounded-2xl flex-shrink-0 font-black text-lg`}>
                  ✓
                </div>
                <div>
                  <h3 className={`text-[${BRAND_COLORS.primary}] font-black text-sm uppercase`}>Precios por Mayor</h3>
                  <p className="text-gray-500 text-xs mt-1">Cotizaciones directas para contratistas, técnicos electricistas y empresas.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className={`bg-[${BRAND_COLORS.primary}] text-[${BRAND_COLORS.secondary}] p-3 rounded-2xl flex-shrink-0 font-black text-lg`}>
                  ✓
                </div>
                <div>
                  <h3 className={`text-[${BRAND_COLORS.primary}] font-black text-sm uppercase`}>Envíos a Todo el Perú</h3>
                  <p className="text-gray-500 text-xs mt-1">Despachos diarios a agencias de transporte terrestre a nivel nacional.</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <h3 className={`text-[${BRAND_COLORS.primary}] font-black text-base uppercase tracking-tight mb-4`}>
                Preguntas Frecuentes sobre {activeCategoryData.name}
              </h3>
              <div className="space-y-3">
                <details className="group bg-gray-50 p-4 rounded-2xl cursor-pointer">
                  <summary className={`font-bold text-xs md:text-sm text-[${BRAND_COLORS.primary}] list-none flex justify-between items-center`}>
                    ¿Cómo solicitar una cotización formal de {activeCategoryData.name}?
                    <span className={`text-[${BRAND_COLORS.secondary}] font-black text-lg group-open:rotate-45 transition-transform`}>+</span>
                  </summary>
                  <p className="text-gray-600 text-xs mt-3 leading-relaxed">
                    Puedes hacer clic en el botón de WhatsApp o llamarnos directamente al 948 198 701. Nuestro equipo técnico comercial te enviará una cotización detallada con ficha técnica y disponibilidad en minutos.
                  </p>
                </details>
                <details className="group bg-gray-50 p-4 rounded-2xl cursor-pointer">
                  <summary className={`font-bold text-xs md:text-sm text-[${BRAND_COLORS.primary}] list-none flex justify-between items-center`}>
                    ¿Emiten Factura Electrónica y Guía de Remisión?
                    <span className={`text-[${BRAND_COLORS.secondary}] font-black text-lg group-open:rotate-45 transition-transform`}>+</span>
                  </summary>
                  <p className="text-gray-600 text-xs mt-3 leading-relaxed">
                    Sí, emitimos Factura Electrónica (con RUC) y Boleta de Venta oficial según las normativas de SUNAT. Todos nuestros productos cuentan con garantía de fábrica y certificación técnica.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>
      )}

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
            <Link
              key={brand.name}
              href={`/productos/marca/${brand.slug}`}
              className={`bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[${BRAND_COLORS.secondary}] transition-all flex items-center justify-center group h-32`}
              onClick={() => {
                productsTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <Image
                src={optimizeImage(brand.logo, 300)}
                alt={brand.name}
                width={120}
                height={48}
                className="max-h-12 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </Link>
          ))}
        </div>
      </section>

      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFilterDrawerOpen(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className={`bg-[${BRAND_COLORS.primary}] p-6 text-white flex justify-between items-center`}>
              <h2 className="font-black uppercase text-sm">Filtros</h2>
              <button onClick={() => setIsFilterDrawerOpen(false)} aria-label="Cerrar filtros" className="bg-white/10 p-2 rounded-full"><X size={20} /></button>
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
