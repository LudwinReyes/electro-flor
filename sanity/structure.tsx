import type { StructureBuilder } from 'sanity/structure'
import {
    Package,
    Tags,
    Award,
    Home,
    Briefcase,
    HelpCircle,
    Users,
    Megaphone,
    Truck,
    Settings,
    LayoutTemplate,
    Database,
    Zap
} from 'lucide-react'

// Estructura plana sin dividers
export const structure = (S: StructureBuilder) =>
    S.list()
        .title('Electro Flor Studio')
        .items([
            // COMMERCE
            S.listItem()
                .title('Productos')
                .icon(() => <Package size={18} />)
                .child(S.documentTypeList('product').title('Productos')),
            S.listItem()
                .title('Categorías')
                .icon(() => <Tags size={18} />)
                .child(S.documentTypeList('category').title('Categorías')),
            S.listItem()
                .title('Marcas')
                .icon(() => <Award size={18} />)
                .child(S.documentTypeList('brand').title('Marcas')),

            // EDITORIAL
            S.listItem()
                .title('Página de Inicio')
                .icon(() => <Home size={18} />)
                .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem()
                .title('Proyectos')
                .icon(() => <Briefcase size={18} />)
                .child(S.documentTypeList('project').title('Proyectos')),
            S.listItem()
                .title('Preguntas Frecuentes')
                .icon(() => <HelpCircle size={18} />)
                .child(S.documentTypeList('faq').title('FAQs')),

            // MARKETING
            S.listItem()
                .title('Leads / Prospectos')
                .icon(() => <Users size={18} />)
                .child(S.documentTypeList('lead').title('Leads')),
            S.listItem()
                .title('Banners')
                .icon(() => <Megaphone size={18} />)
                .child(S.documentTypeList('promoBanner').title('Banners')),
            S.listItem()
                .title('Delivery')
                .icon(() => <Truck size={18} />)
                .child(S.document().schemaType('deliveryBanner').documentId('deliveryBanner')),

            // SETTINGS
            S.listItem()
                .title('Configuración Global')
                .icon(() => <Settings size={18} />)
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
                .title('Navegación')
                .icon(() => <LayoutTemplate size={18} />)
                .child(
                    S.list()
                        .title('Navegación')
                        .items([
                            S.listItem()
                                .title('Header')
                                .child(S.document().schemaType('headerSettings').documentId('headerSettings')),
                            S.listItem()
                                .title('Footer')
                                .child(S.document().schemaType('footerSettings').documentId('footerSettings')),
                        ])
                ),
            S.listItem()
                .title('Programa Especialista')
                .icon(() => <Database size={18} />)
                .child(S.document().schemaType('programaEspecialista').documentId('programaEspecialista')),
            S.listItem()
                .title('Barra de Urgencia')
                .icon(() => <Zap size={18} />)
                .child(S.document().schemaType('urgencyBar').documentId('urgencyBar')),
        ])
