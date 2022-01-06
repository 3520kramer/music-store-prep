<?php
include_once __DIR__ . '/../../../utilities/constants.php';
include_once __DIR__ . '/../../session/authenticate.php';
include_once __DIR__ . '/../../common/searchbar/searchbar.php';

//Validate jwt
$is_admin = is_admin();
if (!$is_admin) {
  header('Location: ' . ADMIN_SIGN_IN_ROUTE);
  return;
}

include_once __DIR__ . '/../../common/header/header.php';
echo get_header('Admin - Albums', 'admin/albums/albums.js', true);
?>

<section class="admin-one-element-header ">
  <h2>Albums</h2>
  <a class="button" id="create-album">Create Album</a>
</section>
<?=get_search_bar("Search for albums")?>

<section id="admin-albums">
  <!-- <a class="button" id="create-album">Create Album</a> -->
</section>
<div id="#search-result-wrapper"></div>