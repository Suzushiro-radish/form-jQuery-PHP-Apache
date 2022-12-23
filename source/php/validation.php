<?php
class ValidationRule
{
    public string $type;
    public bool $required;
    public int $max_length;
    public string $pattern;
}


function validate(string $value, ValidationRule $rule): string
{
    $err = "";
    // 任意入力欄が空白だったらバリデーション終了
    if (empty($rule->required) && empty($value)) {
        return $err;
    }
    //入力されているかのチェック
    if (isset($rule->required)) {
        if (empty($value)) {
            $err = '必ず入力してください。';
        }
        return $err;
    };
    //タイプが一致しているかのチェック
    if (isset($rule->type)) {
        switch ($rule->type) {
            case 'date':
                $pattern = '/^\d{4}-\d{2}-\d{2}$/';
                if (!preg_match($pattern, $value)) {
                    $err = '正しく入力してください。';
                    break;
                }

                list($year, $month, $day) = explode('-', $value);
                if (!checkdate($month, $day, $year)) {
                    $err = '正しく入力してください。';
                }
                break;
            case 'email':
                if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                    $err = '正しく入力してください。';
                }
                break;
        }
    }
    //入力した長さの判定
    if (isset($rule->max_length)) {
        if ($rule->max_length < mb_strlen($value)) {
            $err = $rule->max_length . '文字以内で入力してください。';
        }
    }

    // 正規表現によるパターンチェック
    if (isset($rule->pattern)) {
        $is_matched = preg_match($rule->pattern, $value);
        if (!$is_matched) {
            $err = '正しい形式で入力してください。';
        }
    }
    return $err;
}
