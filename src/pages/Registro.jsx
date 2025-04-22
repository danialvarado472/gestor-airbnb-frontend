// src/pages/Registro.jsx
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
            setError("Usuario o contraseña no válidos.");
        }
    };

    return (
        <div className="registro-container">
            <h2>Registro</h2>
            <form onSubmit={handleRegistro}>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                />
                <button type="submit">Registrarse</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default Registro;

