<?php
header('Access-Control-Allow-Origin: *');
require_once('../../classes/autoload.php');
$pdo = Connection::getConnection();


$response = User::getUsername($_POST['token']);
echo json_encode($response);
