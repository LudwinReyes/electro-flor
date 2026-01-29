import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'programaEspecialista',
    title: 'Programa Especialista',
    type: 'document',
    fields: [
        defineField({
            name: 'badge',
            title: 'Etiqueta superior',
            type: 'string',
            description: 'Ej: "Programa Especialista"',
            initialValue: 'Programa Especialista'
        }),
        defineField({
            name: 'title',
            title: 'Título Principal',
            type: 'string',
            description: 'Ej: "¿ERES MAESTRO"',
            initialValue: '¿ERES MAESTRO'
        }),
        defineField({
            name: 'titleHighlight',
            title: 'Título Destacado',
            type: 'string',
            description: 'Ej: "DE OBRA?"',
            initialValue: 'DE OBRA?'
        }),
        defineField({
            name: 'benefits',
            title: 'Beneficios',
            type: 'array',
            of: [{ type: 'string' }],
            initialValue: ['PRECIOS DE DISTRIBUIDOR', 'ENTREGA EN OBRA HOY']
        }),
        defineField({
            name: 'inputPlaceholder',
            title: 'Placeholder del campo',
            type: 'string',
            initialValue: 'WhatsApp'
        }),
        defineField({
            name: 'buttonText',
            title: 'Texto del botón',
            type: 'string',
            initialValue: 'Quiero Beneficios Pro'
        }),
        defineField({
            name: 'successMessage',
            title: 'Mensaje de éxito',
            type: 'string',
            initialValue: '¡Gracias! Te contactaremos pronto.'
        })
    ],
    preview: {
        prepare() {
            return {
                title: 'Programa Especialista',
                subtitle: 'Configuración del formulario'
            }
        }
    }
})
