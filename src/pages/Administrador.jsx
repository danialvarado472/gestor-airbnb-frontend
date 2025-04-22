import React from 'react';
import './Administrador.css';

const Administrador = () => {
    return (
        <div id="admin-container" className="admin-container">
            <h1 id="admin-titulo" className="admin-titulo">Bienvenido, Administrador</h1>
            <p id="admin-mensaje" className="admin-mensaje">Panel de administración de la aplicación.</p>
        </div>
    );
};

export default Administrador;