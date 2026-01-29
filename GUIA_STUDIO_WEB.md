# 🌐 Usar Sanity Studio en la Nube

Ya que tu versión de Node.js (v20.14.0) no es compatible con Sanity Studio local, **puedes usar Sanity Studio directamente en el navegador** mientras actualizas Node.js.

---

## 🚀 Acceso Rápido (3 pasos)

### 1. Ir al Dashboard de Sanity
Abre en tu navegador:
```
https://www.sanity.io/manage
```

### 2. Buscar tu Proyecto
- Busca: **"ELECTRO FLOR"** o el nombre que le pusiste
- O busca por Project ID: **2gy084y4**

### 3. Lanzar el Studio
- Haz clic en tu proyecto
- Busca el botón **"Open Studio"** o **"Launch Studio"**
- Se abrirá Sanity Studio en el navegador

---

## 📝 Empezar a Poblar Datos

Una vez en el Studio, sigue este orden:

### 1. ⚙️ Configuración del Sitio (5 min)
**Ruta**: Configuración Global > Configuración del Sitio

Llenar:
```
Colores de Marca:
- Primario: #002D62
- Secundario: #8CC63F

Contacto:
- Teléfono: 999 000 000
- WhatsApp: 51999000000
- Email: ventas@electroflor.com
- Email Ventas: ventas@electroflor.com

Dirección:
- Calle: Av. Argentina 245
- Distrito: Lima
- Ciudad: Lima
- País: Perú

Redes Sociales:
- Facebook: https://facebook.com/electroflor
- Instagram: https://instagram.com/electroflor

Horarios:
- Lunes a Viernes: 8:00 AM - 6:00 PM
- Sábados: 9:00 AM - 2:00 PM
- Domingos: Cerrado

Mensajes:
- Título Hero: LA FUERZA DE TU CONSTRUCCIÓN
- Subtítulo: Material eléctrico profesional con entrega el mismo día
- Mensaje de urgencia: Próximo camión sale esta tarde - ¡Pide ahora!

SEO:
- Title: ELECTRO FLOR | Material Eléctrico e Iluminación
- Description: Distribuidor oficial de las mejores marcas eléctricas en Perú

Features:
- ✅ Chat WhatsApp
- ✅ Sistema de Cotización
- ✅ Entrega Mismo Día
```

**Hacer clic en PUBLISH** (esquina superior derecha)

---

### 2. 🏷️ Crear Categorías (10 min)
**Ruta**: Categorías > Create

Crear estas categorías:

#### Categoría 1: Iluminación
```
Nombre: Iluminación
Slug: iluminacion
Icono: fa-lightbulb
Descripción: Lámparas LED, focos, paneles y sistemas de iluminación
Orden: 1
```

#### Categoría 2: Conductores
```
Nombre: Conductores
Slug: conductores
Icono: fa-plug
Descripción: Cables eléctricos, conductores y alambres
Orden: 2
```

#### Categoría 3: Tomacorrientes
```
Nombre: Tomacorrientes
Slug: tomacorrientes
Icono: fa-plug
Descripción: Tomacorrientes, enchufes y conexiones
Orden: 3
```

#### Categoría 4: Interruptores
```
Nombre: Interruptores
Slug: interruptores
Icono: fa-toggle-on
Descripción: Interruptores, conmutadores y pulsadores
Orden: 4
```

#### Categoría 5: Automatización
```
Nombre: Automatización
Slug: automatizacion
Icono: fa-microchip
Descripción: Sistemas de automatización y control
Orden: 5
```

**Publish cada una después de crearla**

---

### 3. 🏢 Crear Marcas (10 min)
**Ruta**: Marcas > Create

#### Marca 1: Bticino
```
Nombre: Bticino
Slug: bticino
Descripción: Líder mundial en sistemas eléctricos
Website: https://www.bticino.com
Featured: ✅
```

#### Marca 2: Nexans
```
Nombre: Nexans
Slug: nexans
Descripción: Fabricante de cables y conductores
Website: https://www.nexans.com
Featured: ✅
```

