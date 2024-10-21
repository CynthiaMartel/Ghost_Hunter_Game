//JS para JUEGO en sí

//Capturamos Datos Usuario
getUserData();
//Comprobamos los datos
if(!checkUserData()) location="index.html"; //Si no se comprueban los datos de usuario, 
                                        //se redirige a la página principal para evitar que pueda acceder al juego desde el navegador sin haber comprobado el formulario
console.log(checkUserData());


//Capturamos Daatos Usuario
getUserData();
//Comprobamos datos y Rellenamos formulario
function filloutform() {
    let avatarElement = document.getElementById("avatarImg");
    let avatarImg = sessionStorage.getItem('avatarImg'); // Verificamos si está almacenado

    // Verificamos si el avatarImg es nulo y establecemos un valor por defecto si es necesario
    if (!avatarImg) {
        avatarImg = "./img/default-avatar.png"; // Si no se seleccionó uno, usar un avatar por defecto
    }

    // Verificamos si el elemento del avatar existe y asignamos la imagen
    if (avatarElement) {
        avatarElement.src = avatarImg;
        console.log("Imagen del avatar asignada:", avatarImg);
    } else {
        console.error("No se pudo asignar la imagen del avatar porque el elemento 'avatarImg' no existe.");
    }

    // Cargar el nick si está disponible
    let nick = sessionStorage.getItem('nick');
    let nickElement = document.getElementById("nick");

    if (nickElement && nick) {
        nickElement.value = nick;
    }
}

filloutform();
setTimeout(filloutform, 100);  // Da un pequeño margen de tiempo
