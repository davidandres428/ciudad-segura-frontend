/**
 * TarjetaReporte
 * Tarjeta individual que resume un reporte dentro del listado.
 * El color del indicador de estado cambia según el estado del reporte.
 *
 * Props:
 * - reporte: objeto Reporte { titulo, categoria, ubicacion, fechaReporte, estado }
 * - onClick(reporte): se ejecuta al hacer clic sobre la tarjeta
 */
const COLOR_ESTADO = {
  pendiente: "bg-alarm",
  en_revision: "bg-signal",
  resuelto: "bg-harbor",
};

export default function TarjetaReporte({ reporte, onClick }) {
  const colorEstado = COLOR_ESTADO[reporte.estado] || "bg-ink/40";

  return (
    <button
      onClick={() => onClick(reporte)}
      className="w-full text-left bg-white border border-black/10 rounded-lg p-4 hover:shadow-md hover:border-harbor/40 transition flex flex-col gap-2"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-night leading-snug">{reporte.titulo}</h3>
        <span className={`shrink-0 w-2.5 h-2.5 rounded-full mt-1.5 ${colorEstado}`} title={reporte.estado} />
      </div>
      <p className="text-sm text-ink/70 line-clamp-2">{reporte.descripcion}</p>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink/50 mt-1">
        <span>📍 {reporte.ubicacion}</span>
        <span className="capitalize">🏷️ {reporte.categoria}</span>
        <span>{new Date(reporte.fechaReporte).toLocaleDateString("es-CO")}</span>
      </div>
    </button>
  );
}
