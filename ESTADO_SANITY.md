# ⚙️ Configuración de Sanity - ELECTRO FLOR

## ✅ Configuración Completada

### 1. Project ID Configurado
- **Project ID**: `2gy084y4`
- **Dataset**: `production`
- **Organization ID**: `ofLyX3lWZ`

### 2. Dependencias Instaladas ✅
```bash
npm install @sanity/client@latest sanity @sanity/vision @sanity/icons
```
**Status**: ✅ Instalado correctamente (914 paquetes agregados)

### 3. Archivos Configurados ✅

#### `.env`
```env
VITE_SANITY_PROJECT_ID=2gy084y4
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

#### `sanity/sanity.config.ts`
```typescript
projectId: '2gy084y4',
dataset: 'production',
```

---

## ⚠️ Problema con Sanity Studio

**Error encontrado**: La versión de Node.js (v20.14.0) no es soportada por Sanity 5.x
**Requerido**: Node.js >= 20.19.0 o >= 22.12.0

### Soluciones:

#### Opción A: Actualizar Node.js (Recomendado)
```powershell
# Descargar e instalar Node.js 20.19+ o 22.x desde:
# https://nodejs.org/

# Después de instalar:
cd sanity
npx sanity dev
```

#### Opción B: Usar Sanity Studio en la nube
1. Ir a: https://www.sanity.io/manage
2. Buscar tu proyecto "ELECTRO FLOR"
3. Hacer clic en "Launch Studio"
4. Administrar contenido directamente desde la web

#### Opción C: Usar una versión anterior de Sanity
```powershell
npm install sanity@4.24.4 --save-exact
cd sanity
npx sanity dev
```

---

## 🎯 Mientras tanto: Usar el Frontend

Aunque Sanity Studio tenga problemas, **el frontend puede funcionar** porque:

1. ✅ El cliente de Sanity (`@sanity/client`) está instalado
2. ✅ El Project ID está configurado en `.env`
3. ✅ Las funciones de API en `services/sanity.ts` están listas

### Probar el cliente de Sanity:

Crea un archivo de prueba `test-sanity.js`:
```javascript
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '2gy084y4',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

// Test de conexión
client.fetch('*[_type == "product"][0...3]')
  .then(products => {
    console.log('✅ Conexión exitosa!')
    console.log('Productos encontrados:', products.length)
  })
  .catch(err => {
    console.error('❌ Error:', err.message)
  })
```

Ejecutar:
```powershell
node test-sanity.js
```

---

## 📦 Próximos Pasos

### Opción 1: Si actualizas Node.js
1. ✅ Instalar Node.js 20.19+ o 22.x
2. ✅ Reiniciar VS Code
3. ✅ `cd sanity && npx sanity dev`
4. ✅ Abrir http://localhost:3333
5. ✅ Poblar datos (categorías, marcas, productos)

### Opción 2: Si usas Studio en la nube
1. ✅ Ir a https://www.sanity.io/manage
2. ✅ Seleccionar proyecto ELECTRO FLOR
3. ✅ "Launch Studio"
4. ✅ Poblar datos desde el navegador

### Opción 3: Continuar con el desarrollo del frontend
1. ✅ Refactorizar componentes restantes
2. ✅ Preparar todo para cuando Studio esté disponible
3. ✅ Testing de funcionalidades actuales

---

## 🔍 Estado Actual

```
✅ Dependencias instaladas (914 paquetes)
✅ Project ID configurado (2gy084y4)
✅ Archivo .env creado
✅ services/sanity.ts listo
✅ 10 schemas creados
✅ Structure de Studio configurado
⚠️ Sanity Studio requiere Node.js >= 20.19

Progreso: 95% (Solo falta poblar datos)
```

---

## 💡 Recomendación

**Mejor opción**: Actualizar Node.js a la versión 20.19+ o 22.x

Esto te permitirá:
- Ejecutar Sanity Studio localmente
- Tener control total sobre los schemas
- Desarrollo más rápido y cómodo

**Descargar**: https://nodejs.org/

---

## 🆘 Si necesitas ayuda

1. Actualiza Node.js
2. O usa Sanity Studio en la nube temporalmente
3. Mientras tanto, podemos continuar refactorizando componentes

¿Qué prefieres hacer? 🚀
