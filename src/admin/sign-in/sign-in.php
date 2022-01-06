<?php 
include_once __DIR__ . '/../../../utilities/constants.php';
include_once __DIR__ . '/../../session/authenticate.php';
include_once __DIR__ . '/../../common/header/header.php';
echo get_header('Admin - Sign in', 'admin/sign-in/sign-in.js', true);

$is_admin = is_admin();
if($is_admin) header('Location: ' . ADMIN_TRACKS_ROUTE);
?>

<section id="admin-sign-in-section">
  <h5>Sign in</h5>
  <form action="#">
    <input type="text" name="username" id="username" />
    <input type="password" name="password" id="password" />
    <input type="submit" value="Sign in" />
  </form>
</section>