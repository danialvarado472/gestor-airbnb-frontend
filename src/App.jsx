import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import ListadoPropiedad from "./components/ListadoPropiedad";
import DetallePropiedad from "./components/DetallePropiedad";
import "./App.css";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/listado" element={<ListadoPropiedad />} />
                <Route path="/casa-playa-pu" element={<DetallePropiedad id={1} />} />
                <Route path="/bungalow-f" element={<DetallePropiedad id={2} />} />
            </Routes>
        </Router>
    );
};

export default App;
