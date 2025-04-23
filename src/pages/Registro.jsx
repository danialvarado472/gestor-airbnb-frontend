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

    const handleRegistro = (e) => {
        e.preventDefault();

        if (!usuario || !contrasena) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        if (
            (usuario === "admin" && contrasena === "admin") ||
            (usuario === "usuario" && contrasena === "abcd")
        ) {
            setError("");
            navigate("/login");
        } else {
            setError("Usuario o contraseña inválidos.");
        }
    };

    const toggleMostrarContrasena = () => {
        setMostrarContrasena(!mostrarContrasena);
    };

    return (
        <div id="registro-contenedor-principal" className="registro-contenedor"> {/* ID único y clase */}
            <h2 id="registro-titulo" className="registro-titulo">Registrate aquí</h2> {/* ID único y clase */}
            <form id="registro-formulario" onSubmit={handleRegistro}> {/* ID único */}
                <label htmlFor="registro-usuario">Usuario:</label> {/* ID único */}
                <input
                    id="registro-usuario"
                    className="registro-input"
                    type="text"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                />
                <label htmlFor="registro-contrasena">Contraseña:</label> {/* ID único */}
                <div className="registro-input-container"> {/* Clase reutilizada */}
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
                <button id="registro-boton" type="submit">Registrarse</button> {/* ID único */}
                {error && <p id="registro-error" className="registro-error">{error}</p>} {/* ID único y clase */}
                <p id="registro-login-link"> {/* ID único */}
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </form>
        </div>
    );
};

export default Registro;

