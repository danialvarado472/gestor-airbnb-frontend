import React, { useState, useEffect } from 'react';
import './ListaReservas.css';

function ListaReservas() {
    const [reservasUsuario, setReservasUsuario] = useState([]);
    const [error, setError] = useState(null);
    const [mensajeCancelado, setMensajeCancelado] = useState(null);

    const fetchReservas = () => {
        fetch('http://localhost:3001/api/reservas')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Datos recibidos de la API (Usuario):', data);
                setReservasUsuario(data);
            })
            .catch(error => {
                console.error('Error al obtener las reservas:', error);
                setError(error.message);
            });
    };

    useEffect(() => {
        fetchReservas();
    }, []);

    const handleCancelarReserva = (id) => {
        fetch(`http://localhost:3001/api/reservas/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    console.error('Error al cancelar la reserva:', response.status);
                    return response.json().then(err => { throw err; });
                }
                return response.json();
            })
            .then(data => {
                console.log('Reserva cancelada:', data.mensaje);
                setMensajeCancelado('¡Reserva cancelada con éxito!');
                setTimeout(() => {
                    setMensajeCancelado(null);
                }, 3000);
                fetchReservas();
            })
            .catch(error => {
                console.error('Error al cancelar la reserva:', error);
                setError('Error al cancelar la reserva.');
            });
    };

    if (error) {
        return <div id="lista-reservas-error-cargar" className="error-cargar">Error al cargar o cancelar las reservas: {error}</div>;
    }

    return (
        <div id="lista-reservas-container-principal">
            <h2 id="lista-reservas-titulo" className="usuario-reservas-titulo">Tus Reservas</h2>
            {mensajeCancelado && <div id="lista-reservas-mensaje-cancelado" className="mensaje-exito">{mensajeCancelado}</div>}
            {reservasUsuario.length > 0 ? (
                <div id="lista-reservas-contenedor-listado" className="reservas-admin-container">
                    {reservasUsuario.map(reserva => (
                        <div id={`reserva-usuario-contenedor-${reserva.id}`} className="reserva-contenedor" key={reserva.id}>
                            <div id={`reserva-usuario-info-${reserva.id}`} className="reserva-info">
                                <p><strong>ID:</strong> <span id={`reserva-usuario-id-${reserva.id}`}>{reserva.id}</span></p>
                                <p><strong>Propiedad:</strong> <span id={`reserva-usuario-propiedad-${reserva.id}`}>{reserva.propiedadNombre}</span></p>
                                <p><strong>Nombre:</strong> <span id={`reserva-usuario-nombre-${reserva.id}`}>{reserva.nombre}</span></p>
                                <p><strong>Email:</strong> <span id={`reserva-usuario-email-${reserva.id}`}>{reserva.email}</span></p>
                                <p><strong>Adultos:</strong> <span id={`reserva-usuario-adultos-${reserva.id}`}>{reserva.adultos}</span></p>
                                <p><strong>Niños:</strong> <span id={`reserva-usuario-ninos-${reserva.id}`}>{reserva.ninos}</span></p>
                                <p><strong>Inicio:</strong> <span id={`reserva-usuario-inicio-${reserva.id}`}>{reserva.fechaInicio}</span></p>
                                <p><strong>Fin:</strong> <span id={`reserva-usuario-fin-${reserva.id}`}>{reserva.fechaFin}</span></p>
                                <p><strong>Precio:</strong> $<span id={`reserva-usuario-precio-${reserva.id}`}>{reserva.precioEstimado}</span></p>
                                <p><strong>Temporada:</strong> <span id={`reserva-usuario-temporada-${reserva.id}`}>{reserva.temporada}</span></p>
                                {reserva.mensaje && <p><strong>Mensaje:</strong> <span id={`reserva-usuario-mensaje-${reserva.id}`}>{reserva.mensaje}</span></p>}
                            </div>
                            <button id={`boton-cancelar-usuario-${reserva.id}`} className="eliminar-boton" onClick={() => handleCancelarReserva(reserva.id)}>
                                Cancelar
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p id="lista-reservas-vacia" className="lista-vacia">No hay reservas registradas actualmente.</p>
            )}
        </div>
    );
}

export default ListaReservas;