#### Marca 3: Schneider Electric
```
Nombre: Schneider Electric
Slug: schneider-electric
Descripción: Automatización y gestión de energía
Website: https://www.se.com
Featured: ✅
```

#### Marca 4: Legrand
```
Nombre: Legrand
Slug: legrand
Descripción: Infraestructuras eléctricas y digitales
Website: https://www.legrand.com
Featured: ✅
```

#### Marca 5: General Cable
```
Nombre: General Cable
Slug: general-cable
Descripción: Cables y conductores de alta calidad
Website: https://www.generalcable.com
Featured: ✅
```

**Publish cada una**

---

### 4. 📦 Crear Productos (30-60 min)

**Ruta**: Productos > Create

#### Producto Ejemplo 1:
```
Nombre: Lámpara LED 9W Luz Blanca
Slug: lampara-led-9w-luz-blanca
Código: LED-9W-BL
Marca: Seleccionar "Bticino"
Categoría: Seleccionar "Iluminación"

Descripción:
Lámpara LED de 9W con luz blanca, ideal para oficinas y espacios comerciales.
Alta eficiencia energética y larga duración.

Especificaciones Técnicas:
- Potencia: 9W
- Tipo de luz: Blanca (6500K)
- Vida útil: 25,000 horas
- Base: E27
- Voltaje: 220V

SEO:
- Meta Title: Lámpara LED 9W Luz Blanca | ELECTRO FLOR
- Meta Description: Lámpara LED de 9W con luz blanca. Alta eficiencia y larga duración.

Flags:
✅ Producto Destacado
✅ Producto Nuevo
✅ En Stock
```

#### Producto Ejemplo 2:
```
Nombre: Cable THW 2.5mm Rojo
Slug: cable-thw-25mm-rojo
Código: THW-25-RED
Marca: Nexans
Categoría: Conductores

Descripción:
Cable THW calibre 2.5mm color rojo, ideal para instalaciones residenciales.

Especificaciones:
- Calibre: 2.5mm
- Color: Rojo
- Tipo: THW
- Voltaje: 600V
- Temperatura: 75°C

✅ En Stock
```

#### Producto Ejemplo 3:
```
Nombre: Tomacorriente Doble Universal Bticino
Slug: tomacorriente-doble-universal
Código: TOMA-DU-BT
Marca: Bticino
Categoría: Tomacorrientes

Descripción:
Tomacorriente doble universal Bticino, diseño moderno y elegante.

Especificaciones:
- Tipo: Universal
- Salidas: 2
- Voltaje: 220V
- Corriente: 15A
- Con toma a tierra

✅ Destacado
✅ En Stock
```

**Continúa creando más productos...**

---

### 5. 🏗️ Crear Proyectos (15 min)

**Ruta**: Proyectos Destacados > Create

#### Proyecto 1:
```
Título: Iluminación LED Edificio Corporativo
Slug: iluminacion-edificio-corporativo
Tipo: Iluminación Técnica
Ubicación: San Isidro, Lima
Descripción: Instalación completa de sistema de iluminación LED en edificio de 15 pisos
Featured: ✅
Orden: 1
```

#### Proyecto 2:
```
Título: Sistema Eléctrico Residencial Premium
Slug: sistema-electrico-residencial
Tipo: Instalación Completa
Ubicación: Miraflores, Lima
Descripción: Instalación eléctrica completa con automatización y domótica
Featured: ✅
Orden: 2
```

---

### 6. ❓ Crear FAQs (20 min)

**Ruta**: Preguntas Frecuentes > Create

#### FAQ 1:
```
Pregunta: ¿Hacen entregas el mismo día?
Respuesta: Sí, realizamos entregas el mismo día en Lima Metropolitana para pedidos antes de las 2:00 PM.
Categoría: Envíos y Entregas
Orden: 1
Publicado: ✅
```

