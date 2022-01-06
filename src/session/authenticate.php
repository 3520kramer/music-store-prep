<?php

function base64url_encode($str)
{
  return rtrim(strtr(base64_encode($str), '+/', '-_'), '=');
}

function is_jwt_valid(string $jwt, string $secret = 'secret'): bool
{
  //remove Bearer from the jwt
  if (str_starts_with($jwt, 'Bearer ')) {
    $jwt = substr($jwt, 7);
  };

  // split the jwt and decode
  $token_parts = explode('.', $jwt);

  if (count($token_parts) !== 3) return false;
  $header = base64_decode($token_parts[0]);
  $payload = base64_decode($token_parts[1]);
  $signature_provided = $token_parts[2];

  // check the expiration time - note: this will cause an error if there is no 'exp' claim in the jwt
  $expiration = json_decode($payload)->exp;
  $is_token_expired = ($expiration - time()) < 0;

  // build a signature based on the header and payload using the secret
  $base64_url_header = base64url_encode($header);
  $base64_url_payload = base64url_encode($payload);
  $signature = hash_hmac('SHA256', $base64_url_header . "." . $base64_url_payload, $secret, true);
  $base64_url_signature = base64url_encode($signature);

  // verify it matches the signature provided in the jwt
  $is_signature_valid = ($base64_url_signature === $signature_provided);

  if ($is_token_expired || !$is_signature_valid) {
    return false;
  } else {
    return true;
  }
}

function validate_headers_jwt(): mixed
{
  $headers = apache_request_headers();
  $auth_header = $headers['Authorization'] ?? null;

  if (is_null($auth_header) || !is_jwt_valid($auth_header)) {
    http_response_code(401);
    echo 'Not authorized';
    return false;
  }
  return $auth_header;
}

function validate_session_jwt(): mixed
{
  $jwt = $_SESSION['jwt'] ?? null;
  if (is_null($jwt) || !is_jwt_valid($jwt)) {
    http_response_code(401);
    echo 'Not authorized';
    return false;
  }
  return true;
}

// split the jwt and decode payload
function get_jwt_payload(string $jwt = null)
{
  $jwt = $jwt ?? $_SESSION['jwt'] ?? null;
  if (!$jwt) return false;

  $token_parts = explode('.', $jwt);
  $payload = base64_decode($token_parts[1]);
  return json_decode($payload, true);
}

function is_admin(): bool
{
  $jwt = get_jwt_payload();
  return $jwt['is_admin'] ?? false;
}
