import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserPages = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/listado');
    }, [navigate]);

    return (
        <div className="user-page-container">
            <h1 className="user-page-title">Redirigiendo al Listado...</h1>
            <p>Serás redirigido a la página de propiedades disponibles.</p>
        </div>
    );
};

export default UserPages;