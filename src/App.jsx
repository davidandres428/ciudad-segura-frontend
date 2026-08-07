import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RutaProtegida from "./components/RutaProtegida";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Home from "./pages/Home";

/**
 * App
 * Componente raiz: define el enrutador principal de la aplicacion
 * y organiza el layout comun (Navbar arriba, Footer abajo).
 * El AuthProvider envuelve todo para que cualquier pantalla pueda
 * acceder al usuario autenticado mediante useAuth().
 */
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <main className="flex-1">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route
                path="/"
                element={
                  <RutaProtegida>
                    <Home />
                  </RutaProtegida>
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
