import React from "react";
import playaImg from "../assets/CPPUL.jpg";


const CasaPlayaPU = () => {
    return (
        <div className="detalle-contenedor">
            <div className="detalle-propiedad">
                <h1 className="titulo-detalle">Casa en la Playa, Punta Uva, Limón</h1>
                <img src={playaImg} alt="Casa en la Playa" className="imagen-detalle" />
                <p>A 200mts de la playa, perfecta para relajarse.</p>
                <p><strong>Precio Base:</strong> $120 por noche</p>
            </div>
        </div>
    );
};

export default CasaPlayaPU;
