import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Página de Inicio',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Título Hero',
      type: 'string'
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Subtítulo Hero',
      type: 'text'
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagen Hero',
      type: 'image',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Texto del Botón Hero',
      type: 'string'
    }),
    defineField({
      name: 'featuredProducts',
      title: 'Productos Destacados',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }]
    }),
    defineField({
      name: 'features',
      title: 'Características',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', type: 'string', title: 'Icono' },
            { name: 'title', type: 'string', title: 'Título' },
            { name: 'description', type: 'text', title: 'Descripción' }
          ]
        }
      ]
    })
  ]
})
