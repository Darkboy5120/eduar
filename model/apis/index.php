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
        case "global_signout":
            require "./web/global/signout.php";
            break;
        case "global_is_developer":
            require "./web/global/is_developer.php";
            break;
        case "global_become_developer":
            require "./web/global/become_developer.php";
            break;
        case "consumer_check_app_name":
            require "./web/consumer/check_app_name.php";
            break;
        case "developer_create_app":
            require "./web/developer/create_app.php";
            break;
        case "developer_get_ar":
            require "./web/developer/get_ar.php";
            break;
        default: echo json_encode("That's not a valid api");
    }
}