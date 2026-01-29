import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Configuración del Sitio',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nombre del Sitio',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'siteDescription',
      title: 'Descripción del Sitio',
      type: 'text'
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'primaryColor',
      title: 'Color Primario',
      type: 'string',
      description: 'Ejemplo: #002D62'
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Color Secundario',
      type: 'string',
      description: 'Ejemplo: #8CC63F'
    }),
    defineField({
      name: 'phone',
      title: 'Teléfono',
      type: 'string'
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string'
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string'
    }),
    defineField({
      name: 'address',
      title: 'Dirección',
      type: 'text'
    }),
    defineField({
      name: 'socialMedia',
      title: 'Redes Sociales',
      type: 'object',
      fields: [
        { name: 'facebook', type: 'url', title: 'Facebook' },
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn' }
      ]
    }),
    defineField({
      name: 'businessHours',
      title: 'Horario de Atención',
      type: 'text'
    })
  ]
})
