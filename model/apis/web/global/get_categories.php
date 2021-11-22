<?php
require "../users/root.php";

function dataIsAllRight () {
    return true;
}

if ($ci0->getSession("securitykey") !== $ci0->getSecuritykey()) {
    $mi0->abort(-1, NULL);
} else if (!dataIsAllRight()) {
    $mi0->abort(-2, NULL);
}

$mi0->begin();

$mi0->query("
    SELECT
        pk_id, name
    FROM
        aplication_category
    ORDER By
        name
    ASC"
);
if ($mi0->result->num_rows > 0) {
    $categories = $mi0->result->fetch_all(MYSQLI_ASSOC);
    $mi0->end("commit", 0, $categories);
} else {
    $mi0->end("rollback", -3, NULL);
}