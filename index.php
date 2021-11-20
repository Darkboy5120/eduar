<?php
$VIEW_PAGE_FOLDER = "view/page";
$VIEW_MAIN_PAGE_FOLDER = "$VIEW_PAGE_FOLDER/main";
$VIEW_MODAL_PAGE_FOLDER = "$VIEW_PAGE_FOLDER/modals";
$VIEW_CONTENT_PAGE_FOLDER = "$VIEW_PAGE_FOLDER/content";
$VIEW_COMPONENT_FOLDER = "view/component";
$VIEW_COMPONENT_CONTENT_FOLDER = "view/component/content";
$CONTROLLER_PAGE_FOLDER = "controller/page";

$DEFAULT_PAGE = "welcome";

function get_requested_page() {
    global $DEFAULT_PAGE;
    return (!isset($_GET["p"])) ? $DEFAULT_PAGE : $_GET["p"];
}
function display_page($page) {
    global $VIEW_MAIN_PAGE_FOLDER, $VIEW_PAGE_FOLDER, $CONTROLLER_PAGE_FOLDER,
        $VIEW_COMPONENT_CONTENT_FOLDER, $VIEW_MODAL_PAGE_FOLDER, $VIEW_CONTENT_PAGE_FOLDER;
    switch ($page) {
        case "welcome":
            require_once("$VIEW_MAIN_PAGE_FOLDER/welcome.php");
            break;
        case "mainmenu":
            require_once("$VIEW_MAIN_PAGE_FOLDER/mainmenu.php");
            break;
        default:
            header("Location: ?p=mainmenu");
    }
}
function display_requested_page() {
    display_page(
        get_requested_page()
    );
}

display_requested_page();