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

$pk_email = $ci0->getSession("user_data")["pk_email"];

$mi0->query("
    SELECT
        fk_consumer_id
    FROM
        developer
    WHERE
        fk_consumer_id = '$pk_email'"
);
if ($mi0->result->num_rows === 0) {
    $mi0->end("commit", 0, NULL);
}

$mi0->query("
    SELECT
        pk_id
    FROM
        aplication
    WHERE
        fk_developer_id = '$pk_email'"
);
if ($mi0->result->num_rows > 0) {
    $mi0->end("commit", 1, NULL);
}
$mi0->end("commit", 2, NULL);