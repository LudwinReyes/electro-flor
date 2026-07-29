export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'como-elegir-un-high-bay-led-para-almacenes',
    title: 'Cómo elegir un High Bay LED para almacenes y centros logísticos',
    excerpt: 'Descubre los factores clave para seleccionar la campana industrial LED ideal para tu almacén, optimizando la visibilidad, seguridad y el consumo eléctrico.',
    date: '2026-07-28',
    readTime: '5 min de lectura',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    author: 'Dpto. Técnico Electro Flor',
    content: `
      <div class="space-y-6 text-gray-700 leading-relaxed font-sans">
        <p>
          La iluminación en almacenes y centros logísticos es uno de los pilares de la eficiencia operativa y la seguridad industrial. Seleccionar una campana incorrecta no solo incrementa la facturación eléctrica, sino que puede generar zonas de sombra peligrosas, fatiga visual y accidentes en el personal que opera montacargas. En esta guía te explicamos cómo elegir el <strong>High Bay LED</strong> ideal para tu espacio.
        </p>

        <h3 class="text-xl font-bold text-[#002D62] mt-8 mb-4">1. La altura de montaje y la potencia</h3>
        <p>
          El primer factor a considerar es la altura del techo de tu almacén. Un techo de 5 metros de altura no requiere la misma potencia que uno de 10 o 12 metros. Para techos de 5 a 7 metros, una campana como la <a href="/producto/campana-led-industrial-philips-smartbright-highbay-g2-100w" class="text-[#8CC63F] font-bold underline hover:opacity-80">Philips Highbay 100W</a> es más que suficiente para garantizar unos 200 a 300 luxes promedio en el suelo. Instalar una campana de mayor potencia a esa altura podría deslumbrar a los trabajadores.
        </p>

        <h3 class="text-xl font-bold text-[#002D62] mt-8 mb-4">2. Eficiencia lumínica vs. Consumo</h3>
        <p>
          No te fijes solo en los watts de consumo, sino en los lúmenes por watt (lm/W). La eficiencia es la cantidad de luz que emite una luminaria por cada watt que consume. Una campana antigua de halogenuros metálicos entrega unos 70 lm/W, mientras que las campanas modernas de Philips entregan <strong>130 lm/W</strong> o más. Esto significa que iluminas el doble gastando menos de la mitad de energía eléctrica.
        </p>

        <h3 class="text-xl font-bold text-[#002D62] mt-8 mb-4">3. Grado de Protección IP y Resistencia IK</h3>
        <p>
          Los almacenes acumulan polvo y, en algunos casos, humedad. Asegúrate de elegir campanas con una protección mínima de <strong>IP65</strong> (herméticas al polvo y chorros de agua) y una resistencia contra impactos mecánicos de tipo <strong>IK07 o superior</strong>. Esto garantiza la integridad física de la campana en caso de golpes accidentales con tuberías o herramientas.
        </p>

        <h3 class="text-xl font-bold text-[#002D62] mt-8 mb-4">4. Índice de Reproducción Cromática (CRI)</h3>
        <p>
          Para leer códigos de barras, etiquetas de empaque y señalizaciones de seguridad, se requiere que la luz reproduzca los colores fielmente. Te recomendamos elegir luminarias con un CRI superior a 80. Las campanas Philips garantizan que los colores se aprecien de manera natural y clara, reduciendo el margen de error en las tareas de picking y packing.
        </p>
      </div>
    `
  },
  {
    slug: 'diferencias-entre-high-bay-100w-150w-y-200w',
    title: 'Diferencias entre campanas industriales High Bay de 100W, 150W y 200W',
    excerpt: 'Te enseñamos a comparar las potencias más comunes de campanas LED industriales para que elijas la adecuada según las necesidades de tu nave industrial.',
    date: '2026-07-25',
    readTime: '4 min de lectura',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
    author: 'Dpto. Técnico Electro Flor',
    content: `
      <div class="space-y-6 text-gray-700 leading-relaxed font-sans">
        <p>
          Las campanas LED de suspensión (o High Bays) están disponibles en diversas potencias. Las más comunes en la iluminación comercial e industrial son las de 100W, 150W y 200W. Elegir la potencia correcta evitará la sobre-iluminación (deslumbramiento y gasto innecesario) o la sub-iluminación (ambientes oscuros).
        </p>

        <h3 class="text-xl font-bold text-[#002D62] mt-8 mb-4">Campana LED de 100W</h3>
        <p>
          Es ideal para alturas que oscilan entre los <strong>5 y 7 metros</strong>. Entrega alrededor de 13,000 lúmenes de flujo luminoso. Un excelente ejemplo es la <a href="/producto/campana-led-industrial-philips-smartbright-highbay-g2-100w" class="text-[#8CC63F] font-bold underline hover:opacity-80">Campana LED Philips Highbay</a>, la cual ofrece luz fría (6500K) y una gran homogeneidad para almacenes, talleres mecánicos o pequeños gimnasios.
        </p>

        <h3 class="text-xl font-bold text-[#002D62] mt-8 mb-4">Campana LED de 150W</h3>
        <p>
          Recomendada para techos de <strong>7 a 9 metros</strong> de altura. Produce entre 19,000 y 20,000 lúmenes. Es la potencia estándar para naves industriales de tamaño promedio dedicadas a manufactura general o centros de distribución de mediana altura.
        </p>

        <h3 class="text-xl font-bold text-[#002D62] mt-8 mb-4">Campana LED de 200W</h3>
        <p>
          Se instala en alturas superiores a los <strong>9 o 12 metros</strong>. Emite más de 26,000 lúmenes, permitiendo que el flujo luminoso recorra la gran distancia vertical hasta llegar al suelo con los luxes requeridos por ley. Es la campana elegida para grandes hangares de aviación, almacenes de apilamiento vertical extremo y astilleros.
        </p>

        <h3 class="text-xl font-bold text-[#002D62] mt-8 mb-4">Resumen de Selección</h3>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>Menos de 6 metros:</strong> Campana de 100W.</li>
          <li><strong>De 6 a 8 metros:</strong> Campana de 150W.</li>
          <li><strong>Más de 9 metros:</strong> Campana de 200W.</li>
        </ul>
      </div>
    `
  },
  {
    slug: 'que-altura-necesita-un-high-bay-led-de-100w',
    title: '¿Qué altura de instalación necesita un High Bay LED de 100W?',
    excerpt: 'Aprende a posicionar tus campanas de 100W a la altura correcta para lograr un reparto homogéneo de la luz sin sombras ni deslumbramientos.',
    date: '2026-07-22',
    readTime: '4 min de lectura',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&q=80&w=800',
    author: 'Dpto. Técnico Electro Flor',
    content: `
      <div class="space-y-6 text-gray-700 leading-relaxed font-sans">
        <p>
          Uno de los errores más comunes en la instalación de iluminación industrial es no colocar las campanas a la altura adecuada. Si la campana está demasiado baja, concentrará la luz en un punto creando un efecto "foco" que deslumbra a la gente. Si está muy alta, la luz se dispersará demasiado y no alumbrará bien el suelo de trabajo.
        </p>

        <h3 class="text-xl font-bold text-[#002D62] mt-8 mb-4">La Altura Óptima: 5 a 7 Metros</h3>
        <p>
          Para las campanas de 100W, como la <a href="/producto/campana-led-industrial-philips-smartbright-highbay-g2-100w" class="text-[#8CC63F] font-bold underline hover:opacity-80">Luminaria Industrial Philips</a>, la altura óptima sugerida por los ingenieros es de <strong>5 a 7 metros</strong>. A esta distancia, su haz de luz de 110 grados se abre lo suficiente para cruzarse con el haz de la campana vecina de manera fluida, creando una iluminación uniforme sin molestas sombras lineales en el piso.
        </p>

        <h3 class="text-xl font-bold text-[#002D62] mt-8 mb-4">Distancia entre Campanas</h3>
        <p>
          A una altura de 6 metros, la distancia recomendada entre cada campana de 100W es de aproximadamente <strong>4.5 a 6 metros</strong>. Esto asegura que la cobertura lumínica cubra las intersecciones y pasillos, cumpliendo con los 200 a 300 luxes que exige Defensa Civil para almacenes de tránsito constante y operaciones generales.
        </p>

        <h3 class="text-xl font-bold text-[#002D62] mt-8 mb-4">Consejo Técnico</h3>
        <p>
          Utiliza siempre ganchos suspendidos de acero o cadenas reforzadas para la instalación. Al reducir o aumentar la longitud de la cadena, puedes ajustar la altura de la luminaria con precisión para adaptarla a la altura exacta de los racks o racks de almacenamiento de tu nave industrial.
        </p>
      </div>
    `
  },
  {
    slug: 'guia-para-calcular-la-iluminacion-de-una-nave-industrial',
    title: 'Guía práctica para calcular la iluminación de una nave industrial',
    excerpt: 'Te explicamos paso a paso el método de lúmenes para calcular cuántas campanas necesitas para cumplir con la normativa y mantener seguro tu espacio de trabajo.',
    date: '2026-07-19',
    readTime: '6 min de lectura',
    image: 'https://images.unsplash.com/photo-1513828729020-56f2295a73cf?auto=format&fit=crop&q=80&w=800',
    author: 'Dpto. Técnico Electro Flor',
    content: `
      <div class="space-y-6 text-gray-700 leading-relaxed font-sans">
        <p>
          Calcular la iluminación de una nave industrial requiere precisión matemática para cumplir con las normativas locales (Norma Técnica Peruana de Iluminación y exigencias de INDECI). El método más sencillo y confiable para un pre-diseño es el <strong>Método de los Lúmenes</strong>.
        </p>

        <h3 class="text-xl font-bold text-[#002D62] mt-8 mb-4">Paso 1: Determinar los Luxes necesarios</h3>
        <p>
          Los luxes (lx) requeridos dependen del tipo de tarea que se realice en el espacio:
        </p>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>Zonas de tránsito y pasillos de almacén:</strong> 150 - 200 lx.</li>
          <li><strong>Almacenamiento y producción general:</strong> 200 - 300 lx.</li>
          <li><strong>Trabajos de ensamblaje e inspección detallada:</strong> 500 lx o más.</li>
        </ul>

        <h3 class="text-xl font-bold text-[#002D62] mt-8 mb-4">Paso 2: Calcular el Flujo Luminoso Total necesario</h3>
        <p>
          Usa la fórmula: <em>Flujo Total (Lúmenes) = (Luxes requeridos * Área en m²) / (Factor de utilización * Factor de mantenimiento)</em>.
          En términos sencillos para almacenes limpios, dividimos el resultado entre un factor de eficiencia general de 0.6.
        </p>

        <h3 class="text-xl font-bold text-[#002D62] mt-8 mb-4">Paso 3: Determinar el número de luminarias</h3>
        <p>
          Una vez obtenido el flujo total en lúmenes, lo divides por la cantidad de lúmenes que emite la campana elegida. Por ejemplo, si utilizas una <a href="/producto/campana-led-industrial-philips-smartbright-highbay-g2-100w" class="text-[#8CC63F] font-bold underline hover:opacity-80">campana LED de 100W</a> de Philips (BY239P), la cual produce 13,000 lúmenes, y tu cálculo te da que necesitas 130,000 lúmenes en total, sabrás que requieres instalar exactamente 10 campanas distribuidas uniformemente.
        </p>
      </div>
    `
  },
  {
    slug: 'philips-highbay-vs-otras-marcas-comparativa',
    title: 'Comparativa: Campanas Philips Highbay vs Otras marcas del mercado',
    excerpt: 'Analizamos por qué la inversión en campanas Philips resulta más rentable en el mediano plazo comparada con opciones de menor costo o marcas genéricas.',
    date: '2026-07-16',
    readTime: '5 min de lectura',
    image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=800',
    author: 'Dpto. Técnico Electro Flor',
    content: `
      <div class="space-y-6 text-gray-700 leading-relaxed font-sans">
        <p>
          En el mercado de iluminación industrial en el Perú existen múltiples marcas de campanas LED. Ante la diferencia de precios, muchos compradores se ven tentados por marcas genéricas de bajo costo. Sin embargo, la iluminación de naves industriales opera en condiciones extremas de uso continuo, lo que hace que la calidad de los componentes sea un factor crítico.
        </p>

        <h3 class="text-xl font-bold text-[#002D62] mt-8 mb-4">Calidad del Conductor (Driver) y Diodos LED</h3>
        <p>
          El principal punto de falla en cualquier luminaria LED es el driver. Las campanas baratas usan drivers sin protección contra sobretensiones ni disipadores de calor adecuados, por lo que suelen quemarse antes de cumplir un año. La campana <a href="/producto/campana-led-industrial-philips-smartbright-highbay-g2-100w" class="text-[#8CC63F] font-bold underline hover:opacity-80">Philips SmartBright Highbay</a> está equipada con drivers de alta especificación y diodos Philips con una depreciación de brillo sumamente baja.
        </p>

        <h3 class="text-xl font-bold text-[#002D62] mt-8 mb-4">Respaldo y Garantía Real</h3>
        <p>
          Una marca genérica rara vez ofrece garantía, o el proceso de cambio es tan engorroso que termina costándole tiempo y dinero a la empresa. Philips ofrece <strong>3 años de garantía oficial en Perú</strong> gestionada directamente a través de distribuidores autorizados como ELECTRO FLOR, dándote total tranquilidad para tus proyectos corporativos.
        </p>

        <h3 class="text-xl font-bold text-[#002D62] mt-8 mb-4">Conclusión</h3>
        <p>
          Invertir un poco más en luminarias Philips reduce a cero el gasto recurrente de mantenimiento y alquiler de equipos de elevación para cambio de campanas quemadas, amortizando la diferencia de precio en muy pocos meses de operación.
        </p>
      </div>
    `
  }
];
