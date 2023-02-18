<?php
require_once('autoload.php');
header('Access-Control-Allow-Origin: *');
$response = new Cart;
$output = $response->getCartItems(trim($_GET['text'],'[]'));
echo ($output) ;