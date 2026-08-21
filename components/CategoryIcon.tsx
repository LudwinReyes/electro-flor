import React from 'react'
import * as LucideIcons from 'lucide-react'

// Mapa de compatibilidad con clases antiguas de FontAwesome hacia iconos de Lucide
const LEGACY_FA_MAP: Record<string, string> = {
  'fa-lightbulb': 'Lightbulb',
  'fa-bolt': 'Zap',
  'fa-plug': 'Plug',
  'fa-couch': 'LampCeiling',
  'fa-microchip': 'Cpu',
  'fa-wrench': 'Wrench',
  'fa-hammer': 'Hammer',
  'fa-street-view': 'SunMedium',
  'fa-faucet': 'Pipette',
  'fa-folder': 'Folder',
  'fa-tools': 'Wrench',
  'fa-shield': 'ShieldCheck',
  'fa-shield-check': 'ShieldCheck',
  'fa-certificate': 'Award',
  'fa-truck': 'Truck',
  'fa-truck-fast': 'Truck',
  'fa-shipping-fast': 'Truck',
  'fa-headset': 'Headphones',
  'fa-book-open': 'BookOpen',
  'fa-toggle-on': 'ToggleRight',
  'fa-solar-panel': 'Sun',
  'fa-battery-full': 'BatteryCharging',
  'fa-cogs': 'Settings',
  'fa-cog': 'Settings',
  'fa-building': 'Building2',
  'fa-home': 'Home',
}

interface CategoryIconProps {
  name?: string
  className?: string
  size?: number
  color?: string
  style?: React.CSSProperties
  strokeWidth?: number
}

// Convierte nombres como 'lamp-ceiling' o 'lamp_ceiling' a 'LampCeiling'
function toPascalCase(str: string): string {
  return str
    .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
    .replace(/^\w/, (c) => c.toUpperCase())
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  name,
  className = '',
  size = 24,
  color,
  style,
  strokeWidth = 2,
}) => {
  if (!name || typeof name !== 'string') {
    return <LucideIcons.Folder className={className} size={size} color={color} style={style} strokeWidth={strokeWidth} />
  }

  const trimmed = name.trim()

  // 1. Verificar si es una clase legacy de FontAwesome (ej: 'fa-lightbulb')
  if (LEGACY_FA_MAP[trimmed]) {
    const LucideComponent = (LucideIcons as any)[LEGACY_FA_MAP[trimmed]]
    if (LucideComponent) {
      return <LucideComponent className={className} size={size} color={color} style={style} strokeWidth={strokeWidth} />
    }
  }

  // 2. Si viene exactamente con el nombre PascalCase de Lucide (ej: 'LampCeiling', 'Lightbulb')
  if ((LucideIcons as any)[trimmed]) {
    const LucideComponent = (LucideIcons as any)[trimmed]
    return <LucideComponent className={className} size={size} color={color} style={style} strokeWidth={strokeWidth} />
  }

  // 3. Si viene en kebab-case o lowercase (ej: 'lamp-ceiling', 'lamp')
  const pascalName = toPascalCase(trimmed)
  if ((LucideIcons as any)[pascalName]) {
    const LucideComponent = (LucideIcons as any)[pascalName]
    return <LucideComponent className={className} size={size} color={color} style={style} strokeWidth={strokeWidth} />
  }

  // 4. Si es una clase FontAwesome que no pudimos mapear, renderizar <i> como fallback
  if (trimmed.startsWith('fa-') || trimmed.startsWith('fas ') || trimmed.startsWith('fab ') || trimmed.startsWith('far ')) {
    return <i className={`fas ${trimmed} ${className}`} style={{ fontSize: `${size}px`, color, ...style }} />
  }

  // 5. Fallback general a Lightbulb
  return <LucideIcons.Lightbulb className={className} size={size} color={color} style={style} strokeWidth={strokeWidth} />
}

export default CategoryIcon
