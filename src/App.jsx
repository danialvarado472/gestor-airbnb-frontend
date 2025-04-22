import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./pages/Inicio.jsx";
import ListadoPropiedad from "./pages/ListadoPropiedad.jsx";
import DetallePropiedad from "./pages/DetallePropiedad.jsx";
import Registro from "./pages/Registro.jsx";
import Administrador from "./pages/Administrador";
import Navbar from "./components/Navbar";
import "./App.css";


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Registro />} />
                <Route path="/login" element={<Inicio />} />
                <Route path="/admin" element={<Administrador />} />
                <Route path="/login" element={<Inicio />} />
                <Route path="/listado" element={<ListadoPropiedad />} />
                <Route path="/casa-playa-pu" element={<DetallePropiedad id={1} />} />
                <Route path="/bungalow-f" element={<DetallePropiedad id={2} />} />
            </Routes>
        </Router>
    );
};

export default App;
