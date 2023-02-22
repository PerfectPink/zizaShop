<?php

class User extends Unit
{

  const TABLE = 'users';


  // public function username(){
  //   return $this->getLine()['username'];
  // }
  // public function realname(){
  //   return $this->getLine()['realname'];
  // }
  // public function id(){
  //   return $this->getLine()['id'];
  // }

    public static function register(): bool{
      $fields = '';
      $values = '';
      $pdo = \Connection::getConnection();
      foreach ($_POST as $key => $value){
        $fields .= "`$key`,";
        $values .= "'$value',";
      }
      $fields = trim($fields,',');
      $values = trim($values,',');
      $pdo->query("INSERT INTO " . static::TABLE . "($fields) VALUES ($values)");
      return true;
    }



  final public static function login(): ?string
  {

    $login = $_POST['username'];
    $password = $_POST['password'];
    $pdo = \Connection::getConnection();
    $result = $pdo->query("SELECT * FROM users WHERE username = '$login' OR usermail = '$login'");
    $row = $result->fetch();

    if (!isset($row['id'])) {
      return null;
    }

    if (!hash_equals($row['password'], crypt($password, 'inordic'))) {
      return null;
    }

    $token = crypt($row['username'] . time(), salt: 'inordic');
    $pdo->query("UPDATE users SET userhash = '$token' WHERE id =" . $row['id']);

    return $token;
  }

  public static function exists(): bool
  {
    $username = $_POST['username'];
    $usermail = $_POST['usermail'];
    $pdo = \Connection::getConnection();
    $result = $pdo->query("SELECT COUNT(*) as num FROM users WHERE username = '$username' OR usermail = '$usermail'");
    $row = $result->fetch();
    if ($row['num'] > 0) {
      return true;
    }
    return false;
  }
  public static function validate(): bool
  {
    $pdo = \Connection::getConnection();
    $result = $pdo->query("SELECT COUNT(*) as num FROM users WHERE user_hash = '" . $_POST['token'] . "'");
    $row = $result->fetch();
    if ($row['num'] > 0) {
      return true;
    }
    return false;
  }
  public static function logout()
  {
    $pdo = \Connection::getConnection();
    $result = $pdo->query("UPDATE users SET user_hash = '' WHERE user_hash = '" . $_POST['token'] . "'");
  }
}
