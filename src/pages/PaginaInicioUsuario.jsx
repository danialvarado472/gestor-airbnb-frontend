import React from 'react';
import { Link } from 'react-router-dom';
import './PaginaInicioUsuario.css';


function PaginaInicioUsuario() {
    return (
        <div id="pagina-inicio-usuario-contenedor" className="pagina-inicio-usuario-container">
            <h2 id="pagina-inicio-usuario-titulo" className="pagina-inicio-usuario-titulo">Bienvenido Usuario</h2>
            <div id="pagina-inicio-botones" className="pagina-inicio-botones">
                <Link id="boton-lista-reservas" to="/lista-reservas" className="pagina-inicio-boton reservas">
                    Ver Mis Reservas
                </Link>
                <Link id="boton-listado-propiedades" to="/listado" className="pagina-inicio-boton propiedades">
                    Ver Propiedades
                </Link>
            </div>
        </div>
    );
}

export default PaginaInicioUsuario;