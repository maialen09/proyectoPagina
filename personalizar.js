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

async function getUserInfo(token){

    const INFO_URL = 'https://api.spotify.com/v1/me';

    const response = await fetch (INFO_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data.display_name;
}

async function getCurrentPlayback(token) {
    const CURRENT_PLAYBACK_URL = 'https://api.spotify.com/v1/me/player/currently-playing';

    const response = await fetch(CURRENT_PLAYBACK_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status == 204) {
        return null;
    }

    const data = await response.json();
    return data;
}

var variableRecibida = obtenerValorVariable("variable");


var accessToken = decodeURIComponent(variableRecibida);

console.log("Token recibido:", accessToken);

var nombre = getUserInfo(accessToken);

console.log("El nombre del usuario es : ", nombre);

var currentPlayback = currentPlayback(accessToken);

if (currentPlayback) {
    for (let i = 0; i < currentPlayback.item.artists.length; i++) {
        console.log("El cantante es " + currentPlayback.item.artists[i].name);
    }
    
    console.log('El nombre de la canción es: ', currentPlayback.item.name);
    
} else {
    
    console.log('El usuario no está escuchando nada en este momento.');
    
}



