import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import playaImg from "../assets/CPPUL.jpg";
import bungalowImg from "../assets/BELF.jpg";
import "./DetallePropiedad.css";
import "./Comentarios.css";

const DetallePropiedad = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const [propiedad, setPropiedad] = useState(null);
    const [error, setError] = useState(null);
    const [comentario, setComentario] = useState("");
    const [listaComentarios, setListaComentarios] = useState([]);
    const [nombreReserva, setNombreReserva] = useState("");
    const [emailReserva, setEmailReserva] = useState("");
    const [adultos, setAdultos] = useState(1);
    const [ninos, setNinos] = useState(0);
    const [fechaInicioReserva, setFechaInicioReserva] = useState("");
    const [fechaFinReserva, setFechaFinReserva] = useState("");
    const [mensajeReserva, setMensajeReserva] = useState("");
    const [mensajeReservaEstado, setMensajeReservaEstado] = useState(null);
    const [temporadaActual, setTemporadaActual] = useState("baja");
    const [precioEstimado, setPrecioEstimado] = useState(0);
    const costoAdicionalAdulto = 15;
    const costoAdicionalNino = 10;

    useEffect(() => {
        const calcularTemporada = () => {
            if (fechaInicioReserva && fechaFinReserva) {
                const inicio = new Date(fechaInicioReserva);
                const fin = new Date(fechaFinReserva);
                const mesInicio = inicio.getMonth();
                const mesFin = fin.getMonth();
                const diaInicio = inicio.getDate();
                const diaFin = fin.getDate();

                // Temporada alta: Diciembre 15 - Febrero, Julio 1 - Agosto 15
                const esTemporadaAltaInicio = (mesInicio === 11 && diaInicio >= 15) || (mesInicio >= 0 && mesInicio <= 1) || (mesInicio === 6 && diaInicio >= 1) || (mesInicio === 7 && diaInicio <= 15);
                const esTemporadaAltaFin = (mesFin === 11 && diaFin >= 15) || (mesFin >= 0 && mesFin <= 1) || (mesFin === 6 && diaFin >= 1) || (mesFin === 7 && diaFin <= 15);

                if (esTemporadaAltaInicio || esTemporadaAltaFin) {
                    return 'alta';
                }

                // Temporada media: Marzo - Abril, Mayo 1 - Junio 30, Agosto 16 - Noviembre
                const esTemporadaMediaInicio = (mesInicio >= 2 && mesInicio <= 3) || (mesInicio === 4 && diaInicio >= 1 && diaInicio <= 30) || (mesInicio >= 7 && diaInicio >= 16 && mesInicio <= 10);
                const esTemporadaMediaFin = (mesFin >= 2 && mesFin <= 3) || (mesFin === 4 && diaFin >= 1 && diaFin <= 30) || (mesFin >= 7 && diaFin >= 16 && mesFin <= 10);

                if (esTemporadaMediaInicio || esTemporadaMediaFin) {
                    return 'media';
                }
            }
            return 'baja';
        };

        setTemporadaActual(calcularTemporada());
    }, [fechaInicioReserva, fechaFinReserva]);

    useEffect(() => {
        const calcularPrecio = () => {
            let precio = propiedad?.precioNoche || 0;
            if (temporadaActual === 'alta') {
                precio *= 1.2; // Ejemplo de aumento del 20%
            } else if (temporadaActual === 'media') {
                precio *= 1.1; // Ejemplo de aumento del 10% para temporada media
            }
            const adultosAdicionales = Math.max(0, adultos - 1);
            precio += adultosAdicionales * costoAdicionalAdulto;
            precio += ninos * costoAdicionalNino;
            return precio.toFixed(2);
        };

        setPrecioEstimado(calcularPrecio());
    }, [propiedad, temporadaActual, adultos, ninos]);

    useEffect(() => {
        fetch(`http://localhost:3001/api/propiedades`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                let propiedadEncontrada = null;
                if (pathname === '/casa-playa-pu') {
                    propiedadEncontrada = data.find(prop => prop.id === 1);
                } else if (pathname === '/bungalow-f') {
                    propiedadEncontrada = data.find(prop => prop.id === 2);
                } else {
                    const propiedadId = pathname.split('/').pop();
                    propiedadEncontrada = data.find(prop => prop.id === parseInt(propiedadId));
                }

                if (propiedadEncontrada) {
                    setPropiedad(propiedadEncontrada);
                    setPrecioEstimado(propiedadEncontrada?.precioNoche || 0); // Inicializar precio al cargar la propiedad
                } else {
                    setError('Propiedad no encontrada.');
                }
            })
            .catch(error => {
                console.error('Error al obtener la propiedad:', error);
                setError('Error al cargar la propiedad.');
            });
    }, [pathname]);

    const enviarComentario = (e) => {
        e.preventDefault();
        if (comentario.trim() !== "") {
            setListaComentarios([...listaComentarios, comentario.trim()]);
            setComentario("");
        }
    };

    const handleReserva = async (e) => {
        e.preventDefault();
        if (!propiedad) return;

        const reservaData = {
            propiedadId: propiedad.id,
            propiedadNombre: propiedad.nombre,
            nombre: nombreReserva,
            email: emailReserva,
            adultos: adultos,
            ninos: ninos,
            fechaInicio: fechaInicioReserva,
            fechaFin: fechaFinReserva,
            mensaje: mensajeReserva,
            precioEstimado: precioEstimado,
            temporada: temporadaActual
        };

        try {
            const response = await fetch('http://localhost:3001/api/reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservaData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error al reservar: ${response.status} - ${errorData.message || 'Detalles no disponibles'}`);
            }

            setMensajeReservaEstado('success');
            setMensajeReserva('¡Reserva enviada con éxito!');
            setNombreReserva('');
            setEmailReserva('');
            setAdultos(1);
            setNinos(0);
            setFechaInicioReserva('');
            setFechaFinReserva('');
            setMensajeReserva('');
            setTimeout(() => setMensajeReservaEstado(null), 5000);

        } catch (error) {
            console.error('Error al enviar la reserva:', error);
            setMensajeReservaEstado('error');
            setMensajeReserva('Hubo un error al enviar la reserva.');
        }
    };

    if (error) {
        return <p id="detalle-no-encontrado" className="detalle-no-encontrado">{error}</p>;
    }

    if (!propiedad) {
        return <p id="detalle-no-encontrado" className="detalle-no-encontrado">Cargando propiedad...</p>;
    }

    return (
        <div id="detalle-contenedor" className="detalle-contenedor">
            <div id="detalle-propiedad" className="detalle-propiedad">
                <h2 id="detalle-titulo" className="detalle-titulo">{propiedad.nombre}</h2>
                <img id="detalle-imagen" src={propiedad.id === 1 ? playaImg : propiedad.id === 2 ? bungalowImg : `/images/propiedad-${propiedad.id}.jpg`} alt={propiedad.nombre} className="detalle-imagen" />
                <p id="detalle-descripcion" className="detalle-descripcion">{propiedad.descripcion}</p>
                <p id="detalle-precio-base-detalle" className="detalle-precio-base-detalle">Precio Base por noche: ${propiedad.precioNoche}</p>

                {/* Formulario de Reserva */}
                <div className="formulario-reserva">
                    <h3>Reservar "{propiedad.nombre}"</h3>
                    <p>Precio Base por noche: ${propiedad.precioNoche}</p>
                    <p>Temporada actual: <span className="temporada-actual">{temporadaActual}</span></p>
                    <p>Precio estimado por noche: <span className="precio-estimado">${precioEstimado}</span></p>
                    <p>Costo adicional por adulto por noche (a partir del segundo): ${costoAdicionalAdulto}</p>
                    <p>Costo adicional por niño por noche: ${costoAdicionalNino}</p>
                    <form onSubmit={handleReserva}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" value={nombreReserva} onChange={(e) => setNombreReserva(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" value={emailReserva} onChange={(e) => setEmailReserva(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="adultos">Adultos:</label>
                            <input type="number" id="adultos" min="1" value={adultos} onChange={(e) => setAdultos(parseInt(e.target.value))} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ninos">Niños:</label>
                            <input type="number" id="ninos" min="0" value={ninos} onChange={(e) => setNinos(parseInt(e.target.value))} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fechaInicio">Fecha de Inicio:</label>
                            <input type="date" id="fechaInicio" value={fechaInicioReserva} onChange={(e) => setFechaInicioReserva(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fechaFin">Fecha de Fin:</label>
                            <input type="date" id="fechaFin" value={fechaFinReserva} onChange={(e) => setFechaFinReserva(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mensaje">Mensaje Adicional:</label>
                            <textarea id="mensaje" value={mensajeReserva} onChange={(e) => setMensajeReserva(e.target.value)} />
                        </div>
                        <button type="submit">Enviar Reserva</button>
                        {mensajeReservaEstado === 'success' && <p className="mensaje-exito">{mensajeReserva}</p>}
                        {mensajeReservaEstado === 'error' && <p className="mensaje-error">{mensajeReserva}</p>}
                    </form>
                </div>

                {/* Comentarios */}
                <div id="comentarios-detalle" className="comentarios">
                    <h3 id="comentarios-titulo">Comentarios</h3>
                    <form id="comentarios-form" onSubmit={enviarComentario}>
                        <textarea
                            id="comentarios-textarea"
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            placeholder="Escribe tu comentario..."
                        />
                        <button id="comentarios-boton-enviar" type="submit">Enviar</button>
                    </form>
                    <ul id="comentarios-lista">
                        {listaComentarios.map((comentario, index) => (
                            <li id={`comentario-${index}`} key={index}>{comentario}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DetallePropiedad;