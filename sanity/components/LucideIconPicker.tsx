import React, { useState, useMemo, useCallback } from 'react'
import { StringInputProps, set, unset } from 'sanity'
import * as LucideIcons from 'lucide-react'
import { Card, Stack, Flex, Box, TextInput, Button, Text, Badge, Grid } from '@sanity/ui'

// Lista curada de categorías temáticas para ferretería y material eléctrico
const PRESET_COLLECTIONS: { name: string; label: string; icons: string[] }[] = [
  {
    name: 'lighting',
    label: '💡 Iluminación & Lámparas',
    icons: [
      'LampCeiling', 'Lamp', 'LampDesk', 'LampFloor', 'LampWallDown', 'LampWallUp',
      'Lightbulb', 'LightbulbOff', 'Sun', 'SunMedium', 'Flashlight', 'Sparkles',
      'Zap', 'Flame', 'Eye', 'Orbit', 'CircleDot', 'Blinds'
    ]
  },
  {
    name: 'electricity',
    label: '⚡ Electricidad & Tomas',
    icons: [
      'Zap', 'ZapOff', 'Plug', 'Plug2', 'PlugZap', 'Power', 'PowerOff',
      'Battery', 'BatteryCharging', 'BatteryFull', 'ToggleLeft', 'ToggleRight',
      'Sliders', 'CircuitBoard', 'Cpu', 'Radio', 'Activity'
    ]
  },
  {
    name: 'cables',
    label: '🔌 Cables & Conectores',
    icons: [
      'Cable', 'Network', 'Layers', 'GitFork', 'Share2', 'Workflow',
      'RadioTower', 'Wifi', 'Server', 'Boxes'
    ]
  },
  {
    name: 'tools',
    label: '🛠️ Herramientas & Ferretería',
    icons: [
      'Hammer', 'Wrench', 'Drill', 'Nut', 'Settings', 'SlidersHorizontal',
      'Ruler', 'Scissors', 'PenTool', 'Compass', 'Axe', 'ShieldAlert'
    ]
  },
  {
    name: 'home',
    label: '🏠 Hogar & Decoración',
    icons: [
      'Home', 'Building2', 'Armchair', 'BedDouble', 'DoorOpen', 'Key',
      'Paintbrush', 'Palette', 'Sparkles', 'Shapes', 'Boxes', 'Store'
    ]
  },
  {
    name: 'solar',
    label: '☀️ Solar & Exterior',
    icons: [
      'Sun', 'SunMedium', 'SunDim', 'CloudSun', 'Leaf', 'Sprout',
      'Trees', 'Umbrella', 'Warehouse', 'ShieldCheck', 'Award', 'Truck'
    ]
  }
]

