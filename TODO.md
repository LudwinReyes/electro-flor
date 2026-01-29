# 📋 TODO - Próximos Pasos para Completar el Proyecto

## 🔴 PRIORIDAD ALTA (Hacer Primero)

### 1. ⏳ Instalar Dependencias de Sanity
```powershell
npm install @sanity/client@latest sanity @sanity/vision @sanity/icons
```
**Tiempo estimado**: 2-3 minutos

---

### 2. ⏳ Crear y Configurar Proyecto en Sanity.io
1. Ir a [sanity.io](https://www.sanity.io/) y crear cuenta
2. Crear un nuevo proyecto
3. Anotar el **Project ID**
4. Editar `sanity/sanity.config.ts` línea 17:
   ```typescript
   projectId: 'tu-project-id-real', // ← Reemplazar
   ```
**Tiempo estimado**: 5 minutos

---

### 3. ⏳ Iniciar Sanity Studio
```powershell
cd sanity
npx sanity dev
```
- Se abrirá en `http://localhost:3333`
- Hacer login con tu cuenta de Sanity

**Tiempo estimado**: 2 minutos

---

### 4. ⏳ Poblar Datos Iniciales en Sanity Studio

#### A. Configuración del Sitio
1. Ir a "⚙️ Configuración del Sitio"
2. Llenar:
   - Colores: #002D62 (primario), #8CC63F (secundario)
   - Teléfono: `999 000 000`
   - WhatsApp: `51999000000`
   - Email: `ventas@electroflor.com`
   - Dirección: `Av. Argentina 245, Lima`
   - Redes sociales (Facebook, Instagram)
3. **Publicar**

#### B. Header Settings
1. Ir a "🧭 Navegación > Header"
2. Verificar menú (ya está pre-configurado)
3. **Publicar**

#### C. Footer Settings
1. Ir a "🧭 Navegación > Footer"
2. Verificar columnas (ya están pre-configuradas)
3. **Publicar**

#### D. Crear 5-10 Categorías
Ir a "🏷️ Categorías" y crear:
- Iluminación (icon: `fa-lightbulb`)
- Conductores (icon: `fa-plug`)
- Tomacorrientes (icon: `fa-plug`)
- Interruptores (icon: `fa-toggle-on`)
- Automatización (icon: `fa-microchip`)

#### E. Crear 5-10 Marcas
Ir a "🏢 Marcas" y crear:
- Bticino
- Nexans
- Schneider Electric
- Legrand
- General Cable

#### F. Crear 10-20 Productos
Ir a "📦 Productos" y crear productos:
- Nombre, código
- Seleccionar marca
- Seleccionar categoría
- Subir imagen
- Especificaciones técnicas
- Marcar algunos como "Destacados"

#### G. Crear 3-5 Proyectos
Ir a "🏗️ Proyectos Destacados" y crear:
- Título del proyecto
- Ubicación
- Tipo (iluminación, distribución, etc.)
- Imagen

#### H. Crear 10-15 FAQs
Ir a "❓ Preguntas Frecuentes" y crear:
- Preguntas sobre envíos
- Preguntas sobre productos
- Preguntas sobre pagos
- Preguntas sobre instalación

**Tiempo estimado**: 1-2 horas

---

## 🟡 PRIORIDAD MEDIA (Refactorizar Componentes Restantes)

### 5. ⏳ Refactorizar ContactPage.tsx
**Archivo**: `components/ContactPage.tsx`

**Buscar y reemplazar**:
```typescript
// ❌ Antes (hardcodeado)
<p>999 000 000</p>
<p>Av. Argentina 245, Lima</p>

// ✅ Después
import { CONTACT_INFO } from '../config'

<p>{CONTACT_INFO.phone.display}</p>
<p>{CONTACT_INFO.address.full}</p>
```

**Tiempo estimado**: 10 minutos

---

### 6. ⏳ Refactorizar App.tsx
**Archivo**: `App.tsx`

**Buscar**: WhatsApp floating button
```typescript
// ❌ Antes
href="https://wa.me/51999000000?text=..."

// ✅ Después
import { CONTACT_INFO, SITE_MESSAGES } from './config'

href={`https://wa.me/${CONTACT_INFO.phone.whatsapp}?text=${encodeURIComponent(SITE_MESSAGES.whatsapp.greeting)}`}
```

**Tiempo estimado**: 5 minutos

---

### 7. ⏳ Refactorizar PriceListModal.tsx
**Archivo**: `components/PriceListModal.tsx`

**Buscar**: WhatsApp links (2 instancias)
```typescript
// ❌ Antes
href="https://wa.me/51999000000"

// ✅ Después
import { CONTACT_INFO, SITE_MESSAGES } from '../config'

href={`https://wa.me/${CONTACT_INFO.phone.whatsapp}?text=${encodeURIComponent(SITE_MESSAGES.whatsapp.greeting)}`}
```

**Tiempo estimado**: 5 minutos

---

### 8. ⏳ Refactorizar services/gemini.ts
**Archivo**: `services/gemini.ts`

**Buscar**: Teléfono en prompt de IA (línea aproximada 30-50)
```typescript
// ❌ Antes
"Teléfono: 999 000 000"

// ✅ Después
import { CONTACT_INFO } from '../config'

`Teléfono: ${CONTACT_INFO.phone.display}`
```

**Tiempo estimado**: 5 minutos

---

### 9. ⏳ Actualizar FaqPage.tsx para Sanity
**Archivo**: `components/FaqPage.tsx`

```typescript
import { useState, useEffect } from 'react'
import { getFAQs } from '../services/sanity'

function FaqPage() {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFAQs().then(data => {
      if (data) setFaqs(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <div>Cargando...</div>

  return (
    // Tu código actual, pero iterando sobre `faqs` desde Sanity
  )
}
```

**Tiempo estimado**: 15 minutos

---

### 10. ⏳ Actualizar AboutUsPage.tsx para Sanity
**Archivo**: `components/AboutUsPage.tsx`

```typescript
import { useState, useEffect } from 'react'
import { getAboutPage } from '../services/sanity'

function AboutUsPage() {
  const [aboutData, setAboutData] = useState(null)

  useEffect(() => {
    getAboutPage().then(setAboutData)
  }, [])

  if (!aboutData) return <div>Cargando...</div>

  return (
    // Usar aboutData.mission, aboutData.vision, etc.
  )
}
```

**Tiempo estimado**: 15 minutos

---

## 🟢 PRIORIDAD BAJA (Mejoras Opcionales)

### 11. ⏳ Actualizar ProductsPage.tsx para usar Sanity
**Archivo**: `components/ProductsPage.tsx`

```typescript
import { getProducts, getCategories } from '../services/sanity'

// Reemplazar productos de constants.tsx por:
useEffect(() => {
  getProducts().then(data => {
    if (data) setProducts(data)
  })
}, [])
```

**Tiempo estimado**: 20 minutos

---

### 12. ⏳ Actualizar Hero.tsx para usar Sanity
**Archivo**: `components/Hero.tsx`

```typescript
import { getHomePage } from '../services/sanity'

useEffect(() => {
  getHomePage().then(data => {
    if (data?.hero) {
      setHeroData(data.hero)
    }
  })
}, [])
```

**Tiempo estimado**: 15 minutos

---

### 13. ⏳ Eliminar constants.tsx
Una vez que todos los componentes usen Sanity:
```powershell
# Verificar que ningún componente lo importe
npm run build

# Si compila sin errores, eliminarlo
rm constants.tsx
```

**Tiempo estimado**: 5 minutos

---

### 14. ⏳ Crear archivo .env
```powershell
# Copiar el template
cp .env.example .env

# Editar y agregar tus claves reales
```

Editar `.env`:
```env
VITE_SANITY_PROJECT_ID=tu-project-id-real
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_GEMINI_API_KEY=tu-api-key-de-gemini
```

**Tiempo estimado**: 2 minutos

---

## 🧪 TESTING

### 15. ⏳ Testing Completo
- [ ] Todas las páginas cargan correctamente
- [ ] Colores consistentes en todo el sitio
- [ ] Enlaces de WhatsApp funcionan
- [ ] Teléfonos y direcciones correctos
- [ ] Productos se muestran desde Sanity
- [ ] Imágenes de Sanity se cargan
- [ ] FAQs se muestran correctamente
- [ ] Página "Nosotros" tiene contenido de Sanity
- [ ] Responsive funciona en móvil
- [ ] No hay errores en consola

**Tiempo estimado**: 30 minutos

---

## 📊 RESUMEN DE TIEMPO

| Tarea | Tiempo Estimado | Prioridad |
|-------|-----------------|-----------|
| Instalar Sanity | 2-3 min | 🔴 Alta |
| Configurar Project ID | 5 min | 🔴 Alta |
| Iniciar Studio | 2 min | 🔴 Alta |
| Poblar datos iniciales | 1-2 horas | 🔴 Alta |
| Refactorizar 5 componentes | 40 min | 🟡 Media |
| Actualizar para Sanity | 1 hora | 🟢 Baja |
| Testing | 30 min | 🧪 Testing |
| **TOTAL** | **3-4 horas** | |

---

## ✅ CHECKLIST RÁPIDO

### Setup Inicial (30 min)
- [ ] npm install sanity dependencies
- [ ] Crear proyecto en sanity.io
- [ ] Configurar Project ID
- [ ] Iniciar Sanity Studio
- [ ] Crear .env con tus claves

### Poblar Sanity (1-2 horas)
- [ ] Configuración del Sitio
- [ ] Header Settings
- [ ] Footer Settings
- [ ] 5-10 Categorías
- [ ] 5-10 Marcas
- [ ] 10-20 Productos
- [ ] 3-5 Proyectos
- [ ] 10-15 FAQs
- [ ] Página de Inicio
- [ ] Página "Nosotros"

### Refactorizar (1 hora)
- [ ] ContactPage.tsx
- [ ] App.tsx
- [ ] PriceListModal.tsx
- [ ] services/gemini.ts
- [ ] FaqPage.tsx
- [ ] AboutUsPage.tsx

### Integración (1 hora)
- [ ] ProductsPage usar Sanity
- [ ] Hero usar Sanity
- [ ] Verificar todas las imágenes
- [ ] Verificar todos los enlaces

### Testing Final (30 min)
- [ ] Testing completo
- [ ] Verificar responsive
- [ ] Verificar WhatsApp
- [ ] Verificar colores
- [ ] Build sin errores

---

## 🆘 AYUDA

Si tienes problemas:

1. **Error al instalar Sanity**: Ver `INSTALACION_SANITY.md` sección "Troubleshooting"
2. **Dudas sobre colores**: Ver `GUIA_COLORES.md`
3. **Problemas identificados**: Ver `PROBLEMAS_SANITY.md`
4. **Resumen general**: Ver `RESUMEN_CAMBIOS.md`

---

## 🎯 META FINAL

Al completar este TODO tendrás:

✅ Proyecto con configuración centralizada
✅ Sanity CMS completamente funcional
✅ Contenido administrable sin tocar código
✅ Sin datos hardcodeados
✅ Documentación completa
✅ Listo para producción

---

**Siguiente paso**: Empezar por la tarea #1 (Instalar dependencias de Sanity)

**¡Éxito! 🚀**
