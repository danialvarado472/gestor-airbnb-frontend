import React from 'react';
import { Link } from 'react-router-dom';
import './Administrador.css';

const Administrador = () => {
    return (
        <div id="admin-page-container" className="admin-page-container">
            <h1 id="admin-page-titulo" className="admin-page-titulo">Panel de Administración</h1>
            <div id="admin-actions-container" className="admin-actions-container">
                <Link to="/admin/propiedades" className="admin-action-button">
                    Ver Propiedades
                </Link>
                <Link to="/admin/agregar-propiedad" className="admin-action-button">
                    Agregar Propiedad
                </Link>
                <Link to="/admin/eliminar-propiedad" className="admin-action-button">
                    Eliminar Propiedad
                </Link>
                <Link to="/admin/reservas" className="admin-action-button nuevo-boton-admin">
                    Ver Reservas
                </Link>
            </div>
        </div>
    );
};

export default Administrador;