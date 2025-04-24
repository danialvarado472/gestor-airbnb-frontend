import React, { useState } from "react";
import "./Comentarios.css";

const Comentarios = ({ propiedadId, onComentarioEnviado }) => {
    const [nuevoComentario, setNuevoComentario] = useState("");

    const manejarCambio = (e) => setNuevoComentario(e.target.value);

    const manejarEnvio = async (e) => {
        e.preventDefault();
        if (nuevoComentario.trim() && propiedadId) {
            try {
                const response = await fetch(`http://localhost:3001/api/propiedades/${propiedadId}/comentarios`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ texto: nuevoComentario }),
                });
                if (!response.ok) {
                    console.error('Error al enviar el comentario:', response.status);
                    return;
                }
                const data = await response.json();
                console.log('Comentario enviado:', data.comentario);
                setNuevoComentario("");
                if (onComentarioEnviado) {
                    onComentarioEnviado(data.comentario);
                }
            } catch (error) {
                console.error('Error al enviar el comentario:', error);
            }
        } else if (nuevoComentario.trim()) {

            if (onComentarioEnviado) {
                onComentarioEnviado(nuevoComentario);
            }
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
        </div>
    );
};

export default Comentarios;