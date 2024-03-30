<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  <link rel="stylesheet" href="personalizar.css">

</head>
<body>

    <h1 class="personalizar"> PÁGINA PARA ACTUALIZAR EL MONIGOTE DE LA PERSONA   </h1>
    <script src="personalizar.js"></script>
    

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

</body>
</html>