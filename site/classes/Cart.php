<?php
class Cart extends Connection
{
    public function getCartItems(string $items)
    {
        $pdo = Connection::getConnection();
        $result = $pdo->query("SELECT * FROM `goods` WHERE id IN (" . $items . ")");
        $dboutput = [];
        while ($row = $result->fetch()) {
            $dboutput[] = $row;
        }
        return json_encode($dboutput, JSON_UNESCAPED_UNICODE);
    }
    public function createOrder()
    {
        $pdo = Connection::getConnection();
        $user = $pdo->query("SELECT username FROM `users` WHERE userhash= '". $_POST['userhash'] . "'")->fetch();
        $user = $user['username'];
        $useraddress = $_POST['address'];
        $orderlist = $_POST['orderlist'];
        $pdo->query("INSERT INTO `orders` (username,address,orderlist) VALUES ('$user', '$useraddress',$orderlist)");
        return;
    }
}