// Inicio.jsx
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!usuario || !contrasena) {
            setError('Por favor, introduce usuario y contraseña.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario, contrasena }),
            });

            const data = await response.json();

            if (response.ok) {
                // Aquí guardarías el token o la información de sesión
                console.log('Inicio de sesión exitoso:', data);
                if (data.rol === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/inicio-usuario');
                }
            } else {
                setError(data.message || 'Credenciales incorrectas');
                setTimeout(() => setError(''), 3000);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Error al iniciar sesión. Inténtalo de nuevo.');
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
