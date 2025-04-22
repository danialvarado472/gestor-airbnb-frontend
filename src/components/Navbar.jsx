import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logoImg from '../assets/logo.png';

const Navbar = () => {
    return (
        <nav id="navbar-principal" className="navbar-principal">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo-link">
                    <img src={logoImg} alt="Logo de la Aplicación" className="navbar-logo" />
                </Link>
                <ul className="navbar-lista">
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link">Registro</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/login" className="navbar-link">Iniciar Sesión</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link">Salir</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;