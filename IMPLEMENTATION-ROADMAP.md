# Roadmap de Implementación SEO (0 a 90 Días) — Electro Flor Perú

Plan de acción por fases para consolidar el liderazgo orgánico en luminarias LED, cables y material ferretero en Perú.

---

## Fase 1: Estabilización Técnica y On-Page (Días 0 – 30)

### Objetivo:
Eliminar errores 500, recuperar indexación del 100% de productos y alinear la relevancia semántica en categorías principales.

### Tareas:
1. **Despliegue Inmediato de Fixes Críticos**:
   - Desplegar cambios de `app/producto/[id]/page.tsx` a producción para restaurar el acceso a las 135 fichas de producto.
   - Desplegar títulos dinámicos en SSR para categorías y marcas (`components/ProductsPage.tsx`).
2. **Monitoreo de Recrawl en Search Console**:
   - Solicitar indexación de las 10 PDPs prioritarias (Philips Highbay 100W, Cables Indeco 14 AWG, Reflector Macroled 400W, Farola Solar BRP110).
   - Verificar en GSC que disminuyan los errores de servidor a 0.
3. **Validación de Schema**:
   - Comprobar en Rich Results Test la validez de `Product`, `BreadcrumbList`, `Organization` y `WebSite`.
4. **Lanzamiento de las Fichas Técnicas Mejoradas**:
   - Publicar la nueva experiencia de `/ficha-tecnica/[slug]` con visor embebido y botón de cotización por WhatsApp.

---

## Fase 2: Expansión de Clústeres y Enlazado Interno (Días 31 – 60)

### Objetivo:
Posicionar las categorías comerciales en el Top 10 de Google Perú y capturar tráfico informativo de alta conversión.

### Tareas:
1. **Optimización de Snippets en Páginas de Categoría**:
   - Ajustar títulos y meta descriptions con diferenciadores peruanos (*"Stock en Lima"*, *"Distribuidor Mayorista"*, *"Envíos a Provincias"*).
2. **Publicación de Artículos Clave de Clúster**:
   - Publicar *"Guía de selección de High Bay LED para naves industriales"*.
   - Publicar *"Diferencias entre cable THW y NH-90 libre de halógenos según norma CNE"*.
   - Enlazar directamente a categorías y productos.
3. **Integración Cruzada con la Calculadora de Conductores**:
   - Conectar cada producto de cable Indeco con la `/calculadora-conductores-electricos`.
4. **Optimización de Imágenes y Rendimiento (CWV)**:
   - Migrar imágenes de Sanity a WebP optimizado nativo de Next.js.
   - Retirar hoja de estilos bloqueante de FontAwesome en `app/layout.tsx`.

---

## Fase 3: Escala, Autoridad y Captura B2B (Días 61 – 90)

### Objetivo:
Duplicar solicitudes de cotización orgánicas, capturar proyectos industriales en provincias y consolidar topical authority.

### Tareas:
1. **Páginas de Aplicación y Soluciones B2B**:
   - Crear páginas específicas para casos de uso:
     - `/soluciones/iluminacion-para-almacenes-y-galpones`
     - `/soluciones/material-electrico-para-obras-civiles`
2. **E-E-A-T y Respaldo Institucional**:
   - Incorporar perfiles de autores técnicos en el blog (Ingeniero electricista colegiado, especialista de producto).
   - Publicar casos de éxito de suministro eléctrico en proyectos reales en Lima y regiones.
3. **Revisión de Métricas en GSC (Cohorte 28 días)**:
   - Medir incremento de clics no marca en el Top 10.
   - Analizar tasa de conversión de visitantes a conversaciones de WhatsApp.
