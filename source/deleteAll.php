<?php
require_once('./php/database.php');
$res = Database::deleteAll();
echo $res;
?>