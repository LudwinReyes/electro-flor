# 📋 CONFIGURAR CATEGORÍAS Y SUBCATEGORÍAS EN SANITY

## ✅ Cambios Realizados

### 1. Schema de Categorías Actualizado
El schema ahora incluye:
- ✅ **icon**: Campo para iconos de FontAwesome (ej: `fa-lightbulb`)
- ✅ **parentCategory**: Referencia para crear subcategorías
- ✅ **order**: Número para ordenar las categorías
- ✅ Vista previa mejorada que muestra "Categoría > Subcategoría"

### 2. ProductCard Corregido
- ✅ Ahora usa `product.slug` en lugar de `product.id`
- ✅ Esto corrige el error de `http://localhost:3000/#/producto/undefined`

## 🎯 CÓMO CREAR CATEGORÍAS EN SANITY

### PASO 1: Crear Categoría Principal "Iluminación"

1. Ve a Sanity Studio: http://localhost:3333
2. En el menú lateral, haz clic en **Categorías**
3. Haz clic en el botón **+ Create** (esquina superior derecha)
4. Completa los campos:
   - **Nombre**: `Iluminación`
   - **Slug**: Click en "Generate" (genera automáticamente: `iluminacion`)
   - **Descripción**: `Productos de iluminación para proyectos eléctricos`
   - **Icono FontAwesome**: `fa-lightbulb`
   - **Categoría Padre**: Dejar VACÍO (es categoría principal)
   - **Orden**: `1`
   - **Imagen**: Subir una imagen opcional
5. Haz clic en **Publish**

### PASO 2: Crear Subcategoría "Luminarias Públicas"

1. Haz clic en **+ Create** nuevamente
2. Completa los campos:
   - **Nombre**: `Luminarias Públicas`
   - **Slug**: Click en "Generate" (genera: `luminarias-publicas`)
   - **Descripción**: `Luminarias para alumbrado público exterior`
   - **Icono FontAwesome**: `fa-street-view`
   - **Categoría Padre**: Selecciona **Iluminación** ← IMPORTANTE
   - **Orden**: `2`
   - **Imagen**: Subir imagen opcional
3. Haz clic en **Publish**

### PASO 3: Actualizar Producto Existente

1. Ve a **Productos** en el menú lateral
2. Busca tu producto: "LLAVE TERMICA P/RIEL 2P 25A 230/400VAC SCHNEIDER"
3. Verifica que tenga:
   - **Slug**: `llave-termica-p-riel-2p-25a-230-400vac-schneider` (debe existir)
   - **Categoría**: Selecciona "Luminarias Públicas" o la que corresponda
4. Haz clic en **Publish**

## 📝 ICONOS FONTAWESOME DISPONIBLES

Ejemplos de iconos para categorías:

### Iluminación
- `fa-lightbulb` → 💡 Bombilla
- `fa-street-view` → 🌃 Luminarias públicas
- `fa-sun` → ☀️ Iluminación solar
- `fa-moon` → 🌙 Iluminación nocturna

### Herramientas
- `fa-hammer` → 🔨 Herramientas generales
- `fa-wrench` → 🔧 Llaves y destornilladores
- `fa-screwdriver` → 🪛 Destornilladores
- `fa-toolbox` → 🧰 Cajas de herramientas

### Eléctrica
- `fa-bolt` → ⚡ Energía eléctrica
- `fa-plug` → 🔌 Enchufes y tomacorrientes
- `fa-battery-full` → 🔋 Baterías
- `fa-charging-station` → 🔌 Carga eléctrica

### Cables y Conductores
- `fa-microchip` → 🔌 Componentes electrónicos
- `fa-ethernet` → 🔌 Cables y conexiones
- `fa-network-wired` → 🔌 Redes

### Gasfitería
- `fa-faucet` → 🚰 Grifos
- `fa-shower` → 🚿 Duchas
- `fa-sink` → 🚽 Sanitarios
- `fa-droplet` → 💧 Agua

### Construcción
- `fa-building` → 🏢 Edificios
- `fa-hard-hat` → ⛑️ Seguridad
- `fa-ruler` → 📏 Medición
- `fa-tape` → 📏 Cinta métrica

### Seguridad
- `fa-shield-check` → ✅ Protección
- `fa-lock` → 🔒 Seguridad
- `fa-fire-extinguisher` → 🧯 Contra incendios
- `fa-video` → 📹 Videovigilancia

Ver lista completa en: https://fontawesome.com/icons

## 🌳 ESTRUCTURA DE CATEGORÍAS RECOMENDADA

```
📁 Iluminación (fa-lightbulb)
  └─ 💡 Luminarias Públicas (fa-street-view)
  └─ 💡 Reflectores LED (fa-sun)
  └─ 💡 Paneles LED (fa-square)

📁 Distribución en Baja Tensión (fa-bolt)
  └─ ⚡ Interruptores Termomagnéticos (fa-toggle-on)
  └─ ⚡ Llaves Diferenciales (fa-shield-check)
  └─ ⚡ Tableros Eléctricos (fa-box)

📁 Cables y Conductores (fa-ethernet)
  └─ 🔌 Cable THW (fa-cable-car)
  └─ 🔌 Cable NYY (fa-network-wired)
  └─ 🔌 Cordón Mellizo (fa-link)

📁 Herramientas Eléctricas (fa-plug)
  └─ 🔨 Taladros (fa-screwdriver-wrench)
  └─ 🔨 Amoladoras (fa-compact-disc)
  └─ 🔨 Sierras (fa-saw-blade)

📁 Gasfitería Técnica (fa-faucet)
  └─ 🚰 Tuberías PVC (fa-pipe)
  └─ 🚰 Válvulas (fa-valve)
  └─ 🚰 Accesorios (fa-gear)
```

## 🔄 Después de Crear Categorías

1. **Recarga la página**: http://localhost:3000
2. **Verás las categorías con iconos** en la página principal (sin el cuadrado vacío)
3. **Los productos filtrarán correctamente** por categoría y subcategoría
4. **El enlace "VER MÁS" funcionará** usando el slug correcto

## ❓ Solución de Problemas

### Problema: No veo el icono
**Solución**: Verifica que el nombre del icono sea correcto. Debe ser `fa-nombre` sin espacios.

### Problema: El producto sigue con undefined
**Solución**: 
1. Ve al producto en Sanity Studio
2. Verifica que tenga un **Slug** generado
3. Si no tiene, haz clic en "Generate" en el campo Slug
4. Haz clic en **Publish**

### Problema: No veo las subcategorías
**Solución**: Las subcategorías aparecen en los filtros de productos. En la página principal solo se muestran las categorías principales (sin parentCategory).

## 📚 Recursos

- Iconos FontAwesome: https://fontawesome.com/icons
- Sanity Dashboard: https://www.sanity.io/manage
- Documentación Sanity: https://www.sanity.io/docs
