
<?php
// Configuramos la cabecera para que esto envíe cabeceras HTTP al navegador de tipo JSON y no como html ni texto plano, y así el navegador devuelve datos en formato JSON
header('Content-Type: application/json');

// Verifica si la solicitud es POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {//$_SERVER y REQUEST_METHOD son variables globales de PHP que contiene el método HTTP utilizado para realizad solicitud al servidor. En este caso POST
    // Borramos cualquier tipo de espacio que el usuario pueda introducir, con el trim, y se ignorarán
    // Captura y limpia los datos recibidos
    $nick = filter_var($_POST['nick'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $avatar = filter_var($_POST['avatar'], FILTER_SANITIZE_STRING);

     // Validación de campos vacíos
    if (!$nick || !$email || !$avatar) {
        echo json_encode([
            "status" => "error",
            "message" => "Todos los campos son obligatorios."
        ]);
        exit;
    }

    // Aquí podrías guardar los datos en la base de datos o en un archivo

    echo json_encode([
        "status" => "success",
        "message" => "Datos recibidos correctamente. ¡Listo para jugar!"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Método de solicitud no válido."
    ]);
}
?>

