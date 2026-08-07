const ESTADOS = ["pendiente", "en_revision", "resuelto"];

/**
 * ModalDetalleReporte
 * Ventana modal con el detalle completo de un reporte. Permite
 * actualizar su estado, editarlo o eliminarlo.
 *
 * Props:
 * - reporte: objeto Reporte o null (si es null, el modal no se muestra)
 * - onClose(): cierra el modal
 * - onActualizarEstado(id, nuevoEstado): cambia el estado del reporte
 * - onEditar(reporte): abre el formulario de edición con este reporte
 * - onEliminar(id): elimina el reporte
 */
export default function ModalDetalleReporte({ reporte, onClose, onActualizarEstado, onEditar, onEliminar }) {
  if (!reporte) return null;

  return (
    <div
      className="fixed inset-0 bg-night/60 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <h2 className="text-xl font-semibold text-night">{reporte.titulo}</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="text-ink/40 hover:text-ink text-xl leading-none"
          >
            ×
          </button>
        </div>

        <p className="text-sm text-ink/70 mb-4">{reporte.descripcion}</p>

        <dl className="grid grid-cols-2 gap-y-2 text-sm mb-5">
          <dt className="text-ink/50">Categoría</dt>
          <dd className="capitalize">{reporte.categoria}</dd>
          <dt className="text-ink/50">Ubicación</dt>
          <dd>{reporte.ubicacion}</dd>
          <dt className="text-ink/50">Fecha</dt>
          <dd>{new Date(reporte.fechaReporte).toLocaleString("es-CO")}</dd>
        </dl>

        <label className="block text-sm font-medium mb-1" htmlFor="estado-reporte">
          Estado del reporte
        </label>
        <select
          id="estado-reporte"
          value={reporte.estado}
          onChange={(e) => onActualizarEstado(reporte.id, e.target.value)}
          className="w-full border border-black/15 rounded-md px-3 py-2 mb-6 capitalize"
        >
          {ESTADOS.map((estado) => (
            <option key={estado} value={estado}>{estado.replace("_", " ")}</option>
          ))}
        </select>

        <div className="flex justify-between">
          <button
            onClick={() => onEliminar(reporte.id)}
            className="text-alarm text-sm font-medium hover:underline"
          >
            Eliminar reporte
          </button>
          <button
            onClick={() => onEditar(reporte)}
            className="px-4 py-2 rounded-md bg-harbor text-white text-sm font-semibold hover:brightness-95 transition"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}
