import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'brand',
  title: 'Marcas',
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
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text'
    }),
    defineField({
      name: 'seoTitle',
      title: 'Título SEO',
      type: 'string',
      description: 'Título personalizado para buscadores (Google). Si se deja vacío se usará el nombre.'
    }),
    defineField({
      name: 'seoDescription',
      title: 'Descripción SEO',
      type: 'text',
      description: 'Descripción corta para buscadores (Google). Máximo 160 caracteres.'
    })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo'
    }
  }
})
