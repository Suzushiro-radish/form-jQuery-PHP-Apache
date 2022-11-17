<?php
class Database {
    private static $dsn = 'mysql:dbname=form_db;host=docker-compose-mysql-mysql';
    private static $user = 'daiki';
    private static $password = 'pass';

    public static function insertInquery(array $request){
        $name = $request["name"];
        try {
            $pdo = new PDO(self::$dsn, self::$user, self::$password);
            $sql = "INSERT INTO inquery (
                    name
                ) VALUES (
                    :name
                )";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':name', $name);
            $stmt->execute();
            $pdo = null;
        } catch (PDOException $e) {
            var_dump($e);
            exit(1);
        }
    }

    public static function createTable(){
        try {
            $pdo = new PDO(self::$dsn, self::$user, self::$password);
            $query = 'CREATE TABLE inquery (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(20) CHARACTER SET utf8 NOT NULL,
                registry_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )';
            $res = $pdo->query($query);
            $pdo = null;
            var_dump($res);
        } catch (PDOException $e) {
            var_dump($e);
            exit(1);
        }
    }

    public static function selectAll(){
        try {
            $pdo = new PDO(self::$dsn, self::$user, self::$password);
            $query = 'SELECT * FROM inquery';
            $stmt = $pdo->prepare($query);
            $stmt->execute();
            $res = $stmt->fetchAll();
            $pdo = null;
            return $res;
        } catch (PDOException $e) {
            return $e;
        }
    }

    public static function deleteAll(){
        try {
            $pdo = new PDO(self::$dsn, self::$user, self::$password);
            $query = 'DELETE FROM inquery';
            $stmt = $pdo->prepare($query);
            $stmt->execute();
            $pdo = null;
            return "DBの内容が消去されました";
        } catch (PDOException $e) {
            return $e;
        }
    }
}
?>
