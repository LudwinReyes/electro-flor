# ✅ CONFIGURACIÓN DEL SITIO - Guía Completa

## 🎯 ¿Qué se implementó?

Ahora **el frontend lee dinámicamente** la configuración de Sanity Studio. Los cambios que hagas en:
- **Configuración del Sitio** (colores, logo, contacto)
- **Configuración del Header** (menú, búsqueda)
- **Configuración del Footer** (columnas, copyright)

Se verán **automáticamente reflejados en el sitio** sin necesidad de editar código.

---

## 📋 PASO 1: Crear el Documento de Configuración

1. **Abre Sanity Studio**: http://localhost:3333

2. **Busca en el menú lateral**: "Configuración del Sitio"

3. **Haz clic en "+"** para crear el primer documento

4. **Completa los campos**:

### Información Básica
```
Nombre del Sitio: ELECTRO FLOR
Descripción: Ferretería y Material Eléctrico - Distribuidores Autorizados
```

### Colores (Códigos Hexadecimales)
```
Color Primario: #002D62    (Azul oscuro)
Color Secundario: #8CC63F  (Verde lima)
```

### Información de Contacto
```
Teléfono: 999 000 000
WhatsApp: 51999000000
Email: ventas@electroflor.com.pe
Dirección: Av. Argentina 245, Lima, Perú
```

### Redes Sociales
```
Facebook: https://facebook.com/electroflor
Instagram: https://instagram.com/electroflor
LinkedIn: https://linkedin.com/company/electroflor
```

5. **Haz clic en "Publish"** (botón verde en la esquina inferior derecha)

---

## 🚀 PASO 2: Verificar los Cambios

### Ver los cambios en el sitio
1. Abre: http://localhost:3000
2. **Recarga la página** (F5 o Ctrl+R)
3. Los datos de Sanity ahora se cargarán automáticamente

### Qué se actualiza dinámicamente:
- ✅ **Header**: Teléfono, dirección (barra superior azul)
- ✅ **Footer**: Información de contacto y redes sociales
- ✅ **Colores**: Si cambias los colores en Sanity, el sitio los usará

---

## 🎨 PASO 3: Probar Cambios de Color (Opcional)

1. En Sanity Studio, edita "Configuración del Sitio"
2. Cambia el **Color Secundario** a: `#FF6B35` (naranja)
3. Haz clic en **"Publish"**
4. **Recarga** http://localhost:3000
5. Verás que los elementos verdes ahora son naranjas

---

## 📝 PASO 4: Configurar el Header (Opcional)

1. En Sanity Studio, busca: **"Configuración del Header"**
2. Crea un nuevo documento con:

```
Ítem de Menú 1:
  Título: Productos
  URL: /productos

Ítem de Menú 2:
  Título: Proyectos
  URL: /proyectos

Ítem de Menú 3:
  Título: Nosotros
  URL: /nosotros
```

3. Activa:
   - ✅ Mostrar Búsqueda
   - ✅ Mostrar Categorías

4. **Publish**

---

## 🔧 Cómo Funciona Internamente

### Archivos Modificados:

1. **`contexts/SiteConfigContext.tsx`** (NUEVO)
   - Context de React que carga la configuración de Sanity al inicio
   - Hace 3 llamadas API: `getSiteSettings()`, `getHeaderSettings()`, `getFooterSettings()`
   - Combina datos de Sanity con valores por defecto de `config.ts`

2. **`App.tsx`**
   - Ahora envuelve toda la app con `<SiteConfigProvider>`
   - Todos los componentes pueden acceder a la configuración

3. **`Header.tsx`**
   - Usa `useSiteConfig()` para obtener: `colors`, `contact`, `siteSettings`
   - Ya no usa valores hardcodeados de `config.ts`

4. **`Footer.tsx`**
   - Usa `useSiteConfig()` igual que Header
   - Colores y contacto dinámicos

### Flujo de Datos:

```
Sanity Studio (http://localhost:3333)
         ↓
    [PUBLICAS cambios]
         ↓
Sanity API (HTTP)
         ↓
services/sanity.ts (getSiteSettings)
         ↓
SiteConfigContext (React Context)
         ↓
Header, Footer, etc. (useSiteConfig hook)
```

---

## ⚠️ IMPORTANTE: CORS

**Si ves errores en la consola** del navegador como:
```
CORS policy: No 'Access-Control-Allow-Origin' header
```

### Solución:
1. Ve a: https://www.sanity.io/manage
2. Selecciona tu proyecto: **2gy084y4**
3. **Settings → API → CORS Origins**
4. **Add CORS Origin**:
   - Origin: `http://localhost:3000`
   - Allow credentials: ✅ Yes
5. **Add otro**:
   - Origin: `http://localhost:5173`
   - Allow credentials: ✅ Yes
6. **Save**

---

## 🧪 Testing Completo

### Test 1: Cambiar Teléfono
1. Sanity: Edita "Configuración del Sitio"
2. Cambia **Teléfono** a: `987 654 321`
3. Publish
4. Recarga http://localhost:3000
5. Verifica que el header muestre: `CENTRAL: (01) 987 654 321`

### Test 2: Cambiar Color Primario
1. Sanity: Cambia **Color Primario** a: `#1E3A8A` (azul más claro)
2. Publish
3. Recarga el sitio
4. El header y footer ahora usan el nuevo azul

### Test 3: Logo Personalizado
1. Sanity: En "Configuración del Sitio"
2. **Logo** → Upload tu logo (PNG o SVG)
3. Publish
4. El logo aparecerá en el header (requiere pequeña modificación en Header.tsx)

---

## 🎯 Próximos Pasos

1. **Crear contenido**:
   - Agrega 5-10 productos con `shortDescription`
   - Crea categorías con íconos FontAwesome
   - Configura colores personalizados

2. **Configurar CORS** (si no lo has hecho):
   - https://www.sanity.io/manage → CORS Origins

3. **Publicar contenido**:
   - Todos los productos, categorías y settings

4. **Verificar en frontend**:
   - http://localhost:3000 debe mostrar todo dinámicamente

---

## 📚 Documentación Relacionada

- **SOLUCION_CORS.md** - Cómo configurar CORS en Sanity
- **GUIA_CATEGORIAS_SUBCATEGORIAS.md** - Lista completa de íconos
- **README.md** - Documentación general del proyecto

---

## 🐛 Troubleshooting

### "No veo cambios en el sitio"
1. Verifica que **publicaste** (Publish) en Sanity
2. **Recarga** el navegador (Ctrl+Shift+R para forzar)
3. Abre DevTools (F12) → Console y busca errores

### "Error: CORS policy"
- Sigue las instrucciones en **SOLUCION_CORS.md**
- Verifica que agregaste `http://localhost:3000` en CORS Origins

### "Los colores no cambian"
- Los colores solo cambian `primary` y `secondary`
- Otros colores (gray, success, etc.) siguen siendo de `config.ts`
- Para cambiar completamente todos los colores, necesitas editar más el Context

---

## ✅ Checklist Final

- [ ] Documento "Configuración del Sitio" creado en Sanity
- [ ] Campos completados (nombre, colores, teléfono, etc.)
- [ ] Documento **publicado** (botón verde "Publish")
- [ ] CORS configurado en https://www.sanity.io/manage
- [ ] Sitio recargado (http://localhost:3000)
- [ ] Header muestra datos de Sanity (teléfono correcto)
- [ ] Footer muestra datos de Sanity

**¡Ahora tu configuración es 100% dinámica desde Sanity! 🎉**
