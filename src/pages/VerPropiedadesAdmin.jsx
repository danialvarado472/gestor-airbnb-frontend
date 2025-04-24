import React, { useState, useEffect } from 'react';
import './AdminPages.css';
import './VerPropiedadesAdmin.css';

const VerPropiedadesAdmin = () => {
    const [propiedades, setPropiedades] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/api/propiedades')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Datos recibidos de la API:", data);
                setPropiedades(data);
            })
            .catch(error => {
                console.error('Error al obtener las propiedades:', error);
                setError('Error al cargar las propiedades.');
            });
    }, []);

    if (error) {
        return <div id="ver-propiedades-admin-container" className="admin-page-container">
            <h1 id="ver-propiedades-admin-titulo" className="admin-page-titulo">Ver Propiedades</h1>
            <p className="error-message">{error}</p>
        </div>;
    }

    return (
        <div id="ver-propiedades-admin-container" className="admin-page-container">
            <h1 id="ver-propiedades-admin-titulo" className="admin-page-titulo">Ver Propiedades</h1>
            <ul id="propiedades-lista" className="propiedades-lista">
                {propiedades.map(propiedad => (
                    <li id={`propiedad-item-${propiedad.id}`} key={propiedad.id} className="propiedad-item">
                        <span className="propiedad-nombre">{propiedad.nombre}</span>
                        <span className="propiedad-precio">${propiedad.precioNoche}</span>
                        <button className="propiedad-ver-detalles-btn">Ver Detalles</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VerPropiedadesAdmin;