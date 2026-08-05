import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/shared/Footer";
import Menu from "./components/shared/Menu";
import Contacto from "./components/shared/Contacto";
import Inicio from "./components/pages/Inicio";
import DetalleVehiculo from "./components/pages/DetalleVehiculo";
import Error404 from "./components/pages/Error404";
import Login from "./components/pages/Login";
import ProtectorAdmin from "./components/routes/ProtectorAdmin";

// Implementación de Code-Splitting con React.lazy para el panel de administración
const Administrador = lazy(() => import("./components/pages/Administrador"));
const EstadisticasVehiculos = lazy(
  () => import("./components/pages/EstadisticasVehiculos"),
);
const Formulario = lazy(() => import("./components/pages/Formulario"));

const ElementosPublicos = ({ children }) => {
  const location = useLocation();
  const ocultar =
    location.pathname.startsWith("/administrador") ||
    location.pathname === "/login";

  if (ocultar) return null;
  return <>{children}</>;
};

function App() {
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("userKey")) || {};
  const [usuarioAdmin, setUsuarioAdmin] = useState(usuarioLogueado);

  useEffect(() => {
    sessionStorage.setItem("userKey", JSON.stringify(usuarioAdmin));
  }, [usuarioAdmin]);

  return (
    <BrowserRouter>
      <ElementosPublicos>
        <Menu usuarioAdmin={usuarioAdmin} setUsuarioAdmin={setUsuarioAdmin} />
      </ElementosPublicos>

      <main>
        {/* Envolvemos las rutas con Suspense para manejar el estado de carga de los componentes lazy */}
        <Suspense
          fallback={
            <div className="flex justify-center py-20 text-on-surface-variant">
              Cargando módulo...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/detalle/:id" element={<DetalleVehiculo />} />
            <Route
              path="/login"
              element={<Login setUsuarioAdmin={setUsuarioAdmin} />}
            />

            <Route
              path="/administrador"
              element={<ProtectorAdmin isAdmin={usuarioAdmin} />}
            >
              <Route index element={<Administrador />} />
              <Route path="estadisticas" element={<EstadisticasVehiculos />} />
              <Route
                path="crear"
                element={<Formulario titulo="Crear Vehiculo" />}
              />
              <Route
                path="editar/:id"
                element={<Formulario titulo="Editar Vehiculo" />}
              />
            </Route>

            <Route path="*" element={<Error404 />} />
          </Routes>
        </Suspense>
      </main>

      <ElementosPublicos>
        <Footer />
      </ElementosPublicos>
    </BrowserRouter>
  );
}

export default App;
