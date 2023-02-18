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
    public function createOrder($items, $adress, $username){
        $pdo = Connection::getConnection();
        $result = $pdo->prepare("INSERT INTO orders (orderItems, adress, username) VALUES ('$items', '$adress', '$username')");
        $result->execute();
        return;
    }
}
