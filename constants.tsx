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
  { name: 'Iluminación', icon: 'Lightbulb', slug: 'iluminacion', image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=400' },
  { name: 'Luminarias Públicas', icon: 'LampDesk', slug: 'luminarias-publicas', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=400', parentCategory: 'iluminacion' },
  { name: 'Cables y Conductores', icon: 'Cable', slug: 'cables', image: 'https://images.unsplash.com/photo-1558444479-c848517e77a2?auto=format&fit=crop&q=80&w=400' },
  { name: 'Distribución en Baja Tensión', icon: 'Zap', slug: 'distribucion', image: 'https://images.unsplash.com/photo-1517055729445-fa7d27394b48?auto=format&fit=crop&q=80&w=400' },
  { name: 'Herramientas Eléctricas', icon: 'Hammer', slug: 'herramientas-elec', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400' },
  { name: 'Gasfitería Técnica', icon: 'Droplets', slug: 'gasfiteria', image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=400' },
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
  },
  {
    id: 'imported-product-14-1768857829251',
    slug: 'campana-led-industrial-philips-smartbright-highbay-g2-100w',
    name: 'Campana LED Philips Highbay 100W Industrial',
    brand: 'PHILIPS',
    code: 'BY239P',
    category: 'HighBay',
    image: 'https://cdn.sanity.io/images/2gy084y4/production/84811396293890d7294b7e81c0e94ff8033c4d8e-800x800.webp',
    shortDescription: 'Campana LED Philips de 100W con 13.000 lúmenes (130 lm/W). Protección IP65 e IK07. Reemplazo ideal para BY320P/BY321P. Luz fría (6500K) y garantía de 3 años.',
    specifications: {
      'Potencia': '100W',
      'Equivalencia / Reemplazo': 'Philips GreenUp Highbay BY320P / BY321P (100W)',
      'Voltaje': '220-240V',
      'IP': 'IP65',
      'Lúmenes': '13000 lm',
      'Temperatura': '6500K (Luz Fría)',
      'Vida Útil': '30.000 horas',
      'Garantía': '3 Años',
      'Ángulo de Apertura': '110°',
      'Resistencia a Impactos': 'IK07',
      'Eficacia': '130 lm/W'
    },
    youtubeVideo: 'https://www.youtube.com/watch?v=kYv_3jVjRPA',
    seo: {
      title: 'Philips Highbay 100W LED Campana Industrial | Precio en Perú',
      description: 'Cotiza la Campana LED Philips Highbay 100W Industrial al mejor precio en Perú. Con 13,000 lm, protección IP65, garantía de 3 años y envío rápido.',
      keywords: [
        'philips highbay 100w',
        'campana led 100w',
        'iluminacion industrial philips',
        'BY239P philips',
        'BY320P philips',
        'highbay by320p',
        'highbay by321p',
        'campana philips peru'
      ]
    },
    description: `
      <div class="space-y-8 text-gray-700">
        <section>
          <h2 class="text-2xl font-bold text-[#002D62] mb-4">¿Qué es la Campana LED Philips SmartBright Highbay G2 100W (BY239P)?</h2>
          <p class="leading-relaxed mb-4">
            La <strong>Campana LED Philips Highbay 100W</strong> es una luminaria de suspensión industrial de alta eficiencia, diseñada específicamente para iluminar espacios interiores de techos altos y ambientes exigentes. Fabricada bajo los rigurosos estándares de <strong>Philips</strong> (marca líder en tecnología de iluminación), este modelo pertenece a la prestigiosa familia <strong>SmartBright Highbay G2 (Modelo BY239P)</strong>. Representa el reemplazo tecnológico definitivo para las antiguas y costosas luminarias industriales de halogenuros metálicos (HPI) o vapor de sodio (Vapor de Sodio de 250W), garantizando una iluminación continua, uniforme y un ahorro energético que supera el 60%.
          </p>
          <p class="leading-relaxed">
            Esta campana LED es ampliamente preferida en el mercado industrial peruano por su excepcional equilibrio entre precio, rendimiento y durabilidad. Gracias a su diseño compacto e integrado en aluminio fundido a presión, ofrece una óptima disipación de calor, lo que prolonga la vida útil de los componentes internos y de los diodos LED. Es una inversión de rápido retorno, ideal para contratistas, ingenieros eléctricos y gerentes de almacén que buscan mejorar los niveles de lux en el suelo de trabajo mientras minimizan la facturación eléctrica mensual.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-[#002D62] mb-4">¿Para qué sirve y dónde se debe instalar?</h2>
          <p class="leading-relaxed mb-4">
            La función principal de la <strong>campana LED de 100W</strong> es proporcionar una luz focalizada, brillante y homogénea en zonas de gran altura. Su diseño óptico avanzado optimiza el haz de luz en un ángulo de apertura de <strong>110 grados</strong>, lo que permite una cobertura amplia y uniforme sin zonas oscuras ni destellos molestos que afecten el confort visual de los trabajadores. Su uso está orientado principalmente a naves industriales, centros logísticos y establecimientos comerciales de techos de altura intermedia a alta.
          </p>
          <p class="leading-relaxed mb-4">
            Los lugares de instalación recomendados por los especialistas en luminotecnia incluyen:
          </p>
          <ul class="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Almacenes y Centros Logísticos:</strong> Para iluminar pasillos de estanterías y áreas de tránsito, mejorando la lectura de códigos de barras, etiquetas y optimizando la seguridad del operario de montacargas.</li>
            <li><strong>Fábricas y Plantas de Producción:</strong> Donde la precisión y la seguridad laboral dependen de una luz de alta calidad (CRI &gt; 80) y constante, sin parpadeos estroboscópicos.</li>
            <li><strong>Gimnasios y Polideportivos:</strong> Ideal para iluminar canchas de básquetbol, vóley o gimnasios de entrenamiento de techos altos.</li>
            <li><strong>Supermercados y Grandes Superficies Comerciales:</strong> Para destacar pasillos de venta e infundir una sensación de amplitud y limpieza en el establecimiento.</li>
            <li><strong>Hangares y Talleres Mecánicos:</strong> Ambientes propensos al polvo y la humedad que requieren iluminación de alta resistencia y encendido inmediato.</li>
            <li><strong>Estacionamientos Techados de Techos Altos:</strong> Áreas que demandan iluminación continua 24/7 con alta eficiencia de consumo.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-[#002D62] mb-4">Características Técnicas Sobresalientes</h2>
          <p class="leading-relaxed mb-4">
            La ficha técnica de la Campana LED Philips SmartBright Highbay G2 100W refleja un diseño industrial sin compromisos. Entre sus parámetros clave destacan:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div class="border border-gray-100 rounded-lg p-4 bg-gray-50">
              <span class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Potencia y Consumo</span>
              <span class="text-lg font-black text-[#002D62]">100 Watts Reales</span>
            </div>
            <div class="border border-gray-100 rounded-lg p-4 bg-gray-50">
              <span class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Flujo Luminoso</span>
              <span class="text-lg font-black text-[#002D62]">13,000 Lúmenes (lm)</span>
            </div>
            <div class="border border-gray-100 rounded-lg p-4 bg-gray-50">
              <span class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Eficiencia Energética</span>
              <span class="text-lg font-black text-[#002D62]">130 lm/W</span>
            </div>
            <div class="border border-gray-100 rounded-lg p-4 bg-gray-50">
              <span class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Temperatura de Color</span>
              <span class="text-lg font-black text-[#002D62]">6500K (Luz Fría / Luz de Día)</span>
            </div>
            <div class="border border-gray-100 rounded-lg p-4 bg-gray-50">
              <span class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Índice de Protección de Ingreso</span>
              <span class="text-lg font-black text-[#002D62]">IP65 (Hermético al Polvo y Agua)</span>
            </div>
            <div class="border border-gray-100 rounded-lg p-4 bg-gray-50">
              <span class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Resistencia al Impacto</span>
              <span class="text-lg font-black text-[#002D62]">IK07 (Aluminio Fundido Altamente Resistente)</span>
            </div>
          </div>
          <p class="leading-relaxed">
            Además, opera a un rango de voltaje de <strong>220-240V AC</strong>, ideal para las fluctuaciones comunes en las redes eléctricas comerciales del Perú. Su factor de potencia es superior a 0.9, lo que evita penalizaciones en la facturación eléctrica de tu empresa y asegura la compatibilidad con instalaciones de tableros eléctricos modernos.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-[#002D62] mb-4">Ventajas frente a Luminarias Tradicionales</h2>
          <p class="leading-relaxed mb-4">
            Al comparar la campana industrial LED de Philips de 100W con la iluminación convencional, las ventajas son inmediatas e indiscutibles:
          </p>
          <ol class="list-decimal pl-6 space-y-3">
            <li><strong>Ahorro Energético Superior:</strong> Una campana tradicional de halogenuros metálicos de 250W consume en promedio cerca de 290W reales si se suma el consumo adicional del balasto magnético. La Philips Highbay 100W consume exactamente 100W, logrando un ahorro bruto de más del 65% en tu recibo de luz.</li>
            <li><strong>Encendido Instantáneo (Instant On):</strong> Los halogenuros metálicos requieren de 10 a 15 minutos de calentamiento para alcanzar su brillo máximo, y si ocurre un corte de energía, tardan el doble de tiempo en enfriarse y volver a encender. La campana LED de Philips se enciende instantáneamente al 100% de su capacidad.</li>
            <li><strong>Menor Generación de Calor:</strong> Las bombillas tradicionales disipan la mayor parte de su energía en forma de calor residual, incrementando la temperatura ambiente del almacén y sobrecargando los sistemas de aire acondicionado. La iluminación LED de Philips es fría y altamente eficiente en la conversión de energía a luz.</li>
            <li><strong>Larga Vida Útil sin Mantenimiento:</strong> Con una duración nominal de <strong>30,000 horas</strong>, la luminaria Philips BY239P puede funcionar durante más de 10 años (operando 8 horas diarias) sin necesidad de reemplazar focos ni balastos, lo que ahorra miles de soles en alquiler de grúas de elevación e interrupciones en la producción.</li>
          </ol>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-[#002D62] mb-4">Guía de Instalación y Altura Recomendada</h2>
          <p class="leading-relaxed mb-4">
            La campana Philips SmartBright Highbay G2 incluye un sistema de fijación muy sencillo a través de una argolla (o gancho metálico) ubicada en la parte superior, lo que facilita su montaje suspendido mediante cadena o cable de acero.
          </p>
          <p class="leading-relaxed mb-4">
            Para maximizar los luxes en la superficie de trabajo y evitar deslumbramientos a los operarios, se recomienda seguir el siguiente criterio de altura:
          </p>
          <ul class="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Altura entre 5 y 6 metros:</strong> Altura ideal para la versión de 100W. Genera una excelente densidad lumínica en pasillos estrechos o almacenes de apilamiento medio.</li>
            <li><strong>Altura entre 6 y 8 metros:</strong> Altura máxima sugerida. Para techos superiores a 8 metros, se recomienda evaluar el modelo de 150W o 200W de la misma familia Philips para asegurar un nivel óptimo de luxes en el suelo (generalmente regulado por INDECI y el Ministerio de Trabajo).</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-[#002D62] mb-4">Preguntas Frecuentes sobre la Campana Philips 100W</h2>
          <div class="space-y-4">
            <div>
              <h4 class="font-bold text-[#002D62] text-md">¿Cuántos metros cuadrados ilumina una campana LED Philips de 100W?</h4>
              <p class="text-gray-600">Instalada a una altura estándar de 6 metros, la campana cubre eficientemente un área de 25 a 36 metros cuadrados, proporcionando niveles óptimos de iluminación (luxes) para almacenes comerciales de tránsito general.</p>
            </div>
            <div>
              <h4 class="font-bold text-[#002D62] text-md">¿Viene con garantía de fábrica?</h4>
              <p class="text-gray-600">Sí, cuenta con <strong>3 años de garantía oficial respaldada por Philips Perú</strong>. Ante cualquier desperfecto de fabricación, ELECTRO FLOR gestionará la garantía para brindarte un cambio inmediato.</p>
            </div>
            <div>
              <h4 class="font-bold text-[#002D62] text-md">¿La luminaria puede instalarse a la intemperie?</h4>
              <p class="text-gray-600">Sí, gracias a su clasificación <strong>IP65</strong>, es completamente hermética contra el polvo y chorros de agua. Se puede instalar con total seguridad en hangares semiabiertos, techos industriales o áreas expuestas a altos niveles de polvo y humedad.</p>
            </div>
            <div>
              <h4 class="font-bold text-[#002D62] text-md">¿Es regulable (dimmerizable)?</h4>
              <p class="text-gray-600">No, el modelo SmartBright Highbay G2 BY239P es del tipo ON/OFF (no dimerizable), lo que simplifica su instalación y reduce la posibilidad de fallas en el circuito.</p>
            </div>
            <div>
              <h4 class="font-bold text-[#002D62] text-md">¿Viene lista para conectar a la red de 220V?</h4>
              <p class="text-gray-600">Sí, incluye su propio cable de alimentación trifásico pelado en los extremos (Línea, Neutro y Tierra), listo para realizar el empalme directo a la caja de pase de 220V.</p>
            </div>
          </div>
        </section>
      </div>
    `
  }
];
