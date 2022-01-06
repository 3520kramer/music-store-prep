<?php
include_once __DIR__ . '/../../../utilities/constants.php';
include_once __DIR__ . '/../../common/header/header.php';
echo get_header('Sign in', 'my-account/sign-in/sign-in.js');
?>

<section id="sign-in-section">
  <h5>Sign in</h5>
  <form action="#">
    <input type="text" name="username" id="username" />
    <input type="password" name="password" id="password" />
    <input type="submit" class="button" value="Sign in" />
  </form>

</section>
<button class="button" id="sign-in-button"href="">
    <p>Register</p>
  </button>
<?php
/*

RewriteEngine on

RewriteRule ^src/session.php?$ - [F,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^.*$ /index.php [L,QSA]
*/