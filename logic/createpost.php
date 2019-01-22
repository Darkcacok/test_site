<?php
require_once "session.php";
?>
<?php
require_once 'db.php';


$title = $_POST["title"];
$description = $_POST["description"];
$path_to_file = 'PictureForSite/posts/';


$sql_check = 'SELECT id FROM posts ORDER BY id DESC LIMIT 1';
$stmt_check = $pdo->query($sql_check);
$result = $stmt_check->fetch(PDO::FETCH_ASSOC);
$id = $result['id'];

$name = $id + 1;

switch($_FILES['picture']['type'])
{
    case 'image/gif':
        $path_to_file .= $name . '.gif';
        break;
    case 'image/png':
        $path_to_file .= $name . '.png';
        break;
    case 'image/jpeg':
        $path_to_file .= $name . '.jpg';
        break;
    default:
        die("Неверный тип файла");
}

if(!copy($_FILES['picture']['tmp_name'], '../' . $path_to_file))
    die('Что-то пошло не так copy');

    $sql = 'INSERT INTO posts(path, title, text) VALUES(:path, :title, :text)';

    $params = [':path' => $path_to_file, ':title' => $title, ':text' => $description];

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    echo "Загрузка прошла успешно"
?>