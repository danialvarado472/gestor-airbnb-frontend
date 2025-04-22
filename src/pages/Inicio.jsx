import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Inicio.css";

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
        <div id="inicio-container" className="inicio-container">
            <h2 id="inicio-titulo" className="inicio-titulo">Iniciar Sesión</h2>
            <form id="inicio-form" onSubmit={handleLogin}>
                <input
                    id="inicio-usuario"
                    type="text"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                />
                <input
                    id="inicio-contrasena"
                    type="password"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                />
                <button id="inicio-boton" type="submit">Ingresar</button>
                {error && <p id="inicio-error" className="inicio-error">{error}</p>}
            </form>
        </div>
    );
};

export default Inicio;