// Mapa de sinónimos en español para que al buscar "lampara" o "foco" o "colgante" encuentre los iconos
const SPANISH_SYNONYMS: Record<string, string[]> = {
  lampara: ['Lamp', 'LampCeiling', 'LampDesk', 'LampFloor', 'LampWallDown', 'LampWallUp', 'Lightbulb'],
  lámpara: ['Lamp', 'LampCeiling', 'LampDesk', 'LampFloor', 'LampWallDown', 'LampWallUp', 'Lightbulb'],
  colgante: ['LampCeiling', 'Lamp', 'Sparkles'],
  techo: ['LampCeiling', 'Home', 'Building2'],
  pared: ['LampWallDown', 'LampWallUp', 'Layers'],
  foco: ['Lightbulb', 'LightbulbOff', 'Sun', 'Flashlight', 'Sparkles'],
  bombilla: ['Lightbulb', 'LightbulbOff'],
  luz: ['Lightbulb', 'Lamp', 'Sun', 'SunMedium', 'Flashlight', 'Sparkles', 'Zap'],
  iluminacion: ['Lightbulb', 'Lamp', 'LampCeiling', 'LampDesk', 'Sun', 'Flashlight'],
  iluminación: ['Lightbulb', 'Lamp', 'LampCeiling', 'LampDesk', 'Sun', 'Flashlight'],
  reflector: ['Flashlight', 'Sun', 'SunMedium', 'Lightbulb', 'Zap'],
  aplique: ['LampWallDown', 'LampWallUp', 'Lamp', 'Lightbulb'],
  cable: ['Cable', 'Network', 'Layers', 'Activity', 'Cpu'],
  cables: ['Cable', 'Network', 'Layers'],
  alambre: ['Cable', 'Layers'],
  conductor: ['Cable', 'Zap', 'Activity'],
  conductores: ['Cable', 'Zap', 'Activity'],
  enchufe: ['Plug', 'Plug2', 'PlugZap', 'Power'],
  toma: ['Plug', 'Plug2', 'PlugZap', 'Power'],
  tomacorriente: ['Plug', 'Plug2', 'PlugZap', 'Power'],
  interruptor: ['ToggleRight', 'ToggleLeft', 'Power', 'Sliders'],
  switch: ['ToggleRight', 'ToggleLeft', 'Power', 'Sliders'],
  pulsador: ['ToggleRight', 'Power'],
  termica: ['CircuitBoard', 'ShieldAlert', 'Zap', 'Power'],
  termomagnetico: ['CircuitBoard', 'ShieldAlert', 'Zap', 'Power'],
  herramienta: ['Hammer', 'Wrench', 'Drill', 'Nut', 'Settings', 'Ruler'],
  herramientas: ['Hammer', 'Wrench', 'Drill', 'Nut', 'Settings', 'Ruler'],
  taladro: ['Drill', 'Hammer', 'Wrench'],
  martillo: ['Hammer'],
  llave: ['Wrench', 'Key', 'Nut'],
  alicate: ['Scissors', 'Wrench', 'PenTool'],
  destornillador: ['Wrench', 'PenTool'],
  ferreteria: ['Hammer', 'Wrench', 'Nut', 'Boxes', 'Store'],
  solar: ['Sun', 'SunMedium', 'CloudSun', 'Leaf', 'BatteryCharging'],
  panel: ['Sun', 'Layers', 'BatteryCharging'],
  bateria: ['Battery', 'BatteryCharging', 'BatteryFull'],
  batería: ['Battery', 'BatteryCharging', 'BatteryFull'],
  pila: ['Battery', 'BatteryCharging'],
  energia: ['Zap', 'Power', 'Sun', 'BatteryCharging'],
  energía: ['Zap', 'Power', 'Sun', 'BatteryCharging'],
  agua: ['Droplet', 'Droplets', 'Pipette'],
  tubo: ['Pipette', 'Layers'],
  gasfiteria: ['Droplets', 'Pipette', 'Wrench'],
  gasfitería: ['Droplets', 'Pipette', 'Wrench'],
  seguridad: ['ShieldCheck', 'Shield', 'Lock', 'Camera', 'Bell'],
  camara: ['Camera', 'Eye'],
  cámara: ['Camera', 'Eye'],
  ventilador: ['Fan', 'Wind', 'Orbit'],
  extractor: ['Fan', 'Wind'],
  decoracion: ['LampCeiling', 'Armchair', 'Sparkles', 'Palette', 'Paintbrush'],
  decoración: ['LampCeiling', 'Armchair', 'Sparkles', 'Palette', 'Paintbrush'],
  sala: ['Armchair', 'Home', 'LampFloor', 'LampCeiling'],
  cuarto: ['BedDouble', 'Home', 'LampDesk'],
  dormitorio: ['BedDouble', 'Home', 'LampDesk'],
  exterior: ['Sun', 'Trees', 'Warehouse', 'Building2'],
  interior: ['Home', 'Armchair', 'LampCeiling', 'LampWallUp'],
  distribucion: ['Boxes', 'Truck', 'Workflow', 'Layers', 'GitFork'],
  distribución: ['Boxes', 'Truck', 'Workflow', 'Layers', 'GitFork'],
}

// Obtener todos los nombres de iconos válidos de Lucide (filtrando exports que no son iconos)
const ALL_LUCIDE_ICONS: string[] = Object.keys(LucideIcons).filter((key) => {
  if (key === 'createLucideIcon' || key === 'default' || key === 'icons') return false
  if (key.endsWith('Icon') || key.startsWith('Lucide')) return false
  const component = (LucideIcons as any)[key]
  return typeof component === 'object' || typeof component === 'function'
})

