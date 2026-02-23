import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración de rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');

// 1. CARGAR VARIABLES DE ENTORNO
// En Netlify, las variables están en process.env directamente.
// En local, intentamos leer .env si existe.
let projectId = process.env.VITE_SANITY_PROJECT_ID;
let dataset = process.env.VITE_SANITY_DATASET || 'production';

if (!projectId) {
  try {
    const envPath = path.join(__dirname, '../.env');
    if (fs.existsSync(envPath)) {
      const envData = fs.readFileSync(envPath, 'utf8');
      envData.split('\n').forEach(line => {
        const [key, ...value] = line.split('=');
        if (key && value) {
          const k = key.trim();
          const v = value.join('=').trim().replace(/['"]/g, '');
          if (k === 'VITE_SANITY_PROJECT_ID') projectId = v;
          if (k === 'VITE_SANITY_DATASET') dataset = v;
        }
      });
    }
  } catch (e) {
    console.warn('⚠️ No se pudo leer el archivo .env local.');
  }
}

if (!projectId) {
  console.error('❌ Error: VITE_SANITY_PROJECT_ID no está definido en el entorno.');
  process.exit(1);
}

const client = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: '2024-01-01',
  useCdn: false
});

async function generateSitemap() {
  console.log('🚀 Iniciando generación de Sitemap dinámico...');

  try {
    // 2. Obtener datos de Sanity
    const products = await client.fetch(`*[_type == "product" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`);
    const categories = await client.fetch(`*[_type == "category" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`);
    const brands = await client.fetch(`*[_type == "brand" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`);

    const baseUrl = 'https://electroflorperu.com';

    // 3. Páginas estáticas
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'daily' },
      { url: '/productos', priority: '0.9', changefreq: 'daily' },
      { url: '/marcas', priority: '0.8', changefreq: 'weekly' },
      { url: '/nosotros', priority: '0.6', changefreq: 'monthly' },
      { url: '/contacto', priority: '0.7', changefreq: 'monthly' },
      { url: '/faq', priority: '0.5', changefreq: 'monthly' },
      { url: '/libro-de-reclamaciones', priority: '0.4', changefreq: 'yearly' },
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Añadir estáticas
    staticPages.forEach(page => {
      xml += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });

    // Añadir Categorías
    categories.forEach(cat => {
      xml += `
  <url>
    <loc>${baseUrl}/productos/${cat.slug}</loc>
    <lastmod>${cat._updatedAt ? cat._updatedAt.split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // Añadir Marcas
    brands.forEach(brand => {
      xml += `
  <url>
    <loc>${baseUrl}/productos/marca/${brand.slug}</loc>
    <lastmod>${brand._updatedAt ? brand._updatedAt.split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // Añadir Productos (Individuales)
    products.forEach(prod => {
      xml += `
  <url>
    <loc>${baseUrl}/producto/${prod.slug}</loc>
    <lastmod>${prod._updatedAt ? prod._updatedAt.split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    });

    xml += `
</urlset>`;

    // 4. Guardar archivo
    fs.writeFileSync(SITEMAP_PATH, xml);
    console.log(`✅ Sitemap generado con éxito en: ${SITEMAP_PATH}`);

  } catch (error) {
    console.error('❌ Error generando el sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
