/**
 * Footer
 * Pie de página institucional, visible en todas las pantallas.
 * No recibe props: su contenido es estático.
 */
export default function Footer() {
  return (
    <footer className="bg-night text-white/70 text-sm mt-auto">
      <div className="max-w-6xl mx-auto px-5 py-6 flex flex-col sm:flex-row justify-between gap-2">
        <p>© {new Date().getFullYear()} Ciudad Segura — Plataforma de reporte ciudadano.</p>
        <p>Línea de emergencias: 123 · reportes@ciudadsegura.gov.co</p>
      </div>
    </footer>
  );
}
