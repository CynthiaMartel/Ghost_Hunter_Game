document.addEventListener("DOMContentLoaded", function () {
    const nickInput = document.getElementById("nick");
    const emailInput = document.getElementById("email");
    const jugarButton = document.getElementById("jugar");
    const errorDisplay = document.getElementById("error");
    const AvatarSelected = document.getElementById("avatarImg");

    let selectedAvatar = "";

    // Evento para seleccionar avatar
    document.querySelectorAll(".avatarImgItem").forEach(item => {
        item.addEventListener("dragstart", (event) => {
            selectedAvatar = event.target.getAttribute("data-avatar"); // Guarda el tipo de avatar seleccionado.
            AvatarSelected.src = event.target.src;
        });
    });

    // Validar y enviar datos al servidor
    jugarButton.addEventListener("click", function (event) {
        event.preventDefault();

        const nick = nickInput.value.trim();
        const email = emailInput.value.trim();

        if (nick === "" || /^\d/.test(nick)) {
            errorDisplay.innerText = "El nick no puede estar vacío ni empezar por un número.";
            return;
        }

        if (selectedAvatar === "") {
            errorDisplay.innerText = "Debes seleccionar un avatar antes de jugar.";
            return;
        }

        // Guardar datos en sessionStorage
        sessionStorage.setItem("nick", nick);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("avatar", AvatarSelected.src);

        // Enviar datos al backend con AJAX
        const formData = new FormData();
        formData.append("nick", nick);
        formData.append("email", email);
        formData.append("avatar", selectedAvatar);

        fetch("login.php", { // Envía los datos al archivo login.php
            method: "POST", // Indica que se enviarán datos al servidor
            body: formData  // Los datos a enviar (nick, email, avatar)
        })
        .then(response => response.json()) // Convierte la respuesta en JSON
        .then(data => {
            if (data.status === "success") {  
                // Redirigir al juego si todo está correcto
                window.location.href = "game.html";
            } else {
                errorDisplay.innerText = data.message;  // Muestra error si falla
            }
        })
        .catch(error => {
            errorDisplay.innerText = "Error en la conexión. Inténtalo de nuevo.";
            console.error("Error:", error);
        });
    });
});

