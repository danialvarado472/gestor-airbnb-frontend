import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import playaImg from "../assets/CPPUL.jpg";
import bungalowImg from "../assets/BELF.jpg";
import "./DetallePropiedad.css";
import "./Comentarios.css";
import FormularioReserva from "../components/FormularioReserva";

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
        return <p id="detalle-no-encontrado" className="detalle-no-encontrado">Propiedad no encontrada.</p>;
    }

    return (
        <div id="detalle-contenedor" className="detalle-contenedor">
            <div id="detalle-propiedad" className="detalle-propiedad">
                <h2 id="detalle-titulo" className="detalle-titulo">{propiedad.nombre}</h2>
                <img id="detalle-imagen" src={propiedad.imagen} alt={propiedad.nombre} className="detalle-imagen" />
                <p id="detalle-descripcion" className="detalle-descripcion">{propiedad.descripcion}</p>
                <p id="detalle-precio-base-detalle" className="detalle-precio-base-detalle">Precio Base: ${propiedad.precioBase} por noche</p>

                {/* Formulario de Reserva */}
                <FormularioReserva propiedadNombre={propiedad.nombre} precioBase={propiedad.precioBase} />

                {/* Comentarios */}
                <div id="comentarios-detalle" className="comentarios">
                    <h3 id="comentarios-titulo">Comentarios</h3>
                    <form id="comentarios-form" onSubmit={enviarComentario}>
                        <textarea
                            id="comentarios-textarea"
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            placeholder="Escribe tu comentario..."
                        />
                        <button id="comentarios-boton-enviar" type="submit">Enviar</button>
                    </form>
                    <ul id="comentarios-lista">
                        {listaComentarios.map((comentario, index) => (
                            <li id={`comentario-${index}`} key={index}>{comentario}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DetallePropiedad;