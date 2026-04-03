import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./components/shared/Footer";
import { BrowserRouter } from "react-router";
import Menu from "./components/shared/Menu";
import Contacto from "./components/shared/Contacto";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Contacto />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
