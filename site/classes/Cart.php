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
        $user = $pdo->query("SELECT username FROM `users` WHERE userhash= '" . $_POST['userhash'] . "'")->fetch();
        $user = $user['username'];
        $useraddress = $_POST['address'];
        $orderlist = $_POST['orderlist'];

        $orderlist = json_decode($orderlist);
        $orderlist = json_decode($orderlist);
        $array = json_decode(json_encode($orderlist), true);

        // var_dump($array);
        $arr = [];
        foreach ($array as $key => $value) {
            $arr[] = $value['id'];
            // echo $key;
            // var_dump($value);
        }


        $arr = implode(',', $arr);
        $iditems = $pdo->query("SELECT id,brand,title,price FROM goods WHERE `id` IN ($arr) ORDER BY id ASC")->fetchall();
        // echo ("SELECT brand,title FROM goods WHERE `id` IN ('$arr')");
        // var_dump($array);

        foreach ($array as $key => $value) {
            // $itemIndex = array_search($key, $iditems);
            // $iditems[$itemIndex] = ['amount' => $value];
            // echo $key;
            echo $value;
        }
        // var_dump($iditems);





        // var_dump(array_replace_recursive($array, $iditems));
        // echo $_POST['orderlist'];
        // echo  nl2br("\n");
        // var_dump($array);
        // echo  nl2br("\n");
        // var_dump($iditems);
        // $x = array_replace_recursive($iditems, $array);
        // var_dump($x);






        // $orderdate = date("Y-m-d H:i:s");
        // $pdo->query("INSERT INTO `orders` (username,address,orderlist,date) VALUES ('$user', '$useraddress',$orderlist,'$orderdate')");
        // return;
    }
}
