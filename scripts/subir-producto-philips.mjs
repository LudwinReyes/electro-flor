import { createClient } from '@sanity/client';

// Configuración del cliente Sanity
const client = createClient({
  projectId: '2gy084y4',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2024-01-01'
});

const descriptionHtml = `<div class="space-y-8 text-gray-700">
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
</div>`;

function parseHtmlToBlocks(html) {
  const blocks = [];
  let keyCounter = 0;
  const nextKey = () => `block_${Date.now()}_${keyCounter++}`;

  // Limpiar contenedores
  let cleanHtml = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<div[^>]*>/g, '')
    .replace(/<\/div>/g, '')
    .replace(/<section[^>]*>/g, '')
    .replace(/<\/section>/g, '');

  const tagRegex = /<(h2|p|li)[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;

  while ((match = tagRegex.exec(cleanHtml)) !== null) {
    const tag = match[1].toLowerCase();
    const content = match[2].trim();
    if (!content) continue;

    const block = {
      _type: 'block',
      _key: nextKey(),
      children: []
    };

    if (tag === 'h2') {
      block.style = 'h3';
    } else {
      block.style = 'normal';
    }

    if (tag === 'li') {
      const index = match.index;
      const precedingHtml = cleanHtml.substring(0, index);
      const isNumbered = precedingHtml.lastIndexOf('<ol') > precedingHtml.lastIndexOf('<ul');
      block.listItem = isNumbered ? 'number' : 'bullet';
      block.level = 1;
    }

    // Dividir en textos simples y negritas
    const spanRegex = /<(strong|b)[^>]*>([\s\S]*?)<\/\1>|([^<]+)/gi;
    let spanMatch;
    let spanCounter = 0;

    while ((spanMatch = spanRegex.exec(content)) !== null) {
      const isBold = !!(spanMatch[1]);
      const textContent = isBold ? spanMatch[2] : spanMatch[3];
      
      if (!textContent) continue;

      const cleanText = textContent
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/<[^>]*>/g, ''); // Remover cualquier otra etiqueta residual

      block.children.push({
        _type: 'span',
        _key: `${block._key}_span_${spanCounter++}`,
        text: cleanText,
        marks: isBold ? ['strong'] : []
      });
    }

    if (block.children.length === 0) {
      block.children.push({
        _type: 'span',
        _key: `${block._key}_span_0`,
        text: content.replace(/<[^>]*>/g, ''),
        marks: []
      });
    }

    blocks.push(block);
  }

  return blocks;
}

const philipsProduct = {
  _type: 'product',
  _id: 'imported-product-14-1768857829251',
  name: 'Campana LED Philips Highbay 100W Industrial',
  slug: { _type: 'slug', current: 'campana-led-industrial-philips-smartbright-highbay-g2-100w' },
  shortDescription: 'Campana LED Philips de 100W con 13.000 lúmenes (130 lm/W). Protección IP65 e IK07. Luz fría (6500K) y garantía de 3 años. Diseño robusto en aluminio.',
  brand: 'PHILIPS',
  description: parseHtmlToBlocks(descriptionHtml), // ¡Sincronizado nativamente como bloques de Sanity!
  specifications: [
    { _key: 'potencia', label: 'Potencia', value: '100W' },
    { _key: 'voltaje', label: 'Voltaje', value: '220-240V' },
    { _key: 'ip', label: 'IP', value: 'IP65' },
    { _key: 'lumenes', label: 'Lúmenes', value: '13000 lm' },
    { _key: 'temperatura', label: 'Temperatura', value: '6500K (Luz Fría)' },
    { _key: 'vida-util', label: 'Vida Útil', value: '30.000 horas' },
    { _key: 'garantia', label: 'Garantía', value: '3 Años' },
    { _key: 'apertura', label: 'Ángulo de Apertura', value: '110°' },
    { _key: 'impactos', label: 'Resistencia a Impactos', value: 'IK07' },
    { _key: 'eficacia', label: 'Eficacia', value: '130 lm/W' }
  ],
  youtubeVideo: 'https://www.youtube.com/watch?v=kYv_3jVjRPA',
  seo: {
    title: 'Philips Highbay 100W LED Campana Industrial | Precio en Perú',
    description: 'Cotiza la Campana LED Philips Highbay 100W Industrial al mejor precio en Perú. Con 13,000 lm, protección IP65, garantía de 3 años y envío rápido.',
    keywords: ['philips highbay 100w', 'campana led 100w', 'iluminacion industrial philips', 'BY239P philips', 'campana philips peru']
  }
};

async function upload() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('❌ Error: La variable de entorno SANITY_WRITE_TOKEN no está configurada.');
    return;
  }

  console.log('🚀 Subiendo / actualizando producto Philips con descripción en bloques de PortableText...');
  try {
    // Buscar la categoría para referenciarla
    const categories = await client.fetch(`*[_type == "category" && slug.current == "highbay"][0]`);
    if (categories) {
      philipsProduct.category = { _type: 'reference', _ref: categories._id };
      console.log(`   🏷️  Referenciando categoría existente: ${categories.name} (${categories._id})`);
    } else {
      const newCat = await client.createOrReplace({
        _type: 'category',
        _id: 'category-highbay',
        name: 'HighBay',
        slug: { _type: 'slug', current: 'highbay' }
      });
      philipsProduct.category = { _type: 'reference', _ref: newCat._id };
    }

    // Subir producto completo
    const result = await client.createOrReplace(philipsProduct);
    console.log('✅ ¡Producto subido y descripción completamente rellenada en bloques en Sanity!', result._id);
  } catch (error) {
    console.error('❌ Error al subir producto a Sanity:', error.message);
  }
}

upload();
