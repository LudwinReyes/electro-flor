import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Categorías',
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
      title: 'Descripción',
      type: 'text'
    }),
    defineField({
      name: 'icon',
      title: 'Icono FontAwesome',
      type: 'string',
      description: 'Ejemplo: fa-lightbulb, fa-bolt, fa-plug, fa-wrench, etc. Ver: fontawesome.com/icons',
      placeholder: 'fa-lightbulb'
    }),
    defineField({
      name: 'parentCategory',
      title: 'Categoría Padre (para subcategorías)',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Dejar vacío si es una categoría principal. Seleccionar una categoría para crear una subcategoría.'
    }),
    defineField({
      name: 'order',
      title: 'Orden de visualización',
      type: 'number',
      description: 'Número para ordenar las categorías (menor número aparece primero)',
      initialValue: 0
    }),
    defineField({
      name: 'featured',
      title: 'Mostrar en Inicio',
      type: 'boolean',
      description: 'Activa esto para que la categoría aparezca en la cuadrícula de la página principal.',
      initialValue: true
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true,
      }
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'parentCategory.name',
      media: 'image'
    },
    prepare({ title, subtitle, media }) {
      return {
        title: subtitle ? `${subtitle} > ${title}` : title,
        subtitle: subtitle ? 'Subcategoría' : 'Categoría Principal',
        media
      }
    }
  }
})
