<?php
require "../users/root.php";

function dataIsAllRight () {
    if (!isset($_REQUEST["name"])) {
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

$name = $mi0->sanitize($_REQUEST["name"]);

$mi0->query("
    SELECT
        name
    FROM
        aplication
    WHERE
        name = '$name'"
);
if ($mi0->result->num_rows === 0) {
    $mi0->end("commit", 0, NULL);
} else {
    $mi0->end("rollback", 1, NULL);
}