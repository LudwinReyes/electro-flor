import { Metadata } from 'next';
import CableCalculator from '../../components/CableCalculator';

export const metadata: Metadata = {
  title: 'Calculadora Pro: Conductores Eléctricos AWG | Electro Flor',
  description: 'Calculadora gratuita de sección de cables y caída de tensión. Ingresa la distancia, voltaje y potencia para obtener el calibre recomendado (AWG/mm²) al instante.',
  keywords: ['calculadora cables', 'conductores eléctricos', 'caída de tensión', 'AWG', 'mm2', 'electricidad', 'Perú'],
  alternates: {
    canonical: 'https://www.electroflorperu.com/calculadora-conductores-electricos',
  },
  openGraph: {
    title: 'Calculadora de Conductores Eléctricos - Electro Flor',
    description: 'Calcula el calibre ideal (AWG/mm²) para tu instalación eléctrica de forma rápida y gratuita.',
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Calculadora Pro: Conductores Eléctricos',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  description: 'Calculadora gratuita para determinar el calibre de cables eléctricos AWG y mm² según distancia, voltaje y potencia. Ideal para electricistas e ingenieros en Perú.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'PEN'
  },
  provider: {
    '@type': 'LocalBusiness',
    name: 'Electro Flor'
  }
};

export default function CalculatorPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 md:py-20 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-[#002D62] uppercase tracking-tighter mb-4">
            CALCULADORA DE <span className="text-[#8CC63F]">CABLES</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Utiliza nuestra herramienta gratuita para calcular el calibre recomendado (AWG y mm²) 
            de los conductores eléctricos para tu proyecto, basándote en la distancia y potencia requerida.
          </p>
        </div>
        
        <CableCalculator />
        
        <div className="max-w-4xl mx-auto mt-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#002D62] mb-4">¿Por qué es importante elegir el calibre correcto?</h2>
          <p className="text-gray-600 mb-4">
            Elegir el calibre adecuado para los conductores eléctricos es fundamental para garantizar la seguridad 
            y eficiencia de cualquier instalación eléctrica. Un cable demasiado delgado para la carga de energía 
            (potencia) puede generar sobrecalentamiento, riesgos de cortocircuitos e incluso incendios.
          </p>
          <p className="text-gray-600">
            Nuestra calculadora utiliza referencias estandarizadas (cobre a 75°C) para ofrecerte la medida exacta 
            en AWG (American Wire Gauge) y su equivalente métrico (mm²). Recuerda siempre verificar estos 
            resultados con un ingeniero eléctrico colegiado antes de ejecutar la instalación.
          </p>
        </div>
      </div>
    </div>
  );
}
