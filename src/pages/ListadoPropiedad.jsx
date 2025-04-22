import React, { useState } from "react";
import playaImg from "../assets/CPPUL.jpg";
import bungalowImg from "../assets/BELF.jpg";
import { Link } from "react-router-dom";
import "./ListadoPropiedad.css";
import "./Buscador.css";

const propiedades = [
    {
        id: 1,
        nombre: "Casa en la Playa, Punta Uva, Limón",
        descripcion: "A 200mts de la playa",
        precioBase: 120,
        imagen: playaImg,
        ruta: "/casa-playa-pu",
    },
    {
        id: 2,
        nombre: "Bungalow Escape La Fortuna",
        descripcion: "Incluye pase a aguas termales",
        precioBase: 90,
        imagen: bungalowImg,
        ruta: "/bungalow-f",
    },
];

const ListadoPropiedad = () => {
    const [busqueda, setBusqueda] = useState("");

    const propiedadesFiltradas = propiedades.filter((propiedad) =>
        propiedad.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div id="listado-contenedor-principal" className="listado-contenedor-principal">
            <h1 id="listado-titulo" className="listado-titulo">Listado de Propiedades</h1>

            <div id="listado-buscador-contenedor" className="buscador-contenedor">
                <input
                    id="listado-buscador-input"
                    type="text"
                    placeholder="Buscar propiedad..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="buscador-input"
                />
            </div>

            <div id="listado-propiedades" className="listado-propiedades">
                {propiedadesFiltradas.length > 0 ? (
                    propiedadesFiltradas.map((propiedad) => (
                        <div id={`propiedad-tarjeta-${propiedad.id}`} key={propiedad.id} className="tarjeta-propiedad">
                            <Link to={propiedad.ruta}>
                                <img
                                    id={`propiedad-imagen-${propiedad.id}`}
                                    src={propiedad.imagen}
                                    alt={propiedad.nombre}
                                    className="imagen-propiedad"
                                />
                            </Link>
                            <h2 id={`propiedad-titulo-${propiedad.id}`} className="titulo-propiedad">{propiedad.nombre}</h2>
                            <p id={`propiedad-descripcion-${propiedad.id}`} className="descripcion-propiedad">{propiedad.descripcion}</p>
                            <p id={`propiedad-precio-${propiedad.id}`} className="precio-propiedad">
                                Precio Base: ${propiedad.precioBase} por noche
                            </p>
                            <Link
                                id={`propiedad-boton-ver-mas-${propiedad.id}`}
                                to={propiedad.ruta}
                                className="boton-ver-mas"
                            >
                                Ver más
                            </Link>
                        </div>
                    ))
                ) : (
                    <p id="listado-mensaje-vacio" className="mensaje-vacio">No se encontraron propiedades.</p>
                )}
            </div>
        </div>
    );
};

export default ListadoPropiedad;