<?php
require_once('./php/database.php');
$res = Database::createTable();
echo $res;
?>