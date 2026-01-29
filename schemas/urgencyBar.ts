import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'urgencyBar',
    title: 'Barra de Urgencia',
    type: 'document',
    fields: [
        defineField({
            name: 'isActive',
            title: 'Activo',
            type: 'boolean',
            initialValue: true
        }),
        defineField({
            name: 'message',
            title: 'Mensaje',
            type: 'string',
            description: 'Ej: "Próximo camión sale esta tarde - ¡Pide ahora para recibir mañana!"',
            initialValue: 'Próximo camión sale esta tarde - ¡Pide ahora para recibir mañana!'
        }),
        defineField({
            name: 'highlightText',
            title: 'Texto destacado (subrayado)',
            type: 'string',
            description: 'Ej: "esta tarde" - esta parte aparecerá subrayada',
            initialValue: 'esta tarde'
        }),
        defineField({
            name: 'linkUrl',
            title: 'URL (opcional)',
            type: 'string',
            description: 'Si quieres que la barra sea clickeable'
        })
    ],
    preview: {
        select: {
            title: 'message',
            active: 'isActive'
        },
        prepare({ title, active }) {
            return {
                title: title || 'Barra de Urgencia',
                subtitle: active ? '✅ Activo' : '❌ Inactivo'
            }
        }
    }
})
