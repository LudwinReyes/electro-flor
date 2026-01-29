import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'deliveryBanner',
    title: 'Banner de Delivery',
    type: 'document',
    fields: [
        defineField({
            name: 'isActive',
            title: 'Activo',
            type: 'boolean',
            initialValue: true
        }),
        defineField({
            name: 'truckImage',
            title: 'Imagen del camión',
            type: 'image',
            options: { hotspot: true }
        }),
        defineField({
            name: 'mainTitle',
            title: 'Título principal',
            type: 'string',
            description: 'Ej: "DELIVERY"',
            initialValue: 'DELIVERY'
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtítulo',
            type: 'string',
            description: 'Ej: "A TODO EL PERÚ"',
            initialValue: 'A TODO EL PERÚ'
        }),
        defineField({
            name: 'promoTitle',
            title: 'Título promocional',
            type: 'string',
            description: 'Ej: "¡GRATIS POR COMPRAS MAYORES A"',
            initialValue: '¡GRATIS POR COMPRAS MAYORES A'
        }),
        defineField({
            name: 'promoAmount',
            title: 'Monto destacado',
            type: 'string',
            description: 'Ej: "S/300!"',
            initialValue: 'S/300!'
        }),
        defineField({
            name: 'badgeText',
            title: 'Texto del badge',
            type: 'string',
            description: 'Ej: "LIMA METROPOLITANA"',
            initialValue: 'LIMA METROPOLITANA'
        })
    ],
    preview: {
        prepare() {
            return {
                title: 'Banner de Delivery',
                subtitle: 'Configuración del banner de envíos'
            }
        }
    }
})