#### FAQ 2:
```
Pregunta: ¿Los productos tienen garantía?
Respuesta: Todos nuestros productos cuentan con garantía del fabricante. El tiempo varía según la marca y tipo de producto.
Categoría: Productos
Orden: 2
Publicado: ✅
```

#### FAQ 3:
```
Pregunta: ¿Cómo puedo solicitar una cotización?
Respuesta: Puedes solicitar cotización por WhatsApp, llamando al 999 000 000, o agregando productos a tu carrito de cotización en el sitio web.
Categoría: Cotizaciones
Orden: 3
Publicado: ✅
```

**Continúa agregando más FAQs sobre:**
- Pagos
- Devoluciones
- Instalaciones
- Stock de productos

---

### 7. 🏠 Configurar Página de Inicio

**Ruta**: Páginas > Página de Inicio

```
Hero:
- Título: LA FUERZA DE TU CONSTRUCCIÓN
- Subtítulo: Material eléctrico profesional con entrega el mismo día
- CTA Texto: Ver Productos
- CTA Link: /productos

Productos Destacados:
- Activado: ✅
- Título: Productos Destacados
- (Los productos marcados como "destacados" se mostrarán automáticamente)

Sección de Categorías:
- Activado: ✅
- Título: Explora Nuestras Categorías

Sección de Proyectos:
- Activado: ✅
- Título: Proyectos Destacados

Características:
1. 
   - Icono: fa-shipping-fast
   - Título: Entrega el Mismo Día
   - Descripción: Recibe tus productos el mismo día en Lima

2. 
   - Icono: fa-certificate
   - Título: Productos Certificados
   - Descripción: Certificaciones internacionales

3. 
   - Icono: fa-headset
   - Título: Asesoría Técnica
   - Descripción: Te ayudamos a elegir los productos correctos
```

**PUBLISH**

---

### 8. ℹ️ Configurar Página "Nosotros"

**Ruta**: Páginas > Página "Nosotros"

```
Título: Nosotros

Introducción:
En ELECTRO FLOR somos distribuidores especializados en material eléctrico de las mejores marcas internacionales. Más de 10 años de experiencia nos respaldan.

Misión:
Título: Nuestra Misión
Contenido: Proveer materiales eléctricos de la más alta calidad con el mejor servicio y asesoría técnica especializada.

Visión:
Título: Nuestra Visión
Contenido: Ser el distribuidor líder en material eléctrico en el Perú, reconocidos por nuestra calidad, servicio y compromiso.

Valores:
1. Calidad - Productos certificados de las mejores marcas
2. Servicio - Atención personalizada y asesoría técnica
3. Compromiso - Cumplimiento en entregas y garantías
```

**PUBLISH**

---

## ✅ Después de Poblar Datos

Una vez que tengas datos en Sanity:

1. El frontend automáticamente podrá obtenerlos vía API
2. Usa las funciones en `services/sanity.ts`:
   ```typescript
   import { getProducts, getCategories } from './services/sanity'
   ```

3. Los datos estarán disponibles de inmediato
4. No necesitas reiniciar el servidor

---

## 🔄 Sincronización

El frontend ya está configurado para:
- ✅ Conectarse a tu proyecto: 2gy084y4
- ✅ Obtener datos en tiempo real
- ✅ Mostrar contenido dinámicamente

Solo necesitas poblar los datos en Studio (web o local).

---

## 📞 Resumen

**URL de Sanity Manage**: https://www.sanity.io/manage
**Project ID**: 2gy084y4
**Tiempo estimado**: 1-2 horas para poblar datos básicos

**Orden recomendado**:
1. ⚙️ Configuración (5 min)
2. 🏷️ Categorías (10 min)
3. 🏢 Marcas (10 min)
4. 📦 Productos (30-60 min)
5. 🏗️ Proyectos (15 min)
6. ❓ FAQs (20 min)
7. 🏠 Página Inicio (10 min)
8. ℹ️ Página Nosotros (10 min)

**Total**: ~2 horas para contenido completo

---

¡Empieza ahora! 🚀
