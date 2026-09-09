# Reporte Especializado de Marcado Schema.org (JSON-LD)

- **URL Evaluada**: `https://electroflorperu.com`
- **Fecha**: `2026-09-08T00:27:56.193847`
- **Bloques JSON-LD Detectados**: `2`

## 1. Bloques de Schema Detectados en el DOM

### Bloque 1: `@HardwareStore`
```json
{
  "@context": "https://schema.org",
  "@type": "HardwareStore",
  "name": "Electro Flor E.I.R.L.",
  "alternateName": "Electro Flor",
  "image": "https://electroflorperu.com/media/Logo%20Electro%20Flor.png",
  "@id": "https://electroflorperu.com/#localbusiness",
  "url": "https://electroflorperu.com",
  "telephone": [
    "+51 948 198 701",
    "+51 904 162 516"
  ],
  "email": [
    "ventas.electroflor@gmail.com",
    "elmervazquezguevara@gmail.com"
  ],
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Argentina 245, Pasaje 2, Puesto AR12, Centro Comercial Nicolini",
    "addressLocality": "Cercado de Lima",
    "addressRegion": "Lima",
    "postalCode": "15082",
    "addressCountry": "PE"
  },
  "hasMap": "https://share.google/huOv6gxoYpjgx7mXa",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "08:30",
    "closes": "19:30"
  },
  "sameAs": [
    "https://www.facebook.com/p/Electro-Flor-EIRL-61552203052431/"
  ],
  "vatID": "10773519523"
}
```

### Bloque 2: `@Organization`
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://electroflorperu.com/#organization",
  "name": "Electro Flor E.I.R.L.",
  "alternateName": "Electro Flor",
  "url": "https://electroflorperu.com",
  "logo": "https://electroflorperu.com/media/Logo%20Electro%20Flor.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+51 948 198 701",
    "contactType": "sales",
    "areaServed": "PE",
    "availableLanguage": "Spanish"
  },
  "sameAs": [
    "https://www.facebook.com/p/Electro-Flor-EIRL-61552203052431/"
  ]
}
```

## 2. Estado de Tipos de Schema (Directrices Google 2025/2026)

- **Activos y Recomendados**: `Organization`, `LocalBusiness`, `Product`, `ProductGroup`, `Offer`, `BreadcrumbList`, `WebSite`, `Article`, `NewsArticle`, `VideoObject`, `ImageObject`.
- **Sin Rich Results (Mantener solo si es útil)**: `FAQPage` (Google retiró rich results globales para FAQ en mayo de 2026; usar `QAPage` para preguntas y respuestas de usuarios reales).
- **Deprecados (Nunca implementar)**: `HowTo` (retirado sep 2023), `SpecialAnnouncement` (jul 2025), `CourseInfo`, `EstimatedSalary`, `ClaimReview`.

## 3. Plantillas Schema JSON-LD Recomendadas para Implementar

### A. Schema de Organización (`Organization`)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "electroflorperu.com",
  "url": "https://electroflorperu.com",
  "logo": "https://electroflorperu.com/logo.png",
  "sameAs": [
    "https://facebook.com/ejemplo",
    "https://instagram.com/ejemplo",
    "https://linkedin.com/company/ejemplo"
  ]
}
</script>
```

### B. Schema de Sitio Web con Búsqueda Interna (`WebSite`)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "electroflorperu.com",
  "url": "https://electroflorperu.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://electroflorperu.com/buscar?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

### C. Migas de Pan (`BreadcrumbList`)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://electroflorperu.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Secci\u00f3n",
      "item": "https://electroflorperu.com/seccion"
    }
  ]
}
</script>
```

