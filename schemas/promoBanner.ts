import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'promoBanner',
    title: 'Banners Promocionales',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nombre interno',
            type: 'string',
            description: 'Para identificar el banner (no se muestra en la web)',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'position',
            title: 'Posición',
            type: 'string',
            options: {
                list: [
                    { title: 'Banner Principal (Hero)', value: 'hero' },
                    { title: 'Debajo de productos destacados', value: 'after_products' },
                    { title: 'Banner de Delivery', value: 'delivery' }
                ]
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'isActive',
            title: 'Activo',
            type: 'boolean',
            initialValue: true
        }),
        defineField({
            name: 'badge',
            title: 'Etiqueta superior',
            type: 'string',
            description: 'Ej: "OFERTA POR TIEMPO LIMITADO"'
        }),
        defineField({
            name: 'title',
            title: 'Título',
            type: 'string',
            description: 'Ej: "CYBER"'
        }),
        defineField({
            name: 'titleHighlight',
            title: 'Título destacado (color verde)',
            type: 'string',
            description: 'Ej: "CONSTRUCCIÓN"'
        }),
        defineField({
            name: 'description',
            title: 'Descripción',
            type: 'text',
            description: 'Texto que aparece debajo del título'
        }),
        defineField({
            name: 'image',
            title: 'Imagen del banner',
            type: 'image',
            options: { hotspot: true }
        }),
        defineField({
            name: 'buttonText',
            title: 'Texto del botón',
            type: 'string',
            description: 'Ej: "APROVECHAR AHORA"'
        }),
        defineField({
            name: 'buttonUrl',
            title: 'URL del botón',
            type: 'string',
            description: 'A dónde redirige el botón'
        })
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'position',
            media: 'image'
        }
    }
})
