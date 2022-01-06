<?php

function get_url($index_root = __DIR__)
{
  // Get url without parameters
  $url = strtok($_SERVER['REQUEST_URI'], '?');

  // Exclude the trailing slash from basedir if present
  $url = rtrim($url, '/');

  // Remove everything in the url which comes before the basedir
  // Allow the api to be deployed anywhere
  $url = substr($url, strpos($url, basename($index_root)));
  #$url = substr($url, strpos($url, basename(__DIR__)));

  // Split the array by '/'
  $urlPieces = explode('/', urldecode($url));

  return $urlPieces;
}

function url_get_last_element(){
  $url = get_url();
  return end($url);
}