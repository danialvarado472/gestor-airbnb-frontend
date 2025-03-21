import React from "react";
import playaImg from "../assets/CPPUL.jpg";
import bungalowImg from "../assets/BELF.jpg";
import { Link } from "react-router-dom";

const propiedades = [
  {
    id: 1,
    nombre: "Casa en la Playa, Punta Uva, Limón",
    descripcion: "A 200mts de la playa",
    precioBase: 120,
    imagen: playaImg,
    ruta: "/casa-playa-pu"
  },
  {
    id: 2,
    nombre: "Bungalow Escape La Fortuna",
    descripcion: "Incluye pase a aguas termales",
    precioBase: 90,
    imagen: bungalowImg,
    ruta: "/bungalow-f"
  },
];

const ListadoPropiedad = () => {
  return (
    <div className="listado-propiedades">
      {propiedades.map((propiedad) => (
        <div key={propiedad.id} className="tarjeta-propiedad">
          <Link to={propiedad.ruta}>
            <img
              src={propiedad.imagen}
              alt={propiedad.nombre}
              className="imagen-propiedad"
            />
          </Link>
          <h2 className="titulo-propiedad">{propiedad.nombre}</h2>
          <p className="descripcion-propiedad">{propiedad.descripcion}</p>
          <p className="precio-propiedad">Precio Base: ${propiedad.precioBase} por noche</p>
          <Link to={propiedad.ruta} className="boton-ver-mas">
            Ver más
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ListadoPropiedad;
