import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '2gy084y4',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2024-01-01'
});

const CATEGORIES_SEO = [
  {
    slug: 'cables-y-conductores',
    name: 'Cables y Conductores Eléctricos',
    seoTitle: 'Cables y Conductores Eléctricos en Lima Perú | Indeco & Precios por Mayor',
    seoDescription: '✓ Conductores Indeco y Centelsa ✓ Cables THW, NH-80, N2XH y Cobre Libre de Halógenos ✓ Stock garantizado en Lima. Cotiza cables eléctricos por mayor aquí.',
    description: 'Encuentra la línea más completa de cables y conductores eléctricos para instalaciones residenciales, comerciales e industriales en Perú. Disponemos de conductores de cobre electrolítico de alta pureza en calibres normalizados (AWG y mm²), incluyendo cables libres de halógenos (NH-80, N2XH) con baja emisión de humos tóxicos para edificaciones con alta afluencia pública según el Código Nacional de Electricidad (CNE). Además, contamos con cables de uso general tipo TW, THW-90, cables vulcanizados y concéntricos de las marcas más confiables del mercado como Indeco y Centelsa, ideales para tableros eléctricos y acometidas principales con entrega inmediata en Lima y envíos a nivel nacional.'
  },
  {
    slug: 'iluminacion',
    name: 'Iluminación LED Comercial e Industrial',
    seoTitle: 'Iluminación LED en Lima Perú | Reflectores, Paneles & Campanas - Electro Flor',
    seoDescription: '✓ Iluminación LED de alta eficiencia ✓ Ahorro de hasta 80% de energía ✓ Marcas Philips, Luminika y Opalux ✓ Garantía oficial. Cotiza iluminación aquí.',
    description: 'Somos distribuidores de soluciones integrales de iluminación LED comercial, industrial y arquitectónica en Perú. Nuestro catálogo incluye desde luminarias de suspensión para techos altos (High Bay), reflectores de alta potencia para fachadas e instalaciones deportivas, hasta paneles LED ultrafinos para oficinas y centros educativos. Toda nuestra iluminación LED cuenta con chips y drivers de alta eficiencia lumínica (hasta 130 lm/W), protección contra picos de voltaje y certificaciones herméticas (IP65, IP66, IK08). Reduce tus costos de facturación eléctrica y mantenimiento con marcas líderes como Philips, Luminika, Lightech y Opalux.'
  },
  {
    slug: 'highbay',
    name: 'Campanas LED High Bay Industriales',
    seoTitle: 'Campanas LED High Bay 100W, 150W y 200W en Perú | Philips & Precios Mayoristas',
    seoDescription: '✓ Campanas LED industriales de 100W a 200W ✓ Certificación IP65 e IK07 ✓ Reemplazo de halogenuros de 250W/400W ✓ Stock inmediato en Lima. Cotiza aquí.',
    description: 'Especialistas en campanas industriales LED tipo High Bay para almacenes, naves industriales, centros logísticos y polideportivos en todo el Perú. Disponibles en potencias de 100W, 150W y 200W con flujos lumínicos de hasta 26,000 lúmenes y luz fría (6500K). Diseñadas en cuerpos de aluminio fundido para máxima disipación térmica y grado de protección IP65 hermético al polvo y humedad. Representan el reemplazo directo y más rentable para luminarias tradicionales de halogenuro metálico de 250W y 400W, ofreciendo encendido instantáneo, 3 años de garantía oficial y un ahorro energético superior al 65%.'
  },
  {
    slug: 'reflectores',
    name: 'Reflectores LED para Exteriores e Industrias',
    seoTitle: 'Reflectores LED 50W, 100W, 200W y 400W en Lima | Grado IP66 & Stock Inmediato',
    seoDescription: '✓ Reflectores LED de alta potencia ✓ Protección impermeable IP65/IP66 ✓ Luz blanca 6500K y cálida 3000K ✓ Venta por menor y mayor. Cotiza reflectores aquí.',
    description: 'Catálogo especializado de reflectores LED para iluminación exterior, fachadas, patios de maniobras, campos deportivos, estacionamientos y perímetros de seguridad. Ofrecemos reflectores compactos y extraplanos en potencias de 30W, 50W, 100W, 150W, 200W y 400W con tecnología SMD de alto brillo y ópticas de 120° para una amplia cobertura sin puntos oscuros. Todos nuestros modelos cuentan con carcasas de aluminio presofundido con tratamiento anticorrosivo y vidrio templado resistente a impactos (IK08), preparados para soportar la intemperie, lluvia y ambientes costeros en todo el Perú.'
  },
  {
    slug: 'reflectores-solares',
    name: 'Reflectores Solares LED Autónomos',
    seoTitle: 'Reflectores Solares LED con Panel y Control en Perú | Cero Consumo Eléctrico',
    seoDescription: '✓ Reflectores solares autosostenibles ✓ Panel solar + batería de litio de larga duración ✓ Sensor de movimiento y control remoto ✓ Envíos a todo el Perú.',
    description: 'Luminarias y reflectores solares LED 100% autosostenibles, la solución perfecta para iluminar exteriores, zonas rurales, casas de campo, granjas y almacenes sin necesidad de cableado eléctrico ni costo en el recibo de luz. Cada kit incluye un panel solar fotovoltaico de alta absorción monocristalino/policristalino, batería de fosfato de hierro y litio (LiFePO4) de larga duración, sensor de movimiento crepuscular inteligente y control remoto multifunción. Diseñados con protección hermética IP65 para resistir lluvia y polvo con autonomías continuas de 10 a 14 horas nocturnas.'
  },
  {
    slug: 'lamparas-colgantes',
    name: 'Lámparas Colgantes Decorativas',
    seoTitle: 'Lámparas Colgantes Modernas y Decorativas en Lima Perú | Diseños Exclusivos',
    seoDescription: '✓ Lámparas colgantes para sala, comedor y cocina ✓ Diseños modernos, industriales y nórdicos ✓ Compatibles con focos LED E27 y vintage. Cotiza en línea.',
    description: 'Transforma tus espacios con nuestra exclusiva colección de lámparas colgantes decorativas y modernas. Ideales para salas de estar, comedores, cocinas, barras americanas, restaurantes, cafeterías y oficinas comerciales. Contamos con acabados en metal negro mate, bronce, dorado, madera y cristal en estilos industrial, nórdico y contemporáneo. Todas nuestras luminarias colgantes cuentan con portalámparas estándar E27 reforzados, cables de suspensión de altura regulable y compatibilidad total con focos LED vintage de filamento y luz cálida para crear ambientes acogedores y sofisticados.'
  },
  {
    slug: 'apliques-de-interior',
    name: 'Apliques de Pared para Interior',
    seoTitle: 'Apliques de Pared para Interior en Lima Perú | Modernos y Decorativos',
    seoDescription: '✓ Apliques de pared interiores ✓ Diseños elegantes para dormitorios, salas y pasillos ✓ Luz directa e indirecta cálida/fría ✓ Stock en tienda Nicolini Lima.',
    description: 'Descubre nuestra línea de apliques de pared de interior, diseñados para complementar la iluminación general y crear efectos de luz arquitectónica en dormitorios, salas de estar, escaleras, pasillos y cabeceros de cama. Disponemos de apliques con tecnología LED integrada y portalámparas para foco, con opciones de emisión de luz bidireccional (arriba/abajo) que destacan texturas en paredes y columnas. Diseños minimalistas en aluminio, acrílico y metal con excelente reproducción cromática y confort visual libre de deslumbramientos.'
  },
  {
    slug: 'apliques-de-exterior-decorativo',
    name: 'Apliques de Exterior Decorativos Herméticos',
    seoTitle: 'Apliques de Exterior Decorativos IP65 en Perú | Fachadas, Terrazas y Jardines',
    seoDescription: '✓ Apliques para exteriores resistentes al agua (IP65) ✓ Diseños modernos para fachadas y patios ✓ Aluminio anticorrosivo ✓ Envíos a todo el Perú.',
    description: 'Ilumina y resalta la arquitectura de tus fachadas, jardines, terrazas, patios y entradas con nuestros apliques de exterior decorativos de alta resistencia. Fabricados con estructuras herméticas de grado IP54 e IP65, ofrecen protección total contra chorros de agua, polvo y humedad ambiental. Disponibles en acabados negro y gris grafito con difusores de policarbonato y cristal templado para uso continuo al aire libre, garantizando durabilidad y seguridad en viviendas, condominios y comercios.'
  },
  {
    slug: 'alumbrado-publico',
    name: 'Luminarias de Alumbrado Público LED',
    seoTitle: 'Luminarias de Alumbrado Público LED en Perú | Postes, Vías y Urbanizaciones',
    seoDescription: '✓ Alumbrado público LED 50W a 250W ✓ Óptica vial asimétrica y grado IP66/IK08 ✓ Para calles, parques y pistas ✓ Precios de distribuidor mayorista.',
    description: 'Luminarias profesionales de alumbrado público LED para iluminación vial de avenidas, calles, pistas residenciales, parques, condominios y plantas industriales en todo el Perú. Disponibles en potencias desde 50W hasta 250W con ópticas viales asimétricas tipo II y III que dirigen la luz de manera uniforme sobre la calzada sin pérdidas lumínicas. Cuerpos robustos de fundición de aluminio con supresor de picos de voltaje integrado (10kV), acceso para espiga de poste universal y certificación de eficiencia energética según la normativa del Ministerio de Energía y Minas (MINEM).'
  },
  {
    slug: 'alumbrado-publico-solar',
    name: 'Alumbrado Público Solar All-in-One',
    seoTitle: 'Alumbrado Público Solar LED All in One en Perú | Luminarias para Postes',
    seoDescription: '✓ Luminarias solares para postes de 60W a 300W ✓ Panel integrado + batería LiFePO4 ✓ Encendido automático crepuscular ✓ Cero gasto de luz. Cotiza aquí.',
    description: 'Soluciones integradas de alumbrado público solar tipo All-in-One y All-in-Two para vías públicas, carreteras, proyectos municipales, campamentos mineros y proyectos rurales sin acceso a la red eléctrica. Incorporan en una sola pieza compacta el panel solar monocristalino, batería de litio LiFePO4 de carga rápida, controlador MPPT inteligente y luminaria LED de alta luminosidad. No requieren zanjas ni tendido de cables, reduciendo los tiempos y costos de instalación a una fracción con autonomía garantizada de hasta 3 noches de reserva.'
  },
  {
    slug: 'paneles-y-downlights',
    name: 'Paneles LED y Downlights Empotrables',
    seoTitle: 'Paneles LED 60x60, 48W y Downlights en Lima Perú | Oficinas y Comercios',
    seoDescription: '✓ Paneles LED 60x60 de 48W para cielo raso ✓ Downlights empotrar y adosar ✓ Luz uniforme sin parpadeo ✓ Stock permanente en Lima. Cotiza aquí.',
    description: 'Paneles LED ultrafinos y luminarias downlight ideales para cielo raso suspendido (baldosas de 60x60 cm), tabiquería de drywall y techos de concreto en oficinas comerciales, bancos, clínicas, colegios y tiendas retail. Nuestros paneles LED de 36W, 40W y 48W proporcionan una distribución de luz completamente homogénea y suave con difusores opalinos antideslumbrantes (UGR < 19). Equipados con drivers externos de alta estabilidad que eliminan el efecto parpadeo (flicker-free), protegiendo la salud visual de los usuarios durante largas jornadas laborales.'
  },
  {
    slug: 'luces-de-emergencia',
    name: 'Luces de Emergencia Autónomas LED',
    seoTitle: 'Luces de Emergencia LED Certificadas en Perú | Aprobadas por INDECI',
    seoDescription: '✓ Luces de emergencia 6W, 8W y doble faro ✓ Autonomía de 2 a 8 horas ✓ Certificación para inspección INDECI ✓ Marcas Hagroy, Opalux y Bticino.',
    description: 'Equipos de iluminación de emergencia autónomos homologados para inspecciones de Defensa Civil (INDECI) en locales comerciales, almacenes, edificios residenciales, estacionamientos e industrias en Perú. Contamos con luces de emergencia de faros direccionables LED, equipos compactos de sobreponer y kits de conversión para luminarias con autonomías de batería de 2 a 8 horas de respaldo continuo ante cortes eléctricos. Equipos fiables con botón de test de batería, indicador LED de carga y baterías de libre mantenimiento para máxima seguridad en rutas de evacuación.'
  },
  {
    slug: 'interruptores',
    name: 'Interruptores Termomagnéticos y Diferenciales',
    seoTitle: 'Interruptores Termomagnéticos y Diferenciales en Lima | Schneider, Bticino & ABB',
    seoDescription: '✓ Llaves térmicas monofásicas y trifásicas (10A a 100A) ✓ Interruptores diferenciales 30mA ✓ Riel DIN y enchufables ✓ Precios por mayor en Lima.',
    description: 'Dispositivos de protección eléctrica y distribución en baja tensión para tableros eléctricos residenciales e industriales. Disponemos de interruptores termomagnéticos (llaves térmicas) en curvas de disparo B, C y D, desde 10A hasta 100A en configuraciones monofásicas (1P, 2P) y trifásicas (3P, 4P) con poderes de corte de 6kA y 10kA. Asimismo, suministramos interruptores diferenciales de alta sensibilidad (30mA) para protección contra electrocución e incendios eléctricos de las prestigiosas marcas Schneider Electric, Bticino, ABB y Chint.'
  },
  {
    slug: 'herramientas-electricas',
    name: 'Materiales Eléctricos, Tubos y Herramientas',
    seoTitle: 'Materiales Eléctricos y Herramientas en Lima Perú | Ferretería Industrial',
    seoDescription: '✓ Tubos Conduit EMT, cajas de pase y tableros ✓ Herramientas eléctricas Bosch y Stanley ✓ Cintas 3M, terminales y accesorios ✓ Distribuidor en C.C. Nicolini.',
    description: 'Suministro integral de material eléctrico y herramientas para instaladores, contratistas y electricistas profesionales. Ofrecemos tuberías metálicas Conduit EMT, PVC pesado y accesorios de canalización, cajas de pase galvanizadas, tableros de distribución metálicos y de PVC, cintas aislantes profesionales 3M (Temflex y Super 33+), terminales de compresión de cobre y herramientas de perforación y corte de las marcas Bosch, Stanley y Tramontina. Stock garantizado en nuestro local de Av. Argentina, Centro Comercial Nicolini.'
  },
  {
    slug: 'focos',
    name: 'Focos LED de Alta Potencia y Ahorradores',
    seoTitle: 'Focos LED E27, E40 y Alta Potencia en Lima Perú | Philips & Opalux',
    seoDescription: '✓ Focos LED de 9W a 100W ✓ Rosca estándar E27 y E40 industrial ✓ Luz fría 6500K y cálida 3000K ✓ Ahorro del 85% de energía. Venta por mayor y menor.',
    description: 'Amplio surtido de lámparas y focos LED de alta eficiencia para uso doméstico, comercial e industrial. Disponibles en formatos estándar tipo bulbo (A60), focos globo, velas decorativas, dicroicos GU10 y focos de alta potencia tipo T (30W, 50W, 80W y 100W con base E27 y adaptador E40 para naves comerciales). Reemplaza focos incandescentes y fluorescentes ahorradores tradicionales con una vida útil superior a 15,000 horas y encendido instantáneo sin emisiones UV ni mercurio.'
  },
  {
    slug: 'luminaria-acuatica',
    name: 'Luminarias Acuáticas Sumergibles IP68',
    seoTitle: 'Luminarias Acuáticas Sumergibles IP68 en Perú | Piscinas, Pozos y Fuentes',
    seoDescription: '✓ Luminarias LED sumergibles para piscinas y piletas ✓ Grado de hermeticidad IP68 ✓ Acero inoxidable 316 ✓ Luz blanca y RGB con controlador.',
    description: 'Luminarias LED subacuáticas y reflectores sumergibles con certificación estanca IP68 diseñados para funcionar bajo el agua de manera continua y segura en piscinas residenciales, piletas ornamentales, cascadas decorativas, fuentes públicas y pozos. Fabricadas con cuerpos de acero inoxidable marino AISI 316 resistente al cloro y la corrosión marina, y lentes de policarbonato reforzado. Operan a voltajes seguros de 12V y 24V AC/DC, disponibles en luz monocromática blanca/azul y versiones multicolor RGB con control remoto.'
  }
];

