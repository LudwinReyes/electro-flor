import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'lead',
    title: 'Leads / Prospectos',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nombre Completo',
            type: 'string',
        }),
        defineField({
            name: 'company',
            title: 'Empresa / RUC',
            type: 'string',
        }),
        defineField({
            name: 'whatsapp',
            title: 'Número de WhatsApp',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'subject',
            title: 'Asunto',
            type: 'string',
            options: {
                list: [
                    { title: 'Cotización Corporativa', value: 'cotizacion_corporativa' },
                    { title: 'Consulta Técnica', value: 'consulta_tecnica' },
                    { title: 'Atención Post-Venta', value: 'post_venta' },
                    { title: 'Otros', value: 'otros' }
                ]
            },
        }),
        defineField({
            name: 'message',
            title: 'Mensaje / Detalle de Pedido',
            type: 'text',
        }),
        defineField({
            name: 'source',
            title: 'Origen',
            type: 'string',
            options: {
                list: [
                    { title: 'Programa Especialista (Footer)', value: 'programa_especialista' },
                    { title: 'Formulario de Contacto', value: 'contacto' },
                    { title: 'Otro', value: 'otro' }
                ]
            },
            initialValue: 'contacto'
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
            title: 'Notas Internas',
            type: 'text',
            description: 'Notas del equipo de ventas'
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
            title: 'name',
            subtitle: 'whatsapp',
            status: 'status',
            source: 'source'
        },
        prepare({ title, subtitle, status, source }) {
            const statusLabels: Record<string, string> = {
                nuevo: '🟢 Nuevo',
                contactado: '🟡 Contactado',
                cliente: '✅ Cliente',
                descartado: '🔴 Descartado'
            };
            return {
                title: title || subtitle || 'Sin nombre',
                subtitle: `${statusLabels[status] || status} | ${subtitle || ''}`
            }
        }
    },
    orderings: [
        {
            title: 'Más recientes',
            name: 'createdAtDesc',
            by: [{ field: 'createdAt', direction: 'desc' }]
        },
        {
            title: 'Estado',
            name: 'statusAsc',
            by: [{ field: 'status', direction: 'asc' }]
        }
    ]
})
