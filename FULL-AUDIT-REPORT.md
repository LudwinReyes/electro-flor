# Reporte de Auditoría Completo

- URL: `https://electroflorperu.com/`
- Generado: `2026-07-24T23:11:49.794389`
- Puntuación General: `67/100`
- Confianza del Puntaje: `Alta`
- Versión de Puntuación: `1`

## Tarjeta de Puntuación (Score Card)

| Categoría | Peso | Puntuación |
| --- | ---: | ---: |
| Encabezados de Seguridad | 8 | 85 |
| Meta Social (OpenGraph) | 5 | 85 |
| Robots y Rastreadores | 8 | 90 |
| Enlaces Rotos | 10 | 100 |
| Enlaces Internos | 8 | 60 |
| Redirecciones | 3 | 100 |
| Búsqueda de IA (GEO / AEO) | 5 | 90 |
| Rendimiento y Core Web Vitals | 13 | 70 |
| SEO On-Page | 10 | 100 |
| Legibilidad | 8 | 0 |
| SEO de Entidades (Wikidata) | 5 | 0 |
| Perfil de Enlaces (Backlinks) | 7 | 55 |
| Hreflang | 5 | 0 |
| Unicidad de Contenido | 5 | 0 |

## Hallazgos

| Severidad | Área | Hallazgo | Evidencia | Solución / Estado |
| --- | --- | --- | --- | --- |
| Crítico | link_profile | 7 páginas huérfanas con cero enlaces internos entrantes. | Mapeado por auditoría. | Añadir enlaces internos desde páginas de contenido relevantes hacia estas páginas huérfanas. |
| Advertencia | environment | Falta 1 encabezado de seguridad. | La falta de encabezados reduce la confianza y puede exponer al sitio a riesgos de seguridad/navegador. | Configurar las cabeceras a través de la configuración del servidor o reglas del CDN. |
| Advertencia | environment | La legibilidad del contenido es difícil. | Textos largos y complejos pueden reducir el engagement y la comprensión. | Reescribir secciones clave con oraciones más cortas (15-20 palabras), párrafos más cortos (2-4 oraciones) y subtítulos claros. |
| Advertencia | internal_links | ⚠️ 16 páginas huérfanas potenciales (≤1 enlace interno apuntando a ellas) | Mapeado por auditoría. | Enlazar categorías principales y secundarias en el menú de navegación principal. |
| Advertencia | internal_links | ⚠️ 9 enlace(s) no tienen texto de anclaje (Anchor Text) | Iconos/imágenes sin texto alternativo o etiquetas de accesibilidad. | Añadir etiquetas `aria-label` descriptivas a los botones y enlaces sin texto de lectura. |
| Advertencia | readability | ⚠️ El contenido es difícil de leer (Flesch: 0) — puede reducir el engagement | Textos largos en algunas secciones. | Simplificar el vocabulario y acortar los enunciados. |
| Advertencia | readability | ⚠️ 40.7% de palabras complejas (3+ sílabas) — considera simplificar | Vocabulario excesivamente técnico. | Suavizar el vocabulario para un público general. |
| Advertencia | readability | ⚠️ Contenido delgado (81 palabras) — puede posicionar mal | Poca información en la Home. | Expandir los textos informativos en la Home sobre la propuesta de valor. |
| Advertencia | robots | ⚠️ 6 rastreadores de IA no están configurados de forma explícita: Applebot-Extended, Bytespider, CCBot, anthropic-ai, FacebookBot | Directivas robots.txt generalistas. | Agregar reglas explícitas de bloqueo o permiso en `robots.ts` para estos bots. |
| Advertencia | security | ⚠️ Falta 1 encabezado(s) de seguridad | Cabecera CSP o similar omitida. | Configurar directivas básicas de Content Security Policy (CSP). |
| Info | Wikidata | No se encontró ninguna entrada de Wikidata para 'Electro Flor E.I.R.L.'. | Sin ID de Wikidata. | Si la entidad cumple con las directrices de notoriedad de Wikidata, crea o mejora un elemento con referencias precisas. |
| Info | Wikipedia | No se encontró ningún artículo de Wikipedia para 'Electro Flor E.I.R.L.'. | Sin entrada en Wikipedia. | Solo buscar crear Wikipedia si cumple con notoriedad independiente. De lo contrario, fortalecer redes y schema. |
| Info | sameAs | Falta el enlace sameAs a Wikipedia (Señal principal del Grafo de Conocimiento). | Schema.org incompleto. | Añadir el enlace de Wikipedia al array `sameAs` de la schema Organization si se crea. |
| Info | sameAs | Falta el enlace sameAs a Wikidata (Señal principal del Grafo de Conocimiento). | Schema.org incompleto. | Añadir el enlace de Wikidata al array `sameAs` de la schema Organization si se crea. |
| Info | sameAs | Falta el enlace sameAs a LinkedIn (Señal fuerte del Grafo de Conocimiento). | Schema.org incompleto. | Añadir la URL del perfil de LinkedIn al array `sameAs` en layout.tsx. |
| Info | sameAs | Falta el enlace sameAs a Twitter/X (Señal fuerte del Grafo de Conocimiento). | Schema.org incompleto. | Añadir la URL del perfil de Twitter/X al array `sameAs` en layout.tsx. |

## Notas de Medición

Todas las comprobaciones configuradas se completaron sin errores a nivel de script.
