<?php

class Unit{
    
    public $id;
    public $data;
    public static $pdo;
    public const TABLE = ''; // что бы ниже не подчеркивалась ошибка
    public function __construct(int $id)
    {
        $this->id = $id;
    }

    

    protected function getLine() : array
    {
      if ($this->data) {
          return $this->data;
      }
      $pdo = Connection::getConnection();
      $result = $pdo->query("SELECT * FROM " . static::TABLE . " WHERE id = " . $this->id);
      $user = $result->fetch();
      $this->data = $user;
      return $user;
    }
  
    public function getField(string $field) :mixed
    {
  
      return $this->getLine()[$field];
    }
}