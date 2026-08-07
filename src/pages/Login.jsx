import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { iniciarSesion as iniciarSesionApi } from "../services/usuarioService";
import { useAuth } from "../context/AuthContext";

/**
 * Login
 * Formulario de inicio de sesión. Valida las credenciales contra
 * el backend (a través de usuarioService) y, si son correctas,
 * guarda el usuario en el AuthContext y redirige al panel principal.
 *
 * Props: ninguna (es una pantalla completa, no un componente hijo)
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  async function manejarEnvio(e) {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      const usuario = await iniciarSesionApi(email, password);
      iniciarSesion(usuario);
      navigate("/");
    } catch (err) {
      setError(err.message || "No fue posible iniciar sesión");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <form
        onSubmit={manejarEnvio}
        className="bg-white w-full max-w-sm rounded-xl shadow-lg p-8 border border-black/5"
      >
        <h1 className="text-2xl font-semibold text-night mb-1">Iniciar sesión</h1>
        <p className="text-sm text-ink/60 mb-6">Accede para reportar y consultar incidentes.</p>

        {error && (
          <p className="bg-alarm/10 text-alarm text-sm rounded-md px-3 py-2 mb-4">{error}</p>
        )}

        <label className="block text-sm font-medium mb-1" htmlFor="email">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-black/15 rounded-md px-3 py-2 mb-4 focus:border-harbor outline-none"
          placeholder="nombre@correo.com"
        />

        <label className="block text-sm font-medium mb-1" htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-black/15 rounded-md px-3 py-2 mb-6 focus:border-harbor outline-none"
          placeholder="••••••••"
        />

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-signal text-night font-semibold py-2.5 rounded-md hover:brightness-95 transition disabled:opacity-60"
        >
          {cargando ? "Ingresando..." : "Ingresar"}
        </button>

        <p className="text-sm text-center mt-5 text-ink/70">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="text-harbor font-medium hover:underline">
            Regístrate
          </Link>
        </p>
      </form>
    </div>
  );
}
