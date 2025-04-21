import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [errores, setErrores] = useState({});
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const nuevosErrores = {};
        if (!usuario) nuevosErrores.usuario = "El usuario es requerido";
        if (!contrasena) nuevosErrores.contrasena = "La contraseña es requerida";

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        if (usuario === "usuario" && contrasena === "1234") {
            navigate("/listado");
        } else {
            setErrores({ general: "Credenciales incorrectas" });
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="titulo">Iniciar Sesión</h2>
                <form className="formulario-login" onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        className={`input-login ${errores.usuario ? "input-error" : ""}`}
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                    {errores.usuario && <p className="error">{errores.usuario}</p>}

                    <input
                        type={mostrarContrasena ? "text" : "password"}
                        placeholder="Contraseña"
                        className={`input-login ${errores.contrasena ? "input-error" : ""}`}
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                    {errores.contrasena && <p className="error">{errores.contrasena}</p>}

                    <span
                        className="toggle-password"
                        onClick={() => setMostrarContrasena((prev) => !prev)}
                    >
            {mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
          </span>

                    {errores.general && <p className="error">{errores.general}</p>}

                    <button type="submit" className="boton-login">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
