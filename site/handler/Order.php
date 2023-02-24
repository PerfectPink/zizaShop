<?php
header('Access-Control-Allow-Origin: *');
require_once('../classes/autoload.php');

//принимаю массив x,y - товары в заказе, адрес
//закидываю в метод для обработки 
//
$order = new Cart;
$order->createOrder();