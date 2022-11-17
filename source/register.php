<?php
    $name = $_POST['name'];
    $dsn = 'mysql:dbname=form_db;host=docker-compose-mysql-mysql';
    $user = 'daiki';
    $password = 'pass';
    try {
        $pdo = new PDO($dsn, $user, $password);
        $sql = "INSERT INTO inquery (
                name
            ) VALUES (
                :name
            )";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':name', $name);
        $res = $stmt->execute();
        $pdo = null;
    } catch (PDOException $e) {
        echo "Register failed:";
        var_dump($e);
        exit(1);
    }
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>送信完了</title>
</head>
<body>
    <h1>送信が完了しました</h1>
</body>
</html>