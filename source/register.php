<?php
require("./php/database.php");
require('php/validation.php');

$request = $_POST;

try {
    registerInquery($request);
} catch (Exception $e) {
    $result = [
        "status" => "fail",
        "error" => "登録が失敗しました。"
    ];
    echo json_encode($result);
}

function registerInquery($request)
{
    $err = validateRequest($request);

    $has_error = false;
    foreach ($err as $e) {
        if (!empty($e)) {
            $has_error = true;
        }
    }

    if ($has_error) {
        $result = [
            "status" => "fail",
            "error" => "正しい値を送信してください。"
        ];
    } else {
        $formattedRequest = formatRequest($request);
        $res = Database::insertInquery($formattedRequest);
        $result = [
            "status" => "success",
            "inquery" => $request
        ];
    }
    echo json_encode($result);
}

function validateRequest(array $request): array
{
    $name = $request['name'];
    $sex = $request['sex'];
    $date_of_birth = $request['date_of_birth'];
    $postal_code = $request['postal_code'];
    $address = $request['address'];
    $tel = $request['tel'];
    $email = $request['email'];
    $inquery_type = $request['inquery_type'];
    $inquery_body = $request['inquery_body'];

    //名前のバリデーション
    $name = trim($name);
    $name_rule = new ValidationRule;
    $name_rule->max_length = 50;
    $name_rule->required = true;
    $err['name'] = validate($name, $name_rule);
    // 性別
    $sex_rule = new ValidationRule;
    $sex_rule->required = true;
    $sex_rule->pattern = '/^[129]$/';
    $err['sex'] = validate($sex, $sex_rule);
    // 生年月日
    $DoB_rule = new ValidationRule;
    $DoB_rule->required = true;
    $DoB_rule->type = 'date';
    $err['date_of_birth'] = validate($date_of_birth, $DoB_rule);
    // 郵便番号
    $postal_code = str_replace('-', '', $postal_code);
    $postal_code_rule = new ValidationRule;
    $postal_code_rule->required = true;
    $postal_code_rule->pattern = '/^\d{7}$/';
    $err['postal_code'] = validate($postal_code, $postal_code_rule);
    // 住所
    $address_rule = new ValidationRule;
    $address_rule->required = true;
    $address_rule->max_length = 200;
    $err['address'] = validate($address, $address_rule);
    // 電話番号
    $tel = str_replace('-', '', $tel);
    $tel_rule = new ValidationRule;
    $tel_rule->pattern = '/^0[-0-9]{9,12}$/';
    $err['tel'] = validate($tel, $tel_rule);
    // Email
    $email_rule = new ValidationRule;
    $email_rule->type = 'email';
    $email_rule->max_length = 200;
    $err['email'] = validate($email, $email_rule);
    // お問い合わせの種類
    $inquery_type_rule = new ValidationRule;
    $inquery_type_rule->required = true;
    $inquery_type_rule->type = 'integer';
    $err['inquery_type'] = validate($inquery_type, $inquery_type_rule);
    // お問い合わせ本文
    $inquery_body_rule = new ValidationRule;
    $inquery_body_rule->required = true;
    $inquery_body_rule->max_length = 1000;
    $err['inquery_body'] = validate($inquery_body, $inquery_body_rule);

    return $err;
}

function formatRequest($request)
{
    $name = $request['name'];
    $sex = (int) $request['sex'];
    $date_of_birth = $request['date_of_birth'];
    $postal_code = str_replace('-', '', $request['postal_code']);
    $address = $request['address'];
    $tel = $request['tel'];
    $email = $request['email'];
    $inquery_type = (int) $request['inquery_type'];
    $inquery_body = $request['inquery_body'];

    $formattedRequest = [
        'name' => $name,
        'sex' => $sex,
        'date_of_birth' => $date_of_birth,
        'postal_code' => $postal_code,
        'address' => $address,
        'tel' => $tel,
        'email' => $email,
        'inquery_type' => $inquery_type,
        'inquery_body' => $inquery_body
    ];

    return $formattedRequest;
}
