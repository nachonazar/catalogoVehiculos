import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./components/shared/Footer";
import { BrowserRouter, Route, Routes } from "react-router";
import Menu from "./components/shared/Menu";
import Contacto from "./components/shared/Contacto";
import Inicio from "./components/pages/Inicio";
import Administrador from "./components/pages/Administrador";
import DetalleVehiculo from "./components/pages/DetalleVehiculo";
import Formulario from "./components/pages/Formulario";
import Error404 from "./components/pages/Error404";
import Login from "./components/pages/Login";
import { useState } from "react";
import ProtectorAdmin from "./components/routes/ProtectorAdmin";

function App() {
  const usuarioLogueado =
    JSON.parse(sessionStorage.getItem("userKey")) || false;
  const [usuarioAdmin, setUsuarioAdmin] = useState(usuarioLogueado);

  return (
    <BrowserRouter>
      <Menu usuarioAdmin={usuarioAdmin} setUsuarioAdmin={setUsuarioAdmin} />
      <main>
        <Routes>
          <Route path="/" element={<Inicio></Inicio>}></Route>
          <Route
            path="/detalle"
            element={<DetalleVehiculo></DetalleVehiculo>}
          ></Route>
          <Route
            path="/login"
            element={<Login setUsuarioAdmin={setUsuarioAdmin}></Login>}
          ></Route>
          <Route
            path="/administrador"
            element={<ProtectorAdmin isAdmin={usuarioAdmin}></ProtectorAdmin>}
          >
            <Route index element={<Administrador></Administrador>}></Route>
            <Route
              path="crear"
              element={<Formulario></Formulario>}
            ></Route>
            <Route
              path="editar"
              element={<Formulario></Formulario>}
            ></Route>
          </Route>
          <Route path="*" element={<Error404></Error404>}></Route>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
