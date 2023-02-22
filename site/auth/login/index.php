<?php
header('Access-Control-Allow-Origin: *');
require_once('../../classes/autoload.php');

$pdo = Connection::getConnection();
$result = User::login();

if ($result != null){
    $response = [
        'success' => true,
        'token' => $result
    ];
}else{
    $response = [
        'success' => false,
        'error' => 'неверные логин или пароль'
    ];
}
echo json_encode($response, JSON_UNESCAPED_UNICODE);