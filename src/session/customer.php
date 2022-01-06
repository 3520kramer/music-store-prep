<?php
include_once __DIR__ . '/authenticate.php';

// Only handle getting customer id on this route
if($_SERVER['REQUEST_METHOD'] !== 'GET') return;

// Validate jwt before returning customer data
$jwt = validate_headers_jwt();

if(!$jwt) return;

$payload = get_jwt_payload($jwt);

echo $payload['customer_id'];