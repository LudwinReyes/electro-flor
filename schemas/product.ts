import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Productos',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Descripción Completa',
      description: 'Editor tipo Word: usa negritas, cursivas, listas, enlaces, etc.',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Título', value: 'h3' },
            { title: 'Subtítulo', value: 'h4' },
            { title: 'Cita', value: 'blockquote' }
          ],
          lists: [
            { title: 'Viñetas', value: 'bullet' },
            { title: 'Numerada', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
              { title: 'Subrayado', value: 'underline' },
              { title: 'Tachado', value: 'strike-through' }
            ],
            annotations: [
              {
                title: 'Enlace',
                name: 'link',
                type: 'object',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' }
                ]
              }
            ]
          }
        }
      ]
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descripción Corta',
      type: 'text',
      description: 'Descripción breve que aparece debajo del nombre del producto (2-3 líneas)',
      rows: 3,
      validation: Rule => Rule.max(250).warning('Máximo 250 caracteres para mejor visualización')
    }),
    defineField({
      name: 'image',
      title: 'Imagen Principal',
      type: 'image',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'images',
      title: 'Galería de Imágenes',
      type: 'array',
      of: [{ type: 'image' }]
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'category' }]
    }),
    defineField({
      name: 'brand',
      title: 'Marca',
      type: 'reference',
      to: [{ type: 'brand' }]
    }),
    defineField({
      name: 'displaySections',
      title: 'Mostrar en secciones',
      description: 'Elige en qué secciones del sitio aparecerá este producto',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '🔥 TOP VENTAS SEMANAL (Lo más pedido)', value: 'top_ventas' },
          { title: '🆕 ÚLTIMO INGRESO (Nueva mercadería)', value: 'ultimo_ingreso' },
          { title: '⭐ SOLUCIONES DESTACADAS (Recomendaciones Pro)', value: 'soluciones_destacadas' }
        ]
      }
    }),
    defineField({
      name: 'specifications',
      title: 'Especificaciones',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Etiqueta' },
            { name: 'value', type: 'string', title: 'Valor' }
          ]
        }
      ]
    }),
    defineField({
      name: 'pdfFile',
      title: 'Archivo PDF (Ficha Técnica)',
      type: 'file',
      description: 'Sube un PDF directamente a Sanity',
      options: {
        accept: '.pdf'
      }
    }),
    defineField({
      name: 'pdfUrl',
      title: 'URL del PDF (Cloudinary o Drive)',
      type: 'url',
      description: 'Pega el enlace del PDF subido a Cloudinary o Google Drive'
    }),
    defineField({
      name: 'youtubeVideo',
      title: 'Video Demostrativo (YouTube)',
      type: 'url',
      description: 'URL del video de YouTube (ej: https://www.youtube.com/watch?v=...)'
    })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      subtitle: 'category.name'
    }
  }
})
