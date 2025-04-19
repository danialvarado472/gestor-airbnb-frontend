import React, { useState } from "react";
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
      <div>
        <div className="buscador">
          <input
              type="text"
              placeholder="Buscar propiedad..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input-buscador"
          />
        </div>

        <div className="listado-propiedades">
          {propiedadesFiltradas.length > 0 ? (
              propiedadesFiltradas.map((propiedad) => (
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
                    <p className="precio-propiedad">
                      Precio Base: ${propiedad.precioBase} por noche
                    </p>
                    <Link to={propiedad.ruta} className="boton-ver-mas">
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
