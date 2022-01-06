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
echo get_header('Admin - Track', 'admin/tracks/one-track/one-track.js', true);
?>
<section id="one-track-section">
  <div class="admin-one-element-header">
    <h4>Update track</h4>
    <button class="button" id="delete-button">Delete</button>
  </div>

  <form class="form-grid">
    <form id="update-track-form" class="form-grid form-update">
      <label for="trackTitle">Title</label>
      <input type="text" id="trackTitle" name="trackTitle" required />

      <label for="artist">Artist</label>
      <select id="artist" name="artist" required></select>

      <label for="album">Album</label>
      <select id="album" name="album" required></select>

      <label for="trackTime">Time</label>
      <input type="number" id="trackTime" name="trackTime" required />

      <label for="trackSize">Size</label>
      <input type="number" id="trackSize" name="trackSize" required />

      <label for="trackPrice">Price</label>
      <input type="text" id="trackPrice" name="trackPrice" required />

      <label for="trackMediaType">Media type</label>
      <select id="trackMediaType" name="trackMediaType" required></select>

      <label for="trackGenre">Genre</label>
      <select id="trackGenre" name="trackGenre" required></select>

      <label for="trackComposer">Composer</label>
      <input type="text" id="trackComposer" name="trackComposer" required />

      <input type="submit" value="Update Track" />
    </form>

  </form>
</section>