import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./components/shared/Footer";
import { BrowserRouter } from "react-router";
import Menu from "./components/shared/Menu";
import Contacto from "./components/shared/Contacto";
import Inicio from "./components/pages/Inicio";
import Administrador from "./components/pages/Administrador";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Administrador />
      <Contacto />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
