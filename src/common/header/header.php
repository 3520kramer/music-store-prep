<?php
include_once __DIR__ . '/../../../utilities/constants.php';
include_once __DIR__ . '/../../../environment/my-env.php';
include_once __DIR__ . '/../../session/authenticate.php';

function get_header(string $title, string $js_file, bool $is_admin_header = false)
{

  $js_path = ENV::$ROOT_DIR . "/src/$js_file";
  $css = CSS_PATH;
  
  $home_url = ENV::$ROOT_DIR . ($is_admin_header ? '/admin' : '/home');
  $tracks_url = ENV::$ROOT_DIR . ($is_admin_header ? '/admin/tracks' : '/tracks');
  $artists_url = ENV::$ROOT_DIR . ($is_admin_header ? '/admin/artists' : '/artists');
  $albums_url = ENV::$ROOT_DIR . ($is_admin_header ? '/admin/albums' : '/albums');
  $cart_url = ENV::$ROOT_DIR . '/cart';
  $my_account_url = ENV::$ROOT_DIR . '/my-account';

  $hamburger_img_url = ENV::$ROOT_DIR . '/images/hamburger.png';

  $header = <<<HTML
    <!DOCTYPE html>
    <html lang="en">

    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" defer></script>
    <script src="$js_path" type="module" defer></script>
    <link rel="stylesheet" href="$css">
    <title>$title</title>
    </head>
    <body>
    <header>
    <a href="$home_url">
      <h1>Music Store</h1>
    </a>
    <a id="menu-icon" href=""><img src="$hamburger_img_url" alt="menu" /></a>
    </header>
  HTML;

  if($is_admin_header){
    $is_admin = is_admin();

    // don't display nav if not admin = on sign-in page
    if(!$is_admin) return $header;

    $nav_admin = <<<HTML
    <nav>
      <ul>
        <li><a href="$tracks_url">Tracks</a></li>
        <li><a href="$artists_url">Artists</a></li>
        <li><a href="$albums_url">Albums</a></li>
      </ul>
    </nav>
    <main>
    HTML;

    return $header . $nav_admin;
  }else{
    $nav = <<<HTML
    <nav>
      <ul>
        <!-- <li><a href="$tracks_url">Tracks</a></li>
        <li><a href="$artists_url">Artists</a></li>
        <li><a href="$albums_url">Albums</a></li> -->
        <li><a href="$cart_url">View shopping cart</a></li>
        <li><a href="$my_account_url">My account</a></li>
      </ul>
    </nav>
    <main>
    HTML;

    return $header . $nav;
  }
}