import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registro.css";

const Inicio = () => {
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (usuario === "admin" && contrasena === "1234") {
            navigate("/admin");
        } else if (usuario === "usuario" && contrasena === "abcd") {
            navigate("/listado");
        } else {
            setError("Credenciales incorrectas.");
        }
    };

    return (
        <div className="registro-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Ingresar</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default Inicio;
