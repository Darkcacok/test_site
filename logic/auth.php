<?php
require_once 'db.php';

if (isset($_POST['signin'])) {
    $login = trim($_POST['login']);
    $passwd = htmlspecialchars($_POST['passwd']);

    if (!empty($login) && !empty($passwd)) {

        $sql = 'SELECT username, password, rank FROM users WHERE username = :login';
        $params = [':login' => $login];

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        $user = $stmt->fetch(PDO::FETCH_OBJ);

        if ($user) {
            if (password_verify($passwd, $user->password)) {
                $_SESSION['user_login'] = $user->username;
                $_SESSION['rank'] = $user->rank;
            } else {
                echo 'Неверный логин или пароль';
            }
        } else {
            echo 'Неверный логин или пароль';
        }
    } else {
        echo 'Заполните все поля';
    }
}
?>