# Reporte de Preparación para Motores de Búsqueda con IA (GEO / AEO)

- **Sitio Evaluado**: `https://electroflorperu.com`
- **Fecha**: `2026-09-08T00:27:56.193847`
- **Objetivo**: Visibilidad y citabilidad en ChatGPT (SearchGPT), Perplexity, Google AI Overviews y Claude.

## 1. Matriz de Acceso para Crawlers de Inteligencia Artificial (robots.txt)

| Crawler IA | Motor / Empresa | Estado en robots.txt | Recomendación |
|------------|-----------------|----------------------|---------------|
| `GPTBot` | OpenAI (ChatGPT / SearchGPT) | 🔴 Bloqueado (declared but no rules) | Permitir si deseas aparecer en respuestas de ChatGPT. |
| `OAI-SearchBot` | OpenAI (SearchGPT en vivo) | 🟢 Permitido (no especificado en robots.txt (permitido por defecto)) | Crítico para citas en tiempo real en ChatGPT. |
| `ClaudeBot` | Anthropic (Claude) | 🔴 Bloqueado (declared but no rules) | Permitir si buscas presencia en asistentes Anthropic. |
| `PerplexityBot` | Perplexity AI | 🔴 Bloqueado (declared but no rules) | Fundamental para citaciones en respuestas con fuentes. |
| `Google-Extended` | Google (Entrenamiento Gemini) | 🔴 Bloqueado (declared but no rules) | No afecta posicionamiento orgánico en Google Search. |
| `CCBot` | Common Crawl (Base de datos abierta) | 🔴 Bloqueado (declared but no rules) | Utilizado por múltiples modelos de IA de código abierto. |
| `Bytespider` | ByteDance / TikTok AI | 🔴 Bloqueado (declared but no rules) | Revisar carga en servidor si consume demasiados recursos. |

## 2. Diagnóstico de `/llms.txt`

- **Existe `/llms.txt`**: `Sí (✅)`
- **URL evaluada**: `https://electroflorperu.com/llms.txt`
- **Longitud de caracteres**: `0`

### ¿Por qué implementar `/llms.txt`?
El estándar `/llms.txt` proporciona un archivo Markdown conciso y estructurado en la raíz de tu dominio para que los agentes autónomos de IA y buscadores generativos comprendan de inmediato la propuesta de valor, las URLs clave y la documentación de tu empresa sin tener que parsear código HTML complejo.

## 3. Directrices para Citabilidad (AEO y GEO)

1. **Estructura de Respuesta Directa**: Abre tus páginas clave con un párrafo de respuesta concisa (40-60 palabras) que responda a la intención principal antes de profundizar.
2. **Tablas y Datos Duros**: Los LLMs prefieren datos estructurados en tablas Markdown/HTML con cifras concretas, porcentajes y listas con viñetas.
3. **Autoría y E-E-A-T**: Incluye autor, credenciales de experiencia y enlaces a fuentes verificadas para aumentar la probabilidad de ser citado como fuente autorizada.

