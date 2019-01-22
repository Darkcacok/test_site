<?php 
require_once("logic/session.php"); 
?>
<!DOCTYPE html>
<html lang="en">
<head>
   <?php require_once 'parts/meta.html'; ?>
   <title>Мой сайт</title>
   <link rel="stylesheet" type="text/css" href="css/mystyle.css">
</head>
<body>
    <?php require_once 'parts/header.html'; ?>
    <?php require_once 'logic/auth.php'; ?>
    <?php
    if( isset($_SESSION['user_login']) )
        require_once 'parts/sideBarLogin.html';
    else{
        require_once 'parts/sideBarNoLogin.html';
    }
    ?>
    <script src="logic/js/getposts.js"></script>
</body>
</html>