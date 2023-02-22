<?php
header('Access-Control-Allow-Origin: *');
require_once('../../classes/autoload.php');
$pdo = Connection::getConnection();
if (isset($_POST['password'])) {
    $_POST['password'] = crypt($_POST['password'], salt: 'inordic');
}
if (User::exists()) {
    $response = [
        'success' => false,
        'message' => 'Такой пользователь уже существует'
    ];
} else {
    User::register();
    $response = [
        'success' => true,
        'message' => 'Успешная Регистрация'
    ];
}
echo json_encode($response, JSON_UNESCAPED_UNICODE);
