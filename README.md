# ⚡ ELECTRO FLOR - Material Eléctrico e Iluminación

![ELECTRO FLOR](https://img.shields.io/badge/ELECTRO%20FLOR-Material%20El%C3%A9ctrico-002D62?style=for-the-badge&logo=lightning&logoColor=8CC63F)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Sanity CMS](https://img.shields.io/badge/Sanity-CMS-F03E2F?style=flat-square&logo=sanity)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

> Plataforma web profesional para distribución de material eléctrico con sistema de cotización integrado y CMS headless.

---

## 🌟 Características

✅ **Sistema de Cotización en Tiempo Real** - WhatsApp Business integrado
✅ **Catálogo Dinámico** - Productos administrables desde Sanity CMS
✅ **Asistente IA** - Chat inteligente con Gemini AI
✅ **Calculadora de Cables** - Herramienta técnica para electricistas
✅ **Responsive Design** - Optimizado para móviles y tablets
✅ **Entrega el Mismo Día** - Sistema de urgencia para pedidos
✅ **Galería de Proyectos** - Showcasing de instalaciones realizadas
✅ **SEO Optimizado** - Meta tags y URLs amigables

---

## 🚀 Quick Start (5 minutos)

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Cuenta en [Sanity.io](https://www.sanity.io/) (gratis)

### Instalación

```bash
# 1. Instalar dependencias del frontend
npm install

# 2. Instalar dependencias de Sanity CMS
npm install @sanity/client@latest sanity @sanity/vision @sanity/icons

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus claves (ver instrucciones abajo)

# 4. Iniciar el proyecto
npm run dev

# 5. En otra terminal, iniciar Sanity Studio
cd sanity
npx sanity dev
```

### URLs
- **Frontend**: `http://localhost:3001` (o 5173 si 3000 está libre)
- **Sanity Studio**: `http://localhost:3333`

---

## 🔧 Configuración

### 1. Variables de Entorno

Edita el archivo `.env`:

```env
# Sanity CMS (obtener en https://www.sanity.io/manage)
VITE_SANITY_PROJECT_ID=tu-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01

# Gemini AI (obtener en https://makersuite.google.com/app/apikey)
VITE_GEMINI_API_KEY=tu-api-key
```

### 2. Configurar Sanity Project ID

1. Ir a [Sanity Manage](https://www.sanity.io/manage)
2. Crear un nuevo proyecto
3. Copiar el **Project ID**
4. Editar `sanity/sanity.config.ts` línea 17:
   ```typescript
   projectId: 'abc123xyz', // ← Tu Project ID aquí
   ```

### 3. Poblar Datos Iniciales

Abrir Sanity Studio (`http://localhost:3333`) y crear:
- ⚙️ Configuración del Sitio (colores, contacto, redes)
- 🏷️ Categorías (Iluminación, Conductores, etc.)
- 🏢 Marcas (Bticino, Nexans, Schneider, etc.)
- 📦 Productos (nombre, código, imagen, specs)
- 🏗️ Proyectos Destacados
- ❓ FAQs

Ver guía completa: [`INSTALACION_SANITY.md`](./INSTALACION_SANITY.md)

---

## 📁 Estructura del Proyecto

```
electro-flor/
├── components/          # Componentes de React
│   ├── Header.tsx       # Navegación principal
│   ├── Footer.tsx       # Footer con enlaces
│   ├── ProductCard.tsx  # Tarjeta de producto
│   ├── ProductDetail.tsx# Detalle de producto
│   ├── QuoteCart.tsx    # Carrito de cotización
│   ├── Assistant.tsx    # Chat con IA
│   └── ...
├── services/
│   ├── sanity.ts        # API de Sanity (16 funciones)
│   └── gemini.ts        # Integración con Gemini AI
├── sanity/              # Configuración de Sanity CMS
│   ├── sanity.config.ts # Config principal
│   ├── structure.ts     # Menú del Studio
│   └── schemas/         # Schemas de contenido (10 tipos)
│       ├── product.ts   # Schema de productos
│       ├── category.ts  # Schema de categorías
│       ├── brand.ts     # Schema de marcas
│       ├── project.ts   # Schema de proyectos
│       ├── siteSettings.ts    # Config global (Singleton)
│       ├── headerSettings.ts  # Config del header
│       ├── footerSettings.ts  # Config del footer
│       ├── homePage.ts        # Página de inicio
│       ├── aboutPage.ts       # Página "Nosotros"
│       └── faqPage.ts         # Preguntas frecuentes
├── config.ts            # Configuración centralizada
│   ├── BRAND_COLORS     # Sistema de colores
│   ├── CONTACT_INFO     # Teléfonos, emails, dirección
│   ├── SITE_MESSAGES    # Mensajes de WhatsApp y CTAs
│   └── SITE_FEATURES    # Features del sitio
├── .env.example         # Template de variables
└── README.md            # Este archivo
```

---

## 🎨 Sistema de Colores

Todos los colores están centralizados en `config.ts`:

```typescript
import { BRAND_COLORS } from './config'

// Primario (Azul marino)
BRAND_COLORS.primary.DEFAULT   // #002D62
BRAND_COLORS.primary.dark      // #001d3d
BRAND_COLORS.primary.light     // #003d82

// Secundario (Verde lima)
BRAND_COLORS.secondary.DEFAULT // #8CC63F
BRAND_COLORS.secondary.dark    // #7ab32f
BRAND_COLORS.secondary.light   // #a0d355
```

Ver guía completa: [`GUIA_COLORES.md`](./GUIA_COLORES.md)

---

## 📦 Schemas de Sanity CMS

### Contenido Principal
- 📦 **Product** - Productos con imágenes, specs, precios
- 🏷️ **Category** - Categorías con iconos y orden
- 🏢 **Brand** - Marcas con logos
- 🏗️ **Project** - Proyectos destacados con fotos

### Configuración (Singletons)
- ⚙️ **Site Settings** - Config global del sitio
- 📋 **Header Settings** - Menú de navegación
- 🔽 **Footer Settings** - Footer con enlaces

### Páginas (Singletons)
- 🏠 **Home Page** - Contenido de página de inicio
- ℹ️ **About Page** - Página "Nosotros"
- ❓ **FAQ Page** - Preguntas frecuentes (múltiple)

---

## 🔌 API de Sanity

16 funciones disponibles en `services/sanity.ts`:

```typescript
// Productos
getProducts()              // Todos los productos
getProductBySlug(slug)     // Un producto específico
getFeaturedProducts(limit) // Productos destacados

// Categorías
getCategories()            // Todas las categorías
getCategoryBySlug(slug)    // Categoría con productos

// Marcas
getBrands()                // Todas las marcas
getBrandBySlug(slug)       // Marca con productos

// Proyectos
getProjects()              // Proyectos destacados

// Configuración
getSiteSettings()          // Config del sitio
getHeaderSettings()        // Config del header
getFooterSettings()        // Config del footer

// Páginas
getHomePage()              // Contenido de inicio
getAboutPage()             // Contenido "Nosotros"
getFAQs()                  // Todas las FAQs
getFAQsByCategory(cat)     // FAQs por categoría
```

---

## 📚 Documentación Completa

| Archivo | Descripción |
|---------|-------------|
| [`QUICK_START.md`](./QUICK_START.md) | 🚀 Guía rápida de 5 minutos |
| [`INSTALACION_SANITY.md`](./INSTALACION_SANITY.md) | 📦 Guía paso a paso de Sanity CMS |
| [`GUIA_COLORES.md`](./GUIA_COLORES.md) | 🎨 Sistema de colores y uso |
| [`RESUMEN_CAMBIOS.md`](./RESUMEN_CAMBIOS.md) | ✅ Resumen de todos los cambios |
| [`TODO.md`](./TODO.md) | 📋 Tareas pendientes con tiempos |
| [`PROBLEMAS_SANITY.md`](./PROBLEMAS_SANITY.md) | 🔍 Análisis de problemas resueltos |

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Biblioteca de UI
- **TypeScript** - Type safety
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Utility-first CSS
- **React Router** - Navegación SPA
- **Font Awesome** - Sistema de iconos

### Backend/CMS
- **Sanity CMS** - Headless CMS
- **Sanity Studio** - Panel de administración
- **@sanity/client** - Cliente de API

### Integraciones
- **Gemini AI** - Asistente inteligente
- **WhatsApp Business** - Sistema de cotización
- **Google Maps** - Ubicación

---

## 📊 Estado del Proyecto

```
████████████████████░░░░  80% COMPLETADO

✅ Refactorización completa
✅ Sistema de colores centralizado
✅ Configuración centralizada
✅ 10 schemas de Sanity
✅ 16 funciones de API
✅ Documentación completa
✅ 10 componentes refactorizados

⏳ Instalar Sanity
⏳ Poblar datos iniciales
⏳ Refactorizar últimos 5-6 componentes
⏳ Testing final
```

**Tiempo restante estimado**: 2-3 horas

---

## 🎯 Próximos Pasos

1. ✅ Instalar dependencias de Sanity
2. ✅ Crear proyecto en Sanity.io
3. ✅ Configurar Project ID
4. ⏳ Poblar datos iniciales en Studio
5. ⏳ Refactorizar componentes restantes
6. ⏳ Testing completo

Ver [`TODO.md`](./TODO.md) para checklist detallado.

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abrir un Pull Request

---

## 📄 Licencia

Este proyecto es privado y pertenece a ELECTRO FLOR.

---

## 📞 Contacto

**ELECTRO FLOR**
- 📍 Av. Argentina 245, Lima, Perú
- 📱 WhatsApp: [+51 999 000 000](https://wa.me/51999000000)
- 📧 Email: ventas@electroflor.com
- 🌐 Web: [www.electroflor.com](https://www.electroflor.com)
- 📘 Facebook: [/electroflor](https://facebook.com/electroflor)
- 📸 Instagram: [@electroflor](https://instagram.com/electroflor)

---

## 🎓 Recursos de Aprendizaje

### Sanity CMS
- [Documentación Oficial](https://www.sanity.io/docs)
- [Sanity Studio](https://www.sanity.io/studio)
- [GROQ Query Language](https://www.sanity.io/docs/groq)

### React + TypeScript
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/)

---

## 🐛 Troubleshooting

### Error: "Cannot find module '@sanity/client'"
```bash
npm install @sanity/client@latest
```

### Error: "projectId is required"
Configurar Project ID en `sanity/sanity.config.ts`

### Los datos de Sanity no se muestran
1. Verificar que los documentos estén **publicados** en Sanity Studio
2. Verificar Project ID correcto
3. Ver consola del navegador por errores

Ver más soluciones: [`INSTALACION_SANITY.md`](./INSTALACION_SANITY.md) → Sección Troubleshooting

---

<div align="center">

**Hecho con ⚡ por el equipo de ELECTRO FLOR**

![ELECTRO FLOR Logo](https://img.shields.io/badge/LA%20FUERZA%20DE%20TU-CONSTRUCCI%C3%93N-8CC63F?style=for-the-badge&labelColor=002D62)

</div>
