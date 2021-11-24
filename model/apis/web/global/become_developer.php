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
    INSERT INTO developer
        (fk_consumer_id)
    VALUES
        ('$pk_email')"
);
if ($mi0->result === TRUE) {
    $mi0->end("commit", 0, NULL);
} else {
    $mi0->end("rollback", -3, NULL);
}