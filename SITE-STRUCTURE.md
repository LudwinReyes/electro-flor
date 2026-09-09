# Arquitectura de Información y Estructura de URLs — Electro Flor Perú

Una arquitectura limpia, predecible y jerárquica es fundamental para que Googlebot distribuya PageRank de manera eficiente y entienda las entidades del catálogo de luminarias y material eléctrico.

---

## 1. Jerarquía de URLs Recomendada

```
https://electroflorperu.com/
│
├── /productos                                (Directorio Principal de Catálogo)
│   ├── /productos/[categoria]                (Categorías Padre: e.g. /iluminacion, /cables-y-conductores)
│   │   └── /productos/[categoria]/[subcat]   (Subcategorías: e.g. /productos/iluminacion/highbay)
│   │
│   └── /productos/marca/[marca]              (Páginas de Marca: e.g. /productos/marca/philips)
│
├── /producto/[slug]                          (Fichas de Producto Únicas - PDP)
│
├── /calculadora-conductores-electricos       (Herramienta Interactiva / Lead Magnet)
│
├── /blog                                     (Centro de Recursos y Guías Técnicas)
│   └── /blog/[slug]                          (Artículos de Autoridad: e.g. /blog/como-elegir-un-high-bay-led)
│
└── /marcas, /nosotros, /contacto, /faq       (Páginas de Confianza Institucional y E-E-A-T)
```

---

## 2. Consolidación y Migración de `/ficha-tecnica/[slug]`

### Diagnóstico Actual:
Actualmente coexisten dos rutas para el mismo producto:
- `https://electroflorperu.com/producto/[slug]` (Página de producto)
- `https://electroflorperu.com/ficha-tecnica/[slug]` (Visor de PDF en iframe)

Esto ocasiona que Google indexe `/ficha-tecnica/` (que no tiene textos ni botones de compra) y compita contra la ficha de producto principal.

### Plan de Migración y Consolidación:
1. **Redirección 301 Permanente**:
   Configurar una regla de redirección en `next.config.mjs` o `middleware.ts`:
   ```
   Redirect: /ficha-tecnica/:slug  ==[301]==>  /producto/:slug
   ```
2. **Integración en la Ficha de Producto (`ProductDetail.tsx`)**:
   - En la ficha de producto `/producto/[slug]`, mantener la pestaña *"Ficha Técnica"* donde se muestra el botón *"Descargar Ficha Técnica Oficial (PDF)"* y el visor incrustado.
   - De esta manera, el usuario que busca la ficha técnica aterriza directamente en la página transaccional completa con opción de cotizar.

---

## 3. Jerarquía de Breadcrumbs (Migas de Pan)

Todas las páginas del catálogo deben reflejar una ruta de navegación precisa tanto visualmente como en su marcado `BreadcrumbList` JSON-LD:

### En Ficha de Producto:
```
Inicio > Catálogo > Iluminación > Campanas High Bay > Campana LED High Bay 100W Philips
```
- **Nivel 1**: `https://electroflorperu.com/`
- **Nivel 2**: `https://electroflorperu.com/productos`
- **Nivel 3**: `https://electroflorperu.com/productos/iluminacion`
- **Nivel 4**: `https://electroflorperu.com/productos/iluminacion/highbay`
- **Nivel 5**: `https://electroflorperu.com/producto/campana-led-industrial-philips-smartbright-highbay-g2-100w`

---

## 4. Política de Canonicals y Normalización de Dominio

1. **Protocolo y Dominio Canónico Único**:
   - Dominio preferido: `https://electroflorperu.com` (sin `www`, HTTPS forzado).
   - `https://www.electroflorperu.com/*` redirige con 308/301 a `https://electroflorperu.com/*`.
2. **Manejo de Trailing Slash**:
   - Next.js y Netlify están configurados sin barra diagonal final (`trailingSlash: false`).
   - Todos los canonicals deben emitirse sin barra final: `https://electroflorperu.com/productos/cables-y-conductores` (excepto la raíz `https://electroflorperu.com/`).
3. **Parámetros de Búsqueda y Filtrado**:
   - URLs con filtros (e.g. `?brand=philips&sort=price_asc`) deben declarar siempre como canonical la URL limpia de la categoría (`https://electroflorperu.com/productos/highbay`), evitando duplicación por facetas.
