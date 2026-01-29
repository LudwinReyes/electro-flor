
import { Product, Brand, Category } from './types';

export const BRANDS: Brand[] = [
  { name: 'Stanley', logo: 'https://cdn.worldvectorlogo.com/logos/stanley-1.svg' },
  { name: 'Bosch', logo: 'https://cdn.worldvectorlogo.com/logos/bosch-2.svg' },
  { name: 'Makita', logo: 'https://placehold.jp/24/002D62/8CC63F/200x100.png?text=LOGO' }, 
  { name: 'Tramontina', logo: 'https://cdn.worldvectorlogo.com/logos/tramontina.svg' },
  { name: 'Pavco', logo: 'https://placehold.jp/24/002D62/8CC63F/200x100.png?text=LOGO' },
  { name: 'Sika', logo: 'https://placehold.jp/24/002D62/8CC63F/200x100.png?text=LOGO' },
  { name: 'Finder', logo: 'https://cdn.worldvectorlogo.com/logos/finder.svg' },
  { name: 'Philips', logo: 'https://cdn.worldvectorlogo.com/logos/philips.svg' },
  { name: 'Schneider', logo: 'https://cdn.worldvectorlogo.com/logos/schneider-electric.svg' },
  { name: '3M', logo: 'https://cdn.worldvectorlogo.com/logos/3m-1.svg' },
];

