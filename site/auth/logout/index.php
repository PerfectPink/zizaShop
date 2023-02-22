<?php
header('Access-Control-Allow-Origin: *');
require_once('../../classes/autoload.php');
$pdo = Connection::getConnection();

User::logout();