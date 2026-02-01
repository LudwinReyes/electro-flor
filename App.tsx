
import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, Link, useNavigate, useSearchParams } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import FichaTecnicaPage from './components/FichaTecnicaPage';
import ProductsPage from './components/ProductsPage';
import BrandsPage from './components/BrandsPage';
import AboutUsPage from './components/AboutUsPage';
import ContactPage from './components/ContactPage';
import FaqPage from './components/FaqPage';
import ProjectsGallery from './components/ProjectsGallery';
import DeliveryBanner from './components/DeliveryBanner';
import QuoteCart from './components/QuoteCart';
import CableCalculator from './components/CableCalculator';
import PriceListModal from './components/PriceListModal';
import ShipmentUrgencyBar from './components/ShipmentUrgencyBar';
import ScrollToTop from './components/ScrollToTop';
import ProductCarousel from './components/ProductCarousel';
import { CATEGORIES as MOCK_CATEGORIES, PRODUCTS as MOCK_PRODUCTS, BRANDS } from './constants';
import { Product, Category } from './types';
import { getProducts, getCategories, getPromoBanners } from './services/sanity';
import { CONTACT_INFO, SITE_MESSAGES } from './config';
import { Zap, Trophy, ShieldCheck, Clock, Building2, MessageSquare } from 'lucide-react';
import { SiteConfigProvider } from './contexts/SiteConfigContext';

interface PromoBanner {
  _id: string;
  badge?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  image?: string;
  buttonText?: string;
  buttonUrl?: string;
}

