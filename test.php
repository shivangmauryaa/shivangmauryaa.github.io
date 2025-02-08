<?php
// Insecure RFI implementation
$target = isset($_GET['file']) ? $_GET['file'] : '';

if (!empty($target)) {
    include($target);
    echo "Hello, World!"; // Confirmation of successful inclusion
}
?>
