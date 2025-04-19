import { Routes, Route } from "react-router-dom";
import ListadoPropiedad from "./components/ListadoPropiedad";
import CasaPlayaPU from "./components/CasaPlayaPU";
import BungalowF from "./components/BungalowF";
import DetallePropiedad from "./components/DetallePropiedad";
import "./App.css";

const App = () => {
  return (
    <div>
      <h1 className="titulo">Gestión de Propiedades</h1>
        <Routes>
            <Route path="/" element={<ListadoPropiedad />} />
            <Route path="/casa-playa-pu" element={<DetallePropiedad />} />
            <Route path="/bungalow-f" element={<DetallePropiedad />} />
        </Routes>
    </div>
  );
};

export default App;
