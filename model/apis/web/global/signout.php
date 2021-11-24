<?php
require "../users/root.php";

$response = array(
    "code" => 0,
    "log" => ""
);

if ($ci0->getSession("securitykey") !== $ci0->getSecuritykey()) {
    $response["code"] = -1;
}

try {
    $ci0->destroy();
} catch (Exception $e) {
    $response["code"] = -2;
    $response["log"] = "Something went wrong";
}
echo json_encode($response);