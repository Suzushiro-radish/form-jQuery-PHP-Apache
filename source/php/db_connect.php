<?php
    $dsn = 'mysql:dbname=form_db;host=docker-compose-mysql-mysql';
    $user = 'daiki';
    $password = 'pass';
    try {
        $pdo = new PDO($dsn, $user, $password);
        $query = 'CREATE TABLE inquery (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(20) CHARACTER SET utf8 NOT NULL,
            registry_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )';
        $res = $pdo->query($query);
        var_dump($res);
    } catch (PDOException $e) {
        echo "Connection failed:";
        var_dump($e);
        exit(1);
    }
?>