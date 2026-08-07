import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * RutaProtegida
 * Envuelve rutas que solo deben verse con sesión iniciada.
 * Si no hay usuario autenticado, redirige a /login usando useNavigate
 * (a través del componente declarativo Navigate de React Router).
 *
 * Props:
 * - children: el contenido/página a proteger
 */
export default function RutaProtegida({ children }) {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
