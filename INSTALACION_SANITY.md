# 📦 Instalación y Configuración de Sanity CMS

## 1. Instalar dependencias de Sanity

```powershell
npm install @sanity/client@latest sanity @sanity/vision @sanity/icons
```

## 2. Crear proyecto en Sanity.io

1. Ve a [sanity.io](https://www.sanity.io/) y crea una cuenta
2. Crea un nuevo proyecto
3. Anota tu `Project ID` y `Dataset` (normalmente 'production')

## 3. Configurar Project ID

Edita el archivo `sanity/sanity.config.ts` y reemplaza:

```typescript
projectId: 'your-project-id', // ← Reemplaza con tu Project ID real
dataset: 'production',
```

## 4. Crear archivo de entorno (opcional pero recomendado)

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_SANITY_PROJECT_ID=tu-project-id-aqui
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

Luego actualiza `sanity/sanity.config.ts`:

```typescript
projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
dataset: import.meta.env.VITE_SANITY_DATASET,
```

## 5. Iniciar Sanity Studio

Desde la raíz del proyecto:

```powershell
cd sanity
npx sanity dev
```

Sanity Studio se abrirá en `http://localhost:3333`

## 6. Poblar datos iniciales

Una vez en Sanity Studio:

### 6.1 Configuración del Sitio
1. Ve a "⚙️ Configuración del Sitio"
2. Llena todos los campos:
   - Colores de marca
   - Teléfono: `999 000 000`
   - WhatsApp: `51999000000`
   - Email: `ventas@electroflor.com`
   - Dirección: `Av. Argentina 245, Lima`
   - Redes sociales

### 6.2 Configuración del Header
1. Ve a "🧭 Navegación > Header"
2. Los ítems de menú ya vienen pre-configurados
3. Ajusta si es necesario

### 6.3 Configuración del Footer
1. Ve a "🧭 Navegación > Footer"
2. Configura las columnas de enlaces
3. Actualiza el texto de copyright

### 6.4 Página de Inicio
1. Ve a "📄 Páginas > 🏠 Página de Inicio"
2. Configura:
   - Hero principal (título, subtítulo, imagen)
   - Productos destacados
   - Características/beneficios

### 6.5 Categorías
1. Ve a "🏷️ Categorías"
2. Crea categorías como:
   - Iluminación (icono: `fa-lightbulb`)
   - Conductores (icono: `fa-plug`)
   - Tomacorrientes (icono: `fa-plug`)
   - Interruptores (icono: `fa-toggle-on`)

### 6.6 Marcas
1. Ve a "🏢 Marcas"
2. Crea marcas:
   - Bticino
   - Nexans
   - Schneider Electric
   - etc.

### 6.7 Productos
1. Ve a "📦 Productos"
2. Crea productos con:
   - Nombre, código
   - Marca (selecciona de las creadas)
   - Categoría (selecciona de las creadas)
   - Imágenes
   - Especificaciones técnicas
   - Precios
   - Stock

### 6.8 Proyectos
1. Ve a "🏗️ Proyectos Destacados"
2. Crea proyectos con imágenes de instalaciones realizadas

### 6.9 FAQs
1. Ve a "❓ Preguntas Frecuentes"
2. Crea preguntas y respuestas comunes

## 7. Actualizar el frontend para usar Sanity

El archivo `services/sanity.ts` ya está configurado con funciones para obtener datos.

En tus componentes, importa y usa:

```typescript
import { 
  getProducts, 
  getCategories, 
  getBrands,
  getSiteSettings 
} from '../services/sanity'

// Ejemplo en un componente
const [products, setProducts] = useState([])

useEffect(() => {
  getProducts().then(setProducts)
}, [])
```

## 8. Reemplazar datos hardcodeados

Ahora que Sanity está configurado, puedes:

1. Eliminar el archivo `constants.tsx` (productos hardcodeados)
2. Actualizar todos los componentes para obtener datos de Sanity
3. Los colores y contacto seguirán en `config.ts` (se pueden migrar a Sanity después)

## 9. Deployment de Sanity Studio (Opcional)

Para publicar tu Sanity Studio en la nube:

```powershell
cd sanity
npx sanity deploy
```

Esto creará una URL pública como: `https://tu-proyecto.sanity.studio`

## 🎯 Schemas Creados

- ✅ `product` - Productos con imágenes, specs, precios
- ✅ `category` - Categorías con iconos y orden
- ✅ `brand` - Marcas con logos
- ✅ `project` - Proyectos destacados con fotos
- ✅ `siteSettings` - Configuración global (Singleton)
- ✅ `headerSettings` - Menú de navegación (Singleton)
- ✅ `footerSettings` - Footer del sitio (Singleton)
- ✅ `homePage` - Contenido de página de inicio (Singleton)
- ✅ `aboutPage` - Contenido de página "Nosotros" (Singleton)
- ✅ `faqPage` - Preguntas frecuentes (Múltiple)

## 📝 Notas Importantes

1. **Singletons**: Los documentos marcados como "Singleton" solo pueden tener una instancia (siteSettings, homePage, etc.)

2. **Referencias**: Los productos referencian a brands y categories usando el campo `reference`

3. **Slugs**: Todos los tipos principales tienen un campo `slug` para URLs amigables

4. **Orden**: Categorías, proyectos y FAQs tienen campo `order` para controlar el orden de visualización

5. **SEO**: Productos y páginas tienen campos SEO (metaTitle, metaDescription)

## 🔄 Migración gradual

No necesitas migrar todo de una vez:

1. ✅ **Fase 1**: Config básico (colores, contacto) → Ya en `config.ts`
2. 🔄 **Fase 2**: Contenido dinámico (productos, categorías) → Usar Sanity
3. ⏳ **Fase 3**: Páginas completas (nosotros, FAQ) → Usar Sanity
4. ⏳ **Fase 4**: Migrar colores y contacto a Sanity (opcional)

## 🆘 Troubleshooting

### Error: "Cannot find module '@sanity/client'"
```powershell
npm install @sanity/client@latest
```

### Error: "projectId is required"
Asegúrate de configurar tu Project ID en `sanity.config.ts`

### Error al subir imágenes
Verifica que tu proyecto de Sanity tenga el plugin de imágenes activado

### Datos no se muestran en el frontend
1. Verifica que los documentos estén publicados en Sanity Studio
2. Revisa la consola del navegador por errores
3. Verifica que el `projectId` y `dataset` sean correctos
