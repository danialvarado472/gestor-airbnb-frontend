import React, { useState } from 'react';
import './AdminPages.css';
import './AgregarPropiedadAdmin.css';

const AgregarPropiedadAdmin = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [foto, setFoto] = useState(null);
    const [mensaje, setMensaje] = useState('');

    const handleFotoChange = (e) => {
        setFoto(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nombreFoto = foto ? foto.name : 'Ninguna foto seleccionada';
        setMensaje(`Propiedad "${nombre}" agregada exitosamente (simulación). Foto seleccionada: ${nombreFoto}`);
        // llamar a la API para agregar la propiedad
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setFoto(null);
        setTimeout(() => setMensaje(''), 3000);
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
                        accept="image/*" // Opcional: aceptar solo archivos de imagen
                    />
                </div>
                <button type="submit" id="agregar-propiedad-btn" className="form-button">Agregar Propiedad</button>
                {mensaje && <p id="agregar-propiedad-mensaje" className="form-message">{mensaje}</p>}
            </form>
        </div>
    );
};

export default AgregarPropiedadAdmin;