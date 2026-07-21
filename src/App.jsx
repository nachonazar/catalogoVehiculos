import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/shared/Footer";
import Menu from "./components/shared/Menu";
import Contacto from "./components/shared/Contacto";
import Inicio from "./components/pages/Inicio";
import Administrador from "./components/pages/Administrador";
import DetalleVehiculo from "./components/pages/DetalleVehiculo";
import Formulario from "./components/pages/Formulario";
import Error404 from "./components/pages/Error404";
import Login from "./components/pages/Login";
import ProtectorAdmin from "./components/routes/ProtectorAdmin";

const ElementosPublicos = ({ children }) => {
  const location = useLocation();
  const ocultar = location.pathname.startsWith("/administrador") || location.pathname === "/login";

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
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/detalle/:id" element={<DetalleVehiculo />} />
          <Route path="/login" element={<Login setUsuarioAdmin={setUsuarioAdmin} />} />
          
          <Route path="/administrador" element={<ProtectorAdmin isAdmin={usuarioAdmin} />}>
            <Route index element={<Administrador />} />
            <Route path="crear" element={<Formulario titulo="Crear Vehiculo" />} />
            <Route path="editar/:id" element={<Formulario titulo="Editar Vehiculo" />} />
          </Route>
          
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>

      <ElementosPublicos>
        <Footer />
      </ElementosPublicos>
    </BrowserRouter>
  );
}

export default App;