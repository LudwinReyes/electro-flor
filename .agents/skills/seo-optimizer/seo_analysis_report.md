# Reporte de Auditoría y Análisis SEO - Electro Flor 🔍

Este reporte detalla el estado actual del SEO técnico del sitio web de **Electro Flor** e identifica puntos críticos de mejora para consolidar el posicionamiento en los primeros lugares de Google en Perú.

---

## 1. Lo que ya está bien implementado (Fortalezas)
* **Datos Estructurados (JSON-LD)**: 
  * Esquema de `Product` en la página de detalles de producto.
  * Esquema de `LocalBusiness` en la página de inicio (con datos de C.C. Nicolini).
  * Esquema de `SoftwareApplication` en la página de la Calculadora de Conductores Eléctricos.
* **Robots y Sitemap dinámico**: Configurados y funcionales.
* **Metadatos Dinámicos de Productos**: La página `app/producto/[id]/page.tsx` genera títulos y descripciones optimizados de manera dinámica usando datos de Sanity o constantes locales como fallback.
* **Calculadora Pro indexable**: Migrada con éxito a una página dedicada (`/calculadora-conductores-electricos`).

---

## 2. Puntos Críticos de Mejora Identificados ⚠️

A continuación se listan las debilidades SEO técnicas encontradas y su impacto en el posicionamiento:

