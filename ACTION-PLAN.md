# Plan de Acción Priorizado — Electro Flor Perú

- **Dominio**: `https://electroflorperu.com`
- **Puntuación de Auditoría Inicial**: **42 / 100** (🔴 Crítico)
- **Puntuación Proyectada Post-Implementación**: **85+ / 100** (✅ Bueno)
- **Fecha de Actualización**: 8 de septiembre de 2026

---

## Matriz de Priorización de Tareas

| ID | Prioridad | Área | Problema Detectado | Solución Técnica Implementada | Estado |
|---|:---:|---|---|---|:---:|
| **TECH-01** | 🔴 **P0 (Crítica)** | SEO Técnico | 135 Fichas de producto devuelven HTTP 500 en producción por excepciones de tipado en SSR. | Blindaje estricto de tipos en `app/producto/[id]/page.tsx` y fallbacks seguros en `ProductDetail.tsx`. | **RESUELTO EN CÓDIGO** (Listo para despliegue) |
| **ONPAGE-01**| 🔴 **P1 (Alta)** | On-Page | 44 Categorías y marcas muestran H1 idéntico en HTML inicial: `EXPLORA NUESTROS PRODUCTOS`. | Paso de props en servidor (`initialCategoryName`, `initialBrandName`) para SSR instantáneo del H1 real. | **RESUELTO EN CÓDIGO** |
| **ARCH-01** | 🔴 **P1 (Alta)** | Arquitectura | Páginas `/ficha-tecnica/[slug]` con pantalla en blanco en SSR ("Cargando...") y canibalización con PDPs. | Transformación en Landing Técnica completa con H1, datos SSR, visor PDF y CTAs de cotización por WhatsApp. | **RESUELTO EN CÓDIGO** |
| **SCHEMA-01**| ⚠️ **P1 (Alta)** | Schema.org | Marcado con calificaciones falsas (`aggregateRating` 4.8/4.9 inventado) y `FAQPage` restringido por Google. | Eliminación de calificaciones ficticias y esquema FAQ deprecado; inyección de `Organization` y `WebSite`. | **RESUELTO EN CÓDIGO** |
| **INDEX-01** | ⚠️ **P2 (Media)**| Indexación | Sitemap dinámico genera `lastModified: new Date()` en cada segundo, provocando warning en Search Console. | Estabilización de fechas de modificación en `app/sitemap.ts` usando fechas reales de actualización. | **RESUELTO EN CÓDIGO** |
| **CWV-01**   | ⚠️ **P2 (Media)**| Rendimiento | `images: { unoptimized: true }` y CSS externo bloqueante de FontAwesome demoran el LCP móvil. | Habilitación de optimización nativa de imágenes y eliminación de recursos bloqueantes en `app/layout.tsx`. | **PLANIFICADO** (Fase 2) |
| **CONT-01**  | ℹ️ **P3 (Media)**| Contenido | Falta de cobertura en términos transaccionales de cables, reflectores y campanas industriales. | Despliegue de los 4 Clústeres Temáticos detallados en `TOPIC-CLUSTERS.md`. | **EN EJECUCIÓN** (Fases 1-3) |

---

## Detalle de Implementaciones Ejecutadas

### 1. Blindaje de Fichas de Producto (TECH-01)
- **Archivos Modificados**: `app/producto/[id]/page.tsx` y `components/ProductDetail.tsx`
- **Efecto**: Elimina el fallo fatal 500 en el servidor. Todas las URLs de producto devuelven código HTTP 200 con contenido completo, metadata OpenGraph, canonical limpio y datos estructurados seguros.

### 2. Títulos y Encabezados Dinámicos en SSR (ONPAGE-01)
- **Archivos Modificados**: `components/ProductsPage.tsx`, `app/productos/[categorySlug]/page.tsx`, `app/productos/[categorySlug]/[subcategorySlug]/page.tsx`, `app/productos/marca/[brandSlug]/page.tsx`
- **Efecto**: Cada categoría renderiza desde el servidor un `<h1>` único y relevante (e.g. *"Cables y Conductores Eléctricos"*, *"Reflectores LED"*).

### 3. Potenciación de Fichas Técnicas (ARCH-01)
- **Archivos Modificados**: `app/ficha-tecnica/[slug]/page.tsx` y `components/FichaTecnicaPage.tsx`
- **Efecto**: Elimina el estado "Cargando..." en SSR. La página se convierte en una landing de especificaciones técnicas con visor PDF, botón de descarga directa y botón de cotización por WhatsApp con mensaje pre-llenado.

### 4. Saneamiento de Datos Estructurados (SCHEMA-01)
- **Archivos Modificados**: `app/producto/[id]/page.tsx` y `app/layout.tsx`
- **Efecto**: Se remueven calificaciones simuladas y se añade la entidad comercial `Organization` (`HomeAndConstructionBusiness`) con sede en Magdalena del Mar, Lima, geolocalización, teléfono y `sameAs`.

### 5. Estabilización de Sitemap (INDEX-01)
- **Archivos Modificados**: `app/sitemap.ts`
- **Efecto**: Resuelve los warnings de Search Console al reemplazar fechas arbitrarias por fechas estables y reales.
