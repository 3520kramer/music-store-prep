<?php
include_once 'utilities/url.php';
include_once 'src/session/authenticate.php';
include_once 'environment/my-env.php';
// Initializing the static class with environment variables
Env::set_env_vars(__DIR__);

session_start();

$url = get_url(__DIR__);

if (count($url) === 1) {
  array_push($url, 'home');
}
$jwt = $_SESSION['jwt'] ?? null;

switch ([$url[1], $url[2] ?? null]) {
  case ['home', null]:
    include_once('src/home/home.php');
    break;

  case ['tracks', null]:
    include_once('src/tracks/tracks.php');
    break;

  case ['tracks', 'view']:
    include_once('src/tracks/one-track/one-track.php');
    break;

  case  ['artists', null]:
    include_once('src/artists/artists.php');
    break;
  
  case  ['artists', 'view']:
    include_once('src/artists/artists.php');
    break;

  case  ['albums', null]:
    include_once('src/albums/albums.php');
    break;

  case ['albums', 'view']:
    include_once('src/albums/one-album/one-album.php');
    break;

  case  ['cart', null]:
    include_once('src/cart/cart.php');
    break;

  case  ['cart', 'checkout']:
    include_once('src/cart/checkout/checkout.php');
    break;

  case  ['cart', 'checkout-done']:
    include_once('src/cart/checkout/checkout-done/checkout-done.php');
    break;

  case  ['my-account', null]:
    include_once('src/my-account/my-account.php');
    break;

  case  ['my-account', 'sign-in']:
    include_once('src/my-account/sign-in/sign-in.php');
    break;

  case  ['my-account', 'register']:
    include_once('src/my-account/register/register.php');
    break;

  case  ['admin', null]:
  case  ['admin', 'sign-in']:
    include_once('src/admin/sign-in/sign-in.php');
    break;

  case  ['admin', 'tracks']:
    include_once('src/admin/tracks/tracks.php');
    break;

  case  ['admin', 'tracks-view']:
  case  ['admin', 'tracks-create']:
    include_once('src/admin/tracks/one-track/one-track.php');
    break;

  case  ['admin', 'artists']:
    include_once('src/admin/artists/artists.php');
    break;

  case  ['admin', 'artists-view']:
  case  ['admin', 'artists-create']:
    include_once('src/admin/artists/one-artist/one-artist.php');
    break;

  case  ['admin', 'albums']:
    include_once('src/admin/albums/albums.php');
    break;

  case  ['admin', 'albums-view']:
  case  ['admin', 'albums-create']:
    include_once('src/admin/albums/one-album/one-album.php');
    break;

  default:
    echo 'error';
    break;
}

include_once('src/common/footer/footer.php');
