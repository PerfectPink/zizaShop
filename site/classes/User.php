<?php 

class User extends Unit{

  const TABLE = 'users';

  public function username(){
    return $this->getLine()['username'];
  }
  public function realname(){
    return $this->getLine()['realname'];
  }
  public function id(){
    return $this->getLine()['id'];
  }
}