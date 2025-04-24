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
            (usuario === "admin" && contrasena === "1234") ||
            (usuario === "usuario" && contrasena === "abcd")
        ) {
            setError("");

            navigate("/login");
        } else {
            setError("Credenciales inválidas para el registro.");
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
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </form>
        </div>
    );
};

export default Registro;

