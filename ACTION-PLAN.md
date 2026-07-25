# Plan de Acción SEO - Electro Flor

Este plan detalla las prioridades y tareas necesarias para maximizar el posicionamiento del sitio web y solucionar los hallazgos críticos detectados por las herramientas de auditoría.

---

## ⚡ Tareas Corregidas (Ya en producción tras la última actualización)

### 1. Agregar Esquema Structured Data de Organización (`Organization`)
* **Prioridad**: 🔴 Crítica (Esquemas)
* **Estado**: **CORREGIDO ✅**
* **Detalle**: Se inyectó un esquema completo de tipo `Organization` en la página de inicio que enlaza el perfil social de Facebook, teléfonos, correos y la URL del logo oficial.

### 2. Configurar Encabezados de Seguridad HTTP
* **Prioridad**: 🔴 Crítica (Seguridad)
* **Estado**: **CORREGIDO ✅**
* **Detalle**: Se definieron políticas en `next.config.mjs` para inyectar los siguientes encabezados de seguridad obligatorios:
  * `Strict-Transport-Security` (HSTS)
  * `X-Frame-Options: SAMEORIGIN` (Protección clickjacking)
  * `X-Content-Type-Options: nosniff` (Protección mime-sniffing)
  * `Referrer-Policy: strict-origin-when-cross-origin`

### 3. Completar Metadatos OpenGraph (`og:image` y `og:url`)
* **Prioridad**: 🔴 Crítica (Redes Sociales)
* **Estado**: **CORREGIDO ✅**
* **Detalle**: Se agregaron imágenes representativas del logotipo e información de URL canónica en `app/layout.tsx` para evitar que los enlaces aparezcan vacíos al compartirse.

### 4. Crear el Archivo de Guía para IA (`llms.txt`)
* **Prioridad**: ⚠️ Advertencia (Búsqueda de IA / GEO)
* **Estado**: **CORREGIDO ✅**
* **Detalle**: Se añadió `/llms.txt` en la raíz pública para que los agentes de IA (como ChatGPT, Claude, Perplexity) entiendan el catálogo y los datos del negocio al responder consultas de usuarios.

### 5. Control de Robots e Indexación de IA en robots.txt
* **Prioridad**: ⚠️ Advertencia (Robots)
* **Estado**: **CORREGIDO ✅**
* **Detalle**: Configuración explícita en `app/robots.ts` para gestionar y dar acceso correcto a indexadores inteligentes (`GPTBot`, `ClaudeBot`, etc.).

### 6. Resolver Enlaces Internos Huérfanos
* **Prioridad**: 🔴 Crítica (SEO Técnico)
* **Estado**: **CORREGIDO ✅**
* **Detalle**: Se creó una sección de **"Productos Relacionados"** en la parte inferior de la página de cada producto. Esto añade enlaces cruzados automáticos entre productos de la misma categoría, facilitando el rastreo e indexación de Google y eliminando la orfandad de páginas.

---

## ⏳ Tareas Pendientes (Requieren optimización continua)

### 7. Añadir Textos de Anclaje (Anchor Text) Accesibles
* **Prioridad**: ⚠️ Advertencia (Enlaces)
* **Estado**: **PENDIENTE ⏳**
* **Acción**:
  * Se identificaron 9 enlaces (como iconos sociales o logotipos con imágenes) que no contienen texto de lectura.
  * **Solución**: Añadir atributos `aria-label` (ej: `aria-label="Enlace a Facebook"`) a estos elementos interactivos.

### 8. Ampliar el Contenido Textual sobre Categorías (SEO de Contenido)
* **Prioridad**: ⚠️ Advertencia (Contenido)
* **Estado**: **PENDIENTE ⏳**
* **Acción**:
  * El analizador de legibilidad detecta contenido "delgado" en algunas plantillas automáticas del servidor.
  * **Solución**: Agregar textos breves descriptivos en las páginas de categorías y subcategorías explicando la gama de productos, marcas principales y aplicaciones.
