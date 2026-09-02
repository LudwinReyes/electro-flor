'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Detectar error por desfase de despliegue en Vercel (ChunkLoadError o Failed to fetch)
    const isChunkOrNetworkError = 
      error.name === 'ChunkLoadError' ||
      error.message?.includes('Loading chunk') ||
      error.message?.includes('Failed to fetch') ||
      error.message?.includes('NetworkError');

    if (isChunkOrNetworkError) {
      // Auto-recuperación: recargar la página suavemente para sincronizar con la nueva versión de Vercel
      const lastReload = sessionStorage.getItem('last_chunk_reload');
      const now = Date.now();
      // Solo auto-recargar si no lo hicimos en los últimos 15 segundos (evita bucles infinitos)
      if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
        sessionStorage.setItem('last_chunk_reload', now.toString());
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-white font-sans">
      <div className="w-20 h-20 bg-[#8CC63F]/15 text-[#002D62] rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-[#8CC63F]/20">
        <RefreshCw size={36} className="text-[#8CC63F]" />
      </div>
      
      <span className="text-[#8CC63F] font-black uppercase text-xs tracking-widest mb-2 block">
        CATÁLOGO ELECTRO FLOR
      </span>
      
      <h2 className="text-2xl md:text-3xl font-black text-[#002D62] uppercase tracking-tight mb-3">
        Actualización del Sistema
      </h2>
      
      <p className="text-gray-500 text-sm max-w-md mb-8 leading-relaxed">
        Se ha desplegado una nueva versión de nuestro catálogo en línea. Haz clic en el botón para sincronizar la información más reciente.
      </p>
      
      <div className="flex flex-wrap gap-4 justify-center items-center">
        <button
          onClick={() => window.location.reload()}
          className="bg-[#002D62] text-white px-7 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider hover:bg-[#001D42] transition-all shadow-lg flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <RefreshCw size={16} /> Actualizar Página
        </button>
        
        <Link
          href="/"
          className="bg-gray-100 text-[#002D62] px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider hover:bg-gray-200 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Home size={16} /> Ir al Inicio
        </Link>
      </div>
    </div>
  );
}
