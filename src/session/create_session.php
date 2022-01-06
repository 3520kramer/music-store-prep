<?php
include_once __DIR__ . '/authenticate.php';

$jwt = $_POST['jwt'] ?? null;

if($jwt && is_jwt_valid($jwt)){

  session_start();
  
  session_regenerate_id();

  $_SESSION['jwt'] = $jwt;

  echo "JWT is set in sessions";
  return;
}
echo "NOT VALID";