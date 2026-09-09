# Auditoría SEO Completa — Electro Flor Perú

- **Sitio Auditado**: `https://electroflorperu.com`
- **Giro de Negocio**: Ecommerce / Catálogo Mayorista de Luminarias LED y Material Eléctrico / Ferretero
- **Mercado Geográfico**: Perú (Lima y cobertura nacional)
- **Fecha de Auditoría**: 8 de septiembre de 2026
- **Total de URLs Rastreadas**: 192 URLs (100% del sitemap oficial)
- **Propiedad GSC**: `sc-domain:electroflorperu.com` (Últimos 28 días: 11 Ago - 8 Sep 2026)
- **Puntuación Global**: **42 / 100** (🔴 Crítico — Requiere remediación urgente)

---

## 1. Resumen Ejecutivo y Diagnóstico

Se ejecutó un rastreo integral de las **192 URLs** declaradas en el sitemap y se extrajeron métricas reales de Google Search Console mediante la conexión MCP oficial. El catálogo de **Electro Flor** posee un excelente posicionamiento de marca propia (`electro flor` con 70% CTR en posición 1.4) y un catálogo de alta demanda técnica (Philips, Indeco, Ledvance, Macroled, Opalux, Donilux). 

Sin embargo, el rastreo determinó **tres bloqueos de severidad crítica** que paralizan el rendimiento comercial orgánico del sitio:

1. **🔴 135 Fichas de Producto devuelven HTTP 500 en Producción**:
   Todas las URLs bajo `/producto/[id]` fallan en el servidor de producción con `<!DOCTYPE html><html id="__next_error__">` debido a excepciones de tipado no controladas en SSR dentro de `app/producto/[id]/page.tsx` (`product.brand.toUpperCase()`, `b.children.map()`, etc.). Ni Googlebot ni los usuarios pueden acceder a las fichas de producto.
2. **🔴 44 Páginas de Categoría y Marca con H1 Genérico en SSR**:
   En `components/ProductsPage.tsx`, el cálculo de la categoría activa depende de un hook `useEffect` (solo en cliente). En el HTML inicial que indexa Google, las 44 categorías y marcas muestran exactamente el mismo H1 genérico:
   `<h1>EXPLORA NUESTROS PRODUCTOS</h1>`
   en lugar del nombre descriptivo de la categoría o marca.
3. **⚠️ Riesgo de Penalización por Marcado Ficticio y Restringido**:
   Las plantillas de producto inyectan un `aggregateRating` inventado en el JSON-LD (4.8 con 1 reseña o 4.9 con 12 reseñas fijas sin opiniones visibles) y mantienen `FAQPage` schema en productos (restringido por Google desde agosto de 2023).

---

## 2. Puntuación por Categorías (Rubric Weighting)

| Categoría | Peso | Score | Nivel | Hallazgo Clave |
|---|:---:|:---:|:---:|---|
| **SEO Técnico e Indexabilidad** | 25% | **25/100** | 🔴 Crítico | 135 URLs con HTTP 500; sitemap reporta warning en GSC. |
| **SEO On-Page & Arquitectura** | 20% | **45/100** | 🔴 Crítico | H1 duplicado ("EXPLORA NUESTROS PRODUCTOS") en 44 categorías. |
| **Datos Estructurados (Schema)** | 15% | **50/100** | ⚠️ Alerta | `aggregateRating` ficticio en PDPs; falta schema Organization y WebSite. |
| **Calidad de Contenido & E-E-A-T** | 15% | **65/100** | ⚠️ Alerta | Fichas técnicas completas, pero estados "Cargando..." en HTML inicial. |
| **Rendimiento & Core Web Vitals** | 10% | **55/100** | ⚠️ Alerta | `images: { unoptimized: true }` en Next.js; CSS de FontAwesome bloqueante. |
| **Canibalización y Cobertura (GSC)** | 10% | **50/100** | ⚠️ Alerta | Competición entre `/ficha-tecnica/` y `/producto/`; subdominio `www` residual. |
| **IA Search Readiness (GEO / AEO)**| 5% | **75/100** | ✅ Bueno | `llms.txt` implementado y bots de IA gestionados en `robots.ts`. |
| **PUNTUACIÓN TOTAL** | **100%** | **42.2 / 100** | 🔴 **CRÍTICO** | **Acción inmediata requerida.** |

---

