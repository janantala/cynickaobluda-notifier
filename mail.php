<?php
$title = $_POST["title"];
$img = $_POST["img"];

$to = "email@example.com";
$subject = $title;
$from = "Cynická obluda <cynickaobluda@example.com>";

$message = '<html><body>';
$message .= '<img src="' . $img . '" />';
$message .= '</body></html>';

$headers = "From:" . $from . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";


mail($to, $subject, $message, $headers);

echo "received";