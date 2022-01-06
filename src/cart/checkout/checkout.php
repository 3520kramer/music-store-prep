<?php
include_once __DIR__ . '/../../../utilities/constants.php';
include_once __DIR__ . '/../../common/header/header.php';
echo get_header('Checkout', 'cart/checkout/checkout.js');

// Validate jwt
$is_valid = validate_session_jwt();
// echo $is_valid;
if(!$is_valid) header('Location: ' . VIEW_CART_ROUTE);

// Show cart if it is empty
$cart = $_SESSION['cart'] ?? 0;

if (count($_SESSION['cart']) < 1) {
  header('Location: ' . VIEW_CART_ROUTE);
}
?>

<section id="checkout-section">
  <h4>Enter delivery address</h4>
  <button class="button" id=>Use default adress</button>

  <form id="checkout-form" class="form-grid">
    <label for="address">Address</label>
    <input type="text" id="address" name="address" />
    
    <label for="city">City</label>
    <input type="text" id="city" name="city" />
    
    <label for="postalCode">PostalCode</label>
    <input type="text" id="postalCode" name="postalCode" />
    
    <label for="state">State</label>
    <input type="text" id="state" name="state" />
    
    <label for="country">Country</label>
    <input type="text" id="country" name="country" />
    
    <input type="submit" value="Confirm order" />
  </form>
</section>