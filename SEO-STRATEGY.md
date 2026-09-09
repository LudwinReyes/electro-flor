# Plan Estratégico SEO Ecommerce — Electro Flor Perú

- **Dominio**: `https://electroflorperu.com`
- **Vertical**: Ecommerce & Catálogo de Cotización B2B/B2C (Luminarias LED, Conductores Eléctricos y Ferretería Eléctrica)
- **Mercado Primario**: Perú (Lima Metropolitana, Callao y Provincias)
- **Horizonte Temporal**: 90 días (Fases 0-30, 31-60 y 61-90 días)

---

## 1. Visión Estratégica y Propuesta de Valor

En el mercado ferretero y eléctrico del Perú existen dos tipos de competencia en Google:
1. **Grandes retailers generalistas (Sodimac, Promart, Maestro)**: Dominan búsquedas masivas retail de ticket bajo (focos comunes, cables domésticos por metros). Sin embargo, carecen de fichas técnicas detalladas para ingenieros, soporte de proyectos, venta de bobinas cerradas por mayor o marcas de grado industrial (Macroled, Daxso, Donilux, luminarias solares viales).
2. **Distribuidores eléctricos tradicionales (Electro Enchufe, Logan Electric, Promelsa, Ticino Perú)**: Poseen inventario técnico pero sus plataformas web suelen ser lentas, con catálogos en PDF estáticos o sin arquitectura SEO moderna.

### La Ventaja Competitiva de Electro Flor:
Electro Flor combina la agilidad de un ecommerce moderno en Next.js con la capacidad de **cotización mayorista directa e inmediata vía WhatsApp y carrito de cotización**, stock garantizado en Lima y envío inmediato. 

El objetivo del plan SEO es capturar la demanda de:
- **Contratistas e instaladores eléctricos**: Buscan modelos específicos (e.g. `campana high bay 100w philips`, `cable indeco thw 14 awg`, `luminaria brp110`).
- **Jefes de almacén y logística**: Buscan iluminación para galpones y naves industriales.
- **Empresas y constructoras**: Buscan cotización formal por volumen y cumplimiento de normativas técnicas peruanas (CNE, NTP, INDECI para luces de emergencia).

---

## 2. Mapa de Clústeres de Demanda y Posicionamiento

| Clúster | Intención Principal | Tipo de Consulta | URL Pilar / Objetivo | KPI Objetivo |
|---|---|---|---|---|
| **1. Iluminación Industrial (High Bay)** | Transaccional / Cotización B2B | `campanas led industriales`, `high bay led lima`, `campana philips 100w`, `by320p` | `/productos/highbay` y PDPs Philips/Daxso | Top 3 en Lima; 25+ cotizaciones/mes |
| **2. Conductores Eléctricos (Indeco)** | Transaccional Mayorista | `cable indeco 14 awg precio`, `conductor n2xoh 1kv`, `cables vulcanizados indeco` | `/productos/cables-y-conductores` | Top 5 en Lima; tráfico asistido por Calculadora |
| **3. Proyectores y Reflectores LED** | Transaccional / Comparativa | `reflector led 100w`, `reflector exterior 400w`, `reflector macroled` | `/productos/reflectores` | Top 5; incremento de 40% en impresiones |
| **4. Alumbrado Público y Solar** | B2B / Proyectos / Municipal | `luminaria solar all in one`, `farolas led para parques`, `brp110 philips` | `/productos/iluminacion/luminarias-publicas` | Captura de proyectos en provincias |
| **5. Luces de Emergencia (INDECI)** | Cumplimiento Normativo | `luces de emergencia opalux`, `lamparas de emergencia certificadas`, `opalux 8 horas` | `/productos/luces-de-emergencia` | Top 5; consultas estacionales de inspección |
| **6. Herramientas de Cálculo y Soporte** | Informativo / Lead Magnet | `calculadora de caida de tension`, `tabla calibre conductores electricos peru` | `/calculadora-conductores-electricos` | 500+ visitas orgánicas mensuales |

---

## 3. Principios de Optimización de Snippets y CTR en Perú

Para maximizar clics sin depender exclusivamente de subir posiciones en el ranking:

1. **Inclusión de Términos Transaccionales Peruanos**:
   - Incorporar en `<title>` y meta descriptions términos que aumentan el CTR en compradores peruanos: *"Stock en Lima"*, *"Precios por Mayor"*, *"Envíos a Todo el Perú"*, *"Ficha Técnica & Certificado"*, *"Cotiza al Instante"*.
2. **Especificación Técnica en el Title (Evitar Títulos Vagos)**:
   - *Antes*: `Campana LED Industrial | Electro Flor`
   - *Optimizado*: `Campana LED High Bay 100W Philips (13,000 lm) IP65 | Stock en Lima | Electro Flor`
3. **Alineación del H1 con la Promesa del Snippet**:
   - Cada página de categoría debe tener un H1 claro que confirme al usuario que llegó a la sección correcta (e.g. `<h1>Campanas LED Industriales High Bay</h1>`), eliminando el texto genérico actual.
4. **Respuesta Rápida a la Intención de Compra**:
   - El primer viewport (above-the-fold) debe mostrar filtros por potencia (50W, 100W, 150W, 200W), marca (Philips, Daxso, Macroled) y botón de *"Cotizar por WhatsApp en 5 minutos"*.

---

## 4. Estrategia de Conversión: Ecommerce Híbrido (Catálogo + Cotización)

Dado que los productos ferreteros y eléctricos industriales oscilan frecuentemente por tipo de cambio del cobre o volumen de compra, la plataforma opera de forma excelente como catálogo con cotización:

- **Política de Precios**:
  - En productos con precio fijo de venta minorista: Mostrar precio en Soles (S/.) y habilitar marcado `Offer.price`.
  - En productos de grado industrial / proyectos sin precio público: No inventar `Offer.price` en Schema.org; utilizar `Product` con atributos técnicos (`additionalProperty`: Potencia, Lúmenes, Grado IP, Material) y un CTA prominente de *"Solicitar Cotización por Mayor"*.
- **Enlace Estratégico de la Calculadora de Conductores**:
  - La herramienta `/calculadora-conductores-electricos` es el activo de enlazado interno más potente del sitio. Cada ficha de producto de cable Indeco debe tener un banner o enlace contextual: *"¿No estás seguro del calibre requerido? Usa nuestra Calculadora de Conductores según la norma CNE"*.
  - A su vez, los resultados de la calculadora deben recomendar directamente los cables Indeco disponibles en catálogo con botón de cotización.

---

## 5. Metas y KPIs a 3 Meses

| Métrica | Línea Base Actual | Meta a 30 Días | Meta a 60 Días | Meta a 90 Días |
|---|:---:|:---:|:---:|:---:|
| **URLs con HTTP 500** | 135 URLs | **0 URLs (100% resuelto)** | 0 URLs | 0 URLs |
| **Páginas Indexables Válidas** | ~57 URLs | 185+ URLs | 220+ URLs | 250+ URLs |
| **Impresiones Mensuales GSC** | 2,386 | 4,500 | 8,000 | 15,000 |
| **Clics Orgánicos Mensuales** | 113 | 250 | 500 | 1,000+ |
| **Posiciones en Top 10 (Perú)** | 18 consultas | 35 consultas | 70 consultas | 120 consultas |
| **Solicitudes de Cotización Web**| Línea base | +50% | +120% | +250% |
