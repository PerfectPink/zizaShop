<?php
header('Access-Control-Allow-Origin: *');
require_once('autoload.php');

//принимаю массив x,y - товары в заказе, адрес
//закидываю в метод для обработки 
//
$order = new Cart;
$data = $_POST;
var_dump($data);
$order->createOrder($data['text'][0],$data['text'][1],$data['text'][2]);