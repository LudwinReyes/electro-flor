import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'reclamacion',
    title: 'Libro de Reclamaciones',
    type: 'document',
    fields: [
        defineField({
            name: 'fullName',
            title: 'Nombres y Apellidos',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'dni',
            title: 'DNI / CE',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'email',
            title: 'Correo Electrónico',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'type',
            title: 'Tipo de Reporte',
            type: 'string',
            options: {
                list: [
                    { title: 'Reclamo', value: 'Reclamo' },
                    { title: 'Queja', value: 'Queja' }
                ]
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'message',
            title: 'Detalle / Mensaje',
            type: 'text',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'status',
            title: 'Estado de Atención',
            type: 'string',
            options: {
                list: [
                    { title: 'Pendiente', value: 'pendiente' },
                    { title: 'En Proceso', value: 'en_proceso' },
                    { title: 'Atendido', value: 'atendido' },
                    { title: 'Cerrado', value: 'cerrado' }
                ]
            },
            initialValue: 'pendiente'
        }),
        defineField({
            name: 'internalNotes',
            title: 'Notas Internas / Respuesta',
            type: 'text',
            description: 'Registra aquí las acciones tomadas para resolver este reclamo.'
        }),
        defineField({
            name: 'createdAt',
            title: 'Fecha de Registro',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            readOnly: true
        })
    ],
    preview: {
        select: {
            title: 'fullName',
            subtitle: 'dni',
            type: 'type',
            status: 'status'
        },
        prepare({ title, subtitle, type, status }) {
            const statusMap: Record<string, string> = {
                pendiente: '🔔 Pendiente',
                en_proceso: '⏳ En Proceso',
                atendido: '✅ Atendido',
                cerrado: '📁 Cerrado'
            };
            return {
                title: `${type}: ${title}`,
                subtitle: `${statusMap[status] || status} | DNI: ${subtitle}`
            }
        }
    }
})
