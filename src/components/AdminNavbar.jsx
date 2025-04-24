import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';
import logoImg from '../assets/logo.png';

const AdminNavbar = () => {
    return (
        <nav id="admin-navbar-principal" className="admin-navbar-principal">
            <div className="admin-navbar-container">
                <Link to="/admin" className="admin-navbar-logo-link">
                    <img src={logoImg} alt="Logo de la Aplicación" className="admin-navbar-logo" />
                </Link>
                <ul className="admin-navbar-lista">
                    <li className="admin-navbar-item">
                        <Link to="/admin/propiedades" className="admin-navbar-link">Ver Propiedades</Link>
                    </li>
                    <li className="admin-navbar-item">
                        <Link to="/admin/agregar-propiedad" className="admin-navbar-link">Agregar Propiedades</Link>
                    </li>
                    <li className="admin-navbar-item">
                        <Link to="/admin/eliminar-propiedad" className="admin-navbar-link">Eliminar Propiedades</Link>
                    </li>
                    <li className="admin-navbar-item">
                        <Link to="/admin" className="admin-navbar-link">Inicio</Link>
                    </li>
                    <li className="admin-navbar-item">
                        <Link to="/" className="admin-navbar-link">Salir</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default AdminNavbar;