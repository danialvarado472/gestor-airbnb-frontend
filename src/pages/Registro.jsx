import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Registro.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Registro = () => {
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const navigate = useNavigate();

    const handleRegistro = async (e) => {
        e.preventDefault();

        if (!usuario || !contrasena) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario, contrasena }),
            });

            const data = await response.json();

            if (response.ok) {
                setError("");
                console.log('Registro exitoso:', data);
                navigate("/login");
            } else {
                setError(data.message || "Error al registrar el usuario.");
            }
        } catch (error) {
            console.error('Error al comunicarse con el servidor:', error);
            setError("Error al registrar. Inténtalo de nuevo.");
        }
    };

    const toggleMostrarContrasena = () => {
        setMostrarContrasena(!mostrarContrasena);
    };

    return (
        <div id="registro-contenedor-principal" className="registro-contenedor">
            <h2 id="registro-titulo" className="registro-titulo">Registrate aquí</h2>
            <form id="registro-formulario" onSubmit={handleRegistro}>
                <label htmlFor="registro-usuario">Usuario:</label>
                <input
                    id="registro-usuario"
                    className="registro-input"
                    type="text"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                />
                <label htmlFor="registro-contrasena">Contraseña:</label>
                <div className="registro-input-container">
                    <input
                        id="registro-contrasena"
                        className="registro-input"
                        type={mostrarContrasena ? 'text' : 'password'}
                        placeholder="Contraseña"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                    <span
                        className="registro-toggle-password"
                        onClick={toggleMostrarContrasena}
                    >
                        <FontAwesomeIcon icon={mostrarContrasena ? faEyeSlash : faEye} />
                    </span>
                </div>
                <button id="registro-boton" type="submit">Registrarse</button>
                {error && <p id="registro-error" className="registro-error">{error}</p>}
                <p id="registro-login-link">
                    ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </form>
        </div>
    );
};

export default Registro;

