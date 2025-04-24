import React, { useState } from 'react';
import './AdminPages.css';
import './AgregarPropiedadAdmin.css';

const AgregarPropiedadAdmin = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [foto, setFoto] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState(null);

    const handleFotoChange = (e) => {
        setFoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/propiedades', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: nombre,
                    descripcion: descripcion,
                    precio: precio,
                    foto: foto ? foto.name : null,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error al agregar la propiedad: ${response.status} - ${errorData.message || 'Detalles no disponibles'}`);
            }

            const data = await response.json();
            setMensaje(data.mensaje);
            setNombre('');
            setDescripcion('');
            setPrecio('');
            setFoto(null);
            setError(null);
            setTimeout(() => setMensaje(''), 3000);
        } catch (error) {
            console.error('Error al agregar la propiedad:', error);
            setError('Error al agregar la propiedad.');
            setMensaje('');
        }
    };

    return (
        <div id="agregar-propiedad-admin-container" className="admin-page-container">
            <h1 id="agregar-propiedad-admin-titulo" className="admin-page-titulo">Agregar Propiedad</h1>
            <form id="agregar-propiedad-form" className="agregar-propiedad-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre" className="form-label">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        className="form-input"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="descripcion" className="form-label">Descripción:</label>
                    <textarea
                        id="descripcion"
                        className="form-textarea"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        rows="3"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="precio" className="form-label">Precio por noche:</label>
                    <input
                        type="number"
                        id="precio"
                        className="form-input"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="foto" className="form-label">Foto de la Propiedad:</label>
                    <input
                        type="file"
                        id="foto"
                        className="form-input-file"
                        onChange={handleFotoChange}
                        accept="image/*"
                    />
                </div>
                <button type="submit" id="agregar-propiedad-btn" className="form-button">Agregar Propiedad</button>
                {mensaje && <p className="form-message">{mensaje}</p>}
                {error && <p className="form-error">{error}</p>}
            </form>
        </div>
    );
};

export default AgregarPropiedadAdmin;