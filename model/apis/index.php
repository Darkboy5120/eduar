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
        case "developer_remove_app":
            require "./web/developer/remove_app.php";
            break;
        case "consumer_get_ar":
            require "./web/consumer/get_ar.php";
            break;
        case "consumer_get_ar_all":
            require "./web/consumer/get_ar_all.php";
            break;
        case "consumer_switch_ar_stat":
            require "./web/consumer/switch_ar_stat.php";
            break;
        case "consumer_get_ar_images":
            require "./web/consumer/get_ar_images.php";
            break;
        case "consumer_download_ar":
            require "./web/consumer/download_ar.php";
            break;
        case "consumer_get_favorite":
            require "./web/consumer/get_favorite.php";
            break;
        case "global_search_ar":
            require "./web/global/search_ar.php";
            break;
        default: echo json_encode("That's not a valid api");
    }
}