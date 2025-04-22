import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registro.css";

const Registro = () => {
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
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
            setError("Usuario o contraseña inválidos.");
        }
    };

    return (
        <div id="registro-container" className="registro-container">
            <h2 id="registro-titulo" className="registro-titulo">Registrate aquí</h2>
            <form id="registro-form" onSubmit={handleRegistro}>
                <input
                    id="registro-usuario"
                    type="text"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                />
                <input
                    id="registro-contrasena"
                    type="password"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                />
                <button id="registro-boton" type="submit">Registrarse</button>
                {error && <p id="registro-error" className="registro-error">{error}</p>}
            </form>
        </div>
    );
};

export default Registro;