async function main() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('❌ Error: SANITY_WRITE_TOKEN no configurado.');
    process.exit(1);
  }

  console.log('🚀 Iniciando actualización masiva de SEO para las 16 categorías en Sanity CMS...');

  for (const catSeo of CATEGORIES_SEO) {
    console.log(`\n⏳ Procesando categoría: ${catSeo.name} (${catSeo.slug})...`);

    // Buscar si existe en Sanity por slug
    const existing = await client.fetch(`*[_type == "category" && slug.current == $slug][0]`, { slug: catSeo.slug });

    if (existing) {
      const updated = await client.patch(existing._id)
        .set({
          name: catSeo.name,
          seoTitle: catSeo.seoTitle,
          seoDescription: catSeo.seoDescription,
          description: catSeo.description
        })
        .commit();
      console.log(`   ✅ Actualizada categoría existente: ${updated.name} (ID: ${updated._id})`);
    } else {
      const created = await client.create({
        _type: 'category',
        _id: `category-${catSeo.slug}`,
        name: catSeo.name,
        slug: { _type: 'slug', current: catSeo.slug },
        seoTitle: catSeo.seoTitle,
        seoDescription: catSeo.seoDescription,
        description: catSeo.description
      });
      console.log(`   ✨ Creada nueva categoría con SEO: ${created.name} (ID: ${created._id})`);
    }
  }

  console.log('\n🎉 ¡Las 16 categorías han sido 100% optimizadas con títulos CTR, meta descripciones y textos técnicos en Sanity CMS!');
}

main().catch(console.error);
