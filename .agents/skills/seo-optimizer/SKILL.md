---
name: seo-optimizer
description: Guía de optimización y mantenimiento SEO para el proyecto Electro Flor. Úsalo para asegurar que todos los componentes, páginas, metadatos y esquemas JSON-LD sigan las mejores prácticas de posicionamiento web en Google.
---

# Guía de Optimización SEO - Electro Flor

Este skill define las directrices y estándares SEO para el desarrollo y mantenimiento del sitio web de Electro Flor en Next.js. Cualquier modificación o nuevo desarrollo debe respetar y aplicar las reglas documentadas aquí.

## 1. Datos Estructurados (JSON-LD)
Para ayudar a Google a comprender el contenido de la web, cada tipo de página debe implementar su respectivo esquema JSON-LD:

- **Página de Producto (`app/producto/[id]/page.tsx`)**: Debe incluir el esquema de `Product` y `BreadcrumbList` que extraiga dinámicamente los datos de Sanity CMS:
  - Nombre, imágenes, descripción comercial.
  - Marca (`brand`), código o SKU (`sku`).
  - Oferta (`offers`) con URL canonical, disponibilidad (`InStock` / `OutOfStock`) y condición de nuevo.
- **Página de Inicio (`app/page.tsx`)**: Debe incluir el esquema `LocalBusiness` con la información física de la tienda en el C.C. Nicolini (Lima, Perú), horario de atención, teléfonos y coordenadas geográficas.
- **Herramientas Interactivas (ej: Calculadora de Conductores)**: Debe incluir el esquema `SoftwareApplication` indicando la categoría, sistema operativo ("All") y propósito.

## 2. URLs Canónicas
Todas las páginas (dinámicas y estáticas) deben especificar su URL canónica para evitar contenido duplicado:
- Utilizar el objeto `metadata` de Next.js.
- Configurar el campo `alternates.canonical` dinámicamente apuntando a `https://electroflorperu.com/...`.

## 3. Jerarquía Web (Encabezados H1-H6)
- **Regla de Oro**: Solo debe existir **un único elemento `<h1>`** por página.
- El `<h1>` debe contener palabras clave principales del contenido (por ejemplo, el nombre exacto del producto o el título principal de la herramienta).
- Utilizar `<h2>` para secciones secundarias y `<h3>` para sub-secciones. No saltarse niveles en la jerarquía.

## 4. Optimización de Imágenes
- Utilizar siempre el componente `<Image>` de `next/image` en lugar de la etiqueta nativa `<img>`.
- Proporcionar dimensiones explícitas (`width` y `height`) o usar la propiedad `fill`.
- **Obligatorio**: Cada imagen debe tener un atributo `alt` descriptivo que incorpore de forma natural la palabra clave (ej. "Llave térmica Schneider 2P 25A en Electro Flor").

## 5. Indexabilidad de Nuevas Páginas y Sitemap
- Cualquier nueva herramienta o página clave de conversión debe ser una ruta estática o dinámica dedicada (no modales) para que Google la pueda indexar.
- Actualizar `app/sitemap.ts` para incluir dinámicamente las rutas estáticas principales y los datos dinámicos de productos, marcas y categorías provenientes del CMS.
- Configurar el archivo `app/robots.ts` para permitir el rastreo de todo el sitio, apuntando correctamente al sitemap generado.
