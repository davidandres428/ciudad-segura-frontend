import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Navbar
 * Barra de navegación superior fija. Muestra el nombre del ciudadano
 * autenticado y permite cerrar sesión.
 *
 * Props: ninguna (consume el usuario directamente del AuthContext)
 */
export default function Navbar() {
  const { usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  function manejarCerrarSesion() {
    cerrarSesion();
    navigate("/login");
  }

  return (
    <header className="bg-night text-white sticky top-0 z-30 shadow-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center gap-2 font-display font-semibold text-lg">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-signal" aria-hidden="true" />
          Ciudad Segura
        </Link>

        {usuario && (
          <div className="flex items-center gap-4 text-sm">
            <Link to="/" className="hover:text-signal transition-colors">
              Reportes
            </Link>
            <span className="hidden sm:inline text-white/70">
              Hola, {usuario.nombre.split(" ")[0]}
            </span>
            <button
              onClick={manejarCerrarSesion}
              className="bg-signal text-night font-medium px-3 py-1.5 rounded-md hover:bg-white transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
