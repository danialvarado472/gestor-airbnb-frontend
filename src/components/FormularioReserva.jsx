import React, { useState, useEffect } from 'react';
import './FormularioReserva.css';
import TarifaDinamica from './TarifaDinamica';

const FormularioReserva = ({ propiedadNombre, precioBase }) => {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [adultos, setAdultos] = useState(1);
    const [ninos, setNinos] = useState(0);
    const [mensajeReserva, setMensajeReserva] = useState('');
    const [temporada, setTemporada] = useState('baja'); // Estado inicial de la temporada
    const [precioBasePorNocheConTemporada, setPrecioBasePorNocheConTemporada] = useState(precioBase);
    const [precioEstimadoPorNoche, setPrecioEstimadoPorNoche] = useState(precioBase);
    const costoAdultoAdicional = 15; // Costo adicional por adulto por noche
    const costoNinoAdicional = 10;   // Costo adicional por niño por noche

    useEffect(() => {
        // Simulación de la lógica de temporada basada en las fechas seleccionadas
        if (fechaInicio && fechaFin) {
            const inicio = new Date(fechaInicio);
            const fin = new Date(fechaFin);
            const mesInicio = inicio.getMonth();
            const mesFin = fin.getMonth();

            // Simulación de temporada alta (ejemplo: diciembre, enero, julio)
            if (mesInicio === 11 || mesInicio === 0 || mesInicio === 6 || mesFin === 11 || mesFin === 0 || mesFin === 6) {
                setTemporada('alta');
            }
            // Simulación de temporada media (ejemplo: marzo, abril, agosto, septiembre)
            else if (mesInicio === 2 || mesInicio === 3 || mesInicio === 7 || mesInicio === 8 || mesFin === 2 || mesFin === 3 || mesFin === 7 || mesFin === 8) {
                setTemporada('media');
            } else {
                setTemporada('baja');
            }
        } else {
            setTemporada('baja'); // Temporada baja por defecto si no hay fechas seleccionadas
        }
    }, [fechaInicio, fechaFin]);

    useEffect(() => {
        // Actualizar el precio base por noche según la temporada
        const ajusteTemporada =
            temporada === 'alta' ? precioBase * 0.2 :
                temporada === 'media' ? precioBase * 0.1 :
                    0;
        setPrecioBasePorNocheConTemporada(precioBase + ajusteTemporada);
    }, [temporada, precioBase]);

    useEffect(() => {
        // Actualizar el precio estimado por noche incluyendo el costo adicional por personas
        const costoAdicionalPersonasPorNoche = (adultos > 1 ? (adultos - 1) * costoAdultoAdicional : 0) + (ninos * costoNinoAdicional);
        setPrecioEstimadoPorNoche(precioBasePorNocheConTemporada + costoAdicionalPersonasPorNoche);
    }, [adultos, ninos, precioBasePorNocheConTemporada]);

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
            const noches = calcularNoches(fechaInicio, fechaFin);
            const precioTotalEstimado = precioEstimadoPorNoche * noches;

            setMensajeReserva(`¡Reserva para "${propiedadNombre}" confirmada desde el ${fechaInicio} hasta el ${fechaFin} para ${adultos} adultos y ${ninos} niños! Precio total estimado: $${precioTotalEstimado.toFixed(2)}`);
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

    const calcularNoches = (inicio, fin) => {
        if (!inicio || !fin) return 0;
        const fechaInicioReserva = new Date(inicio);
        const fechaFinReserva = new Date(fin);
        const diferenciaTiempo = fechaFinReserva.getTime() - fechaInicioReserva.getTime();
        const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 3600 * 24));
        return diferenciaDias > 0 ? diferenciaDias : 1; // Mínimo 1 noche
    };

    return (
        <div id="formulario-reserva-contenedor" className="formulario-reserva-contenedor">
            <h3 id="formulario-reserva-titulo" className="formulario-reserva-titulo">Reservar "{propiedadNombre}"</h3>
            <p id="formulario-reserva-precio-base" className="formulario-reserva-precio-base">Precio Base por noche: ${precioBase}</p>
            <p id="formulario-reserva-temporada" className="formulario-reserva-temporada">Temporada actual: {temporada}</p>
            <p id="formulario-reserva-precio-estimado-noche" className="formulario-reserva-precio-estimado-noche">Precio estimado por noche: ${precioEstimadoPorNoche.toFixed(2)}</p>
            <p id="formulario-reserva-costo-adulto" className="formulario-reserva-costo-adulto">Costo adicional por adulto por noche (a partir del segundo): ${costoAdultoAdicional}</p>
            <p id="formulario-reserva-costo-nino" className="formulario-reserva-costo-nino">Costo adicional por niño por noche: ${costoNinoAdicional}</p>
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