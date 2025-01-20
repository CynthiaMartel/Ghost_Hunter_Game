//JS para JUEGO en sí

// Capturamos Datos Usuario
function getUserData() {
    return sessionStorage.getItem('nick') && sessionStorage.getItem('avatar');
}

// Llamamos a captura de datos Usuario
getUserData();
// Comprobamos datos y Rellenamos formulario
function filloutform() {

    const avatarElement = document.getElementById("avatarImg");

    let avatarImg = sessionStorage.getItem('avatar'); // Verificamos si está almacenado

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

let score = 1;
let round = 0;
let time = 120;
let ghosts = [];
let ghostSpeed = 1500;
let gameInterval;
let timerInterval;
let keyItemCaptured = false;
let keyItemScore = 0;
let currentRound = 1;
const targetGhosts = 3; // Número de fantasmas a atrapar por ronda
let caughtGhosts = 0; // Número de fantasmas atrapados por ronda que usamos en comparativa al targetGhosts
let finalRoundAttempts = 0;
const maxFinalRoundAttempts = 2;
let keyItems = []; // Lista de key items

// Elementos de HTML
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const currentRoundDisplay = document.getElementById("currentRound");
const timeDisplay = document.getElementById("time");
const keyItemScoreDisplay = document.getElementById("keyItemScore");
const newGameButton = document.getElementById("newgame");

// Iniciar o reiniciar el juego
function startGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);

    score = 0;
    keyItemScore = 0;
    time = 120;
    ghostSpeed = 1500;
    ghosts = [];
    currentRound = 1;

    finalRoundAttempts = 0;
    keyItemCaptured = false;
    keyyItemSpeed = 1500;
    keyItems = [];
    keyItemScore = 0;

    timeDisplay.value = time;
    scoreDisplay.value = score;
    currentRoundDisplay.value = currentRound;
    keyItemScoreDisplay.value = keyItemScore;
    gameArea.innerHTML = "";

    gameInterval = setInterval(spawnGhost, ghostSpeed, spawnKeyItem, keyyItemSpeed);

    startTimer();
}

// Temporizador del juego
function startTimer() {
    timerInterval = setInterval(() => {
        if (time > 0) {
            time--;
            timeDisplay.value = time;
        } else {
            endGame();
            console.log("Entra en finalizar juego");
        }
    }, 1000);
}

// Finalizar el juego
// Mostrar el mensaje de fin de juego en un modal
function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    ghosts.forEach(ghost => gameArea.removeChild(ghost));
    keyItems.forEach(keyItem => gameArea.removeChild(keyItem));
    ghosts = [];
    keyItems = [];

    // Mostrar el modal de fin de juego
    const endGameModal = document.getElementById("endGameModal");
    const endGameMessage = document.getElementById("endGameMessage");
    const finalScore = document.getElementById("score");

    // Asignar el mensaje y la puntuación final
    endGameMessage.textContent = message;
    finalScore.textContent = `Puntuación Final: ${score}`;

    // Mostrar el modal
    endGameModal.style.display = "block";

    // Función para cerrar el modal
    const closeModal = document.getElementById("closeEndGameModal");
    closeModal.onclick = function () {
        endGameModal.style.display = "none";
    }

    // Función para reiniciar el juego
    const restartButton = document.getElementById("restartButton");
    restartButton.onclick = function () {
        endGameModal.style.display = "none";
        startGame(); // Reinicia el juego
    }

    // Cerrar el modal si el usuario hace clic fuera de él
    window.onclick = function (event) {
        if (event.target === endGameModal) {
            endGameModal.style.display = "none";
        }
    }
}

