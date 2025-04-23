import React from 'react';
import { Link } from 'react-router-dom';
import './Administrador.css';

const Administrador = () => {
    return (
        <div id="admin-contenedor-principal" className="admin-page-container">
            <h1 id="admin-page-titulo" className="admin-page-titulo">Panel de Administración</h1>
            <div id="admin-welcome-section" className="admin-welcome-section">
                <h2 id="admin-welcome-titulo" className="admin-welcome-titulo">Bienvenido, Administrador</h2>
                <p id="admin-welcome-mensaje" className="admin-welcome-mensaje">Panel de administración de la aplicación.</p>
            </div>
            <div id="admin-actions-section" className="admin-actions-section">
                <Link to="/admin/propiedades" id="admin-ver-propiedades-btn" className="admin-action-button">Ver Propiedades</Link>
                <Link to="/admin/agregar-propiedad" id="admin-agregar-propiedades-btn" className="admin-action-button">Agregar Propiedades</Link>
                <Link to="/admin/eliminar-propiedad" id="admin-eliminar-propiedades-btn" className="admin-action-button">Eliminar Propiedades</Link>
            </div>
        </div>
    );
};

export default Administrador;