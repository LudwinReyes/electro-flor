import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'lead',
    title: 'Leads / Prospectos',
    type: 'document',
    fields: [
        defineField({
            name: 'whatsapp',
            title: 'Número de WhatsApp',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'source',
            title: 'Origen',
            type: 'string',
            options: {
                list: [
                    { title: 'Programa Especialista (Footer)', value: 'programa_especialista' },
                    { title: 'Contacto', value: 'contacto' },
                    { title: 'Otro', value: 'otro' }
                ]
            },
            initialValue: 'programa_especialista'
        }),
        defineField({
            name: 'status',
            title: 'Estado',
            type: 'string',
            options: {
                list: [
                    { title: 'Nuevo', value: 'nuevo' },
                    { title: 'Contactado', value: 'contactado' },
                    { title: 'Cliente', value: 'cliente' },
                    { title: 'Descartado', value: 'descartado' }
                ]
            },
            initialValue: 'nuevo'
        }),
        defineField({
            name: 'notes',
            title: 'Notas',
            type: 'text'
        }),
        defineField({
            name: 'createdAt',
            title: 'Fecha de registro',
            type: 'datetime',
            readOnly: true
        })
    ],
    preview: {
        select: {
            title: 'whatsapp',
            subtitle: 'status'
        }
    },
    orderings: [
        {
            title: 'Más recientes',
            name: 'createdAtDesc',
            by: [{ field: 'createdAt', direction: 'desc' }]
        }
    ]
})
