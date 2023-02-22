<?php
header('Access-Control-Allow-Origin: *');
require_once('../../classes/autoload.php');

$pdo = Connection::getConnection();


if(User::validate()){
    $response = [
        'success'=>true,
    ];
}else{
    $response = [
        'success'=>false,
        'error' =>'юзер не авторизован'
    ];
}
echo json_encode($response, JSON_UNESCAPED_UNICODE);