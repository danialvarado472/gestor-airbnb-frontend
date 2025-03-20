import React from 'react';
import TarifaDinamica from './TarifaDinamica';

function ListadoPropiedad(props) {
  return (
    <div>
      <h2>{props.nombre}</h2>
      <p>Descripción: {props.descripcion}</p>
      <p>Precio por noche: <TarifaDinamica precioBase={props.precioBase} temporada={props.temporada} /></p>
    </div>
  );
}

export default ListadoPropiedad;
