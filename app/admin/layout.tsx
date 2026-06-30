export const metadata = {
  title: 'ELECTRO FLOR - Admin Studio',
  description: 'Panel de administración de contenido',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
