<?php include_once __DIR__ . '/../utilities/constants.php' ?>

<?php
// First of all send css header
header("Content-type: text/css");

// Array of css files
$css = array(
    'home/home.css',
    'tracks/tracks.css',
    'tracks/one-track/one-track.css',
    'albums/albums.css',
    'albums/one-album/one-album.css',
    'cart/cart.css',
    'cart/checkout/checkout.css',
    'cart/checkout/checkout-done/checkout-done.css',
    'my-account/my-account.css',
    'my-account/sign-in/sign-in.css',
    'my-account/register/register.css',
    'common/header/header.css',
    'common/searchbar/searchbar.css',
    'common/footer/footer.css',
    'admin/sign-in/sign-in.css',
    'admin/tracks/tracks.css',
);

// Prevent a notice
$css_content = file_get_contents('styles.css');

// Loop the css Array
foreach ($css as $css_file) {
    // Load the content of the css file 
    $css_content .= file_get_contents(__DIR__ . "/../src/$css_file");
}

// print the css content
echo $css_content;
?>