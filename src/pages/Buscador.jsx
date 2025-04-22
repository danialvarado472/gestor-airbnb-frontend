import React from "react";
import "./Buscador.css";

const Buscador = ({ filtro, setFiltro }) => {
    return (
        <div id="buscador-contenedor" className="buscador-contenedor">
            <input
                id="buscador-input"
                type="text"
                placeholder="Buscar propiedad..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="buscador-input"
            />
        </div>
    );
};

export default Buscador;