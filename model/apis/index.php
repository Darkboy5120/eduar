<?php
require "../libraries/cs_interface.php";

$API = NULL;

if (isset($_REQUEST["api"])) {
    $API = $_REQUEST["api"];
    switch ($API) {
        case "consumer_signup":
            require "./web/consumer/signup.php";
            break;
        case "global_signin":
            require "./web/global/signin.php";
            break;
        case "global_get_categories":
            require "./web/global/get_categories.php";
            break;
        default: echo json_encode("That's not a valid api");
    }
}