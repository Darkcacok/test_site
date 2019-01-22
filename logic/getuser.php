<?php
require_once 'db.php';

$postData = file_get_contents('php://input');
$response = json_decode($postData, true);

$id = $response['id'];

$sql = 'SELECT id, username, email, gender, rank FROM users WHERE id =:id';
$stmt = $pdo->prepare($sql);
$stmt->execute([':id' => $id]);
$user = $stmt->fetchAll(PDO::FETCH_ASSOC);


$json = json_encode($user);
echo $json;

?>