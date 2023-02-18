<?php

//с помощью этого можно изично добавить в бд данные о новых товаров, все что нужно отправить sqltext и сделать функцию на подключение к бд
//=> что бы она добавляла в бд

$strFields = '';
$strValues = '';

foreach($_POST as $key => $value){
    $strFields .= "`$key`,"; 
    $strValues .= "'$value',"; 
}

//убираем лишние запятые
$strFields = trim($strFields, ',');
$strValues = trim($strValues, ',');
//
$sqlText = "INSERT INTO Goods($strFields) VALUES($strValues)";

echo $sqlText;