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
    <title>データベース表示</title>
</head>
<body>
<table>
    <thead>
        <tr>
            <th>名前</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($res as $r): ?>
            <tr>
                <td><?= $r['name'] ?></td>
            </tr>
        <?php endforeach ?>
    </tbody>
</table>
<button onclick="location.href='deleteAll.php'">データを消去</button>
</body>
</html>