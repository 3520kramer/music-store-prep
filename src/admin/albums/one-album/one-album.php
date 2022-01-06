<?php
include_once __DIR__ . '/../../../../utilities/constants.php';
include_once __DIR__ . '/../../../session/authenticate.php';

//Validate jwt
$is_admin = is_admin();
if (!$is_admin) {
  header('Location: ' . ADMIN_SIGN_IN_ROUTE);
  return;
}

include_once __DIR__ . '/../../../common/header/header.php';
echo get_header('Admin - Album', 'admin/albums/one-album/one-album.js', true);
?>
<section id="one-album-section">
  <div class="admin-one-element-header">
    <h2>Update album</h2>
    <button class="button" id="delete-button">Delete</button>
  </div>

  <form class="form-grid">
    <form id="update-track-form" class="form-grid form-update">
      <label for="albumTitle">Album title</label>
      <input type="text" id="albumTitle" name="albumTitle" required />

      
      <label for="artist">Artist</label>
      <select id="artist" name="artist" required></select>

      <input type="submit" value="Update Track" />
    </form>

  </form>
</section>