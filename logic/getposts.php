<?php
require_once 'db.php';

$sql = 'SELECT id, path, title, text FROM posts ORDER BY id DESC';

$result = $pdo->query($sql);

$posts = $result->fetchAll(PDO::FETCH_ASSOC);

$json = json_encode($posts);
echo $json;

?>