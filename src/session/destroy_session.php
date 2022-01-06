<?php
include_once __DIR__ . '/../../utilities/constants.php';
session_start();

//1. First invalidate the session cookie
if (isset($_COOKIE[session_name()])) {
  setcookie(session_name(), '', time() - 86400, '/');
}
//2. Then close the session
session_destroy();
header('Location: '.ROOT_DIR);


/**
 * 
 * 
 * 
 * 
 *    SESSION DESTROYS BASKET WHEN SIGNING OUT - 
 *    ...might be okay - but data could be stored in db
 */