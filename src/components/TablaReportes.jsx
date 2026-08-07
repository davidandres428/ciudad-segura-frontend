import TarjetaReporte from "./TarjetaReporte";

/**
 * TablaReportes
 * Organiza en una cuadrícula las TarjetaReporte obtenidas del backend.
 * Muestra un mensaje vacío cuando no hay reportes que coincidan con
 * los filtros aplicados.
 *
 * Props:
 * - reportes: arreglo de objetos Reporte
 * - onSeleccionarReporte(reporte): delega el clic de cada tarjeta
 */
export default function TablaReportes({ reportes, onSeleccionarReporte }) {
  if (reportes.length === 0) {
    return (
      <div className="text-center py-16 text-ink/50 border border-dashed border-black/15 rounded-lg">
        No hay reportes que coincidan con los filtros seleccionados.
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {reportes.map((reporte) => (
        <TarjetaReporte key={reporte.id} reporte={reporte} onClick={onSeleccionarReporte} />
      ))}
    </div>
  );
}
