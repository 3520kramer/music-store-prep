<?php
include_once __DIR__ . '/../../../utilities/constants.php';
include_once __DIR__ . '/../../../environment/my-env.php';

include_once __DIR__ . '/../../common/header/header.php';
echo get_header('Track', 'tracks/one-track/one-track.js');
?>

<section id="view-track">
  <!-- TEMPLATE -->
  <!-- 
  <img id="track-album" src="https://e-cdns-images.dzcdn.net/images/cover/b5889521dc6324f017e94ece15510571/500x500-000000-80-0-0.jpg" alt=""/>

  <h2 id="track-title">Kill 'em all</h2>

  <a id="track-artist" href="">
    <p>Metallica</p>
  </a>
  <a id="track-album" href="">
    <p>The Black Album</p>
  </a>
  <p>
    <span id="track-genre">Metal</span>
    -
    <span id="track-length">2 min 30 sec</span>
    -
    <span id="track-size">3.4 mb</span>
  </p> -->
  <div id="snackbar">Some text some message..</div>

  <a href="#" class="button" id="add-to-cart">
    <p>Add track to cart</p>
    <img src="<?= ENV::$ROOT_DIR . '/images/add-to-cart.png' ?>" alt="add track to cart" width="25px" />
  </a>

</section>



<!-- <h3>More by < artist>... click here</h3> -->

<!-- <dl>
    <dt>Artist</dt>
    <dd>Foo Fighters</dd>

    <dt>Album</dt>
    <dd>Foo Foo</dd>

    <dt>Genre</dt>
    <dd>something</dd>

    <dt>Song length</dt>
    <dd>2 min 30 sec</dd>

    <dt>Size</dt>
    <dd>3.4 mb</dd>

    <dt>Price</dt>
    <dd>1 $</dd>
  </dl> -->