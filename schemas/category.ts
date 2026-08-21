import React from 'react'
import { defineField, defineType } from 'sanity'
import LucideIconPicker from '../sanity/components/LucideIconPicker'
import CategoryIcon from '../components/CategoryIcon'

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
    }),
    defineField({
      name: 'icon',
      title: 'Icono de la Categoría (Lucide Icons)',
      type: 'string',
      description: 'Busca y selecciona visualmente el icono (ej: LampCeiling para lámparas colgantes, Lightbulb para iluminación, Plug para enchufes, etc.).',
      components: {
        input: LucideIconPicker
      }
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
      media: 'image',
      icon: 'icon'
    },
    prepare({ title, subtitle, media, icon }) {
      return {
        title: subtitle ? `${subtitle} > ${title}` : title,
        subtitle: subtitle ? 'Subcategoría' : 'Categoría Principal',
        media: media || (icon ? () => React.createElement(CategoryIcon, { name: icon, size: 20, color: '#8CC63F' }) : undefined)
      }
    }
  }
})
