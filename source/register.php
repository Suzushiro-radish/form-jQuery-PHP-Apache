<?php
    $name = $_POST['name'];
    $dsn = 'mysql:dbname=form_db;host=docker-compose-mysql-mysql';
    $user = 'daiki';
    $password = 'pass';
    try {
        $pdo = new PDO($dsn, $user, $password);
        $sql = 'DESCRIBE inquery';
        $res = $pdo->query($sql);
        $data = $res->fetch();
        var_dump($data);
        
    } catch (PDOException $e) {
        echo "Register failed:";
        var_dump($e);
        exit(1);
    }
?>
<!DOCTYPE html>
<html lang="ja">