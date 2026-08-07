import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registrarUsuario } from "../services/usuarioService";
import { useAuth } from "../context/AuthContext";

/**
 * Registro
 * Formulario de creación de cuenta para nuevos ciudadanos.
 * Campos: nombre, email, password y teléfono (igual a la entidad
 * Usuario del backend). Al registrarse exitosamente, inicia sesión
 * automáticamente y redirige al panel principal.
 *
 * Props: ninguna (pantalla completa)
 */
export default function Registro() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "", telefono: "" });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  function manejarCambio(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function manejarEnvio(e) {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      const { data: nuevoUsuario } = await registrarUsuario(form);
      iniciarSesion(nuevoUsuario);
      navigate("/");
    } catch (err) {
      setError("No fue posible completar el registro. Verifica los datos.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <form
        onSubmit={manejarEnvio}
        className="bg-white w-full max-w-sm rounded-xl shadow-lg p-8 border border-black/5"
      >
        <h1 className="text-2xl font-semibold text-night mb-1">Crear cuenta</h1>
        <p className="text-sm text-ink/60 mb-6">Únete para reportar incidentes en tu comunidad.</p>

        {error && (
          <p className="bg-alarm/10 text-alarm text-sm rounded-md px-3 py-2 mb-4">{error}</p>
        )}

        <label className="block text-sm font-medium mb-1" htmlFor="nombre">Nombre completo</label>
        <input
          id="nombre" name="nombre" required value={form.nombre} onChange={manejarCambio}
          className="w-full border border-black/15 rounded-md px-3 py-2 mb-4 focus:border-harbor outline-none"
          placeholder="Ej. María Fernández"
        />

        <label className="block text-sm font-medium mb-1" htmlFor="email">Correo electrónico</label>
        <input
          id="email" name="email" type="email" required value={form.email} onChange={manejarCambio}
          className="w-full border border-black/15 rounded-md px-3 py-2 mb-4 focus:border-harbor outline-none"
          placeholder="nombre@correo.com"
        />

        <label className="block text-sm font-medium mb-1" htmlFor="telefono">Teléfono</label>
        <input
          id="telefono" name="telefono" value={form.telefono} onChange={manejarCambio}
          className="w-full border border-black/15 rounded-md px-3 py-2 mb-4 focus:border-harbor outline-none"
          placeholder="Ej. 3001234567"
        />

        <label className="block text-sm font-medium mb-1" htmlFor="password">Contraseña</label>
        <input
          id="password" name="password" type="password" required value={form.password} onChange={manejarCambio}
          className="w-full border border-black/15 rounded-md px-3 py-2 mb-6 focus:border-harbor outline-none"
          placeholder="••••••••"
        />

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-signal text-night font-semibold py-2.5 rounded-md hover:brightness-95 transition disabled:opacity-60"
        >
          {cargando ? "Creando cuenta..." : "Registrarme"}
        </button>

        <p className="text-sm text-center mt-5 text-ink/70">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-harbor font-medium hover:underline">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
