import React from "react";
import bungalowImg from "../assets/BELF.jpg";
import './BungalowF.css';

const BungalowF = () => {
    return (
        <div id="bungalow-f-detalle" className="bungalow-f-detalle">
            <h1 id="bungalow-f-titulo" className="bungalow-f-titulo">Bungalow Escape La Fortuna</h1>
            <img id="bungalow-f-imagen" src={bungalowImg} alt="Bungalow Escape" className="bungalow-f-imagen" />
            <p id="bungalow-f-descripcion-1" className="bungalow-f-descripcion-1">Incluye pase a aguas termales con vista al volcán.</p>
            <p id="bungalow-f-precio" className="bungalow-f-precio"><strong>Precio Base:</strong> $90 por noche</p>
        </div>
    );
};

export default BungalowF;
