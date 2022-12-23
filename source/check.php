<?php
require("php/database.php");
$res = Database::selectAll();
?>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        th,
        td {
            border-style: solid;
        }
    </style>
    <title>データベース表示</title>
</head>

<body>
    <table style="border-style: solid;">
        <thead>
            <tr>
                <th>名前</th>
                <th>性別</th>
                <th>生年月日</th>
                <th>郵便番号</th>
                <th>住所</th>
                <th>電話番号</th>
                <th>メールアドレス</th>
                <th>問い合わせの種類</th>
                <th>問い合わせ内容</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($res as $r) : ?>
                <tr>
                    <td><?= $r['name'] ?></td>
                    <td><?= $r['sex'] ?></td>
                    <td><?= $r['date_of_birth'] ?></td>
                    <td><?= $r['postal_code'] ?></td>
                    <td><?= $r['address'] ?></td>
                    <td><?= $r['tel'] ?></td>
                    <td><?= $r['email'] ?></td>
                    <td><?= $r['inquery_type'] ?></td>
                    <td><?= $r['inquery_body'] ?></td>
                </tr>
            <?php endforeach ?>
        </tbody>
    </table>
    <button onclick="location.href='deleteAll.php'">データを消去</button>
    <button onclick="location.href='recreateTable.php'">テーブルを再作成</button>
</body>

</html>