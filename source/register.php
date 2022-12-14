<?php
    require("./php/database.php");
    require('php/validation.php');

    $name = mb_convert_kana($_POST['name'], 's');
    $sex = $_POST['sex'];
    $date_of_birth = $_POST['date_of_birth'];
    $postal_code = $_POST['postal_code'];
    $prefecture = $_POST['pref'];
    $address = $_POST['address'];
    $tel = $_POST['tel'];
    $email = $_POST['email'];
    $inquery_type = $_POST['inquery_type'];
    $inquery_body = $_POST['inquery_body'];

    //名前のバリデーション
    $name = trim($name);
    $name_rule = new ValidationRule;
    $name_rule->type = 'string';
    $name_rule->max_length = 50;
    $name_rule->required = true;
    $err['name'] = validate($name, $name_rule);
    // 性別
    // 生年月日
    // 郵便番号
    // 都道府県
    // 住所
    // 電話番号
    // Email
    // お問い合わせの種類
    // お問い合わせ本文

    var_dump($has_error);

    $has_error = false;
    foreach ($err as $e) {
        if (!empty($e)) {
            $has_error = true;
        }
    }
    
    if ($has_error){
        $result = [
            "status" => "fail",
            "name" => $name
        ];
        echo json_encode($result);
    } else {
        $request["name"] = $name;
        $request["sex"] = $sex;
        $request["date_of_birth"] = $date_of_birth;
        $request["postal_code"] = $postal_code;
        $request["prefecture"] = $prefecture;
        $request["address"] = $address;
        $request["tel"] = $tel;
        $request["email"] = $email;
        $request["inquery_type"] = $inquery_type;
        $request["inquery_body"] = $inquery_body;
        Database::insertInquery($request);    
        $result = [
            "status" => "success",
            "name" => $name
        ];
        echo json_encode($result);
    }
?>