### A. Títulos e Indexabilidad de Fichas Técnicas (`/ficha-tecnica/[slug]`)
* **Problema**: El archivo [page.tsx](file:///c:/Users/LENOVO/Downloads/electroflor/electro-flor/app/ficha-tecnica/[slug]/page.tsx) tiene un metadato estático:
  ```typescript
  export const metadata = { title: 'Ficha Técnica | Electro Flor' };
  ```
  Esto significa que **todas** las páginas de fichas técnicas de diferentes productos tendrán exactamente el mismo título. Google detectará esto como contenido duplicado/títulos duplicados y omitirá la indexación de la mayoría de ellas.
* **Impacto**: Alto. Impide que las búsquedas específicas de fichas técnicas (ej. *"ficha tecnica llave termica schneider 25a"*) posicionen en los primeros resultados.
* **Solución**: Cambiar a `generateMetadata` dinámico para consultar el producto y usar un título descriptivo: `Ficha Técnica: [Nombre del Producto] | Electro Flor`.

---

### B. Títulos Basados en Slugs Crudos en Páginas de Categoría y Marca
* **Problema**: Las páginas de categorías y marcas generan metadatos usando la conversión a mayúsculas del "slug" crudo:
  * Categorías: `title: `${categorySlug.toUpperCase()} | Electro Flor`` (ej. `CONDUCTORES-ELECTRICOS | Electro Flor`).
  * Subcategorías: `title: `${subcategorySlug.toUpperCase()} | ${categorySlug.toUpperCase()} | Electro Flor``.
  * Marcas: `title: `Marca: ${brandSlug.toUpperCase()} | Electro Flor`` (ej. `Marca: SCHNEIDER | Electro Flor`).
* **Impacto**: Medio-Alto. Los slugs crudos a menudo contienen guiones (`-`) y no son amigables para el usuario en la pestaña del navegador ni en los resultados de Google (SERP).
* **Solución**: Consultar Sanity CMS para obtener el nombre real de la categoría, subcategoría o marca, o al menos formatear el slug reemplazando guiones por espacios y aplicando capitalización adecuada.

---

### C. Imágenes no Optimizadas (Uso de `<img>` nativo)
* **Problema**: Aunque el plan inicial contemplaba migrar a `<Image>` de Next.js, aún quedan etiquetas `<img>` estándar en componentes críticos:
  * [page.tsx](file:///c:/Users/LENOVO/Downloads/electroflor/electro-flor/app/page.tsx#L143) (Banner promocional de portada).
  * [BrandsPage.tsx](file:///c:/Users/LENOVO/Downloads/electroflor/electro-flor/components/BrandsPage.tsx#L147) (Logos de marcas).
  * [ProductsPage.tsx](file:///c:/Users/LENOVO/Downloads/electroflor/electro-flor/components/ProductsPage.tsx#L435) (Logos de marcas).
  * [ProjectsGallery.tsx](file:///c:/Users/LENOVO/Downloads/electroflor/electro-flor/components/ProjectsGallery.tsx#L80) (Imágenes de la galería de proyectos).
  * [Footer.tsx](file:///c:/Users/LENOVO/Downloads/electroflor/electro-flor/components/Footer.tsx#L162) y [Header.tsx](file:///c:/Users/LENOVO/Downloads/electroflor/electro-flor/components/Header.tsx#L113) (Logotipos principales).
* **Impacto**: Medio. Incrementa el peso de la página y ralentiza el LCP (Largest Contentful Paint), afectando las métricas de velocidad (Core Web Vitals) de Google.
* **Solución**: Reemplazar estas etiquetas por el componente `<Image>` de `next/image` con las propiedades adecuadas de tamaño y *lazy loading*.

---

### D. URLs Canónicas Faltantes en Páginas Informativas
* **Problema**: Las siguientes páginas no tienen configurada su URL canónica (`alternates.canonical`):
  * [contacto/page.tsx](file:///c:/Users/LENOVO/Downloads/electroflor/electro-flor/app/contacto/page.tsx)
  * [faq/page.tsx](file:///c:/Users/LENOVO/Downloads/electroflor/electro-flor/app/faq/page.tsx)
  * [nosotros/page.tsx](file:///c:/Users/LENOVO/Downloads/electroflor/electro-flor/app/nosotros/page.tsx)
  * [marcas/page.tsx](file:///c:/Users/LENOVO/Downloads/electroflor/electro-flor/app/marcas/page.tsx)
  * [libro-de-reclamaciones/page.tsx](file:///c:/Users/LENOVO/Downloads/electroflor/electro-flor/app/libro-de-reclamaciones/page.tsx)
  * [productos/[categorySlug]/[subcategorySlug]/page.tsx](file:///c:/Users/LENOVO/Downloads/electroflor/electro-flor/app/productos/[categorySlug]/[subcategorySlug]/page.tsx)
* **Impacto**: Bajo-Medio. Posibilidad de que Google rastree parámetros o versiones duplicadas y diluya la autoridad de estas páginas.
* **Solución**: Añadir la propiedad `alternates: { canonical: '/su-ruta' }` a la metadata de cada una de estas páginas.

---

### E. Sitemap Incompleto (`app/sitemap.ts`)
* **Problema**: El sitemap dinámico genera los enlaces para el home, productos, categorías y marcas, pero no incluye las páginas estáticas del sitio:
  * `/nosotros`
  * `/contacto`
  * `/faq`
  * `/marcas`
  * `/libro-de-reclamaciones`
* **Impacto**: Medio. Google podría tardar más en indexar estas páginas secundarias indispensables para la confianza del sitio.
* **Solución**: Añadir las rutas estáticas al array retornado en [sitemap.ts](file:///c:/Users/LENOVO/Downloads/electroflor/electro-flor/app/sitemap.ts).

---

### F. Encabezado H1 oculto en Portada (`app/page.tsx`)
* **Problema**: La portada tiene un H1 invisible para los usuarios (`<h1 className="sr-only">...</h1>`).
* **Impacto**: Bajo. Google a veces resta valor a textos ocultos si sospecha de sobre-optimización (keyword stuffing).
* **Solución**: En su lugar, es más semántico y transparente envolver el logotipo o el título del Hero principal de forma que el `<h1>` sea visible y contenga la palabra clave principal de forma natural.

---

## 3. Plan de Acción Recomendado

1. **Corto Plazo (Urgente)**:
   * Hacer dinámicos los metadatos de las fichas técnicas (`/ficha-tecnica/[slug]`).
   * Optimizar los títulos de marcas y categorías para que no muestren slugs en mayúsculas con guiones.
   * Añadir las páginas estáticas faltantes al sitemap.
2. **Medio Plazo (Rendimiento)**:
   * Migrar los `<img>` restantes de Sanity/locales a `<Image>` de Next.js en Banners, Marcas, Galería y Footer/Header.
   * Configurar las URLs canónicas restantes en las páginas informativas.
