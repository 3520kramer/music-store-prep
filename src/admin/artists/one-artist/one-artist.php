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
echo get_header('Admin - Track', 'admin/artists/one-artist/one-artist.js', true);
?>
<section id="one-artist-section">
  <section class="admin-one-element-header">
    <h2>Update artist</h2>
    <button class="button" id="delete-button">Delete artist</button>
  </section>
  <form class="form-grid">
    <form id="update-artist-form" class="form-grid form-update">
      <label for="artistName">Artist name</label>
      <input type="text" id="artistName" name="artistName" required />

      <input type="submit" value="Update Artist" />
    </form>
  </form>
</section>