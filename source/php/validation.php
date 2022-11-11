<?php
    class ValidationRule{
        public string $type;
        public bool $required;
        public int $max_length;
    } 

    function validate($value, ValidationRule $rule) {
        $err = [];
        //入力されているかのチェック
        if ($rule->required){
            if (empty($value)){
                $err[] = 'required';
            }
        };
        //タイプが一致しているかのチェック
        if ($rule->type){
            if ($rule->type !== gettype($value)){
                $err[] = 'type';
            }
        }
        //入力した長さの判定
        if ($rule->max_length){
            if ($rule->max_length < mb_strlen($value)){
                $err[] = 'max_length';
            }
        }
        return $err;
    }

    