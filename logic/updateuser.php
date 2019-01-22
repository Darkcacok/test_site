<?php
require_once 'db.php';

$postData = file_get_contents('php://input');
$response = json_decode($postData, true);

$id = $response['id'];
$login = trim($response['login']);
$gender = $response['gender'];
$email = htmlspecialchars($response['email']);
$rank = $response['rank'];

if (!empty($login) && !empty($gender) && !empty($email) && !empty($id) && !empty($rank)) {

    $answer = new \stdClass();
    $answer->id = $id;

    $array = [];

    $sql_check = 'SELECT username, email, gender, rank FROM users WHERE id =:id';
    $stmt_check = $pdo->prepare($sql_check);
    $stmt_check->execute([':id' => $id]);
    $user = $stmt_check->fetch(PDO::FETCH_OBJ);


    if ($login != $user->username) {
        //die(var_dump($login) . ' ' . var_dump($user['username']));
        $sql_check = 'SELECT EXISTS( SELECT username FROM users WHERE username =:login)';
        $stmt_check = $pdo->prepare($sql_check);
        $stmt_check->execute([':login' => $login]);

        if ($stmt_check->fetchColumn()) {
            $answer->text = "Пользователь с таким логином уже существует";
            die(json_encode($answer));
        } else {
            $array['username'] = $login;
        }
    }

    if ($email != $user->email) {
        $sql_check = 'SELECT EXISTS( SELECT email FROM users WHERE email =:email)';
        $stmt_check = $pdo->prepare($sql_check);
        $stmt_check->execute([':email' => $email]);

        if ($stmt_check->fetchColumn()) {
            $answer->text = "Пользователь с такой почтой уже существует";
            die(json_encode($answer));
        }

        $array['email'] = $email;
    }

    $array['gender'] = $gender;
    $array['rank'] = $rank;

    //echo var_dump($array);

    $sql = 'UPDATE users SET username=:login, gender=:gender, email=:email, rank=:rank WHERE id =:id';
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':login' => $login, ':gender' => $gender, ':email' => $email, ':rank' => $rank, ':id' => $id]);

    $answer->text = "Вы успешно обновили Пользователя";
    echo json_encode($answer);

} else {
    echo 'Произошла невиданная ситуация'

    ;
}
