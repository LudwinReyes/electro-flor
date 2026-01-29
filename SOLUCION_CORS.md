# 🔧 SOLUCIÓN PROBLEMA CORS

## ❌ Error Actual
```
Access to XMLHttpRequest blocked by CORS policy: No 'Access-Control-Allow-Origin' header
```

## ✅ SOLUCIÓN (Sigue estos pasos):

### Paso 1: Accede a Sanity Manage
1. Abre tu navegador
2. Ve a: **https://www.sanity.io/manage**
3. Inicia sesión con tu cuenta

### Paso 2: Selecciona tu proyecto
1. Busca tu proyecto: **Project ID: 2gy084y4**
2. Haz clic en el proyecto

### Paso 3: Configura CORS
1. En el menú lateral, ve a: **Settings** (Configuración)
2. Busca la sección: **API Settings**
3. Haz clic en: **CORS Origins**

### Paso 4: Agrega localhost
1. Haz clic en el botón: **+ Add CORS Origin**
2. En "Origin" escribe: `http://localhost:3000`
3. Marca la casilla: **Allow credentials** (opcional)
4. Haz clic en **Save** (Guardar)

### Paso 5: Agrega localhost:5173 (Vite)
Repite el Paso 4 pero agrega también:
- `http://localhost:5173`

### Paso 6: (Opcional) Agrega tu dominio de producción
Cuando despliegues en producción, agrega también:
- `https://tudominio.com`
- `https://www.tudominio.com`

## 🔄 Después de configurar CORS:

1. **NO necesitas reiniciar nada**
2. Simplemente recarga la página: `http://localhost:3000/productos`
3. El producto debería aparecer inmediatamente

## 📋 URLs del proyecto:
- **Frontend**: http://localhost:3000
- **Sanity Studio**: http://localhost:3333
- **Sanity Dashboard**: https://www.sanity.io/manage

## 🎯 Resultado esperado:
Después de configurar CORS, los errores desaparecerán y verás:
- ✅ Tu producto "LLAVE TERMICA P/RIEL 2P 25A 230/400VAC SCHNEIDER"
- ✅ Categoría "Luminaria Publica"
- ✅ Marca "SCHNEIDER"
- ✅ Imágenes cargadas
- ✅ Video de YouTube

## ❓ Si sigue sin funcionar:
1. Verifica que el producto esté **Published** (no Draft) en Sanity Studio
2. Revisa la consola del navegador (F12) para nuevos errores
3. Asegúrate de que las URLs de CORS no tengan espacios ni caracteres especiales