export const CATEGORIES: Category[] = [
  { name: 'Iluminación', icon: 'fa-lightbulb', slug: 'iluminacion', image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=400' },
  { name: 'Luminarias Públicas', icon: 'fa-street-view', slug: 'luminarias-publicas', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=400', parentCategory: 'iluminacion' },
  { name: 'Cables y Conductores', icon: 'fa-microchip', slug: 'cables', image: 'https://images.unsplash.com/photo-1558444479-c848517e77a2?auto=format&fit=crop&q=80&w=400' },
  { name: 'Distribución en Baja Tensión', icon: 'fa-bolt', slug: 'distribucion', image: 'https://images.unsplash.com/photo-1517055729445-fa7d27394b48?auto=format&fit=crop&q=80&w=400' },
  { name: 'Herramientas Eléctricas', icon: 'fa-plug', slug: 'herramientas-elec', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400' },
  { name: 'Gasfitería Técnica', icon: 'fa-faucet', slug: 'gasfiteria', image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=400' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'taladro-percutor-bosch-gsb-13-re',
    name: 'TALADRO PERCUTOR 1/2" 600W BOSCH GSB 13 RE',
    brand: 'BOSCH',
    code: 'BOS-GSB13RE',
    category: 'Herramientas Eléctricas',
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=400',
    description: 'Taladro percutor profesional de alta resistencia para concreto y metal.',
    shortDescription: 'Potente taladro percutor de 600W ideal para trabajos exigentes en concreto, metal y madera. Diseño ergonómico y alta durabilidad.',
    specifications: { 'Potencia': '600W', 'Velocidad': '0-2800 RPM', 'Mandril': '1/2"' },
    isFeatured: true,
    isNew: true
  },
  {
    id: '2',
    slug: 'llave-termica-p-riel-2p-25a-schneider',
    name: 'LLAVE TERMICA P/RIEL 2P 25A 230/400VAC SCHNEIDER',
    brand: 'SCHNEIDER',
    code: 'SCH-LLV25',
    category: 'Distribución en Baja Tensión',
    image: 'https://images.unsplash.com/photo-1517055729445-fa7d27394b48?auto=format&fit=crop&q=80&w=400',
    description: 'Interruptor termomagnético de alta calidad para protección de circuitos.',
    shortDescription: 'Protección termomagnética Schneider de 25A para circuitos eléctricos. Garantiza seguridad y desconexión automática ante sobrecargas.',
    specifications: { 'Amperaje': '25A', 'Polos': '2P', 'Voltaje': '230/400VAC' },
    isFeatured: true
  },
  {
    id: '3',
    slug: 'reflector-led-30w-6500k-ip65-luminika',
    name: 'REFLECTOR LED 30W 6500K IP65 LUMINIKA',
    brand: 'LUMINIKA',
    code: 'LUM-REF30',
    category: 'Iluminación',
    image: 'https://luminika.com.pe/cdn/shop/products/100002027-REFLECTOR-LED-30W_-30_K.png',
    description: 'Reflector LED de alta eficiencia para exteriores con protección IP65.',
    shortDescription: 'Reflector LED de 30W con protección IP65 para uso exterior. Luz blanca 6500K, alta eficiencia energética y larga vida útil.',
    specifications: { 'Potencia': '30W', 'Color': '6500K', 'IP': 'IP65' },
    isFeatured: true
  },
  {
    id: '4',
    slug: 'aplique-led-exterior-20w-cct-1800lm-lightech',
    name: 'APLIQUE LED EXTERIOR 20W CCT 1800LM LIGHTECH',
    brand: 'LIGHTECH',
    code: 'LTH-APL20',
    category: 'Iluminación',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=400',
    description: 'Aplique de pared moderno para exteriores con cambio de temperatura de color.',
    shortDescription: 'Aplique moderno de pared con tecnología CCT (cambio de temperatura de color). 1800 lúmenes, construcción en aluminio resistente.',
    specifications: { 'Potencia': '20W', 'Lúmenes': '1800LM', 'Material': 'Aluminio' },
    isNew: true
  },
  {
    id: '5',
    slug: 'fanal-oval-100w-hermetico-ip66-donilux',
    name: 'FANAL OVAL DE 100W HERMÉTICO IP66 DONILUX',
    brand: 'DONILUX',
    code: 'DNX-F100',
    category: 'Iluminación',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=400',
    description: 'Luminaria hermética ideal para zonas húmedas o con mucho polvo.',
    specifications: { 'Potencia Máx': '100W', 'Base': 'E27', 'Grado': 'IP66' }
  },
  {
    id: '6',
    slug: 'interruptor-diferencial-2p-40a-30ma-schneider',
    name: 'INTERRUPTOR DIFERENCIAL 2P 40A 30mA SCHNEIDER',
    brand: 'SCHNEIDER',
    code: 'SCH-DIF40',
    category: 'Distribución en Baja Tensión',
    image: 'https://images.unsplash.com/photo-1517055729445-fa7d27394b48?auto=format&fit=crop&q=80&w=400',
    description: 'Protección contra fugas de corriente para seguridad eléctrica.',
    specifications: { 'Amperaje': '40A', 'Sensibilidad': '30mA', 'Polos': '2P' },
    isNew: true
  },
  {
    id: '7',
    slug: 'tuberia-pvc-agua-1-2-clase-10-pavco',
    name: 'TUBERÍA PVC AGUA 1/2" CLASE 10 PAVCO',
    brand: 'PAVCO',
    code: 'PAV-T12',
    category: 'Gasfitería Técnica',
    image: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=400',
    description: 'Tubería de PVC de alta presión para redes de agua.',
    specifications: { 'Medida': '1/2"', 'Clase': '10', 'Marca': 'Pavco Wavin' }
  },
  {
    id: '8',
    name: 'LUZ DE EMERGENCIA 6.8W 72 LEDS HAGROY',
    brand: 'HAGROY',
    code: 'HAG-LE72',
    category: 'Iluminación',
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=400',
    description: 'Equipo de iluminación de emergencia autónomo con batería de larga duración.',
    specifications: { 'LEDS': '72', 'Autonomía': '12 Horas', 'Potencia': '6.8W' },
    isNew: true
  },
  {
    id: '9',
    name: 'MARTILLO DEMOLEDOR 15KG 1750W BOSCH GSH 16-28',
    brand: 'BOSCH',
    code: 'BOS-GSH16',
    category: 'Herramientas Eléctricas',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400',
    description: 'Potente martillo demoledor para trabajos pesados en concreto.',
    specifications: { 'Potencia': '1750W', 'Impacto': '41 J', 'Peso': '17.9 kg' },
    isNew: true
  },
  {
    id: '10',
    name: 'CENTRO DE CARGA 8 POLOS MONOFÁSICO SQUARE D',
    brand: 'SCHNEIDER',
    code: 'SQD-CC08',
    category: 'Distribución en Baja Tensión',
    image: 'https://images.unsplash.com/photo-1517055729445-fa7d27394b48?auto=format&fit=crop&q=80&w=400',
    description: 'Caja metálica para distribución de circuitos eléctricos.',
    specifications: { 'Polos': '8', 'Fase': 'Monofásica', 'Material': 'Acero' },
    isNew: true
  },
  {
    id: '11',
    name: 'CABLE VULCANIZADO 2X14 AWG CELSA 100M',
    brand: 'CELSA',
    code: 'CEL-VUL214',
    category: 'Cables y Conductores',
    image: 'https://images.unsplash.com/photo-1558444479-c848517e77a2?auto=format&fit=crop&q=80&w=400',
    description: 'Cable vulcanizado de alta flexibilidad para instalaciones móviles.',
    specifications: { 'Calibre': '14 AWG', 'Hilos': '2', 'Longitud': '100M' },
    isNew: true
  },
  {
    id: '12',
    name: 'INTERRUPTOR HORARIO ANALÓGICO SUL 181 D FINDER',
    brand: 'FINDER',
    code: 'FIN-SUL181',
    category: 'Distribución en Baja Tensión',
    image: 'https://images.unsplash.com/photo-1517055729445-fa7d27394b48?auto=format&fit=crop&q=80&w=400',
    description: 'Timer analógico para riel DIN, ideal para control de iluminación.',
    specifications: { 'Marca': 'Finder', 'Tipo': 'Analógico', 'Montaje': 'Riel DIN' },
    isNew: true
  }
];
