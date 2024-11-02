/*
*JS para la COMPROBACIÓN de daatos de formulario de entrada*/

/*Ininicialiazción de var, objetos, Dom*/

var nickInput;
var sizeInput;
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
function checkForm(event){
    // Comprobar si el campo del "nick" es correcto
    if(nickInput.value.match(/^\s*\d/)) {
        console.log("No hay nick válido"); // Si el "nick" empieza con un número o está vacío, muestra un mensaje de error
        event.preventDefault();  // Esto detiene el envío del formulario
        nickInput.focus(); // El cursor se coloca en el campo de "nick"
        error.innerText = "El campo de nick no puede empezar por un número ni estar vacío";
        return false;// Se detiene aquí y no sigue si hay error
    } 
    // Comprobar si se ha seleccionado un tamaño de juego
    else if(sizeInput.value == "0"){
        console.log("No se ha seleccionado tamaño");
        sizeInput.focus();
        event.preventDefault(); 
        error.innerText = "Se debe seleccionar un tamaño de panel";
        return false;
    }

    //INFO CORRECTA
    // Si todo está bien, continúa y se guardan los datos
    UserData(nickInput, sizeInput, emailInput, AvatarSelected); // Aquí se guarda la información
    UserHistoric(nickInput); // Esto guarda el "nick" para un historial
    return true;  // Todo salió bien, el formulario puede enviarse
}
    
function movingImg(event){
    itemImg = event.target; // `event.target` es la imagen que se está arrastrando
    console.log(itemImg.src); // Muestra en la consola la dirección de la imagen
}

/*function changingImg(event){
    AvatarSelected.src = itemImg.src; // Cambia la imagen principal a la imagen que arrastraste en la página de entrada
    console.log("Nueva imagen seleccionada:", AvatarSelected.src);
    sessionStorage.setItem("avatarImg", AvatarSelected.src);
    
}*/
function changingImg(event) {
    AvatarSelected.src = itemImg.src;  // Cambia la imagen principal a la imagen que arrastraste en la página de entrada
    const selectedAvatarType = itemImg.getAttribute("data-avatar");  // Captura el tipo de avatar usando data-avatar
    console.log("Nuevo avatar seleccionado:", selectedAvatarType);

    sessionStorage.setItem("avatarType", selectedAvatarType);  // Guarda el tipo de avatar seleccionado en sessionStorage
}



//*Carga de objetos del DOM, comprobaciones y eventos del formulario*//
function domLoaded(){
    console.log("DOM cargado correctamente");
    nickInput = document.getElementById("nick"); // Captura el campo "nick"
    sizeInput = document.getElementById("size"); // Captura el campo "tamaño"
    emailInput = document.getElementById("email"); // Captura el campo "email"
    formInput = document.getElementById("enterform"); // Captura el formulario
    error = document.getElementById("error"); // Captura el elemento de error

    // Comprobar si hay algún error guardado de antes
    if (localStorage.getItem("error") != null) { // Revisa si hay un mensaje de error en el almacenamiento local
        error.innerText = localStorage.getItem("error"); // Muestra el error guardado
        // Borrar el mensaje de error después de un tiempo
        setTimeout(() => {
            localStorage.removeItem("error");
        }, 3000); // Borrar el mensaje después de 3000 milisegundos
    }
    //Inicio de carga de eventos
    // Aseguramos de que el formulario esté registrado después de cargar el DOM
    formInput.addEventListener("submit", checkForm);   
}    //addEventListener sirve para que el programa espere hasta que el usuario complete 
     //el formulario con las funciones de arriba y después ejerza el evento "submit" 



    //Eventos del DragandDrop
    avatarItems = document.getElementsByClassName("avatarImgItem"); // Obtiene todas las imágenes de los avatares

    // Por cada avatar, añade el evento de arrastrar
    for(let item of avatarItems){
        item.addEventListener("dragstart", movingImg); // Cuando empiezas a arrastrar una imagen, se ejecuta `movingImg`
    }
    AvatarSelected = document.getElementById("avatarImg"); // Obtiene la imagen del avatar principal
    AvatarSelected.addEventListener("dragover", e => { e.preventDefault(); }); // Permite que el avatar principal acepte la imagen arrastrada
    AvatarSelected.addEventListener("drop", changingImg); // Cambia la imagen cuando sueltas la nueva imagen sobre el avatar principal


// Ejecutar cuando se cargue el DOM
window.addEventListener("DOMContentLoaded", domLoaded); //DOMContentLoaded le dice a JavaScript: "Espera hasta que toda la estructura de la página esté lista. Después, ya puedes hacer cosas con los elementos del DOM".
// domLoaded se asegura de que todas las operaciones que involucran la 
//...manipulación de elementos del DOM,no se ejecuten hasta que todo el DOM esté disponible.