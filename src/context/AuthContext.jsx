import { createContext, useContext, useState, useEffect } from "react";

/**
 * Contexto de autenticación.
 * Mantiene el usuario que inició sesión disponible para toda la
 * aplicación (Navbar, rutas protegidas, formularios) sin necesidad
 * de pasar props manualmente en cada nivel.
 */
const AuthContext = createContext(null);

const STORAGE_KEY = "ciudadSegura_usuario";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  // Al cargar la aplicación, recupera la sesión guardada (si existe)
  useEffect(() => {
    const guardado = localStorage.getItem(STORAGE_KEY);
    if (guardado) {
      setUsuario(JSON.parse(guardado));
    }
  }, []);

  function iniciarSesion(usuarioAutenticado) {
    setUsuario(usuarioAutenticado);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarioAutenticado));
  }

  function cerrarSesion() {
    setUsuario(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook de conveniencia para consumir el contexto de autenticación
export function useAuth() {
  return useContext(AuthContext);
}
