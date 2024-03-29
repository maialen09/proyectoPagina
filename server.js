const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'calavera',
    database: 'aplicacion'
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

const nuevoUsuario = {

    nombre_usuario: 'prueba',
    imagen: 'monigote.png'
};
connection.query('INSERT INTO usuarios SET ?', nuevoUsuario, (err, result) => {
    if (err) {
        console.error('Error al insertar usuario: ', err);
        return;
    }
    console.log('Nuevo usuario insertado con ID:', result.insertId);
});