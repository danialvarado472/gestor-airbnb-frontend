import React, { useState, useEffect } from 'react';
import './VerReservasAdmin.css';

function VerReservasAdmin() {
    const [reservasAdmin, setReservasAdmin] = useState([]);
    const [error, setError] = useState(null);
    const [mensajeEliminado, setMensajeEliminado] = useState(null);

    const fetchReservas = () => {
        fetch('http://localhost:3001/api/reservas')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Datos recibidos de la API (Admin):', data);
                setReservasAdmin(data);
            })
            .catch(error => {
                console.error('Error al obtener las reservas:', error);
                setError(error.message);
            });
    };

    useEffect(() => {
        fetchReservas();
    }, []);

    const handleEliminarReserva = (id) => {
        fetch(`http://localhost:3001/api/reservas/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    console.error('Error al eliminar la reserva:', response.status);
                    return response.json().then(err => { throw err; });
                }
                return response.json();
            })
            .then(data => {
                console.log('Reserva eliminada:', data.mensaje);
                setMensajeEliminado('¡Reserva eliminada con éxito!');
                setTimeout(() => {
                    setMensajeEliminado(null);
                }, 3000);
                fetchReservas();
            })
            .catch(error => {
                console.error('Error al eliminar la reserva:', error);
                setError('Error al eliminar la reserva.');
            });
    };

    if (error) {
        return <div className="error-cargar">Error al cargar o eliminar las reservas: {error}</div>;
    }

    return (
        <div>
            <h2 className="admin-reservas-titulo">Lista de Reservas</h2>
            {mensajeEliminado && <div className="mensaje-exito">{mensajeEliminado}</div>}
            {reservasAdmin.length > 0 ? (
                <div className="reservas-admin-container">
                    {reservasAdmin.map(reserva => (
                        <div className="reserva-contenedor" key={reserva.id}>
                            <div className="reserva-info">
                                <p><strong>ID:</strong> {reserva.id}</p>
                                <p><strong>Propiedad:</strong> {reserva.propiedadNombre}</p>
                                <p><strong>Nombre:</strong> {reserva.nombre}</p>
                                <p><strong>Email:</strong> {reserva.email}</p>
                                <p><strong>Adultos:</strong> {reserva.adultos}</p>
                                <p><strong>Niños:</strong> {reserva.ninos}</p>
                                <p><strong>Inicio:</strong> {reserva.fechaInicio}</p>
                                <p><strong>Fin:</strong> {reserva.fechaFin}</p>
                                <p><strong>Precio:</strong> ${reserva.precioEstimado}</p>
                                <p><strong>Temporada:</strong> {reserva.temporada}</p>
                                {reserva.mensaje && <p><strong>Mensaje:</strong> {reserva.mensaje}</p>}
                            </div>
                            <button className="eliminar-boton" onClick={() => handleEliminarReserva(reserva.id)}>
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="lista-vacia">No hay reservas registradas actualmente.</p>
            )}
        </div>
    );
}

export default VerReservasAdmin;