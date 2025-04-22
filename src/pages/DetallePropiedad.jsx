import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import playaImg from "../assets/CPPUL.jpg";
import bungalowImg from "../assets/BELF.jpg";
import "./Comentarios.css";

const propiedades = {
    "/casa-playa-pu": {
        nombre: "Casa en la Playa, Punta Uva, Limón",
        descripcion: "A 200mts de la playa",
        precioBase: 120,
        imagen: playaImg,
    },
    "/bungalow-f": {
        nombre: "Bungalow Escape La Fortuna",
        descripcion: "Incluye pase a aguas termales",
        precioBase: 90,
        imagen: bungalowImg,
    },
};

const DetallePropiedad = () => {
    const location = useLocation();
    const propiedad = propiedades[location.pathname];

    const [comentario, setComentario] = useState("");
    const [listaComentarios, setListaComentarios] = useState([]);

    const enviarComentario = (e) => {
        e.preventDefault();
        if (comentario.trim() !== "") {
            setListaComentarios([...listaComentarios, comentario.trim()]);
            setComentario("");
        }
    };

    if (!propiedad) {
        return <p>Propiedad no encontrada.</p>;
    }

    return (
        <div className="detalle-propiedad">
            <h2 className="titulo-detalle">{propiedad.nombre}</h2>
            <img src={propiedad.imagen} alt={propiedad.nombre} className="imagen-detalle" />
            <p>{propiedad.descripcion}</p>
            <p className="precio-propiedad">Precio Base: ${propiedad.precioBase} por noche</p>

            {/* Comentarios */}
            <div className="comentarios">
                <h3>Comentarios</h3>
                <form onSubmit={enviarComentario}>
          <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Escribe tu comentario..."
          />
                    <button type="submit">Enviar</button>
                </form>
                <ul>
                    {listaComentarios.map((comentario, index) => (
                        <li key={index}>{comentario}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DetallePropiedad;
