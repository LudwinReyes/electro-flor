
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ShipmentUrgencyBar from './components/ShipmentUrgencyBar';
import { Product, Category } from './types';
import { getProducts, getCategories, getPromoBanners } from './services/sanity';
import { SITE_MESSAGES } from './config';
import { SiteConfigProvider } from './contexts/SiteConfigContext';
import { PromoBanner } from './components/Home'; // Importar interfaz
import Home from './components/Home';

// Lazy-loaded routes and components for code-splitting
// Home is statically imported to ensure immediate LCP
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const FichaTecnicaPage = lazy(() => import('./components/FichaTecnicaPage'));
const ProductsPage = lazy(() => import('./components/ProductsPage'));
const BrandsPage = lazy(() => import('./components/BrandsPage'));
const AboutUsPage = lazy(() => import('./components/AboutUsPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const FaqPage = lazy(() => import('./components/FaqPage'));

// Lazy-loaded Modals
const QuoteCart = lazy(() => import('./components/QuoteCart'));
const CableCalculator = lazy(() => import('./components/CableCalculator'));
const PriceListModal = lazy(() => import('./components/PriceListModal'));

const PageLoader = () => (
  <div className="min-h-[40vh] flex items-center justify-center">
    <div className="flex items-center gap-2">
      <div className="w-2.5 h-2.5 bg-[#002D62] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2.5 h-2.5 bg-[#8CC63F] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2.5 h-2.5 bg-[#002D62] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [promoBanner, setPromoBanner] = useState<PromoBanner | null>(null);
  // isLoading removed to unblock rendering

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
      } catch (error) {
        console.error("Error fetching initial data", error);
      }
    };
    fetchData();
  }, []);

  const addToQuote = (product: Product) => {
    const productId = product._id || product.id;
    setQuoteItems(prev => {
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

  if (isFichaTecnicaPage) {
    return (
      <SiteConfigProvider>
        <Routes>
          <Route path="/ficha-tecnica/:slug" element={
            <Suspense fallback={<PageLoader />}>
              <FichaTecnicaPage />
            </Suspense>
          } />
        </Routes>
      </SiteConfigProvider>
    );
  }


  // Para todas las demás páginas, renderizar con layout inmediatamente
  // El loading global bloqueaba el LCP. Ahora mostramos la UI base y los datos cargan progresivamente.


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
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={
                <Home
                  onAddToQuote={addToQuote}
                  products={products}
                  categories={categories}
                  promoBanner={promoBanner}
                />
              } />
              <Route path="/productos" element={<ProductsPage onAddToQuote={addToQuote} />} />
              <Route path="/productos/:categorySlug" element={<ProductsPage onAddToQuote={addToQuote} />} />
              <Route path="/productos/:categorySlug/:subcategorySlug" element={<ProductsPage onAddToQuote={addToQuote} />} />
              <Route path="/productos/marca/:brandSlug" element={<ProductsPage onAddToQuote={addToQuote} />} />
              <Route path="/marcas" element={<BrandsPage />} />
              <Route path="/producto/:id" element={<ProductDetail onAddToQuote={addToQuote} />} />
              <Route path="/nosotros" element={<AboutUsPage />} />
              <Route path="/contacto" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />

        {/* Floating WhatsApp Button - SVG Inline */}
        <a
          href={`https://wa.me/51948198701?text=${encodeURIComponent(SITE_MESSAGES.whatsapp.defaultGreeting)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all group border-4 border-white animate-bounce"
          aria-label="Contactar por WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-[#002D62] text-[10px] font-black px-4 py-2 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none border border-gray-100 uppercase tracking-widest">
            ¿Tienes dudas? ¡Escríbenos! 🛠️
          </span>
        </a>

        {/* Lazy Loaded Global Modals */}
        <Suspense fallback={null}>
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
        </Suspense>
      </div>
    </SiteConfigProvider>
  );
};

export default App;
