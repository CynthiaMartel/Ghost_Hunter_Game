/*
*JS para la GESTIÓN guardado de datos de usuario y mensaje de error si no se completan ciertos campos del formulario*/
//@autora Cynthia Martel <cynthiamartelmartin@gmail.com>
// @link https://github.com/CynthiaMartel/Javascript_curso.git


//sessionStorage para guardar el nick
var nick; //variable global var es funcional. Una variable declarada con var está disponible en toda la función en la que se define. Si se define fuera de una función, se convierte en una variable global.
var size;
var email;
var avatarImg;
/** 
* Almacenar datos en la sessionStorage
* @param {HTMLElement} nick nick usuario
* @param {HTMLElement} size tamaño del papel
* @param {HTMLElement} email email usuario
*/

// Guardamos datos del usuario en memoria temporal del navegador
function UserData(nick,size,email,AvatarSelected){ 
    sessionStorage.setItem("nick", nick.value); //Aquí estamos GUARDANDO el valor del campo nick (que se obtiene como nick.value) en el sessionStorage, bajo la clave "nick".
    sessionStorage.setItem("size", size.value); //setItem toma un valor y una clave y guarda esta informacion en el navegador
    sessionStorage.setItem("email", email.value);
    sessionStorage.setItem("avatarImg", AvatarSelected.src);
    return true;
}
//Aquí estamos "consiguiendo" con getItem el nick, es decir, para mostrarlo por console.log
function getUserData(){
    nick= sessionStorage.getItem("nick");
    console.log(nick);
    size = sessionStorage.getItem("size");
    email = sessionStorage.getItem("email");
    avatarImg = sessionStorage.getItem("avatarImg");

}
//Probamos el formulario y si este es nulo, es decir, que no se ha completado, entramos en el if y mostrarmos el error
function checkUserData() {
    if (sessionStorage.getItem("nick") == null) {
        localStorage.setItem("error", "No se ha rellenado correctamente el formulario");//Guardamos el error en localStorage porque así al redirigirse y recargarse la página, no perdemos ese mensaje de error
        location = "index.html" //reedireccionamos si los datos de usuario están mal
        return false;
    }
    return true;
}

//LocalStorage **let es bloque, es decir, solo es accesible dentro del bloque {},por ejemplo, enun if o un for
function UserHistoric(nick){
    let historicStorage=localStorage.getItem("historic") //La variable historicStorage guarda el valor que se encuentra almacenado en el local storage bajo la clave "historic"
    let historic;
    if(historicStorage==null){ //Si nunca se ha registrado nadie, y por tanto, historicStorage está vacío(==null)..
        historic=[];   //...entrará en este if y empezará a guardar el nick en una lista
    }
    else{ //JSON (JavaScript Object Notation) es un formato de texto usado para almacenar y transportar datos y se puede usar en otros lenguajes de no JS.
        //
        historic=JSON.parse(historicStorage); //Si ya hay historicStorage(!=null), entra aquí
    }                             //.parse guarda los nicks que es una cadena de texto,como objeto en JS y convertimos los nicks en una lista
    let UserRegistration={  //Objeto para almacenar el valor de nick como user, y el valor de la fecha con date
        user:nick.value,  
        date:Date.now()
    }
    historic.push(UserRegistration) //push() añade el nuevo objeto UserRegistration al final de la lista historic.
    localStorage.setItem("historic", JSON.stringify(historic)) //Historial actualizado se convierte a una cadena de texto usando JSON.stringify() y se guarda en el local storage bajo la clave "historic"
}   //JSON.stringify(): Convierte un objeto de JavaScript (o un array) en una cadena de texto en formato JSON. Esto es necesario porque el local storage solo puede guardar datos en forma de text