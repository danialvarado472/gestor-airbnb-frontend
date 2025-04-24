import React, { useState, useEffect } from 'react';
import './AdminPages.css';
import './EliminarPropiedadAdmin.css';

const EliminarPropiedadAdmin = () => {
    const [propiedades, setPropiedades] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/api/propiedades')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setPropiedades(data))
            .catch(error => {
                console.error('Error al obtener las propiedades:', error);
                setError('Error al cargar las propiedades.');
            });
    }, []);

    const handleEliminar = (id) => {
        fetch(`http://localhost:3001/api/propiedades/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setMensaje(data.mensaje);
                setPropiedades(propiedades.filter(propiedad => propiedad.id !== id));
                setError(null);
                setTimeout(() => setMensaje(''), 3000);
            })
            .catch(error => {
                console.error('Error al eliminar la propiedad:', error);
                setError('Error al eliminar la propiedad.');
                setMensaje('');
            });
    };

    if (error) {
        return <div id="eliminar-propiedad-admin-container" className="admin-page-container">
            <h1 id="eliminar-propiedad-admin-titulo" className="admin-page-titulo">Eliminar Propiedad</h1>
            <p className="error-message">{error}</p>
        </div>;
    }

    return (
        <div id="eliminar-propiedad-admin-container" className="admin-page-container">
            <h1 id="eliminar-propiedad-admin-titulo" className="admin-page-titulo">Eliminar Propiedad</h1>
            <ul id="propiedades-eliminar-lista" className="propiedades-eliminar-lista">
                {propiedades.map(propiedad => (
                    <li id={`eliminar-propiedad-item-${propiedad.id}`} key={propiedad.id} className="eliminar-propiedad-item">
                        <span className="eliminar-propiedad-nombre">{propiedad.nombre}</span>
                        <button
                            className="eliminar-propiedad-btn"
                            onClick={() => handleEliminar(propiedad.id)}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
            {mensaje && <p className="eliminar-propiedad-mensaje">{mensaje}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default EliminarPropiedadAdmin;