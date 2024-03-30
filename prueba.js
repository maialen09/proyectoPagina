document.addEventListener("DOMContentLoaded", function() {
    const boton = document.getElementById("botonAutorizar");

    boton.addEventListener("click", function() {
        const CLIENT_ID = 'f2b1e019c9b540adbed93c8bc201e87c';
        const REDIRECT_URI = 'https://maialen09.github.io/proyectoPagina/personalizar.php'; // Cambiar al HTML de la segunda página
        const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=user-read-private%20user-read-email%20user-read-currently-playing`;

        boton.style.display = "none"; // hacer que desaparezca el botón una vez que se haya entrado a la página

        window.location.href = AUTH_URL;
    });
});