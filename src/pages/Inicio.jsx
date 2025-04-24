import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Inicio.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Inicio = () => {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!usuario || !contrasena) {
            setError('Por favor, introduce usuario y contraseña.');
            return;
        }
        if (usuario === 'admin' && contrasena === '1234') {
            navigate('/admin');
        } else if (usuario === 'usuario' && contrasena === 'abcd') {
            navigate('/inicio-usuario');
        } else {
            setError('Credenciales incorrectas');
            setTimeout(() => setError(''), 3000);
        }
    };

    const toggleMostrarContrasena = () => {
        setMostrarContrasena(!mostrarContrasena);
    };

    return (
        <div id="inicio-contenedor-principal">
            <h1 id="inicio-titulo">Iniciar Sesión</h1>
            <form id="inicio-formulario" onSubmit={handleSubmit}>
                <label htmlFor="usuario">Usuario:</label>
                <input
                    type="text"
                    id="usuario"
                    className="inicio-input"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                />
                <label htmlFor="contrasena">Contraseña:</label>
                <div className="inicio-input-container">
                    <input
                        type={mostrarContrasena ? 'text' : 'password'}
                        id="contrasena"
                        className="inicio-input"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                    <span
                        className="inicio-toggle-password"
                        onClick={toggleMostrarContrasena}
                    >
                        <FontAwesomeIcon icon={mostrarContrasena ? faEyeSlash : faEye} />
                    </span>
                </div>
                <button type="submit">Iniciar Sesión</button>
                {error && <p id="inicio-mensaje-error">{error}</p>}
                <p id="inicio-no-cuenta">
                    ¿No tienes cuenta? <Link to="/">Regístrate aquí</Link>
                </p>
            </form>
        </div>
    );
};

export default Inicio;
