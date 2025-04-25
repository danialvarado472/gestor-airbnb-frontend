const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let propiedades = [
    { id: 1, nombre: 'Casa de Playa en Punta Uva', descripcion: 'A 200mts de la playa', precioNoche: 120, foto: null },
    { id: 2, nombre: 'Bungalow Escape La Fortuna', descripcion: 'Incluye pase a aguas termales', precioNoche: 90, foto: null },
];

let reservas = [];
let nextReservaId = 1;


const usuarios = [];
let nextUserId = 1;
const saltRounds = 10;

app.get('/api/propiedades', (req, res) => {
    const propiedadesConTarifaDinamica = propiedades.map(propiedad => {
        const factor = 0.8 + Math.random() * 0.4;
        const precioDinamico = propiedad.precioNoche * factor;
        return { ...propiedad, precioNoche: parseFloat(precioDinamico.toFixed(2)) };
    });
    res.json(propiedadesConTarifaDinamica);
});

app.post('/api/propiedades', (req, res) => {
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

app.post('/api/reservas', (req, res) => {
    const nuevaReserva = {
        id: nextReservaId++,
        ...req.body
    };
    reservas.push(nuevaReserva);
    console.log('Nueva reserva guardada:', nuevaReserva);
    res.status(201).json({ mensaje: 'Reserva realizada con éxito', reserva: nuevaReserva });
});

app.get('/api/reservas', (req, res) => {
    res.json(reservas);
});

// Ruta para eliminar una reserva por su ID
app.delete('/api/reservas/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id);
    const initialLength = reservas.length;
    reservas = reservas.filter(reserva => reserva.id !== idToDelete);
    if (reservas.length < initialLength) {
        res.json({ mensaje: `Reserva con ID ${idToDelete} eliminada con éxito` });
    } else {
        res.status(404).json({ mensaje: `No se encontró ninguna reserva con el ID ${idToDelete}` });
    }
});

app.get('/admin/reservas', (req, res) => {
    res.json(reservas);
});

// Rutas de autenticación
app.post('/api/auth/register', async (req, res) => {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
        return res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
    }

    const usuarioExistente = usuarios.find(u => u.usuario === usuario);
    if (usuarioExistente) {
        return res.status(409).json({ message: 'El usuario ya existe.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
        const nuevoUsuario = {
            id: nextUserId++,
            usuario,
            contrasena: hashedPassword,
            rol: usuario === 'admin' ? 'admin' : 'usuario' // Simulación de roles
        };
        usuarios.push(nuevoUsuario);
        console.log('Usuario registrado:', nuevoUsuario);
        res.status(201).json({ message: 'Usuario registrado con éxito.' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar el usuario.' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
        return res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
    }

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario);
    if (!usuarioEncontrado) {
        return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    try {
        const match = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);
        if (match) {
            res.json({ message: 'Inicio de sesión exitoso.', rol: usuarioEncontrado.rol });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas.' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor simulado escuchando en el puerto ${port}`);
});