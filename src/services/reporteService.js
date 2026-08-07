import api from "./api";

/**
 * Servicio de Reportes.
 * Agrupa las llamadas HTTP al recurso /api/reportes del backend.
 */

// Lista todos los reportes (GET /api/reportes)
export function listarReportes() {
  return api.get("/reportes");
}

// Obtiene un reporte por id (GET /api/reportes/{id})
export function obtenerReporte(id) {
  return api.get(`/reportes/${id}`);
}

// Crea un nuevo reporte (POST /api/reportes)
export function crearReporte(reporte) {
  return api.post("/reportes", reporte);
}

// Actualiza un reporte existente (PUT /api/reportes/{id})
export function actualizarReporte(id, reporte) {
  return api.put(`/reportes/${id}`, reporte);
}

// Elimina un reporte (DELETE /api/reportes/{id})
export function eliminarReporte(id) {
  return api.delete(`/reportes/${id}`);
}
