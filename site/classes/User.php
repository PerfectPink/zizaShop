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
    $result = $pdo->query("SELECT COUNT(*) as num FROM users WHERE userhash = '" . $_POST['token'] . "'");
    $row = $result->fetch();
    if ($row['num'] > 0) {
      return true;
    }
    return false;
  }
  public static function logout()
  {
    $pdo = \Connection::getConnection();
    $pdo->query("UPDATE users SET userhash = '' WHERE userhash = '" . $_POST['token'] . "'");
  }
  public static function getUsername(){
    $pdo = \Connection::getConnection();
    $sqlText = $pdo->query("SELECT username from users WHERE userhash ='" . $_POST['token'] . "'");
    $result = $sqlText->fetch();
    return $result;
  }

  //------------------------------------------------------------------------------

  public static function saveaddress(){
    $pdo = \Connection::getConnection();
    $address = $_POST['address'];
    $token = $_POST['token'];
    $pdo->query("UPDATE users SET address = '$address' WHERE userhash ='$token'");
    return;
  }
  public static function getaddress(){
    $pdo = \Connection::getConnection();
    $result = $pdo->query("SELECT address FROM users WHERE userhash ='" . $_POST['token'] . "'")->fetch();
    echo $result['address'];
  }

  public static function getUserInfo(){
    $pdo = \Connection::getConnection();
    $token = $_POST['token'];
    $result = $pdo->query("SELECT username,usermail,address FROM users WHERE userhash ='$token'")->fetch();
    if(isset($_POST['shortinfo'])){
      return json_encode($result, JSON_UNESCAPED_UNICODE);
    }
    $orderCount = $pdo->query("SELECT COUNT(*) as num FROM orders WHERE username =" . "'" . $result['username'] . "'")->fetch();
    if ($orderCount['num'] > 0) {
      $userOrders = $pdo->query("SELECT id,orderlist,address,status,date FROM orders WHERE username =" . "'" . $result['username'] . "'")->fetchALL();
      $output = [
        'userinfo' => $result,
        'userorders' => $userOrders
      ];
      $output = json_encode($output, JSON_UNESCAPED_UNICODE);
      return $output;
    }else{
      $result = json_encode($result, JSON_UNESCAPED_UNICODE);
      return $result;
    }
    // return $result;
  } 
}
