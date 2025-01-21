<?php
// Generate a nonce value (random bytes, base64 encoded)
$nonce = base64_encode(random_bytes(16));

// Set the Content-Security-Policy header with the generated nonce
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-{$nonce}'; style-src 'self' 'nonce-{$nonce}';");

?>