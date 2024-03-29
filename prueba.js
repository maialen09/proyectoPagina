// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona el botón por su ID
    const boton = document.getElementById("botonAutorizar");
  
    // Añade un listener para el evento 'click'
    boton.addEventListener("click", function() {
      // Tu acción aquí
      
      const CLIENT_ID = 'f2b1e019c9b540adbed93c8bc201e87c'; // Reemplaza con tu Client ID
      const REDIRECT_URI = 'https://maialen09.github.io/proyectoPagina/'; // Reemplaza con tu URL de redireccionamiento
      const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=user-read-private%20user-read-email%20user-read-currently-playing`;

      window.location.href = AUTH_URL;
    });

     // Función para obtener el código de autorización de la URL
     function getCodeFromURL() {
        const queryParams = new URLSearchParams(window.location.search);
        return queryParams.get('code');
      }
  
      // Función para intercambiar el código de autorización por un token de acceso
      async function exchangeCodeForToken(code) {
        const CLIENT_ID = 'f2b1e019c9b540adbed93c8bc201e87c'; // Reemplaza con tu Client ID
        const CLIENT_SECRET = '1e711b53f4d849fe89426534e517bece'; // Reemplaza con tu Client Secret
        const REDIRECT_URI = 'https://maialen09.github.io/proyectoPagina/'; // Reemplaza con tu URL de redireccionamiento
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
        return data.access_token; // Retorna el token de acceso
      }
  
  
        async function getCurrentPlayback(token){
  
          const  CURRENT_PLAYBACK_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
  
          const response = await fetch(CURRENT_PLAYBACK_URL, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
  
          }); 
  
          if (response.status == 204){
  
              return null;
          }
  
          const data = await response.json();
          return data; 
  
  
  
        }
  
  
      // Uso
    
      const authorizationCode = getCodeFromURL();
  if (authorizationCode) {
    exchangeCodeForToken(authorizationCode)
      .then(token => {
        getCurrentPlayback(token)
          .then(currentPlayback => {
            if (currentPlayback) {
              // console.log('Información sobre la canción actual: ', currentPlayback); --> de momento no necesitamos más info de la canción que está escuchando el usuario en este momento 
  
              for (let i = 0; i < currentPlayback.item.artists.length; i++){
  
                  console.log("El cantante es " +  currentPlayback.item.artists[i].name);
  
              }
              console.log('El nombre de la cancion es: ' , currentPlayback.item.name);
              // Aquí puedes realizar acciones adicionales con la información sobre la pista actual, como mostrarla en tu aplicación
            } else {
              console.log('El usuario no está escuchando nada en este momento.');
            }
          })
          .catch(error => console.error('Error al obtener la información sobre la pista actual:', error));
      })
      .catch(error => console.error('Error al intercambiar código por token:', error));
  }
  });
  
