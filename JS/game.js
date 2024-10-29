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

let score = 0;
let time = 120;
let ghosts = [];
let ghostSpeed = 1500;
let gameInterval;
let timerInterval;
let keyItemCaptured = false;
let currentRound = 1;
const targetGhosts = 3; // Número de fantasmas a atrapar por ronda
let caughtGhosts = 0;
let finalRoundAttempts = 0;
const maxFinalRoundAttempts = 2;
let keyItems = []; // Lista de key items

// Elementos de HTML
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const newGameButton = document.getElementById("newgame");

// Iniciar o reiniciar el juego
function startGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);

    score = 0;
    time = 120;
    ghostSpeed = 1500;
    ghosts = [];
    currentRound = 1;
    caughtGhosts = 0;
    finalRoundAttempts = 0;
    keyItemCaptured = false;
    keyItems = [];

    scoreDisplay.value = score;
    timeDisplay.value = time;
    gameArea.innerHTML = "";

    gameInterval = setInterval(spawnGhost, ghostSpeed);
    startTimer();
}

// Temporizador del juego
function startTimer() {
    timerInterval = setInterval(() => {
        if (time > 0) {
            time--;
            timeDisplay.value = time;
        } else {
            endGame("¡Tiempo agotado! Has perdido.");
        }
    }, 1000);
}

// Finalizar el juego
function endGame(message) {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    ghosts.forEach(ghost => gameArea.removeChild(ghost));
    keyItems.forEach(item => gameArea.removeChild(item));
    ghosts = [];
    keyItems = [];
    alert(`${message} Puntuación final: ${score}`);
}

// Crear y mostrar un fantasma o el key item
function spawnGhost() {
    console.log('cosas veganas')
    if (currentRound === 3 && !keyItemCaptured && keyItems.length === 0) {
        spawnKeyItem(); // Aparecer key item solo en la ronda 3 si no ha sido capturado
    }else {
        console.log('hola ELSA')
    }

    // Creación de los fantasmas
    const ghost = document.createElement("div");
    ghost.classList.add("ghost");
    ghost.style.top = `${Math.random() * 90}%`;
    ghost.style.left = `${Math.random() * 90}%`;

    // Evento de captura de fantasma
    ghost.onclick = () => catchGhost(ghost);

    gameArea.appendChild(ghost);
    ghosts.push(ghost);

    // Eliminar el fantasma después de un tiempo si no es capturado
    setTimeout(() => {
        if (ghost.parentNode) {
            gameArea.removeChild(ghost);
            ghosts = ghosts.filter(g => g !== ghost);
        }
    }, ghostSpeed);

    // Ajustar velocidad y reiniciar intervalo de aparición
    ghostSpeed = Math.max(ghostSpeed - 15, 500); // Velocidad mínima de 500 ms
    clearInterval(gameInterval);

    gameInterval = setInterval(spawnGhost, ghostSpeed);
}

// Capturar el fantasma
function catchGhost(ghost) {
    if (ghost.parentNode) {
        gameArea.removeChild(ghost);
        ghosts = ghosts.filter(g => g !== ghost);
        score++;
        caughtGhosts++;
        scoreDisplay.value = score;
        checkRoundProgress();
    }
}

// Crear y mostrar el key item en la tercera ronda
function spawnKeyItem() {
    const keyItem = document.createElement("div");
    // Verifica el avatar seleccionado en sessionStorage
    const selectedAvatar = localStorage.getItem("avatarImg");

    // Cambia la imagen de fondo según el avatar seleccionado
    switch (selectedAvatar) {
        case "witch":
            keyItem.style.backgroundImage = url("../img/keyItemWitch_transformed.png");
            break;
        case "skeleton":
            keyItem.style.backgroundImage = "url('/img/keyItemSkeleton_transformed.png')";
            break;
        case "vampire":
            keyItem.style.backgroundImage = "url('/img/keyItemVampire_transformed.png')";
            break;
        case "cat":
            keyItem.style.backgroundImage = "url('/img/keyItemCat_transformed.png')";
            break;
        case "zombie":
            keyItem.style.backgroundImage = "url('/img/keyItemZombie_transformed.png')";
            break;
        case "mummy":
            keyItem.style.backgroundImage = "url('/img/keyItemMummy_transformed.png')";
            break;
        default:
            keyItem.style.backgroundImage = "url('/img/defaultKeyItem.png')";
            break;
    }
    keyItem.classList.add("key-item");
    keyItem.style.top = `${Math.random() * 90}%`;
    keyItem.style.left = `${Math.random() * 90}%`;

    // Evento de captura del key item
    keyItem.onclick = () => catchKeyItem(keyItem);

    gameArea.appendChild(keyItem);
    keyItems.push(keyItem);
}

// Capturar el key item
function catchKeyItem(keyItem) {
    if (keyItem.parentNode) {
        gameArea.removeChild(keyItem);
        keyItems = keyItems.filter(item => item !== keyItem);
        keyItemCaptured = true;
        alert("¡Has capturado el objeto clave!");
        checkRoundProgress();
    }
}

// Verificar progreso de la ronda y avanzar si se cumple el objetivo
function checkRoundProgress() {
    if (currentRound < 3 && caughtGhosts >= targetGhosts) {
        currentRound++;
        caughtGhosts = 0;
        alert(`¡Has avanzado a la ronda ${currentRound}!`);
    } else if (currentRound === 3 && caughtGhosts >= 10 && keyItemCaptured) {
        endGame("¡Felicidades, has ganado el juego!");
    } else if (currentRound === 3 && caughtGhosts >= 10 && !keyItemCaptured) {
        if (finalRoundAttempts < maxFinalRoundAttempts) {
            finalRoundAttempts++;
            alert(`Te quedan ${maxFinalRoundAttempts - finalRoundAttempts + 1} intentos para capturar el objeto clave.`);
            caughtGhosts = 0;
        } else {
            endGame("Has perdido, no lograste capturar el objeto clave.");
        }
    }
}

// Iniciar el juego al cargar la página
window.onload = startGame;
newGameButton.addEventListener("click", startGame);