// Crear y mostrar un fantasma o el key item
function spawnGhost() {
    console.log("Entra en crear fantasma..."); // Verifica si entra en la función
    if (currentRound === 3 && !keyItemCaptured && keyItems.length === 0) {
        console.log('Entra en crear el KeyItem')
        spawnKeyItem(); // Aparecer key item solo en la ronda 3 si no ha sido capturado
    } else {
        console.log('No entra en crear el KeyItem ')
    }

    // Creación de los fantasmas
    const ghost = document.createElement("div");
    ghost.classList.add("ghost");
    ghost.style.top = `${Math.random() * 90}%`;
    ghost.style.left = `${Math.random() * 90}%`;
    console.log("Fantasma creado en", ghost.style.top, ghost.style.left);

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

// Verifica el avatar seleccionado en sessionStorage
const selectedAvatar = sessionStorage.getItem("avatarType") || "default";

// Cambia la imagen de fondo según el avatar seleccionado
function spawnKeyItem() {
    console.log("Entra en spawnKeyItem");
    // Recuperamos el tipo de avatar seleccionado desde sessionStorage
    const selectedAvatar = sessionStorage.getItem("avatarType");

    // Verificamos si selectedAvatar tiene algún valor almacenado
    if (selectedAvatar) {
        // Creamos y asignamos el `keyItem` según el avatar seleccionado
        const keyItem = document.createElement("div");
        document.body.appendChild(keyItem); // Agrega el keyItem al DOM
        keyItem.classList.add("keyItem");

        // Asignamos la imagen de `keyItem` en función del avatar seleccionado
        function setKeyItemImage(selectedAvatar) {
            switch (selectedAvatar) {
                case "witch":
                    keyItem.style.backgroundImage = "url('./img/KeyItemWitch7-transformed.png')";
                    break;
                case "skeleton":
                    keyItem.style.backgroundImage = "url('./img/KeyItemSkelleton1-transformed.png')";
                    break;
                case "vampire":
                    keyItem.style.backgroundImage = "url('./img/KeItemVampire3-transformed.png')";
                    break;
                case "cat":
                    keyItem.style.backgroundImage = "url('./img/KeyItemCat1-transformed.png')";
                    break;
                case "zombie":
                    keyItem.style.backgroundImage = "url('./img/KeyItemZombie1-transformed.png')";
                    break;
                case "death":
                    keyItem.style.backgroundImage = "url('./img/keyItemDeath-2-transformed.png')";
                    break;
                default:
                    keyItem.style.backgroundImage = "url('./img/seta.png')";
            }
            // Estilo adicional para el `keyItem`
            keyItem.style.top = `${Math.random() * 90}%`;
            keyItem.style.left = `${Math.random() * 90}%`;
            keyItem.style.backgroundSize = "cover";
        }

        // Llamamos a la función para asignar la imagen de `keyItem`
        setKeyItemImage(selectedAvatar);

        // Evento de captura del key item, ahora dentro del mismo bloque
        keyItem.onclick = () => catchKeyItem(keyItem);

        // Añadimos el keyItem al array
        gameArea.appendChild(keyItem);
        console.log("Se dibuja el keyitem en gameArea");
        keyItems.push(keyItem);

        setTimeout(() => {
            if (keyItem.parentNode) {
                console.log("entra en SetTimeout de KeyItem");
                gameArea.removeChild(keyItem);
                keyItems = keyItems.filter(k => k !== keyItem); //NECESITO QUE ME EXPLIQUEN
            }
        }, keyyItemSpeed);

        // Ajustar velocidad y reiniciar intervalo de aparición
        keyyItemSpeed = Math.max(keyyItemSpeed - 15, 500); // Velocidad mínima de 500 ms
        clearInterval(gameInterval);

        gameInterval = setInterval(spawnKeyItem, keyyItemSpeed);
    } else {
        console.error("No se encontró avatar seleccionado en sessionStorage.");
    }

}

// Capturar el key item
function catchKeyItem(keyItem, keyItemScore) {
    if (keyItem.parentNode) {
        gameArea.removeChild(keyItem);
        keyItems = keyItems.filter(item => item !== keyItem);
        keyItemCaptured = true;
        keyItemScore++;
        keyItemScoreDisplay.value = "¡Atrapado!";
        showMessage("¡Has capturado el objeto clave!");
        checkRoundProgress();
    }
}

// Función para mostrar la ventana de mensaje
function showMessage(message) {
    const modal = document.getElementById("messageModal");
    const modalMessage = document.getElementById("modalMessage");
    modalMessage.textContent = message; // Cambiar el texto del mensaje
    modal.style.display = "block"; // Mostrar el modal
}

// Función para cerrar el modal cuando se haga clic en el botón de cerrar
function closeModal() {
    const modal = document.getElementById("messageModal");
    modal.style.display = "none"; // Ocultar el modal
}

// Función para cerrar el modal al hacer clic en el botón de continuar
function continueGame() {
    const modal = document.getElementById("messageModal");
    modal.style.display = "none"; // Ocultar el modal
    // Aquí podrías agregar lógica adicional, como continuar el juego, etc.
}

// Asignamos eventos al botón de continuar y al botón de cerrar
document.getElementById("closeModal").onclick = closeModal;
document.getElementById("continueButton").onclick = continueGame;
filloutform();