## 3. Radiografía del Rastreo (192 URLs)

```
Resumen del Rastreo:
├── Total URLs en Sitemap: 192
│   ├── HTTP 200 (OK): 57 URLs (29.7%)
│   └── HTTP 500 (Server Error): 135 URLs (70.3%)  <-- ERROR CRÍTICO
│
├── Desglose por Tipo de Contenido:
│   ├── Fichas de Producto (/producto/*): 118 URLs (100% en error 500)
│   ├── Categorías y Subcategorías (/productos/*): 38 URLs (H1 genérico en SSR)
│   ├── Fichas Técnicas heredadas (/ficha-tecnica/*): 17 URLs (canibalización)
│   ├── Páginas de Marca (/productos/marca/*): 6 URLs (H1 genérico en SSR)
│   └── Páginas Institucionales / Calculadora / Blog: 13 URLs
```

---

## 4. Evidencia Técnica Detallada de los Hallazgos

### 🔴 Hallazgo 1: 135 Fichas de Producto devuelven HTTP 500 en Producción
- **Tipo de Problema**: Server-Side Crash / Desindexación Masiva.
- **URLs de Muestra**:
  - `https://electroflorperu.com/producto/campana-industrial-led-high-bay-force-100w-15-000lm-daxso`
  - `https://electroflorperu.com/producto/luminaria-led-high-bay-smartbright-by320p-200w-120-277v`
  - `https://electroflorperu.com/producto/cable-thw-90-plus-450-750v-14-awg-azul-100-metros-indeco`
- **Causa Raíz en Código**:
  En `app/producto/[id]/page.tsx` (desplegado en Netlify):
  1. `generateProductSku`: llama `product.brand.toUpperCase()` asumiendo que `product.brand` es un string. Cuando Sanity devuelve un objeto de referencia `{ name: '...', slug: '...' }`, lanza `TypeError: product.brand.toUpperCase is not a function`.
  2. `seoDescription`: procesa bloques de Sanity asumiendo `b.children.map()`. Si `children` o `text` no existen en un bloque vacío, lanza un error fatal en el servidor.
  3. `allImages`: hace `product.images.filter((img: string) => img !== mainImage)`. Si los ítems de `images` son objetos `{ asset: ... }`, falla.
- **Impacto**: Bloquea el 70% del sitio web para Googlebot y usuarios reales.

---

### 🔴 Hallazgo 2: 44 Categorías y Marcas con H1 idéntico en SSR (`EXPLORA NUESTROS PRODUCTOS`)
- **Tipo de Problema**: On-Page Relevance Dilution.
- **URLs de Muestra**:
  - `https://electroflorperu.com/productos/cables-y-conductores`
  - `https://electroflorperu.com/productos/reflectores`
  - `https://electroflorperu.com/productos/highbay`
  - `https://electroflorperu.com/productos/marca/philips`
- **Causa Raíz en Código**:
  En `components/ProductsPage.tsx`, el cálculo de `pageTitle` utiliza:
  ```tsx
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  useEffect(() => {
    // Solo se ejecuta en el navegador del cliente tras la hidratación
    if (categorySlug) setActiveCategory(cat.name);
  }, [...]);
  ```
  En el servidor (SSR que lee Googlebot), `activeCategory` siempre vale `null`. Por tanto, `pageTitle` cae en el fallback predeterminado:
  ```html
  <h1 class="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
    EXPLORA NUESTROS <span>PRODUCTOS</span>
  </h1>
  ```
- **Impacto**: Google no puede indexar el término principal de la categoría ("Cables Eléctricos", "Reflectores LED") en la etiqueta semántica más importante de la página.

---

### 🔴 Hallazgo 3: Canibalización y Fuga por `/ficha-tecnica/[slug]`
- **Tipo de Problema**: Duplicate / Thin Content & URL Cannibalization.
- **Evidencia GSC**:
  - Búsqueda: *"campana industrial led high bay force 100w"*
    - Posición 5.3: `/ficha-tecnica/campana-industrial-led-high-bay-force-100w-15-000lm-daxso` (1 clic, 10 impresiones)
    - Posición 9.7: `/producto/campana-industrial-led-high-bay-force-100w-15-000lm-daxso` (1 clic, 9 impresiones)
  - La URL `/ficha-tecnica/` no ofrece carrito, botón de WhatsApp, enlazado interno ni especificaciones legibles: es solo un iframe con un visor de PDF.
  - Además, se encontró indexada en GSC una URL con slug de un competidor:
    `/ficha-tecnica/https-electropakled-com-pe-campana-high-bay-led-200w-120-277v-6500k-ip65-negro-led280-wb-by320p`.
