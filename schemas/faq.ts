import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'Preguntas Frecuentes',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Pregunta',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'answer',
      title: 'Respuesta',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Envíos', value: 'shipping' },
          { title: 'Productos', value: 'products' },
          { title: 'Pagos', value: 'payments' },
          { title: 'Garantías', value: 'warranty' },
          { title: 'General', value: 'general' }
        ]
      }
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Orden de visualización'
    })
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category'
    }
  }
})
