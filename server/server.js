const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let propiedades = [
    { id: 1, nombre: 'Casa de Playa en Punta Uva', descripcion: 'A 200mts de la playa', precioNoche: 120, foto: null },
    { id: 2, nombre: 'Bungalow Escape La Fortuna', descripcion: 'Incluye pase a aguas termales', precioNoche: 90, foto: null },
    { id: 3, nombre: 'Apartamento en Tamarindo', descripcion: 'Cerca de la vida nocturna', precioNoche: 150, foto: null }
];

app.get('/api/propiedades', (req, res) => {
    const propiedadesConTarifaDinamica = propiedades.map(propiedad => {
        const factor = 0.8 + Math.random() * 0.4;
        const precioDinamico = propiedad.precioNoche * factor;
        return { ...propiedad, precioNoche: parseFloat(precioDinamico.toFixed(2)) };
    });
    res.json(propiedadesConTarifaDinamica);
});

app.post('/api/propiedades', (req, res) => {
    console.log('Cuerpo de la petición POST:', req.body);
    const nuevaPropiedad = {
        id: propiedades.length + 1,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precioNoche: parseFloat(req.body.precio),
        foto: req.body.foto ? 'archivo_subido_simulado' : null
    };
    propiedades.push(nuevaPropiedad);
    res.json({ mensaje: 'Propiedad agregada con éxito', propiedad: nuevaPropiedad });
});

app.delete('/api/propiedades/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id);
    propiedades = propiedades.filter(propiedad => propiedad.id !== idToDelete);
    res.json({ mensaje: `Propiedad con ID ${idToDelete} eliminada con éxito` });
});

app.listen(port, () => {
    console.log(`Servidor simulado escuchando en el puerto ${port}`);
});