/*
*JS para la COMPROBACIÓN de daatos de formulario de entrada*/

/*Ininicialiazción de var, objetos, Dom*/
/*
*JS para la COMPROBACIÓN de datos de formulario de entrada
*/

/* Inicialización de variables, objetos, DOM */
var nickInput;
var emailInput;
var formInput;
var error;
var avatarItems;
var itemImg;
var AvatarSelected;

/* Funciones de evento */

/** Comprueba los datos correctos del formulario de entrada
 * @param {eventObject} event Evento que se activa al enviar el formulario
 */
function checkForm(event) {
    // Comprobar si el campo del "nick" es correcto
    if (nickInput.value.match(/^\s*\d/)) {
        console.log("No hay nick válido"); // Si el "nick" empieza con un número o está vacío, muestra un mensaje de error
        event.preventDefault();  // Detenemos el envío del formulario
        nickInput.focus(); // El cursor se coloca en el campo de "nick"
        error.innerText = "El campo de nick no puede empezar por un número ni estar vacío";
        return false; // Se detiene aquí y no sigue si hay error
    }

    // INFO CORRECTA
    // Si todo está bien, continuamos y guardamos los datos
    UserData(nickInput, emailInput, AvatarSelected); // Guardamos la información del usuario
    UserHistoric(nickInput); // Guardamos el "nick" en el historial
    return true; // Todo está correcto, el formulario se puede enviar
}

/* Función para manejar el evento de arrastre */
function movingImg(event) {
    itemImg = event.target; // `event.target` es la imagen que se está arrastrando
    console.log(itemImg.src); // Muestra la fuente de la imagen arrastrada en la consola
}

/* Función para cambiar la imagen del avatar */
function changingImg(event) {
    AvatarSelected.src = itemImg.src;  // Cambia la imagen principal por la imagen que se ha arrastrado
    const selectedAvatarType = itemImg.getAttribute("data-avatar");  // Captura el tipo de avatar usando "data-avatar"
    console.log("Nuevo avatar seleccionado:", selectedAvatarType);

    sessionStorage.setItem("avatarType", selectedAvatarType);  // Guarda el tipo de avatar seleccionado en sessionStorage
}

/* Función para mostrar el mensaje en el modal */
function showMessage(message) {
    const modal = document.getElementById("messageModal");
    const modalMessage = document.getElementById("modalMessage");
    modalMessage.textContent = message; // Cambia el texto del mensaje
    modal.style.display = "block"; // Muestra el modal
}

/* Función para continuar y redirigir a la página del juego */
function continueGame() {
    const modal = document.getElementById("messageModal");
    modal.style.display = "none"; // Oculta el modal
    window.location.href = "game.html"; // Redirige a la página del juego
}

// Asignamos el evento al botón de continuar en el modal
document.getElementById("continueButton").onclick = continueGame;

/* Función para comprobar si los datos del formulario son correctos */
function checkForm(event) {
    // Comprobar si el campo del "nick" es correcto
    if (nickInput.value.match(/^\s*\d/)) {
        console.log("No hay nick válido"); // Si el "nick" empieza con un número o está vacío, muestra un mensaje de error
        event.preventDefault();  // Detenemos el envío del formulario
        nickInput.focus(); // El cursor se coloca en el campo de "nick"
        error.innerText = "El campo de nick no puede empezar por un número ni estar vacío";
        return false; // Se detiene aquí y no sigue si hay error
    }

    // Si la validación es correcta, mostramos el mensaje modal y no redirigimos aún
    showMessage("¡Prepárate para cazar fantasmas! Tendrás 3 rondas que superar. Según el avatar seleccionado, tendrás que atrapar tu objeto mágico en la ronda final. ¡Vamos!");
    event.preventDefault(); // Evitamos que el formulario se envíe de inmediato
    return false; // No permitimos el envío hasta que el usuario haga clic en "Continuar"
}

/* Función que se ejecuta cuando el DOM está completamente cargado */
function domLoaded() {
    console.log("DOM cargado correctamente");
    nickInput = document.getElementById("nick"); // Captura el campo "nick"
    emailInput = document.getElementById("email"); // Captura el campo "email"
    formInput = document.getElementById("enterform"); // Captura el formulario
    error = document.getElementById("error"); // Captura el elemento de error

    // Asignar la función checkForm al evento de envío del formulario
    formInput.addEventListener("submit", checkForm);
}

/* Esperar a que el DOM esté completamente cargado */
window.addEventListener("DOMContentLoaded", domLoaded);

// Asignamos el evento al botón de "Jugar"
document.getElementById("jugar").addEventListener("click", function() {
    showMessage("¡Prepárate para cazar fantasmas! Tendrás 3 rondas que superar. Según el avatar seleccionado, tendrás que atrapar tu objeto mágico en la ronda final. ¡Vamos!");
});

/* Eventos del Drag and Drop */
avatarItems = document.getElementsByClassName("avatarImgItem"); // Obtiene todas las imágenes de los avatares

// Por cada avatar, añade el evento de arrastrar
for (let item of avatarItems) {
    item.addEventListener("dragstart", movingImg); // Cuando empiezas a arrastrar una imagen, se ejecuta `movingImg`
}

// Establece el área del avatar seleccionado
AvatarSelected = document.getElementById("avatarImg"); // Obtiene la imagen del avatar principal
AvatarSelected.addEventListener("dragover", e => { e.preventDefault(); }); // Permite que el avatar principal acepte la imagen arrastrada
AvatarSelected.addEventListener("drop", changingImg); // Cambia la imagen cuando sueltas la nueva imagen sobre el avatar principal

// Ejecutar cuando se cargue el DOM
window.addEventListener("DOMContentLoaded", domLoaded); // Espera hasta que todo el DOM esté disponible
