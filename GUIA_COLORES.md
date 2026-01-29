# 🎨 Guía de Sistema de Colores - ELECTRO FLOR

## ❌ Problema Anterior (Mala Práctica)

Antes teníamos colores hardcodeados en todos los componentes:

```tsx
// ❌ MAL - Colores duplicados por todas partes
<div className="bg-[#002D62] text-[#8CC63F]">
<button className="hover:bg-[#8CC63F] border-[#002D62]">
```

**Problemas:**
- 🔴 Difícil mantener consistencia
- 🔴 Cambiar un color requiere editar 50+ archivos
- 🔴 Propenso a errores de tipeo
- 🔴 Difícil de integrar con Sanity CMS

## ✅ Solución Nueva (Buena Práctica)

Ahora tenemos un sistema centralizado en `config.ts`:

```typescript
import { BRAND_COLORS } from './config';

// ✅ BIEN - Uso de constantes
<div className={`bg-[${BRAND_COLORS.primary}] text-[${BRAND_COLORS.secondary}]`}>
```

## 📖 Cómo Usar los Colores

### Opción 1: Template Literals (Recomendado)

```tsx
import { BRAND_COLORS } from '../config';

function MiComponente() {
  return (
    <div className={`bg-[${BRAND_COLORS.primary}] text-[${BRAND_COLORS.secondary}]`}>
      <button className={`hover:bg-[${BRAND_COLORS.secondaryLight}]`}>
        Botón
      </button>
    </div>
  );
}
```

### Opción 2: Variables CSS (Para colores dinámicos)

```tsx
<div 
  style={{ 
    backgroundColor: BRAND_COLORS.primary,
    color: BRAND_COLORS.secondary 
  }}
>
  Contenido
</div>
```

### Opción 3: Clases Condicionales

```tsx
const isActive = true;

<div className={`
  ${isActive ? `bg-[${BRAND_COLORS.secondary}]` : 'bg-gray-100'}
  ${isActive ? `text-[${BRAND_COLORS.primary}]` : 'text-gray-500'}
`}>
```

## 🎨 Colores Disponibles

```typescript
// Principales
BRAND_COLORS.primary         // #002D62 - Azul oscuro
BRAND_COLORS.secondary       // #8CC63F - Verde lima

// Variaciones Primary
BRAND_COLORS.primaryLight    // #003d82
BRAND_COLORS.primaryDark     // #001d42
BRAND_COLORS.primaryOpacity.5
BRAND_COLORS.primaryOpacity.10
BRAND_COLORS.primaryOpacity.20
BRAND_COLORS.primaryOpacity.90

// Variaciones Secondary
BRAND_COLORS.secondaryLight  // #a3e04a
BRAND_COLORS.secondaryDark   // #7ab32e
BRAND_COLORS.secondaryOpacity.5
BRAND_COLORS.secondaryOpacity.10
BRAND_COLORS.secondaryOpacity.20
BRAND_COLORS.secondaryOpacity.30

// Estados
BRAND_COLORS.success         // #25d366 - WhatsApp
BRAND_COLORS.error           // #ef4444
BRAND_COLORS.warning         // #f59e0b
BRAND_COLORS.info            // #3b82f6

// Grises
BRAND_COLORS.gray.50 hasta BRAND_COLORS.gray.900

// Fondos
BRAND_COLORS.background.main    // #fcfdfd
BRAND_COLORS.background.alt     // #f4f7f9
BRAND_COLORS.background.dark    // #002D62
```

## 🔄 Ejemplo de Refactorización

### Antes (❌ Malo):
```tsx
<header className="bg-[#002D62] border-[#8CC63F]">
  <button className="text-[#8CC63F] hover:bg-[#8CC63F] hover:text-[#002D62]">
    Ver más
  </button>
</header>
```

### Después (✅ Bueno):
```tsx
import { BRAND_COLORS } from '../config';

<header className={`bg-[${BRAND_COLORS.primary}] border-[${BRAND_COLORS.secondary}]`}>
  <button className={`
    text-[${BRAND_COLORS.secondary}] 
    hover:bg-[${BRAND_COLORS.secondary}] 
    hover:text-[${BRAND_COLORS.primary}]
  `}>
    Ver más
  </button>
</header>
```

## 🚀 Integración con Sanity CMS

Cuando configures Sanity, podrás hacer que estos colores sean editables:

```typescript
// sanity/schemas/siteSettings.ts
export default {
  name: 'siteSettings',
  type: 'document',
  fields: [
    {
      name: 'brandColors',
      type: 'object',
      fields: [
        {
          name: 'primary',
          type: 'color',
          title: 'Color Primario',
          initialValue: '#002D62'
        },
        {
          name: 'secondary',
          type: 'color',
          title: 'Color Secundario',
          initialValue: '#8CC63F'
        }
      ]
    }
  ]
}
```

## 📝 Pasos para Migrar Componentes

1. Importar BRAND_COLORS en el componente
2. Buscar todos los `bg-[#002D62]` y reemplazar por `bg-[${BRAND_COLORS.primary}]`
3. Buscar todos los `text-[#8CC63F]` y reemplazar por `text-[${BRAND_COLORS.secondary}]`
4. Verificar que los estilos funcionen correctamente

## 🎯 Beneficios

✅ **Mantenibilidad**: Cambias un color en un solo lugar
✅ **Consistencia**: Todos usan los mismos colores
✅ **Escalabilidad**: Fácil agregar temas oscuros/claros
✅ **CMS Ready**: Preparado para Sanity
✅ **TypeScript**: Autocompletado en el IDE
✅ **Documentación**: Colores documentados y organizados
