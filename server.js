const express = require('express');
const mysql = require('mysql');

const app = express();

// Configurar conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'calavera',
    database: 'aplicacion'
});

// Endpoint de API para añadir usuario
app.post('/api/usuario', (req, res) => {
    const nuevoUsuario = req.body;

    connection.query('INSERT INTO usuarios SET ?', nuevoUsuario, (err, result) => {
        if (err) {
            console.error('Error al insertar usuario: ', err);
            res.status(500).send('Error al insertar usuario en la base de datos.');
            return;
        }
        console.log('Nuevo usuario insertado con ID:', result.insertId);
        res.status(200).send('Usuario añadido correctamente.');
    });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
