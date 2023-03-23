<?php
header('Access-Control-Allow-Origin: *');
require_once('../classes/autoload.php');

$response = User::getUserInfo();
echo $response;