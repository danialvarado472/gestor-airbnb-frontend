import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav id="navbar-principal" className="navbar-principal">
            <ul className="navbar-lista">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Registro</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/login" className="navbar-link">Iniciar Sesión</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/admin" className="navbar-link">Admin</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/listado" className="navbar-link">Listado</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;