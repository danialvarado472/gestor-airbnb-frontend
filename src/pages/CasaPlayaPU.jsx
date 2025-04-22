import React from "react";
import playaImg from "../assets/CPPUL.jpg";
import "./CasaPlayaPU.css";

const CasaPlayaPU = () => {
    return (
        <div id="casa-playa-pu-contenedor" className="casa-playa-pu-contenedor">
            <div id="casa-playa-pu-detalle" className="casa-playa-pu-detalle">
                <h1 id="casa-playa-pu-titulo" className="casa-playa-pu-titulo">Casa en la Playa, Punta Uva, Limón</h1>
                <img id="casa-playa-pu-imagen" src={playaImg} alt="Casa en la Playa" className="casa-playa-pu-imagen" />
                <p id="casa-playa-pu-descripcion" className="casa-playa-pu-descripcion">A 200mts de la playa, perfecta para relajarse.</p>
                <p id="casa-playa-pu-precio" className="casa-playa-pu-precio"><strong>Precio Base:</strong> $120 por noche</p>
            </div>
        </div>
    );
};

export default CasaPlayaPU;
