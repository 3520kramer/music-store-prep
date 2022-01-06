<?php
// Don't check jwt as cart should always be available 
session_start();

$req_method = $_SERVER['REQUEST_METHOD'];
$cart = $_SESSION['cart'] ?? null;

if ($req_method === 'GET') {
  if (!$cart) {
    http_response_code(204);
  } else {
    header('Content-Type: application/json');
    echo json_encode($cart);
  }
  return;
}

if ($req_method === 'POST') {
  $id = $_POST['id'] ?? null;

  if (!$id) {
    http_response_code(400); // TODO: Change
    return;
  }

  if (!$cart) {
    $_SESSION['cart'] = [$id];
    return;
  }

  if (($key = array_search($id, $cart)) === false) {
    array_push($_SESSION['cart'], $id);
    return;
  } else {
    http_response_code(400);
    return;
  }
}

if ($req_method === 'DELETE') {
  $id = $_GET['id'] ?? null;

  echo "hey";
  // error
  if (!$cart) {
    http_response_code(400);
  } else if (!$id) {
    unset($_SESSION['cart']);
  } else {
    if (($key = array_search($id, $cart)) !== false) {
      unset($_SESSION['cart'][$key]);
    }
  }
}
