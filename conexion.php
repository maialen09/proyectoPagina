<?php
$dsn = 'mysql:host=MariaDB;dbname=aplicacion';
$usuario = 'root';
$contraseña = 'calavera';

try {
    $conexion = new PDO($dsn, $usuario, $contraseña);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexión exitosa";
    console.log("Se ha conseguido acceder a la base de datos");
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>
