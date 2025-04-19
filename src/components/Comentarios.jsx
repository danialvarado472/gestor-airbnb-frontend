import React, { useState } from "react";
import "./Comentarios.css";

const Comentarios = () => {
    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState("");

    const manejarCambio = (e) => setNuevoComentario(e.target.value);

    const manejarEnvio = (e) => {
        e.preventDefault();
        if (nuevoComentario.trim()) {
            setComentarios([...comentarios, nuevoComentario]);
            setNuevoComentario("");
        }
    };

    return (
        <div className="comentarios">
            <h3>Comentarios</h3>
            <form onSubmit={manejarEnvio}>
        <textarea
            value={nuevoComentario}
            onChange={manejarCambio}
            placeholder="Escribe tu comentario..."
        />
                <button type="submit">Enviar</button>
            </form>
            <ul>
                {comentarios.map((comentario, index) => (
                    <li key={index}>{comentario}</li>
                ))}
            </ul>
        </div>
    );
};

export default Comentarios;