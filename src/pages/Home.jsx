import { useState, useEffect, useMemo } from "react";
import FiltroReportes from "../components/FiltroReportes";
import TablaReportes from "../components/TablaReportes";
import ModalDetalleReporte from "../components/ModalDetalleReporte";
import FormularioReporte from "../components/FormularioReporte";
import {
  listarReportes,
  crearReporte,
  actualizarReporte,
  eliminarReporte,
} from "../services/reporteService";

/**
 * Home
 * Panel principal de reportes. Coordina la carga de datos desde el
 * backend (useEffect), el filtrado (useState), la creación/edición
 * (FormularioReporte) y el detalle/actualización de estado
 * (ModalDetalleReporte).
 *
 * Props: ninguna (es la pantalla central de la aplicación)
 */
export default function Home() {
  const [reportes, setReportes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [filtros, setFiltros] = useState({ categoria: "todas", estado: "todos" });
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [reporteEnEdicion, setReporteEnEdicion] = useState(null);

  // Carga los reportes desde el backend al montar el componente
  useEffect(() => {
    cargarReportes();
  }, []);

  async function cargarReportes() {
    setCargando(true);
    setError("");
    try {
      const { data } = await listarReportes();
      setReportes(data);
    } catch (err) {
      setError("No fue posible cargar los reportes. Verifica que el backend esté disponible.");
    } finally {
      setCargando(false);
    }
  }

  function manejarFiltro(campo, valor) {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  }

  // Recalcula la lista visible solo cuando cambian los reportes o los filtros
  const reportesFiltrados = useMemo(() => {
    return reportes.filter((r) => {
      const coincideCategoria = filtros.categoria === "todas" || r.categoria === filtros.categoria;
      const coincideEstado = filtros.estado === "todos" || r.estado === filtros.estado;
      return coincideCategoria && coincideEstado;
    });
  }, [reportes, filtros]);

  async function manejarGuardarReporte(datos) {
    try {
      if (reporteEnEdicion) {
        await actualizarReporte(reporteEnEdicion.id, { ...reporteEnEdicion, ...datos });
      } else {
        await crearReporte(datos);
      }
      setMostrarFormulario(false);
      setReporteEnEdicion(null);
      await cargarReportes();
    } catch (err) {
      setError("No fue posible guardar el reporte.");
    }
  }

  async function manejarActualizarEstado(id, nuevoEstado) {
    const reporte = reportes.find((r) => r.id === id);
    await actualizarReporte(id, { ...reporte, estado: nuevoEstado });
    setReporteSeleccionado((prev) => (prev ? { ...prev, estado: nuevoEstado } : prev));
    await cargarReportes();
  }

  async function manejarEliminar(id) {
    await eliminarReporte(id);
    setReporteSeleccionado(null);
    await cargarReportes();
  }

  function abrirEdicion(reporte) {
    setReporteEnEdicion(reporte);
    setReporteSeleccionado(null);
    setMostrarFormulario(true);
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-night">Reportes de la comunidad</h1>
          <p className="text-ink/60 text-sm">Consulta y da seguimiento a los incidentes reportados.</p>
        </div>
        <button
          onClick={() => { setReporteEnEdicion(null); setMostrarFormulario(true); }}
          className="bg-signal text-night font-semibold px-4 py-2 rounded-md hover:brightness-95 transition"
        >
          + Nuevo reporte
        </button>
      </div>

      <FiltroReportes
        categoriaSeleccionada={filtros.categoria}
        estadoSeleccionado={filtros.estado}
        onFiltrar={manejarFiltro}
      />

      {error && <p className="bg-alarm/10 text-alarm text-sm rounded-md px-3 py-2 mb-4">{error}</p>}

      {cargando ? (
        <p className="text-ink/50 text-center py-16">Cargando reportes…</p>
      ) : (
        <TablaReportes reportes={reportesFiltrados} onSeleccionarReporte={setReporteSeleccionado} />
      )}

      <ModalDetalleReporte
        reporte={reporteSeleccionado}
        onClose={() => setReporteSeleccionado(null)}
        onActualizarEstado={manejarActualizarEstado}
        onEditar={abrirEdicion}
        onEliminar={manejarEliminar}
      />

      {mostrarFormulario && (
        <div
          className="fixed inset-0 bg-night/60 flex items-center justify-center p-4 z-50"
          onClick={() => setMostrarFormulario(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-night mb-4">
              {reporteEnEdicion ? "Editar reporte" : "Nuevo reporte"}
            </h2>
            <FormularioReporte
              reporteInicial={reporteEnEdicion}
              onGuardar={manejarGuardarReporte}
              onCancelar={() => { setMostrarFormulario(false); setReporteEnEdicion(null); }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
