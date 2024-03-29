function obtenerValorVariable(nombreVariable) {
    // Obtener la cadena de consulta de la URL
    var queryString = window.location.search;
    
    // Eliminar el '?' del principio de la cadena de consulta
    queryString = queryString.substring(1);
    
    // Dividir la cadena de consulta en pares de clave-valor
    var urlParams = new URLSearchParams(queryString);
    
    // Obtener el valor de la variable por su nombre
    return urlParams.get(nombreVariable);
}

// Obtener el valor de la variable desde la URL
var variableRecibida = obtenerValorVariable("variable");

// Decodificar el valor recibido (el token)
var accessToken = decodeURIComponent(variableRecibida);

// Mostrar el token en la consola para verificar
console.log("Token recibido:", accessToken);

// Puedes usar el token recibido como desees aquí
// Por ejemplo, realizar acciones relacionadas con el token
