document.addEventListener("DOMContentLoaded", async function() {
    function exchangeCodeForToken(code) {
        const CLIENT_ID = 'f2b1e019c9b540adbed93c8bc201e87c';
        const CLIENT_SECRET = '1e711b53f4d849fe89426534e517bece';
        const REDIRECT_URI = 'https://maialen09.github.io/proyectoPagina/personalizar.html'; // Cambiar al HTML de la segunda página
        const TOKEN_URL = 'https://accounts.spotify.com/api/token';

        const formData = new URLSearchParams();
        formData.append('grant_type', 'authorization_code');
        formData.append('code', code);
        formData.append('redirect_uri', REDIRECT_URI);
        formData.append('client_id', CLIENT_ID);
        formData.append('client_secret', CLIENT_SECRET);

        return fetch(TOKEN_URL, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => data.access_token);
    }

    function getUserInfo(token) {
        const INFO_URL = 'https://api.spotify.com/v1/me';

        return fetch(INFO_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json());
    }

    function getCurrentPlayback(token) {
        const CURRENT_PLAYBACK_URL = 'https://api.spotify.com/v1/me/player/currently-playing';

        return fetch(CURRENT_PLAYBACK_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.status === 204) {
                return null;
            }
            return response.json();
        });
    }

    function conectarConBaseDeDatos(){

        var xhr = new XMLHttpRequest();

        xhr.open('GET', 'conexion.py', true);

        xhr.onload = function(){

            if (xhr.status >= 200 && xhr.status < 300) {
                // La solicitud fue exitosa
                console.log(xhr.responseText);
            } else {
                // Error en la solicitud
                console.error('Error al conectar con la base de datos');
            }
        };

        xhr.send();
    }

    const queryParams = new URLSearchParams(window.location.search);
    const authorizationCode = queryParams.get('code');

    

    if (authorizationCode) {
        exchangeCodeForToken(authorizationCode)
            .then(token => {
                // Obtener información del usuario y de la canción utilizando el token
                Promise.all([getUserInfo(token), getCurrentPlayback(token)])
                    .then(([userInfo, currentPlayback]) => {
                        console.log('Info del usuario:', userInfo.display_name);

                                            // Realiza una solicitud POST al servidor con los datos del usuarioS              

                        if (currentPlayback) {
                            for (let i = 0; i < currentPlayback.item.artists.length; i++) {
                                console.log("El cantante es " + currentPlayback.item.artists[i].name);
                            }
                            
                            console.log('El nombre de la canción es: ', currentPlayback.item.name);
                            conectarConBaseDeDatos();
                            
                        } else {
                            
                            console.log('El usuario no está escuchando nada en este momento.');
                            
                        }
                        
                    })
                    .catch(error => console.error('Error al obtener la información:', error));
            })
            .catch(error => console.error('Error al intercambiar código por token:', error));
    }
});

