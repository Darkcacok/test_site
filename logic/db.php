<?php 
require_once("session.php"); 
?>
<?php

$driver = 'mysql';
$host = 'localhost';
$db_name = 'site';
$db_user = 'mysite';
$db_pass = 'P50qMFdW61AsEmXD';
$charset = 'utf8';
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];



try{
    $pdo = new PDO("$driver:host=$host;dbname=$db_name;charset=$charset", $db_user, $db_pass, $options);
}
catch(PDOException $e){
    die("Не могу подключиться к базе данных");
}

?>