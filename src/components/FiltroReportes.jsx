/**
 * FiltroReportes
 * Controles para filtrar el listado de reportes por categoría y estado.
 *
 * Props:
 * - categoriaSeleccionada, estadoSeleccionado: valores actuales del filtro
 * - onFiltrar(campo, valor): notifica al padre (Home) el cambio de filtro
 */
const CATEGORIAS = ["todas", "robo", "vandalismo", "accidente", "sospechoso"];
const ESTADOS = ["todos", "pendiente", "en_revision", "resuelto"];

export default function FiltroReportes({ categoriaSeleccionada, estadoSeleccionado, onFiltrar }) {
  return (
    <div className="flex flex-wrap gap-3 items-end bg-white border border-black/10 rounded-lg p-4 mb-6">
      <div>
        <label className="block text-xs font-medium text-ink/60 mb-1" htmlFor="filtro-categoria">
          Categoría
        </label>
        <select
          id="filtro-categoria"
          value={categoriaSeleccionada}
          onChange={(e) => onFiltrar("categoria", e.target.value)}
          className="border border-black/15 rounded-md px-3 py-1.5 text-sm"
        >
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>{c === "todas" ? "Todas" : c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-ink/60 mb-1" htmlFor="filtro-estado">
          Estado
        </label>
        <select
          id="filtro-estado"
          value={estadoSeleccionado}
          onChange={(e) => onFiltrar("estado", e.target.value)}
          className="border border-black/15 rounded-md px-3 py-1.5 text-sm"
        >
          {ESTADOS.map((e) => (
            <option key={e} value={e}>{e === "todos" ? "Todos" : e.replace("_", " ")}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
