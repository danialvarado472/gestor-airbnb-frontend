import React from 'react';
import ListadoPropiedad from './components/ListadoPropiedad';

function App() {
  const propiedades = [
    {
      nombre: "Casa en la Playa, Punta Uva, Limón",
      descripcion: "A 200mts de la playa",
      precioBase: 120,
      temporada: "alta"
    },
    {
      nombre: "Bungalow Escape La Fortuna",
      descripcion: "Incluye pase a aguas termales",
      precioBase: 90,
      temporada: "media"
    }
  ];

  return (
    <div>
      <h1>Gestión de Propiedades</h1>
      {propiedades.map((propiedad, index) => (
        <ListadoPropiedad
          key={index}
          nombre={propiedad.nombre}
          descripcion={propiedad.descripcion}
          precioBase={propiedad.precioBase}
          temporada={propiedad.temporada}
        />
      ))}
    </div>
  );
}

export default App;
