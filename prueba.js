document.addEventListener("DOMContentLoaded", function() {
    const boton = document.getElementById("botonAutorizar");

    boton.addEventListener("click", function() {
        const CLIENT_ID = 'f2b1e019c9b540adbed93c8bc201e87c';
        const REDIRECT_URI = 'https://maialen09.github.io/proyectoPagina/';
        const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=user-read-private%20user-read-email%20user-read-currently-playing`;

        boton.style.display = "none"; // hacer que desaparezca el boton una vez que se haya entrado a la página

        // Guardar el código de autorización en el almacenamiento local antes de la redirección
        localStorage.setItem('authorizationCode', '');

        window.location.href = AUTH_URL;
    });

    function getCodeFromURL() {
        const queryParams = new URLSearchParams(window.location.search);
        return queryParams.get('code');
    }

    async function exchangeCodeForToken(code) {
        const CLIENT_ID = 'f2b1e019c9b540adbed93c8bc201e87c';
        const CLIENT_SECRET = '1e711b53f4d849fe89426534e517bece';
        const REDIRECT_URI = 'https://maialen09.github.io/proyectoPagina/';
        const TOKEN_URL = 'https://accounts.spotify.com/api/token';

        const formData = new URLSearchParams();
        formData.append('grant_type', 'authorization_code');
        formData.append('code', code);
        formData.append('redirect_uri', REDIRECT_URI);
        formData.append('client_id', CLIENT_ID);
        formData.append('client_secret', CLIENT_SECRET);

        const response = await fetch(TOKEN_URL, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        return data.access_token;
        console.log("La info que se recibe de aqui es: ", data);
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

    // Uso
    const authorizationCode = getCodeFromURL();

    // Verificar si hay un código de autorización en el almacenamiento local
    const storedAuthorizationCode = localStorage.getItem('authorizationCode');

    if (authorizationCode && !storedAuthorizationCode) {
        // Guardar el código de autorización en el almacenamiento local si es la primera vez que se obtiene
        localStorage.setItem('authorizationCode', authorizationCode);

        exchangeCodeForToken(authorizationCode)
            .then(token => {
                getCurrentPlayback(token)
                    .then(currentPlayback => {
                        if (currentPlayback) {
                            for (let i = 0; i < currentPlayback.item.artists.length; i++) {
                                console.log("El cantante es " + currentPlayback.item.artists[i].name);
                            }
                            console.log('El nombre de la canción es: ', currentPlayback.item.name);
                        } else {
                            console.log('El usuario no está escuchando nada en este momento.');
                        }
                    })
                    .catch(error => console.error('Error al obtener la información sobre la pista actual:', error));
            })
            .catch(error => console.error('Error al intercambiar código por token:', error));
    } else if (storedAuthorizationCode) {
        // Utilizar el código de autorización almacenado para obtener el token de acceso
        exchangeCodeForToken(storedAuthorizationCode)
            .then(token => {
                getCurrentPlayback(token)
                    .then(currentPlayback => {
                        if (currentPlayback) {
                            for (let i = 0; i < currentPlayback.item.artists.length; i++) {
                                console.log("El cantante es " + currentPlayback.item.artists[i].name);
                            }
                            console.log('El nombre de la canción es: ', currentPlayback.item.name);
                        } else {
                            console.log('El usuario no está escuchando nada en este momento.');
                        }
                    })
                    .catch(error => console.error('Error al obtener la información sobre la pista actual:', error));
            })
            .catch(error => console.error('Error al intercambiar código por token:', error));
    }
});
