import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'Página Acerca de',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text'
    }),
    defineField({
      name: 'mission',
      title: 'Misión',
      type: 'text'
    }),
    defineField({
      name: 'vision',
      title: 'Visión',
      type: 'text'
    }),
    defineField({
      name: 'values',
      title: 'Valores',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'teamMembers',
      title: 'Equipo',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Nombre' },
            { name: 'position', type: 'string', title: 'Cargo' },
            { name: 'image', type: 'image', title: 'Foto' },
            { name: 'bio', type: 'text', title: 'Biografía' }
          ]
        }
      ]
    })
  ]
})
