import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'footerSettings',
  title: 'Configuración del Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'featuredCategories',
      title: 'Nuestras Líneas (Categorías destacadas)',
      description: 'Selecciona hasta 5 categorías para mostrar en "Nuestras Líneas"',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }]
        }
      ],
      validation: Rule => Rule.max(5)
    }),
    defineField({
      name: 'institutionalLinks',
      title: 'Enlaces Institucionales',
      description: 'Enlaces como Sobre Nosotros, FAQ, Contacto, etc.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Etiqueta' },
            { name: 'url', type: 'string', title: 'URL (ej: /nosotros, /faq)' }
          ]
        }
      ]
    }),
    defineField({
      name: 'copyrightText',
      title: 'Texto de Copyright',
      type: 'string',
      description: 'Ejemplo: ELECTRO FLOR PERÚ © 2024'
    })
  ]
})
