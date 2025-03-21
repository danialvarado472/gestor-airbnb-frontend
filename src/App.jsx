import { Routes, Route } from "react-router-dom";
import ListadoPropiedad from "./components/ListadoPropiedad";
import CasaPlayaPU from "./components/CasaPlayaPU";
import BungalowF from "./components/BungalowF";
import "./App.css";

const App = () => {
  return (
    <div>
      <h1 className="titulo">Gestión de Propiedades</h1>
      <Routes>
        <Route path="/" element={<ListadoPropiedad />} />
        <Route path="/casa-playa-pu" element={<CasaPlayaPU />} />
        <Route path="/bungalow-f" element={<BungalowF />} />
      </Routes>
    </div>
  );
};

export default App;
