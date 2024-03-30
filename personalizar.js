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



var variableRecibida = obtenerValorVariable("variable");


var accessToken = decodeURIComponent(variableRecibida);

console.log("Token recibido:", accessToken);



