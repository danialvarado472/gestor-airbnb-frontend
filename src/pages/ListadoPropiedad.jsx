import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ListadoPropiedad.css";
import "./Buscador.css";
import playaImg from "../assets/CPPUL.jpg";
import bungalowImg from "../assets/BELF.jpg";

const ListadoPropiedad = () => {
    const [propiedades, setPropiedades] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/api/propiedades')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setPropiedades(data))
            .catch(error => {
                console.error('Error al obtener las propiedades:', error);
                setError('Error al cargar las propiedades.');
            });
    }, []);

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
                            <Link to={propiedad.id === 1 ? "/casa-playa-pu" : propiedad.id === 2 ? "/bungalow-f" : `/propiedad/${propiedad.id}`}>
                                <img
                                    id={`propiedad-imagen-${propiedad.id}`}
                                    src={propiedad.id === 1 ? playaImg : propiedad.id === 2 ? bungalowImg : `/images/propiedad-${propiedad.id}.jpg`}
                                    alt={propiedad.nombre}
                                    className="imagen-propiedad"
                                />
                            </Link>
                            <h2 className="titulo-propiedad">{propiedad.nombre}</h2>
                            <p className="descripcion-propiedad">{propiedad.descripcion}</p>
                            <p className="precio-propiedad">
                                Precio Base: ${propiedad.precioNoche} por noche
                            </p>
                            <Link
                                className="boton-ver-mas"
                                to={propiedad.id === 1 ? "/casa-playa-pu" : propiedad.id === 2 ? "/bungalow-f" : `/propiedad/${propiedad.id}`}
                            >
                                Ver más
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="mensaje-vacio">No se encontraron propiedades.</p>
                )}
            </div>
        </div>
    );
};

export default ListadoPropiedad;