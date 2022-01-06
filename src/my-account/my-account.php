<?php
include_once __DIR__ . '/../session/authenticate.php';
include_once __DIR__ . '/../../utilities/constants.php';

include_once __DIR__ . '/../common/header/header.php';
echo get_header('My account', 'my-account/my-account.js');

//Validate jwt
$is_valid = validate_session_jwt();
if(!$is_valid) {
  header('Location: ' . SIGN_IN_ROUTE);
  return;
}
?>

<section id="my-account-section">
  <h1>My account</h1>
  <a class="button"href="">
    <p>Sign out</p>
  </a>
</section>
