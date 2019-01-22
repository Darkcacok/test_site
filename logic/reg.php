<?php
require_once "session.php";
?>
<?php
require_once 'db.php';


$postData = file_get_contents('php://input');
$response = json_decode($postData,true);



$login = trim($response['login']);
$gender = $response['gender'];
$email = htmlspecialchars($response['email']);
$passwd = htmlspecialchars($response['passwd']);
$passwd_confirm = htmlspecialchars($response['passwd_confirm']);


if (!empty($login) && !empty($gender) && !empty($email) && !empty($passwd) && !empty($passwd_confirm)) {

    if ($passwd != $passwd_confirm) {
        echo 'Пароли не совпадают';
    } else {

        $sql_check = 'SELECT EXISTS( SELECT username FROM users WHERE username =:login)';
        $stmt_check = $pdo->prepare($sql_check);
        $stmt_check->execute([':login' => $login]);

        if ($stmt_check->fetchColumn()) {
            die('Пользователь с таким логином уже существует');
        }

        $passwd = password_hash($passwd, PASSWORD_DEFAULT);

        $sql = 'INSERT INTO users(email, username, password, gender) VALUES(:email, :login, :passwd, :gender)';

        $params = [':email' => $email, ':login' => $login, ':passwd' => $passwd, ':gender' => $gender];

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        echo 'Вы успешно зарегестрировались';
    }

} else {
    echo 'Пожалуйста, заполните все поля';
}