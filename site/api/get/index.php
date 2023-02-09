<?php

header("Access-Control-Allow-Origin: *");

if(isset($_GET['getdb'])){
    $host='mysql';
    $db='zizadb';
    $user='root';
    $pass='test123';
    $charset='utf8';

    $dsn="mysql:host=$host;dbname=$db;charset=$charset";
    $opt=[
    PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES=>false,
    ];

    $pdo=new PDO($dsn,$user,$pass,$opt);

    $table = "goods";


   if(isset($_GET)){
        if(isset($_GET['filtername']) && isset($_GET['filter'])){
            $filter = str_ireplace("_"," ",$_GET['filter']);
            $result = $pdo->query("SELECT * FROM " . $table . " WHERE ". $_GET['filtername'] . " = " . "'" . $filter . "'");
            $dboutput = [];
                while ($row = $result->fetch()){
                    $dboutput[] = $row;
                }
            echo json_encode($dboutput, JSON_UNESCAPED_UNICODE);
            exit;
        }
    $result = $pdo->query("SELECT * FROM " . $table);
    $dboutput = [];
    while ($row = $result->fetch()){
        $dboutput[] = $row;
    }
    echo json_encode($dboutput, JSON_UNESCAPED_UNICODE);
   }



    
}