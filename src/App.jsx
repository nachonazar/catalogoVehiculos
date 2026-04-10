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
import { useEffect, useState } from "react";
import ProtectorAdmin from "./components/routes/ProtectorAdmin";
import { v4 as uuidv4 } from "uuid";

function App() {
  const usuarioLogueado =
    JSON.parse(sessionStorage.getItem("userKey")) || false;
  const vehiculosLocalstorage =
    JSON.parse(localStorage.getItem("catalogoVehiculos")) || [];
  const [usuarioAdmin, setUsuarioAdmin] = useState(usuarioLogueado);
  const [vehiculos, setVehiculos] = useState(vehiculosLocalstorage);

  useEffect(() => {
    localStorage.setItem("catalogoVehiculos", JSON.stringify(vehiculos));
  }, [vehiculos]);

  const crearVehiculo = (vehiculoNuevo) => {
    //agregar un id unico al vehiculo Nuevo
    vehiculoNuevo.id = uuidv4();
    //agregar el vehiculo al state de vehiculos
    setVehiculos([...vehiculos, vehiculoNuevo]);
    return true;
  };

  const borrarVehiculo = (idVehiculo) => {
    const vehiculosFiltrados = vehiculos.filter(
      (itemVehiculo) => itemVehiculo.id !== idVehiculo,
    );
    setVehiculos(vehiculosFiltrados);
    return true;
  };

  const buscarVehiculo = (idVehiculo) => {
    const vehiculoBuscado = vehiculos.find(
      (itemVehiculo) => itemVehiculo.id === idVehiculo,
    );
    return vehiculoBuscado;
  };

  return (
    <BrowserRouter>
      <Menu usuarioAdmin={usuarioAdmin} setUsuarioAdmin={setUsuarioAdmin} />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Inicio vehiculos={vehiculos}></Inicio>}
          ></Route>
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
            <Route
              index
              element={
                <Administrador
                  vehiculos={vehiculos}
                  borrarVehiculo={borrarVehiculo}
                ></Administrador>
              }
            ></Route>
            <Route
              path="crear"
              element={<Formulario crearVehiculo={crearVehiculo} titulo={"Crear Vehiculo"}></Formulario>}
            ></Route>
            <Route
              path="editar/:id"
              element={<Formulario titulo={"Editar Vehiculo"} buscarVehiculo={buscarVehiculo}></Formulario>}
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
