<?php
require_once 'db.php';

$sql = 'SELECT id, username, gender, email, rank FROM users';

$result = $pdo->query($sql);

$users = $result->fetchAll(PDO::FETCH_ASSOC);

$json = json_encode($users);
echo $json;

?>