<?php 
include_once __DIR__ . '/../../../utilities/constants.php'; 
include_once __DIR__ . '/../../../environment/my-env.php';
include_once __DIR__ . '/../../common/header/header.php';
echo get_header('Album', 'albums/one-album/one-album.js');
?>
<div id="album-wrapper">

</div> 

<a href="#" class="button">
  <p>Add track to cart</p>
  <img src="<?= ENV::$ROOT_DIR . '/images/add-to-cart.png' ?>" alt="add track to cart" width="25px" />
</a>
