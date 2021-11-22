<?php
require "../users/root.php";

function dataIsAllRight () {
    if (!isset($_REQUEST["email"])
        || !isset($_REQUEST["password"])) {
        return false;
    }

    return true;
}

if ($ci0->getSession("securitykey") !== $ci0->getSecuritykey()) {
    $mi0->abort(-1, NULL);
} else if (!dataIsAllRight()) {
    $mi0->abort(-2, NULL);
}

$email = $mi0->sanitize($_REQUEST["email"]);
$password = $_REQUEST["password"];

$mi0->begin();

$mi0->query("
    SELECT
        pk_email, password, firstname, lastname
    FROM
        user
    WHERE pk_email = '$email'"
);
if ($mi0->result->num_rows > 0) {
    $user_data = $mi0->result->fetch_all(MYSQLI_ASSOC)[0];
    if ($mi0->checkHash($password, $user_data["password"])) {
        $ci0->setSession("user_data", array(
            "pk_email" => $user_data["pk_email"],
            "firstname" => $user_data["firstname"],
            "lastname" => $user_data["lastname"]
        ));
        $mi0->end("commit", 0, NULL);
    }
    $mi0->end("rollback", -3, NULL);
} else {
    $mi0->end("rollback", -4, NULL);
}