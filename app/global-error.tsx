'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white font-sans text-gray-900">
        <div className="max-w-md">
          <div className="w-16 h-16 bg-[#8CC63F]/20 text-[#002D62] rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-xl">
            EF
          </div>
          <h2 className="text-2xl font-black text-[#002D62] uppercase tracking-tight mb-2">
            Electro Flor
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Se ha actualizado el catálogo. Presiona el botón para continuar navegando.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#002D62] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-[#001D42] transition-all shadow-md cursor-pointer"
          >
            Actualizar Página
          </button>
        </div>
      </body>
    </html>
  );
}
