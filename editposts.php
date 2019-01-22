<?php 
require_once("logic/session.php"); 
?>
<!DOCTYPE html>
<html lang="en">
<head>
   <?php require_once 'parts/meta.html'; ?>
   <title>Редактирование Новостей</title>
   <link rel="stylesheet" type="text/css" href="css/mystyle.css">
</head>
<body>
<?php require_once 'parts/header.html'; ?>

<?php
if( isset($_SESSION['user_login']) )
    require_once 'parts/sideBarLogin.html';
else{
    require_once 'parts/sideBarNOLogin.html';
}
?>
<?php
if( $_SESSION['rank'] == 'A' )
    require_once 'parts/createpost.html'; 
?>
    <script src="logic/js/createpost.js"></script>
</body>
</html>