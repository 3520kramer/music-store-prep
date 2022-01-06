<?php
include_once __DIR__ . '/../environment/my-env.php';

// define('ROOT_DIR', '/exam/music-store');
define('SIGN_IN_ROUTE', ENV::$ROOT_DIR . '/my-account/sign-in');
define('ADMIN_SIGN_IN_ROUTE', ENV::$ROOT_DIR . '/admin/sign-in');
define('ADMIN_TRACKS_ROUTE', ENV::$ROOT_DIR . '/admin/tracks');

define('VIEW_CART_ROUTE', ENV::$ROOT_DIR . '/cart');
define('CSS_PATH', ENV::$ROOT_DIR . '/css/css_loader.php');

// echo "$ROOT_DIR/src/tracks/tracks.css";
$css_file = 'url.php';

// $res = file_get_contents($css_file);