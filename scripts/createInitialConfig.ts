// Script para crear documento de Configuración del Sitio en Sanity
// Ejecutar con: npx sanity exec scripts/createInitialConfig.ts --with-user-token

import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const siteSettings = {
  _type: 'siteSettings',
  _id: 'siteSettings',
  siteName: 'ELECTRO FLOR',
  siteDescription: 'Ferretería y Material Eléctrico - Distribuidores Autorizados de las mejores marcas',
  primaryColor: '#002D62',
  secondaryColor: '#8CC63F',
  phone: '999 000 000',
  whatsapp: '51999000000',
  email: 'ventas@electroflor.com.pe',
  address: 'Av. Argentina 245, Lima, Perú',
  facebook: 'https://facebook.com/electroflor',
  instagram: 'https://instagram.com/electroflor',
  linkedin: 'https://linkedin.com/company/electroflor',
}

const headerSettings = {
  _type: 'headerSettings',
  _id: 'headerSettings',
  showSearch: true,
  showCategories: true,
  menuItems: [
    { title: 'Productos', url: '/productos', _key: 'menu1' },
    { title: 'Proyectos', url: '/proyectos', _key: 'menu2' },
    { title: 'Nosotros', url: '/nosotros', _key: 'menu3' },
    { title: 'Contacto', url: '/contacto', _key: 'menu4' },
  ]
}

const footerSettings = {
  _type: 'footerSettings',
  _id: 'footerSettings',
  copyrightText: '© 2026 ELECTRO FLOR. Todos los derechos reservados.',
  columns: [
    {
      _key: 'col1',
      title: 'Productos',
      links: [
        { _key: 'link1', text: 'Iluminación Industrial', url: '/productos' },
        { _key: 'link2', text: 'Conductores Eléctricos', url: '/productos' },
        { _key: 'link3', text: 'Baja Tensión', url: '/productos' },
      ]
    }
  ]
}

async function createInitialConfig() {
  try {
    console.log('🚀 Creando configuración inicial...')
    
    // Crear Site Settings
    await client.createOrReplace(siteSettings)
    console.log('✅ Site Settings creado')
    
    // Crear Header Settings
    await client.createOrReplace(headerSettings)
    console.log('✅ Header Settings creado')
    
    // Crear Footer Settings
    await client.createOrReplace(footerSettings)
    console.log('✅ Footer Settings creado')
    
    console.log('\n🎉 ¡Configuración inicial creada exitosamente!')
    console.log('📝 Ahora puedes editarla en Sanity Studio: http://localhost:3333')
    console.log('🌐 Recarga el frontend para ver los cambios: http://localhost:3000')
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

createInitialConfig()
