import { createClient } from '@sanity/client';

// Configuración del cliente Sanity
const client = createClient({
  projectId: '2gy084y4',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2024-01-01'
});

const philipsProduct = {
  _type: 'product',
  _id: 'imported-product-14-1768857829251',
  name: 'Campana LED Philips Highbay 100W Industrial',
  slug: { _type: 'slug', current: 'campana-led-industrial-philips-smartbright-highbay-g2-100w' },
  shortDescription: 'Campana LED Philips de 100W con 13.000 lúmenes (130 lm/W). Protección IP65 e IK07. Luz fría (6500K) y garantía de 3 años. Diseño robusto en aluminio.',
  brand: 'PHILIPS',
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
    console.log('💡 Configúrala ejecutando: $env:SANITY_WRITE_TOKEN="tu_token" (PowerShell) o set SANITY_WRITE_TOKEN=tu_token (CMD)');
    return;
  }

  console.log('🚀 Subiendo / actualizando producto Philips Highbay 100W en Sanity...');
  try {
    // Buscar la categoría 'HighBay' para referenciarla si existe, sino crearla
    const categories = await client.fetch(`*[_type == "category" && slug.current == "highbay"][0]`);
    if (categories) {
      philipsProduct.category = { _type: 'reference', _ref: categories._id };
      console.log(`   🏷️  Referenciando categoría existente: ${categories.name} (${categories._id})`);
    } else {
      console.log('   ⚠️  No se encontró la categoría "highbay" en Sanity. Se creará una por defecto...');
      const newCat = await client.createOrReplace({
        _type: 'category',
        _id: 'category-highbay',
        name: 'HighBay',
        slug: { _type: 'slug', current: 'highbay' }
      });
      philipsProduct.category = { _type: 'reference', _ref: newCat._id };
    }

    // Subir producto
    const result = await client.createOrReplace(philipsProduct);
    console.log('✅ ¡Producto subido con éxito a Sanity!', result._id);
    console.log('💡 Recuerda que puedes copiar la descripción enriquecida de más de 1,500 palabras directamente a tu Sanity Studio.');
  } catch (error) {
    console.error('❌ Error al subir producto a Sanity:', error.message);
  }
}

upload();
