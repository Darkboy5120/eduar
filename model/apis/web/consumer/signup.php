<?php
require "../users/root.php";

function dataIsAllRight () {
    if (!isset($_REQUEST["email"])
        || !isset($_REQUEST["firstname"])
        || !isset($_REQUEST["lastname"])
        || !isset($_REQUEST["birthdate"])
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
$firstname = $mi0->sanitize($_REQUEST["firstname"]);
$lastname = $mi0->sanitize($_REQUEST["lastname"]);
$birthdate = $mi0->sanitize($_REQUEST["birthdate"]);
$password = $mi0->hashString($mi0->sanitize($_REQUEST["password"]));

$mi0->begin();

$mi0->query("
    INSERT INTO user
        (pk_email, firstname, lastname, birthdate, password)
    VALUES
        ('$email', '$firstname', '$lastname', '$birthdate', '$password')"
);
if ($mi0->result === TRUE) {
    $last_user_id = $mi0->link->insert_id;
    $mi0->end('commit', 0, $last_user_id);
} else {
    if ($mi0->getErrorName() === "DUPLICATE_KEY") {
        $mi0->end("rollback", -3, NULL);
    }
    $mi0->end("rollback", -4, NULL);
}