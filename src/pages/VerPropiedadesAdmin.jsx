import React from 'react';
import './AdminPages.css';
import './VerPropiedadesAdmin.css';

const propiedadesSimuladas = [
    { id: 1, nombre: "Casa de Playa en Punta Uva", precio: "$120/noche" },
    { id: 2, nombre: "Bungalow en La Fortuna", precio: "$90/noche" },
    { id: 3, nombre: "Apartamento en Tamarindo", precio: "$150/noche" },
];

const VerPropiedadesAdmin = () => {
    return (
        <div id="ver-propiedades-admin-container" className="admin-page-container">
            <h1 id="ver-propiedades-admin-titulo" className="admin-page-titulo">Ver Propiedades</h1>
            <ul id="propiedades-lista" className="propiedades-lista">
                {propiedadesSimuladas.map(propiedad => (
                    <li id={`propiedad-item-${propiedad.id}`} key={propiedad.id} className="propiedad-item">
                        <span id={`propiedad-nombre-${propiedad.id}`} className="propiedad-nombre">{propiedad.nombre}</span>
                        <span id={`propiedad-precio-${propiedad.id}`} className="propiedad-precio">{propiedad.precio}</span>
                        <button id={`propiedad-ver-detalles-${propiedad.id}`} className="propiedad-ver-detalles-btn">Ver Detalles</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VerPropiedadesAdmin;