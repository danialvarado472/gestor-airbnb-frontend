import React from "react";
import bungalowImg from "../assets/BELF.jpg";

const BungalowF = () => {
  return (
    <div className="detalle-propiedad">
      <h1 className="titulo-detalle">Bungalow Escape La Fortuna</h1>
      <img src={bungalowImg} alt="Bungalow Escape" className="imagen-detalle" />
      <p>Incluye pase a aguas termales con vista al volcán.</p>
      <p><strong>Precio Base:</strong> $90 por noche</p>
    </div>
  );
};

export default BungalowF;