const HomePage: React.FC<{
  onAddToQuote: (p: Product) => void,
  products: Product[],
  categories: Category[],
  promoBanner: PromoBanner | null
}> = ({ onAddToQuote, products, categories, promoBanner }) => {
  return (
    <>
      <Hero />

      <section className="max-w-7xl mx-auto px-4 -mt-10 md:-mt-20 relative z-30">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
          {categories.filter(c => c.featured !== false).map((cat) => (
            <Link to={`/productos?category=${encodeURIComponent(cat.name)}`} key={cat.slug} className="bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] shadow-lg text-center flex flex-col items-center group transition-all hover:-translate-y-1 border-b-4 border-transparent hover:border-[#8CC63F]">
              <div className="bg-[#002D62] w-14 h-14 md:w-24 md:h-24 rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 md:mb-6 shadow-xl transition-transform group-hover:scale-105">
                <i className={`fas ${cat.icon} text-xl md:text-4xl text-[#8CC63F]`}></i>
              </div>
              <h3 className="text-[9px] md:text-[12px] font-black uppercase text-[#002D62] leading-tight tracking-tighter h-8 md:h-10 flex items-center justify-center">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-12 gap-4">
          <div>
            <span className="text-[#8CC63F] font-black uppercase text-[10px] md:text-xs tracking-widest mb-2 block flex items-center gap-2">
              <Trophy size={14} /> TOP VENTAS SEMANAL
            </span>
            <h2 className="text-2xl md:text-5xl font-black text-[#002D62] uppercase tracking-tighter leading-none">LO MÁS <span className="text-[#8CC63F]">PEDIDO</span></h2>
          </div>
          <Link to="/productos" className="text-[#002D62] font-black text-xs uppercase border-b-2 border-[#8CC63F] pb-1 hover:text-[#8CC63F] transition-colors">
            Ver todo el catálogo
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-8">
          {products.slice(0, 5).map(product => (
            <ProductCard key={product._id || product.slug || product.id} product={product} onAddToQuote={onAddToQuote} />
          ))}
        </div>
      </section>

      {promoBanner && (
        <section className="max-w-7xl mx-auto px-4 mb-20">
          <div className="bg-gradient-to-r from-[#002D62] to-[#00408B] rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border-b-8 border-[#8CC63F]">
            <div className="relative z-10 text-center md:text-left">
              {promoBanner.badge && (
                <div className="flex items-center justify-center md:justify-start gap-2 text-[#8CC63F] font-black text-xs uppercase tracking-widest mb-4">
                  <Clock size={18} className="animate-pulse" /> {promoBanner.badge}
                </div>
              )}
              <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                {promoBanner.title} <span className="text-[#8CC63F]">{promoBanner.titleHighlight}</span>
              </h2>
              {promoBanner.description && (
                <p className="text-gray-300 font-medium text-sm md:text-lg mb-8 max-w-md">
                  {promoBanner.description}
                </p>
              )}
              {promoBanner.buttonText && promoBanner.buttonUrl && (
                <Link
                  to={promoBanner.buttonUrl}
                  className="bg-[#8CC63F] text-[#002D62] px-8 py-4 rounded-xl font-black uppercase text-xs hover:scale-105 transition shadow-lg inline-block"
                >
                  {promoBanner.buttonText}
                </Link>
              )}
            </div>
            {promoBanner.image && (
              <div className="relative z-10 group">
                <img
                  src={promoBanner.image}
                  className="h-48 md:h-80 object-contain drop-shadow-2xl rounded-3xl rotate-3 group-hover:rotate-0 transition-transform duration-500"
                  alt={promoBanner.title || 'Promoción'}
                />
              </div>
            )}
          </div>
        </section>
      )}

      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-12 gap-4">
            <div>
              <span className="text-[#002D62] font-black uppercase text-[10px] md:text-xs tracking-widest mb-2 block flex items-center gap-2">
                <Zap size={14} className="text-[#8CC63F]" /> ÚLTIMO INGRESO
              </span>
              <h2 className="text-2xl md:text-5xl font-black text-[#002D62] uppercase tracking-tighter leading-none">NUEVA <span className="text-[#8CC63F]">MERCADERÍA</span></h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-8">
            {(products.filter(p => p.displaySections?.includes('ultimo_ingreso')).length > 0
              ? products.filter(p => p.displaySections?.includes('ultimo_ingreso'))
              : products
            ).slice(0, 5).map(product => (
              <ProductCard key={product._id || product.slug || product.id} product={product} onAddToQuote={onAddToQuote} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 md:mt-16">
        <DeliveryBanner />
      </section>

      <ProductCarousel
        products={products.slice(0, 7)}
        title="RECOMENDACIONES PRO"
        subtitle="SOLUCIONES DESTACADAS"
        onAddToQuote={onAddToQuote}
      />

      <ProjectsGallery />

      <section className="bg-[#002D62] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center p-6 bg-white/5 rounded-[2rem] border border-white/10">
            <div className="bg-[#8CC63F] p-5 rounded-full mb-6">
              <ShieldCheck size={32} className="text-[#002D62]" />
            </div>
            <h3 className="text-white font-black text-xl uppercase mb-3">Garantía Total</h3>
            <p className="text-gray-400 text-sm">Respaldo oficial de fábrica y certificación técnica.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white/5 rounded-[2rem] border border-white/10">
            <div className="bg-[#8CC63F] p-5 rounded-full mb-6">
              <Trophy size={32} className="text-[#002D62]" />
            </div>
            <h3 className="text-white font-black text-xl uppercase mb-3">Marcas Líderes</h3>
            <p className="text-gray-400 text-sm">Bosch, Schneider, Philips y más.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white/5 rounded-[2rem] border border-white/10">
            <div className="bg-[#8CC63F] p-5 rounded-full mb-6">
              <Building2 size={32} className="text-[#002D62]" />
            </div>
            <h3 className="text-white font-black text-xl uppercase mb-3">Soporte Corporativo</h3>
            <p className="text-gray-400 text-sm">Atención personalizada para constructoras.</p>
          </div>
        </div>
      </section>
    </>
  );
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [promoBanner, setPromoBanner] = useState<PromoBanner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quoteItems, setQuoteItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem('electroflor_quote');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('electroflor_quote', JSON.stringify(quoteItems));
  }, [quoteItems]);

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [isPriceListOpen, setIsPriceListOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [p, c, banners] = await Promise.all([
          getProducts(),
          getCategories(),
          getPromoBanners()
        ]);
        if (p && p.length > 0) setProducts(p);
        if (c && c.length > 0) setCategories(c);
        if (banners && banners.length > 0) setPromoBanner(banners[0]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const addToQuote = (product: Product) => {
    // Asegurar que usamos el ID correcto (Sanity usa _id)
    const productId = product._id || product.id;

    setQuoteItems(prev => {
      // Verificar si ya existe usando el ID correcto
      if (prev.find(item => (item._id || item.id) === productId)) return prev;
      return [...prev, product];
    });
    setIsQuoteOpen(true);
  };

  const removeFromQuote = (id: string) => {
    setQuoteItems(prev => prev.filter(item => (item._id || item.id) !== id));
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/productos?search=${encodeURIComponent(query)}`);
    }
  };

  // Verificar si estamos en la página de ficha técnica (sin layout)
  const isFichaTecnicaPage = location.pathname.startsWith('/ficha-tecnica/');

  // Si es página de ficha técnica, renderizar solo eso
  if (isFichaTecnicaPage) {
    return (
      <SiteConfigProvider>
        <Routes>
          <Route path="/ficha-tecnica/:slug" element={<FichaTecnicaPage />} />
        </Routes>
      </SiteConfigProvider>
    );
  }

  // Para todas las demás páginas, renderizar con layout
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <img
            src="/media/Logo Electro Flor.png"
            alt="ELECTRO FLOR"
            className="h-20 mx-auto mb-8 animate-pulse"
          />
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-[#002D62] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-[#8CC63F] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-[#002D62] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SiteConfigProvider>
      <div className="min-h-screen bg-white font-sans text-gray-900">
        <ScrollToTop />
        <ShipmentUrgencyBar />
        <Header
          quoteCount={quoteItems.length}
          onOpenQuote={() => setIsQuoteOpen(true)}
          onOpenCalc={() => setIsCalcOpen(true)}
          onOpenPriceList={() => setIsPriceListOpen(true)}
          onSearch={handleSearch}
          products={products}
        />

        <main>
          <Routes>
            <Route path="/" element={
              <HomePage
                onAddToQuote={addToQuote}
                products={products}
                categories={categories}
                promoBanner={promoBanner}
              />
            } />
            <Route path="/productos" element={<ProductsPage onAddToQuote={addToQuote} />} />
            <Route path="/marcas" element={<BrandsPage />} />
            <Route path="/producto/:id" element={<ProductDetail onAddToQuote={addToQuote} />} />
            <Route path="/nosotros" element={<AboutUsPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
          </Routes>
        </main>

        <Footer />

        {/* Floating WhatsApp Button */}
        <a
          href={`https://wa.me/51948198701?text=${encodeURIComponent(SITE_MESSAGES.whatsapp.defaultGreeting)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all group border-4 border-white animate-bounce"
          aria-label="Contactar por WhatsApp"
        >
          <i className="fab fa-whatsapp text-3xl"></i>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-[#002D62] text-[10px] font-black px-4 py-2 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none border border-gray-100 uppercase tracking-widest">
            ¿Tienes dudas? ¡Escríbenos! 🛠️
          </span>
        </a>

        <QuoteCart
          isOpen={isQuoteOpen}
          onClose={() => setIsQuoteOpen(false)}
          items={quoteItems}
          onRemove={removeFromQuote}
          onClear={() => setQuoteItems([])}
        />

        <CableCalculator
          isOpen={isCalcOpen}
          onClose={() => setIsCalcOpen(false)}
        />

        <PriceListModal
          isOpen={isPriceListOpen}
          onClose={() => setIsPriceListOpen(false)}
        />
      </div>
    </SiteConfigProvider>
  );
};

export default App;
