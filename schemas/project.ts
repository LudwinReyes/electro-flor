import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Proyectos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      hidden: true
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'type',
      title: 'Tipo de Proyecto',
      description: 'Ej: Iluminación Técnica, Distribución Eléctrica',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'location',
      title: 'Ubicación',
      description: 'Ej: San Isidro, Lima',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      description: 'Número menor = aparece primero',
      type: 'number',
      initialValue: 0
    }),
    defineField({
      name: 'featured',
      title: 'Mostrar en Inicio',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'location'
    }
  }
})

