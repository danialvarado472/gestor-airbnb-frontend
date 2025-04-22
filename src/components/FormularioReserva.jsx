import React, { useState } from 'react';
import './FormularioReserva.css';

const FormularioReserva = ({ propiedadNombre }) => {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [adultos, setAdultos] = useState(1);
    const [ninos, setNinos] = useState(0);
    const [mensajeReserva, setMensajeReserva] = useState('');

    const manejarCambioFechaInicio = (e) => {
        setFechaInicio(e.target.value);
    };

    const manejarCambioFechaFin = (e) => {
        setFechaFin(e.target.value);
    };

    const manejarCambioAdultos = (e) => {
        setAdultos(parseInt(e.target.value, 10) || 1);
    };

    const manejarCambioNinos = (e) => {
        setNinos(parseInt(e.target.value, 10) || 0);
    };

    const manejarReserva = (e) => {
        e.preventDefault();
        if (fechaInicio && fechaFin) {
            setMensajeReserva(`¡Reserva para "${propiedadNombre}" confirmada desde el ${fechaInicio} hasta el ${fechaFin} para ${adultos} adultos y ${ninos} niños!`);
            // En una implementación real, aquí se haría la llamada a la API para guardar la reserva.
            // Limpiar el formulario después de la reserva simulada
            setFechaInicio('');
            setFechaFin('');
            setAdultos(1);
            setNinos(0);
            setTimeout(() => setMensajeReserva(''), 5000); // Limpiar el mensaje después de 5 segundos
        } else {
            setMensajeReserva('Por favor, selecciona las fechas de inicio y fin de tu reserva.');
            setTimeout(() => setMensajeReserva(''), 5000);
        }
    };

    return (
        <div id="formulario-reserva-contenedor" className="formulario-reserva-contenedor">
            <h3 id="formulario-reserva-titulo" className="formulario-reserva-titulo">Reservar "{propiedadNombre}"</h3>
            <form id="formulario-reserva-form" onSubmit={manejarReserva}>
                <div className="formulario-reserva-campo">
                    <label htmlFor="fecha-inicio" className="formulario-reserva-label">Fecha de Inicio:</label>
                    <input
                        type="date"
                        id="fecha-inicio"
                        className="formulario-reserva-input"
                        value={fechaInicio}
                        onChange={manejarCambioFechaInicio}
                        required
                    />
                </div>
                <div className="formulario-reserva-campo">
                    <label htmlFor="fecha-fin" className="formulario-reserva-label">Fecha de Fin:</label>
                    <input
                        type="date"
                        id="fecha-fin"
                        className="formulario-reserva-input"
                        value={fechaFin}
                        onChange={manejarCambioFechaFin}
                        required
                    />
                </div>
                <div className="formulario-reserva-campo">
                    <label htmlFor="adultos" className="formulario-reserva-label">Adultos:</label>
                    <input
                        type="number"
                        id="adultos"
                        className="formulario-reserva-input"
                        value={adultos}
                        onChange={manejarCambioAdultos}
                        min="1"
                    />
                </div>
                <div className="formulario-reserva-campo">
                    <label htmlFor="ninos" className="formulario-reserva-label">Niños:</label>
                    <input
                        type="number"
                        id="ninos"
                        className="formulario-reserva-input"
                        value={ninos}
                        onChange={manejarCambioNinos}
                        min="0"
                    />
                </div>
                <button id="formulario-reserva-boton" type="submit" className="formulario-reserva-boton">Reservar Ahora</button>
                {mensajeReserva && <p id="formulario-reserva-mensaje" className="formulario-reserva-mensaje">{mensajeReserva}</p>}
            </form>
        </div>
    );
};

export default FormularioReserva;