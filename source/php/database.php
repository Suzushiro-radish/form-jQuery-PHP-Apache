<?php
class Database
{
    private static $dsn = 'mysql:dbname=form_db;host=docker-compose-mysql-mysql';
    private static $user = 'daiki';
    private static $password = 'pass';

    public static function insertInquery(array $request)
    {
        $name = $request["name"];
        $sex = $request['sex'];
        $date_of_birth = $request['date_of_birth'];
        $postal_code = $request['postal_code'];
        $address = $request['address'];
        $tel = $request['tel'];
        $email = $request['email'];
        $inquery_type = $request['inquery_type'];
        $inquery_body = $request['inquery_body'];
        try {
            $pdo = new PDO(self::$dsn, self::$user, self::$password);
            $sql = "INSERT INTO inquery (
                    name, sex, date_of_birth, postal_code, address, tel, email, inquery_type, inquery_body
                ) VALUES (
                    :name, :sex, :date_of_birth, :postal_code, :address, :tel, :email, :inquery_type, :inquery_body
                )";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':sex', $sex);
            $stmt->bindParam(':date_of_birth', $date_of_birth);
            $stmt->bindParam(':postal_code', $postal_code);
            $stmt->bindParam(':address', $address);
            $stmt->bindParam(':tel', $tel);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':inquery_type', $inquery_type);
            $stmt->bindParam(':inquery_body', $inquery_body);;
            $stmt->execute();
            $pdo = null;
        } catch (PDOException $e) {
            var_dump($e);
            exit(1);
        }
    }

    public static function createTable()
    {
        try {
            $pdo = new PDO(self::$dsn, self::$user, self::$password);
            $drop_query = 'drop table inquery';
            $res = $pdo->query($drop_query);
            $query = 'CREATE TABLE inquery (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(20) CHARACTER SET utf8 NOT NULL,
                sex INT(1) NOT NULL,
                date_of_birth DATE NOT NULL,
                postal_code CHAR(7) NOT NULL,
                address VARCHAR(200) CHARACTER SET utf8 NOT NULL,
                tel VARCHAR(20),
                email VARCHAR(200),
                inquery_type INT NOT NULL,
                inquery_body VARCHAR(1000) CHARACTER SET utf8 NOT NULL,
                registry_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )';
            $res = $pdo->query($query);
            $pdo = null;
            return "テーブルが再作成されました";
        } catch (PDOException $e) {
            return $e;
            exit(1);
        }
    }

    public static function selectAll()
    {
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

    public static function deleteAll()
    {
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
