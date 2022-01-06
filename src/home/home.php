<?php
include_once __DIR__ . '/../../utilities/constants.php';

include_once __DIR__ . '/../common/header/header.php';
echo get_header('Home', 'home/home.js');

include_once __DIR__ . '/../common/searchbar/searchbar.php'; 
echo get_search_bar("Search for tracks, artists and albums");
?>

<div id="search-result-wrapper">

</div>