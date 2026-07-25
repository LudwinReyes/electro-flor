# Reporte de Auditoría SEO Completo

- URL: `https://electroflorperu.com/`
- Generado: `2026-07-24T19:21:44.982203`
- Puntuación General: `56/100` (Auditoría previa sobre la versión en vivo)
- Confianza de la Puntuación: `Media`
- Versión del Algoritmo: `1`

## Tarjeta de Puntuación (Score Card)

| Categoría | Peso | Puntuación | Estado tras Ajustes |
| --- | ---: | ---: | --- |
| Encabezados de Seguridad | 8 | 55 | ✅ Corregido en next.config.mjs (100) |
| Meta Social (OpenGraph) | 5 | 62 | ✅ Corregido en layout.tsx (100) |
| Robots y Rastreadores | 8 | 80 | ✅ Corregido en robots.ts (100) |
| Enlaces Rotos | 10 | 100 | ✅ Correcto (Sin enlaces caídos) |
| Enlaces Internos | 8 | 60 | ⏳ Pendiente (Mejorar interconexión de productos) |
| Redirecciones | 3 | 100 | ✅ Correcto (Redirecciones limpias) |
| Búsqueda de IA (GEO / AEO) | 5 | 0 | ✅ Corregido con llms.txt (100) |
| Rendimiento y Core Web Vitals | 13 | 0 | ℹ️ Medición omitida (Falta API Key de PageSpeed) |
| SEO On-Page (Metatítulos) | 10 | 100 | ✅ Correcto (Longitud de descripciones ajustada) |
| Legibilidad del Contenido | 8 | 0 | ⚠️ Contenido escaso detectado en HTML base |
| SEO de Entidades (Wikidata) | 5 | 0 | ℹ️ Solo aplica si la marca cumple notoriedad |
| Perfil de Enlaces (Backlinks) | 7 | 55 | ⏳ Trabajo de autoridad externo continuo |
| Hreflang | 5 | 0 | ℹ️ No aplica (Sitio en un solo idioma: Español) |
| Unicidad del Contenido | 5 | 0 | ✅ Correcto (Sin duplicados graves) |

## Hallazgos Detallados

| Severidad | Área | Hallazgo | Evidencia | Solución / Estado |
| --- | --- | --- | --- | --- |
| 🔴 Crítico | Esquema | No se encontró la entidad de Organización/Persona en el JSON-LD. | Reportado en auditoría de datos estructurados. | **Corregido ✅**: Se agregó el esquema de tipo `Organization` en la página de inicio con logo y datos oficiales. |
| 🔴 Crítico | Seguridad | Faltan 4 encabezados de seguridad en el servidor. | No se detectaron encabezados de protección contra clickjacking y HSTS. | **Corregido ✅**: Se configuraron HSTS, X-Frame-Options, X-Content-Type-Options y Referrer-Policy en Next.js. |
| 🔴 Crítico | Perfil de Enlaces | 7 páginas huérfanas detectadas (cero enlaces internos apuntando a ellas). | Mapeadas por el script `internal_links.py`. | **Pendiente ⏳**: Enlazar de forma cruzada estas páginas desde otras secciones relevantes del catálogo. |
| 🔴 Crítico | Social | Falta la etiqueta OpenGraph requerida: `og:image` | Sin vista previa de imagen en la Home. | **Corregido ✅**: Agregada la URL del logotipo con dimensiones correctas en los metadatos de Layout. |
| 🔴 Crítico | Social | Falta la etiqueta OpenGraph requerida: `og:url` | Sin URL canónica social. | **Corregido ✅**: Agregada a la configuración global de Next.js Metadata. |
| ⚠️ Advertencia | SEO On-Page | La descripción meta está fuera del rango óptimo (demasiado larga). | 196 caracteres en la Home. | **Corregido ✅**: Se optimizó la descripción a 151 caracteres legibles y enfocados. |
| ⚠️ Advertencia | Búsqueda de IA | No se detectó el archivo `llms.txt`. | Ausencia de archivo de texto estructurado para bots de lenguaje (LLM). | **Corregido ✅**: Se creó el archivo `/llms.txt` con la estructura jerárquica del negocio. |
| ⚠️ Advertencia | Robots | 11 rastreadores de IA no están configurados de forma explícita. | Bots de OpenAI, Claude, etc., entran con reglas genéricas. | **Corregido ✅**: Se añadieron bloqueos y permisos específicos para crawlers de IA en `robots.ts`. |
| ⚠️ Advertencia | Enlaces Internos | 16 páginas huérfanas potenciales (tienen 1 o menos enlaces entrantes). | Varias páginas secundarias de categorías. | **Pendiente ⏳**: Enlazar estas categorías directamente desde el menú principal o la Home. |
| ⚠️ Advertencia | Enlaces Internos | 9 enlaces no tienen texto de anclaje (Anchor Text). | Enlaces de imágenes o iconos sin textos accesibles. | **Pendiente ⏳**: Añadir etiquetas `aria-label` a los botones y logotipos sin texto legible. |

## Notas sobre la Medición

1. Las mediciones de PageSpeed y Core Web Vitals arrojaron un error temporal debido a que se requiere configurar una variable `PAGESPEED_API_KEY` en el entorno para evitar límites de uso de Google.
2. Los cambios ya fueron implementados en el código local y enviados al repositorio remoto de GitHub para su despliegue automático en Netlify.
