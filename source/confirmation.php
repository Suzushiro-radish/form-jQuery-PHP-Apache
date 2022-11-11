<?php
    require_once('php/validation.php');
    $name = trim($_POST['name']);
    $rule_name = new ValidationRule;
    $rule_name->type = 'string';
    $rule_name->max_length = 50;
    $rule_name->required = true;
    $err_name = validate($name, $rule_name);
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>確認画面</title>
</head>
<body>
    <h1>確認画面</h1>
    <h2>内容はこちらでよろしいでしょうか</h2>
    <form id="data" action="/registar.php" method="POST">
        <input type="hidden" name="name" value="<?= $name ?>">
        <div>名前：<?= $name ?></div>
    </form> 
    <?php var_dump($err_name) ?> 
</body>
</html>