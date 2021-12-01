<?php
require "../users/root.php";

function dataIsAllRight () {
    if (!isset($_REQUEST["aplication"])) {
        return false;
    }

    return true;
}

if ($ci0->getSession("securitykey") !== $ci0->getSecuritykey()) {
    $mi0->abort(-1, NULL);
} else if (!dataIsAllRight()) {
    $mi0->abort(-2, NULL);
}

$mi0->begin();

$email = $ci0->getSession("user_data")["pk_email"];
$aplication = $mi0->sanitize($_REQUEST["aplication"]);

$mi0->query("
    DELETE FROM
        aplication
    WHERE
        fk_developer_id = '$email' AND pk_id = '$aplication'"
);
if ($mi0->result === TRUE) {
    $mi0->end("commit", 0, NULL);
} else {
    $mi0->end("rollback", -1, NULL);
}