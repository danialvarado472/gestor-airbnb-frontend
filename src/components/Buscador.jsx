import React from "react";

const Buscador = ({ filtro, setFiltro }) => {
    return (
        <div className="buscador">
            <input
                type="text"
                placeholder="Buscar propiedad..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="input-buscador"
            />
        </div>
    );
};

export default Buscador;
