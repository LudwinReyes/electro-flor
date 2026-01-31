import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
    api: {
        projectId: '2gy084y4',
        dataset: 'production'
    },
    // Configuración para despliegue estático
    studioHost: 'electro-flor-admin',
    vite: {
        base: '/admin/'
    }
})
