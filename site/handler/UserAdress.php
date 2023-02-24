<?php
header('Access-Control-Allow-Origin: *');
require_once('../classes/autoload.php');

switch ($_POST['type']) {
    case 'saveaddress':
        User::saveaddress();
        break;
    case 'getaddress':
        User::getaddress();
        break;      
    default:
        break;
}