- **Impacto**: Canibaliza las páginas comerciales `/producto/`, empeora las conversiones de cotización y genera URLs huérfanas o con soft-404.

---

### ⚠️ Hallazgo 4: Calificaciones Falsas (`aggregateRating`) y FAQPage Restringido
- **Tipo de Problema**: Structured Data Guidelines Violation.
- **Evidencia en Código (`app/producto/[id]/page.tsx`)**:
  - Línea 191-197: Asigna `ratingValue: '4.9'` y `reviewCount: '12'` o `ratingValue: '4.8'` y `reviewCount: '1'` de forma estática en todos los productos sin que existan reseñas enviadas por usuarios en la web.
  - Línea 232: Inyecta `FAQPage` schema en productos. Desde agosto de 2023, Google Search restringió el rich result de FAQs únicamente a sitios gubernamentales y sanitarios de alta autoridad.
- **Impacto**: Incumple la directiva de "Deceptive Structured Data" de Google, arriesgando una acción manual o pérdida de elegibilidad para resultados enriquecidos.

---

### ⚠️ Hallazgo 5: Señales de Frescura en `sitemap.xml` Invalidada
- **Tipo de Problema**: Crawl Budget & Indexation Efficiency.
- **Evidencia en Código (`app/sitemap.ts`)**:
  - `export const dynamic = 'force-dynamic'` con `lastModified: new Date()` para todas las rutas estáticas.
  - Cada vez que Googlebot lee `sitemap.xml`, el `lastmod` tiene la hora exacta del segundo en que se hizo la petición.
  - En GSC, el sitemap registra el estado `Has warnings (1 warning)`.
- **Impacto**: Googlebot desconfía del valor `lastmod` y tiene que re-rastrear a ciegas o ignorar las fechas de actualización.

---

### ⚠️ Hallazgo 6: Optimización de Imágenes y Recursos Bloqueantes
- **Tipo de Problema**: Core Web Vitals (LCP, FCP).
- **Evidencia en Código**:
  - `next.config.mjs`: `images: { unoptimized: true }`. Las imágenes no se sirven comprimidas en formato moderno WebP/AVIF ni con tamaños adaptativos para móvil.
  - `app/layout.tsx`: `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" ... />` es un recurso bloqueante externo que añade latencia innecesaria al FCP.
- **Impacto**: Tiempos de carga más lentos en conexiones móviles 4G en Lima y provincias.

---

## 5. Datos de Tráfico Orgánico y Consultas en GSC (Últimos 28 Días)

- **Total Clics**: 113
- **Total Impresiones**: 2,386
- **CTR Medio**: 4.74%
- **Posición Media Global**: 19.3

### Clústeres de Intención Detectados:
1. **Marca Directa**:
   - `electro flor` (16 clics, 25 impresiones, CTR 64%, Pos 4.4 - Pos 1.4 en home).
2. **Luminarias Industriales / High Bay (Altísima Intención B2B)**:
   - `campana philips` (Pos 4.0), `campanas led industriales` (Pos 8.0), `by320p` (Pos 8.0), `high bay` (Pos 67.8), `high bay led` (Pos 57.2).
   - Oportunidad: Posiciones 4 a 12 con demanda corporativa para naves y almacenes.
3. **Cables y Conductores Eléctricos (Volumen Mayorista)**:
   - `cable indeco 14` (Pos 11.0), `cables` (Pos 62.7), `conductor electrico de 500v precio` (9 impresiones, Pos 24.1).
   - Activo complementario: `/calculadora-conductores-electricos` (58 impresiones, 2 clics, Pos 7.7).
4. **Iluminación Comercial y Decorativa**:
   - `lamparas colgantes` (66 impresiones, Pos 38.6), `focos colgantes` (35 impresiones, Pos 38.6), `foco led plano` (27 impresiones, Pos 42.7).
5. **Alumbrado Público y Exterior**:
   - `farolas led para parques` (5 impresiones, Pos 50.0), `brp110` (3 impresiones, Pos 11.0), `luces de emergencia` (110 impresiones, Pos 28.3).
