import { useState, useEffect } from "react";

const CATEGORIAS = ["robo", "vandalismo", "accidente", "sospechoso"];

/**
 * FormularioReporte
 * Formulario para crear o editar un reporte de incidente.
 * Si recibe reporteInicial, se comporta en modo edición; si no,
 * en modo creación.
 *
 * Props:
 * - reporteInicial: objeto Reporte opcional (edición) o null (creación)
 * - onGuardar(datosReporte): se ejecuta al enviar el formulario
 * - onCancelar(): cierra el formulario sin guardar
 */
export default function FormularioReporte({ reporteInicial = null, onGuardar, onCancelar }) {
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    categoria: CATEGORIAS[0],
    ubicacion: "",
  });

  // Si se pasa un reporte a editar, precarga el formulario con sus datos
  useEffect(() => {
    if (reporteInicial) {
      setForm({
        titulo: reporteInicial.titulo,
        descripcion: reporteInicial.descripcion,
        categoria: reporteInicial.categoria,
        ubicacion: reporteInicial.ubicacion,
      });
    }
  }, [reporteInicial]);

  function manejarCambio(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function manejarEnvio(e) {
    e.preventDefault();
    onGuardar(form);
  }

  return (
    <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="titulo">Título</label>
        <input
          id="titulo" name="titulo" required value={form.titulo} onChange={manejarCambio}
          className="w-full border border-black/15 rounded-md px-3 py-2 focus:border-harbor outline-none"
          placeholder="Ej. Robo de bicicleta en el parque"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion" name="descripcion" required rows={4} value={form.descripcion} onChange={manejarCambio}
          className="w-full border border-black/15 rounded-md px-3 py-2 focus:border-harbor outline-none resize-none"
          placeholder="Describe qué ocurrió, cuándo y cualquier detalle relevante"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="categoria">Categoría</label>
          <select
            id="categoria" name="categoria" value={form.categoria} onChange={manejarCambio}
            className="w-full border border-black/15 rounded-md px-3 py-2 capitalize"
          >
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="ubicacion">Ubicación</label>
          <input
            id="ubicacion" name="ubicacion" required value={form.ubicacion} onChange={manejarCambio}
            className="w-full border border-black/15 rounded-md px-3 py-2 focus:border-harbor outline-none"
            placeholder="Ej. Calle 45 # 12-30"
          />
        </div>
      </div>

      <div className="flex gap-3 justify-end mt-2">
        <button
          type="button"
          onClick={onCancelar}
          className="px-4 py-2 rounded-md text-ink/70 hover:bg-black/5 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-md bg-signal text-night font-semibold hover:brightness-95 transition"
        >
          {reporteInicial ? "Guardar cambios" : "Publicar reporte"}
        </button>
      </div>
    </form>
  );
}
