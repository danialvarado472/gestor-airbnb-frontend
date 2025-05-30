import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Inicio from "./pages/Inicio.jsx";
import ListadoPropiedad from "./pages/ListadoPropiedad.jsx";
import DetallePropiedad from "./pages/DetallePropiedad.jsx";
import Registro from "./pages/Registro.jsx";
import Administrador from "./pages/Administrador";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import VerPropiedadesAdmin from "./pages/VerPropiedadesAdmin";
import AgregarPropiedadAdmin from "./pages/AgregarPropiedadAdmin";
import EliminarPropiedadAdmin from "./pages/EliminarPropiedadAdmin";
import VerReservasAdmin from './pages/VerReservasAdmin';
import UserPages from './pages/UserPages';
import PaginaInicioUsuario from './pages/PaginaInicioUsuario';
import ListaReservas from './pages/ListaReservas.jsx';
import "./App.css";

const AppContent = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <>
            {isAdminRoute ? <AdminNavbar /> : <Navbar />}
            <Routes>
                <Route path="/inicio-usuario" element={<PaginaInicioUsuario />} />
                <Route path="/lista-reservas" element={<ListaReservas />} />
                <Route path="/usuario" element={<UserPages />} />
                <Route path="/" element={<Registro />} />
                <Route path="/login" element={<Inicio />} />
                <Route path="/admin" element={<Administrador />} />
                <Route path="/listado" element={<ListadoPropiedad />} />
                <Route path="/casa-playa-pu" element={<DetallePropiedad id={1} />} />
                <Route path="/bungalow-f" element={<DetallePropiedad id={2} />} />
                {/* Rutas de administración */}
                <Route path="/admin/propiedades" element={<VerPropiedadesAdmin />} />
                <Route path="/admin/agregar-propiedad" element={<AgregarPropiedadAdmin />} />
                <Route path="/admin/eliminar-propiedad" element={<EliminarPropiedadAdmin />} />
                <Route path="/admin/reservas" element={<VerReservasAdmin />} />
                <Route path="/reservas/cancelar" element={<ListaReservas />} />
            </Routes>
        </>
    );
};

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;