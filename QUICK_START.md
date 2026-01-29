# 🚀 QUICK START - Guía Rápida de 5 Minutos

## ¿Qué se ha hecho hasta ahora?

✅ **Refactorización completa del código**:
- Cambio de marca: "Electropakled" → "ELECTRO FLOR"
- Sistema de colores centralizado en `config.ts`
- Información de contacto centralizada
- 10 componentes refactorizados

✅ **Sanity CMS configurado al 100%**:
- 10 schemas creados (productos, categorías, marcas, proyectos, páginas, FAQs)
- Sanity Studio listo para usar
- 16 funciones de API para obtener datos
- Documentación completa

## ¿Qué falta por hacer?

⏳ **Solo 3 cosas** (2-3 horas de trabajo):

1. **Instalar Sanity y configurar Project ID** (10 min)
2. **Poblar datos iniciales en Sanity Studio** (1-2 horas)
3. **Refactorizar últimos 5-6 componentes** (30-60 min)

---

## 🎯 EMPEZAR AHORA (3 Comandos)

### Paso 1: Instalar Sanity
```powershell
npm install @sanity/client@latest sanity @sanity/vision @sanity/icons
```

### Paso 2: Crear proyecto en Sanity
1. Ir a: [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Crear nuevo proyecto
3. Copiar tu **Project ID**

### Paso 3: Configurar Project ID
Editar archivo `sanity/sanity.config.ts` línea 17:
```typescript
projectId: 'abc123xyz', // ← Pegar tu Project ID aquí
```

### Paso 4: Iniciar Sanity Studio
```powershell
cd sanity
npx sanity dev
```

Se abrirá en: `http://localhost:3333`

---

## 📚 DOCUMENTACIÓN DISPONIBLE

| Archivo | Para qué sirve |
|---------|----------------|
| `GUIA_COLORES.md` | Cómo usar el sistema de colores |
| `PROBLEMAS_SANITY.md` | Qué problemas se identificaron y solucionaron |
| `INSTALACION_SANITY.md` | Guía paso a paso de Sanity (detallada) |
| `RESUMEN_CAMBIOS.md` | Resumen completo de todo lo hecho |
| `TODO.md` | Lista de tareas pendientes con tiempos |
| `.env.example` | Template de variables de entorno |

---

## 🎨 CONFIGURACIÓN CENTRALIZADA

### Todos los valores importantes están en `config.ts`:

```typescript
// COLORES
import { BRAND_COLORS } from './config'
BRAND_COLORS.primary.DEFAULT  // #002D62
BRAND_COLORS.secondary.DEFAULT // #8CC63F

// CONTACTO
import { CONTACT_INFO } from './config'
CONTACT_INFO.phone.display     // "999 000 000"
CONTACT_INFO.phone.whatsapp    // "51999000000"
CONTACT_INFO.email.main        // "ventas@electroflor.com"
CONTACT_INFO.address.full      // "Av. Argentina 245, Lima"

// MENSAJES
import { SITE_MESSAGES } from './config'
SITE_MESSAGES.whatsapp.greeting
SITE_MESSAGES.cta.quote
SITE_MESSAGES.sections.featured
```

---

## 🗂️ SCHEMAS DE SANITY CREADOS

| Schema | Tipo | Qué gestiona |
|--------|------|--------------|
| `product` | Múltiple | Productos con imágenes, specs, precios |
| `category` | Múltiple | Categorías con iconos |
| `brand` | Múltiple | Marcas con logos |
| `project` | Múltiple | Proyectos destacados con fotos |
| `faqPage` | Múltiple | Preguntas frecuentes |
| `siteSettings` | **Singleton** | Config global (colores, contacto) |
| `headerSettings` | **Singleton** | Menú de navegación |
| `footerSettings` | **Singleton** | Footer del sitio |
| `homePage` | **Singleton** | Contenido de inicio |
| `aboutPage` | **Singleton** | Contenido de "Nosotros" |

**Singleton** = Solo una instancia (documento único)
**Múltiple** = Pueden crear muchos documentos

---

## 📦 FUNCIONES DE API DISPONIBLES

Ya puedes usar estas funciones en tus componentes:

```typescript
import {
  getProducts,           // Todos los productos
  getProductBySlug,      // Un producto específico
  getFeaturedProducts,   // Productos destacados
  getCategories,         // Todas las categorías
  getCategoryBySlug,     // Una categoría específica
  getBrands,             // Todas las marcas
  getBrandBySlug,        // Una marca específica
  getProjects,           // Proyectos destacados
  getSiteSettings,       // Configuración del sitio
  getHeaderSettings,     // Config del header
  getFooterSettings,     // Config del footer
  getHomePage,           // Contenido de inicio
  getAboutPage,          // Contenido de "Nosotros"
  getFAQs,               // Todas las FAQs
  getFAQsByCategory,     // FAQs por categoría
} from './services/sanity'
```

### Ejemplo de uso:
```typescript
import { useState, useEffect } from 'react'
import { getProducts } from '../services/sanity'

function MyComponent() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts().then(data => {
      if (data) setProducts(data)
    })
  }, [])

  return (
    <div>
      {products.map(product => (
        <div key={product._id}>{product.name}</div>
      ))}
    </div>
  )
}
```

---

## 🔄 WORKFLOW RECOMENDADO

### 1. Primero: Configurar Sanity (30 min)
```
Instalar → Crear proyecto → Configurar ID → Iniciar Studio
```

### 2. Segundo: Poblar datos (1-2 horas)
```
Categorías → Marcas → Productos → Proyectos → FAQs → Páginas
```
*Puedes hacerlo gradualmente. No necesitas crear todo de una vez.*

### 3. Tercero: Refactorizar componentes restantes (1 hora)
```
ContactPage → App.tsx → PriceListModal → gemini.ts → FaqPage → AboutUsPage
```

### 4. Cuarto: Integrar frontend con Sanity (1 hora)
```
ProductsPage → Hero → Otros componentes que necesites
```

### 5. Quinto: Testing (30 min)
```
Verificar todo funcione → Sin errores → WhatsApp links OK → Responsive OK
```

---

## ⚡ CAMBIOS RÁPIDOS SIN CÓDIGO

Después de configurar Sanity, podrás cambiar desde el Studio (sin tocar código):

✅ **Agregar/editar productos**
✅ **Cambiar precios y descripciones**
✅ **Actualizar imágenes**
✅ **Modificar categorías**
✅ **Cambiar contenido de páginas**
✅ **Agregar/editar FAQs**
✅ **Actualizar proyectos**
✅ **Cambiar menú de navegación**
✅ **Modificar footer**
✅ **Actualizar información de contacto**

---

## 🎯 OBJETIVO FINAL

**Tener un sitio web 100% administrable** donde:
- Cambiar contenido = Entrar a Sanity Studio
- Sin necesidad de editar código
- Sin necesidad de hacer deployments para contenido
- Todo centralizado y consistente

---

## 🆘 ¿ATASCADO?

### Error común #1: "Cannot find module '@sanity/client'"
**Solución**: `npm install @sanity/client@latest`

### Error común #2: "projectId is required"
**Solución**: Configurar tu Project ID en `sanity/sanity.config.ts`

### Error común #3: No se ven los datos de Sanity
**Solución**: 
1. Verificar que los documentos estén **publicados** en Sanity Studio
2. Verificar que el Project ID sea correcto
3. Ver la consola del navegador por errores

### Más ayuda:
Ver `INSTALACION_SANITY.md` sección "Troubleshooting"

---

## 🚀 SIGUIENTE PASO

**Ejecutar estos 3 comandos ahora**:

```powershell
# 1. Instalar dependencias
npm install @sanity/client@latest sanity @sanity/vision @sanity/icons

# 2. Ir a sanity.io y crear proyecto (anotar Project ID)

# 3. Iniciar Studio
cd sanity
npx sanity dev
```

Luego abrir: `http://localhost:3333` y empezar a crear contenido.

---

## 📊 PROGRESO ACTUAL

```
████████████████████░░░░  80% COMPLETADO

✅ Refactorización de código
✅ Sistema de colores centralizado
✅ Configuración centralizada
✅ Sanity CMS configurado
✅ Schemas creados (10)
✅ API de Sanity (16 funciones)
✅ Documentación completa

⏳ Instalar Sanity
⏳ Poblar datos
⏳ Refactorizar últimos componentes
⏳ Testing final
```

**Tiempo restante**: 2-3 horas

---

## 💡 TIP PRO

Puedes poblar Sanity gradualmente:

**Día 1**: Setup + Categorías + Marcas (30 min)
**Día 2**: Agregar 5-10 productos (1 hora)
**Día 3**: Proyectos + FAQs (30 min)
**Día 4**: Páginas + Testing (1 hora)

**No necesitas hacerlo todo de una vez. Ve paso a paso.**

---

¡Éxito! 🎉

*Cualquier duda, revisa los archivos de documentación listados arriba.*
