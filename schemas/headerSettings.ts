import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'headerSettings',
  title: 'Configuración del Header',
  type: 'document',
  fields: [
    defineField({
      name: 'navigationLinks',
      title: 'Enlaces de Navegación',
      description: 'El logo, teléfono y redes sociales se toman de "Configuración del Sitio"',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Etiqueta' },
            { name: 'url', type: 'string', title: 'URL' }
          ]
        }
      ]
    }),
    defineField({
      name: 'ctaButton',
      title: 'Botón CTA',
      type: 'object',
      fields: [
        { name: 'text', type: 'string', title: 'Texto' },
        { name: 'url', type: 'string', title: 'URL' }
      ]
    })
  ]
})
