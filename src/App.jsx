import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

const propiedades = [
  {
    nombre: "Casa en la Playa, Punta Uva, Limón",
    descripcion: "A 200mts de la playa",
    precioBase: 120,
    temporada: "alta",
    imagen: "playa.jpg"
  },
  {
    nombre: "Bungalow Escape La Fortuna",
    descripcion: "Incluye pase a aguas termales",
    precioBase: 90,
    temporada: "media",
    imagen: "bungalow.jpg"
  }
];

function App() {
  return (
    <div className="container">
      <h1>Gestor de Airbnb</h1>
      <div className="propiedades">
        {propiedades.map((propiedad, index) => (
          <div className="card" key={index}>
            <Link to={`/propiedad/${index}`}>
              <img src={propiedad.imagen} alt={propiedad.nombre} />
            </Link>
            <h2>{propiedad.nombre}</h2>
            <p>{propiedad.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
