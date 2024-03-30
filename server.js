

function crearconexion(){

    const mysql = require('mysql');

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'calavera',
        database: 'aplicacion'
    });

    return connection;

}

function anadirUsuario(nuevoUsuario){

    connection.query('INSERT INTO usuarios SET ?', nuevoUsuario, (err, result) => {
        if (err) {
            console.error('Error al insertar usuario: ', err);
            return;
        }
        console.log('Nuevo usuario insertado con ID:', result.insertId);
    });



}
