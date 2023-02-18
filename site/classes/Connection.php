<?php

class Connection{
    public static $pdo;
    public static function getConnection() : \PDO{

        if (self::$pdo) {
            return self::$pdo;
        }

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
        static::$pdo = $pdo;
        return $pdo;
    }
}