/*
*JS para la COMPROBACIÓN de daatos de formulario de entrada*/

/*Ininicialiazción de var, objetos, Dom*/

var nickInput;

var emailInput;
var formInput;
var error;
var avatarItems;
var itemImg;
var AvatarSelected;



//Funciones de evento
/**Comprueba los datos correctos del formulario de entrada 
 * @param {eventObject} event Evento que salta al realizar el formulario
 */

//Comprobar cambios
function checkForm(event) {
    // Comprobar si el campo del "nick" es correcto
    if (nickInput.value.match(/^\s*\d/)) {
        console.log("No hay nick válido"); // Si el "nick" empieza con un número o está vacío, muestra un mensaje de error
        event.preventDefault();  // Esto detiene el envío del formulario
        nickInput.focus(); // El cursor se coloca en el campo de "nick"
        error.innerText = "El campo de nick no puede empezar por un número ni estar vacío";
        return false;// Se detiene aquí y no sigue si hay error
    }

    //INFO CORRECTA
    // Si todo está bien, continúa y se guardan los datos
    UserData(nickInput, emailInput, AvatarSelected); // Aquí se guarda la información
    UserHistoric(nickInput); // Esto guarda el "nick" para un historial
    return true;  // Todo salió bien, el formulario puede enviarse
}

function movingImg(event) {
    itemImg = event.target; // `event.target` es la imagen que se está arrastrando
    console.log(itemImg.src); // Muestra en la consola la dirección de la imagen
}


function changingImg(event) {
    AvatarSelected.src = itemImg.src;  // Cambia la imagen principal a la imagen que arrastraste en la página de entrada
    const selectedAvatarType = itemImg.getAttribute("data-avatar");  // Captura el tipo de avatar usando data-avatar
    console.log("Nuevo avatar seleccionado:", selectedAvatarType);

    sessionStorage.setItem("avatarType", selectedAvatarType);  // Guarda el tipo de avatar seleccionado en sessionStorage
}


// Mostrar mensaje inicial al pulsar "JUGAR"
function showMessage(event) {
    event.preventDefault(); // Detener el envío del formulario

    const modal = document.getElementById("messageModal");
    const modalMessage = document.getElementById("modalMessage");
    modalMessage.textContent = "¡Prepárate para cazar fantasmas! Tendrás 3 rondas que superar. Según el avatar seleccionado, deberás atrapar tu objeto mágico en la ronda final. ¡Vamos!";
    modal.style.display = "block"; // Mostrar el modal
}

// Continuar al juego
function continueGame() {
    const modal = document.getElementById("messageModal");
    modal.style.display = "none"; // Ocultar el modal

    // Validar los datos del formulario antes de redirigir
    if (checkForm(event)) {
        // Si los datos son correctos, redirigir
        window.location.href = "game.html";
    }
}

// Validación del formulario
function checkForm(event) {
    // Prevenir el envío por defecto
    event.preventDefault();

    // Comprobar si el campo de "nick" está vacío o empieza con un número
    if (!nickInput.value || nickInput.value.match(/^\s*\d/)) {
        error.innerText = "El campo de nick no puede estar vacío ni empezar por un número";
        nickInput.focus(); // Coloca el cursor en el campo de "nick"
        return false; // Detener el proceso
    }

    // Comprobar si hay un avatar seleccionado
    if (!AvatarSelected || AvatarSelected.src.includes("default-avatar.png")) {
        error.innerText = "Debes seleccionar un avatar antes de jugar.";
        return false; // Detener el proceso
    }

    // Si todo está correcto, guarda los datos y permite continuar
    UserData(nickInput, emailInput, AvatarSelected);
    UserHistoric(nickInput);
    return true;
}


// Cargar eventos en el DOM
function domLoaded() {
    console.log("DOM cargado correctamente");

    // Capturar elementos del formulario
    nickInput = document.getElementById("nick");
    emailInput = document.getElementById("email");
    formInput = document.getElementById("enterform");
    error = document.getElementById("error");

    // Evento para el botón "JUGAR"
    const startGameButton = document.getElementById("jugar");
    startGameButton.addEventListener("click", showMessage);

    // Evento para el botón "Continuar"
    const continueButton = document.getElementById("continueButton");
    continueButton.addEventListener("click", continueGame);
}

// Ejecutar cuando se cargue el DOM
window.addEventListener("DOMContentLoaded", domLoaded);
//addEventListener sirve para que el programa espere hasta que el usuario complete 
//el formulario con las funciones de arriba y después ejerza el evento "submit" 



//Eventos del DragandDrop
avatarItems = document.getElementsByClassName("avatarImgItem"); // Obtiene todas las imágenes de los avatares

// Por cada avatar, añade el evento de arrastrar
for (let item of avatarItems) {
    item.addEventListener("dragstart", movingImg); // Cuando empiezas a arrastrar una imagen, se ejecuta `movingImg`
}
AvatarSelected = document.getElementById("avatarImg"); // Obtiene la imagen del avatar principal
AvatarSelected.addEventListener("dragover", e => { e.preventDefault(); }); // Permite que el avatar principal acepte la imagen arrastrada
AvatarSelected.addEventListener("drop", changingImg); // Cambia la imagen cuando sueltas la nueva imagen sobre el avatar principal


// Ejecutar cuando se cargue el DOM
window.addEventListener("DOMContentLoaded", domLoaded); //DOMContentLoaded le dice a JavaScript: "Espera hasta que toda la estructura de la página esté lista. Después, ya puedes hacer cosas con los elementos del DOM".
// domLoaded se asegura de que todas las operaciones que involucran la
//...manipulación de elementos del DOM,no se ejecuten hasta que todo el DOM esté disponible.