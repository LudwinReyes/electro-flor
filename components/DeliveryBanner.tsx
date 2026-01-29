
import React, { useState, useEffect } from 'react';
import { getDeliveryBanner } from '../services/sanity';

interface DeliveryConfig {
  truckImage?: string;
  mainTitle: string;
  subtitle: string;
  promoTitle: string;
  promoAmount: string;
  badgeText: string;
}

const DeliveryBanner: React.FC = () => {
  const [config, setConfig] = useState<DeliveryConfig | null>(null);

  useEffect(() => {
    getDeliveryBanner().then(data => {
      if (data) setConfig(data);
    });
  }, []);

  return (
    <div className="w-full bg-[#002D62] py-8 md:py-16 overflow-hidden relative border-y-4 border-[#8CC63F]">
      <style>{`
        @keyframes truck-drive {
          0% { transform: translateX(-10px); }
          50% { transform: translateX(15px); }
          100% { transform: translateX(-10px); }
        }
        .animate-truck {
          animation: truck-drive 4s ease-in-out infinite;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-10">

        {/* Camión con animación */}
        <div className="flex justify-center md:justify-start order-2 md:order-1">
          <img
            src={config?.truckImage || "https://loganelectricperu.com/wp-content/uploads/2024/07/descarga-15-1.png"}
            alt="Vehículo de carga"
            className="h-28 md:h-44 lg:h-56 object-contain drop-shadow-2xl animate-truck"
          />
        </div>

        {/* Badge Central */}
        <div className="flex justify-center order-1 md:order-2">
          <div className="bg-[#8CC63F] px-6 py-8 md:px-10 md:py-10 rounded-[2.5rem] md:rounded-[4rem] text-center shadow-2xl border-4 border-white/10 w-full max-w-[280px] md:max-w-md flex flex-col items-center justify-center">
            <h2 className="text-[#002D62] font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-none mb-2 whitespace-nowrap">
              {config?.mainTitle || 'DELIVERY'}
            </h2>
            <div className="h-1 w-20 md:w-32 bg-[#002D62] mb-3 rounded-full opacity-50"></div>
            <p className="text-[#002D62] font-black text-[11px] md:text-sm lg:text-lg uppercase tracking-[0.2em] whitespace-nowrap">
              {config?.subtitle || 'A TODO EL PERÚ'}
            </p>
          </div>
        </div>

        {/* Info Derecha */}
        <div className="text-center md:text-right text-white order-3">
          <h3 className="font-black text-xl md:text-2xl lg:text-4xl uppercase tracking-tighter mb-4 leading-tight">
            {config?.promoTitle || '¡GRATIS POR'} <br className="hidden lg:block" />
            {config?.promoTitle ? '' : 'COMPRAS'} <br className="hidden lg:block" />
            {config?.promoTitle ? '' : 'MAYORES'} <br className="hidden lg:block" />
            {config?.promoTitle ? '' : 'A '}<span className="text-[#8CC63F]">{config?.promoAmount || 'S/300!'}</span>
          </h3>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-xl inline-block">
            <p className="text-[9px] md:text-xs font-black text-[#8CC63F] uppercase tracking-widest">
              {config?.badgeText || 'LIMA METROPOLITANA'}
            </p>
          </div>
        </div>
      </div>

      {/* Marca de agua */}
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none -translate-y-1/4 translate-x-1/4">
        <i className="fas fa-truck-fast text-[15rem] md:text-[20rem] text-white"></i>
      </div>
    </div>
  );
};

export default DeliveryBanner;
