import React from 'react'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import './sanity/studio.css'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { structure } from './sanity/structure'
import { Zap } from 'lucide-react'

// Logo simple de ELECTRO FLOR
const ElectroFlorLogo = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 0'
  }}>
    <div style={{
      backgroundColor: '#8CC63F',
      padding: '5px 7px',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Zap size={14} color="#002D62" strokeWidth={3} />
    </div>
    <span style={{
      color: '#ffffff',
      fontWeight: 700,
      fontSize: '13px',
    }}>ELECTRO FLOR</span>
  </div>
)

export default defineConfig({
  name: 'electro-flor-studio',
  title: 'ELECTRO FLOR',

  projectId: '2gy084y4',
  dataset: 'production',

  basePath: '/admin',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      logo: ElectroFlorLogo,
    },
  },
})