export const LucideIconPicker: React.FC<StringInputProps> = (props) => {
  const { value, onChange, readOnly } = props
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const handleSelectIcon = useCallback(
    (iconName: string) => {
      onChange(set(iconName))
    },
    [onChange]
  )

  const handleClear = useCallback(() => {
    onChange(unset())
  }, [onChange])

  // Filtrado de iconos inteligente
  const filteredIcons = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    if (term) {
      const resultsSet = new Set<string>()

      // 1. Buscar coincidencias con el mapa de sinónimos en español
      Object.keys(SPANISH_SYNONYMS).forEach((synonym) => {
        if (synonym.includes(term) || term.includes(synonym)) {
          SPANISH_SYNONYMS[synonym].forEach((icon) => resultsSet.add(icon))
        }
      })

      // 2. Buscar coincidencias directas en nombres de iconos de Lucide (ej: "lamp", "light", "plug")
      ALL_LUCIDE_ICONS.forEach((iconName) => {
        if (iconName.toLowerCase().includes(term)) {
          resultsSet.add(iconName)
        }
      })

      return Array.from(resultsSet).filter((name) => (LucideIcons as any)[name])
    }

    if (activeCategory) {
      const preset = PRESET_COLLECTIONS.find((p) => p.name === activeCategory)
      if (preset) {
        return preset.icons.filter((name) => (LucideIcons as any)[name])
      }
    }

    // Por defecto mostrar los iconos más populares y útiles
    const defaultIcons = new Set<string>()
    PRESET_COLLECTIONS.forEach((cat) => cat.icons.forEach((ic) => defaultIcons.add(ic)))
    return Array.from(defaultIcons)
  }, [searchTerm, activeCategory])

  // Render del icono actualmente seleccionado
  const SelectedIconComponent = value ? (LucideIcons as any)[value] : null

  return (
    <Card padding={3} radius={2} tone="transparent" border style={{ backgroundColor: '#1a1f2c', borderColor: '#2d3748' }}>
      <Stack space={3}>
        {/* Banner del icono seleccionado actualmente */}
        <Flex align="center" justify="space-between" padding={2} style={{ backgroundColor: '#0f172a', borderRadius: 8, border: '1px solid #334155' }}>
          <Flex align="center" gap={3}>
            <Box
              style={{
                width: 44,
                height: 44,
                borderRadius: 8,
                backgroundColor: '#002D62',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #8CC63F',
                color: '#8CC63F',
                flexShrink: 0
              }}
            >
              {SelectedIconComponent ? (
                <SelectedIconComponent size={24} />
              ) : (
                <LucideIcons.HelpCircle size={24} color="#64748b" />
              )}
            </Box>
            <Stack space={1}>
              <Text size={1} weight="semibold" style={{ color: '#f8fafc' }}>
                {value ? value : 'Ningún icono seleccionado'}
              </Text>
              <Text size={0} style={{ color: '#94a3b8' }}>
                {value ? 'Icono activo para esta categoría' : 'Busca o elige un icono abajo'}
              </Text>
            </Stack>
          </Flex>

          {value && !readOnly && (
            <Button
              tone="critical"
              mode="ghost"
              fontSize={1}
              padding={2}
              text="Quitar icono"
              onClick={handleClear}
            />
          )}
        </Flex>

        {/* Buscador interactivo */}
        {!readOnly && (
          <>
            <Box>
              <TextInput
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.currentTarget.value)
                  if (activeCategory) setActiveCategory(null)
                }}
                placeholder="Buscar icono: lamp, foco, cable, enchufe, taladro, solar, techo..."
                fontSize={1}
                padding={3}
                style={{ backgroundColor: '#0f172a', color: '#ffffff' }}
              />
            </Box>

            {/* Categorías temáticas rápidas */}
            <Flex gap={1} wrap="wrap">
              <Button
                mode={!activeCategory && !searchTerm ? 'default' : 'ghost'}
                tone={!activeCategory && !searchTerm ? 'primary' : 'default'}
                fontSize={0}
                padding={2}
                text="🌟 Populares"
                onClick={() => {
                  setActiveCategory(null)
                  setSearchTerm('')
                }}
              />
              {PRESET_COLLECTIONS.map((cat) => {
                const isActive = activeCategory === cat.name && !searchTerm
                return (
                  <Button
                    key={cat.name}
                    mode={isActive ? 'default' : 'ghost'}
                    tone={isActive ? 'primary' : 'default'}
                    fontSize={0}
                    padding={2}
                    text={cat.label}
                    onClick={() => {
                      setActiveCategory(cat.name)
                      setSearchTerm('')
                    }}
                  />
                )
              })}
            </Flex>

            {/* Grilla visual de selección de iconos */}
            <Box style={{ maxHeight: 280, overflowY: 'auto', paddingRight: 4 }}>
              {filteredIcons.length === 0 ? (
                <Card padding={4} tone="transparent" style={{ textAlign: 'center' }}>
                  <Text size={1} style={{ color: '#94a3b8' }}>
                    No se encontraron iconos para &ldquo;{searchTerm}&rdquo;. Prueba en inglés (ej: &ldquo;lamp&rdquo;, &ldquo;tool&rdquo;) o elige una categoría arriba.
                  </Text>
                </Card>
              ) : (
                <Grid columns={[4, 6, 8]} gap={2}>
                  {filteredIcons.slice(0, 120).map((iconName) => {
                    const IconComponent = (LucideIcons as any)[iconName]
                    if (!IconComponent) return null
                    const isSelected = value === iconName

                    return (
                      <Card
                        key={iconName}
                        as="button"
                        type="button"
                        onClick={() => handleSelectIcon(iconName)}
                        padding={2}
                        radius={2}
                        style={{
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 4,
                          minHeight: 64,
                          backgroundColor: isSelected ? '#002D62' : '#0f172a',
                          border: isSelected ? '2px solid #8CC63F' : '1px solid #334155',
                          color: isSelected ? '#8CC63F' : '#e2e8f0',
                          transition: 'all 0.15s ease-in-out',
                        }}
                        title={iconName}
                      >
                        <IconComponent size={22} />
                        <Text
                          size={0}
                          style={{
                            fontSize: '9px',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '100%',
                            color: isSelected ? '#8CC63F' : '#94a3b8',
                            lineHeight: 1.2
                          }}
                        >
                          {iconName}
                        </Text>
                      </Card>
                    )
                  })}
                </Grid>
              )}
            </Box>

            <Flex justify="space-between" align="center">
              <Text size={0} style={{ color: '#64748b' }}>
                Mostrando {filteredIcons.length} iconos de Lucide (100% gratuitos)
              </Text>
              {value && (
                <Badge tone="positive" fontSize={0}>
                  Guardado: {value}
                </Badge>
              )}
            </Flex>
          </>
        )}
      </Stack>
    </Card>
  )
}

export default LucideIconPicker
