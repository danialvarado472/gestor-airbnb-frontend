import React, { useState } from 'react';
import './AdminPages.css';
import './EliminarPropiedadAdmin.css';

const propiedadesSimuladas = [
    { id: 1, nombre: "Casa de Playa en Punta Uva" },
    { id: 2, nombre: "Bungalow en La Fortuna" },
    { id: 3, nombre: "Apartamento en Tamarindo" },
];

const EliminarPropiedadAdmin = () => {
    const [mensaje, setMensaje] = useState('');

    const handleEliminar = (id) => {
        setMensaje(`Propiedad con ID ${id} eliminada exitosamente.`);
        // llamar a la API para eliminar la propiedad.
        setTimeout(() => setMensaje(''), 3000);
    };

    return (
        <div id="eliminar-propiedad-admin-container" className="admin-page-container">
            <h1 id="eliminar-propiedad-admin-titulo" className="admin-page-titulo">Eliminar Propiedad</h1>
            <ul id="propiedades-eliminar-lista" className="propiedades-eliminar-lista">
                {propiedadesSimuladas.map(propiedad => (
                    <li id={`eliminar-propiedad-item-${propiedad.id}`} key={propiedad.id} className="eliminar-propiedad-item">
                        <span id={`eliminar-propiedad-nombre-${propiedad.id}`} className="eliminar-propiedad-nombre">{propiedad.nombre}</span>
                        <button
                            id={`eliminar-propiedad-btn-${propiedad.id}`}
                            className="eliminar-propiedad-btn"
                            onClick={() => handleEliminar(propiedad.id)}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
            {mensaje && <p id="eliminar-propiedad-mensaje" className="eliminar-propiedad-mensaje">{mensaje}</p>}
        </div>
    );
};

export default EliminarPropiedadAdmin;