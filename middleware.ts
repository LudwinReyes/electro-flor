import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Agregar el pathname como header para que el layout pueda detectar la ruta
  const headers = new Headers(request.headers);
  headers.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: [
    // Aplicar a todas las rutas excepto archivos estáticos
    '/((?!_next/static|_next/image|favicon.ico|media/).*)',
  ],
};
