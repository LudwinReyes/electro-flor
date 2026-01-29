
import React, { useState, useEffect } from 'react';
import { Truck } from 'lucide-react';
import { BRAND_COLORS } from '../config';
import { getUrgencyBar } from '../services/sanity';

interface UrgencyConfig {
  message: string;
  highlightText: string;
  linkUrl?: string;
}

const ShipmentUrgencyBar: React.FC = () => {
  const [config, setConfig] = useState<UrgencyConfig | null>(null);

  useEffect(() => {
    getUrgencyBar().then(data => {
      if (data) setConfig(data);
    });
  }, []);

  // Función para reemplazar el texto destacado con subrayado
  const renderMessage = () => {
    const message = config?.message || 'Próximo camión sale esta tarde - ¡Pide ahora para recibir mañana!';
    const highlight = config?.highlightText || 'esta tarde';

    if (message.includes(highlight)) {
      const parts = message.split(highlight);
      return (
        <>
          {parts[0]}<span className="underline decoration-2">{highlight}</span>{parts[1]}
        </>
      );
    }
    return message;
  };

  const content = (
    <div className={`bg-[${BRAND_COLORS.secondary}] py-2 overflow-hidden relative group cursor-default`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
        <div className="flex items-center gap-2 animate-bounce">
          <Truck size={16} className={`text-[${BRAND_COLORS.primary}]`} />
        </div>
        <p className={`text-[${BRAND_COLORS.primary}] font-black text-[10px] md:text-xs uppercase tracking-[0.2em] text-center`}>
          {renderMessage()}
        </p>
        <div className={`hidden md:block w-2 h-2 bg-[${BRAND_COLORS.primary}] rounded-full animate-pulse`}></div>
      </div>
      {/* Efecto de brillo pasando */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
    </div>
  );

  // Si hay URL, hacer la barra clickeable
  if (config?.linkUrl) {
    return <a href={config.linkUrl}>{content}</a>;
  }

  return content;
};

export default ShipmentUrgencyBar;
