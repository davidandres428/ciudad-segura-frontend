import api from "./api";

/**
 * Servicio de Usuarios.
 * Agrupa las llamadas HTTP al recurso /api/usuarios del backend,
 * para que los componentes no dependan directamente de axios.
 */

// Registra un nuevo ciudadano (POST /api/usuarios)
export function registrarUsuario(datosUsuario) {
  return api.post("/usuarios", datosUsuario);
}

// Obtiene todos los usuarios (GET /api/usuarios)
export function listarUsuarios() {
  return api.get("/usuarios");
}

// Busca un usuario autenticándolo localmente por email/password
// Nota: el backend actual no expone un endpoint de login dedicado,
// por lo que el front valida las credenciales contra la lista de
// usuarios. En un entorno de producción esto debería resolverse
// con un endpoint /api/auth/login que devuelva un token (JWT).
export async function iniciarSesion(email, password) {
  const { data: usuarios } = await listarUsuarios();
  const encontrado = usuarios.find(
    (u) => u.email === email && u.password === password
  );
  if (!encontrado) {
    throw new Error("Correo o contraseña incorrectos");
  }
  return encontrado;
}
