function obtenerValorVariable(nombreVariable) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombreVariable);
}

// Obtener el valor de la variable desde la URL
var variableRecibida = obtenerValorVariable("variable");

// Mostrar la variable en la consola para verificar
console.log("Variable recibida:", variableRecibida);

// Puedes usar la variable recibida como desees aquí
// Por ejemplo, mostrarla en el cuerpo del HTML
var elementoHTML = document.createElement("p");
elementoHTML.textContent = "Variable recibida: " + variableRecibida;
document.body.appendChild(elementoHTML);