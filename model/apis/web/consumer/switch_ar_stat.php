<?php
require "../users/root.php";

function dataIsAllRight () {
    if (!isset($_REQUEST["aplication"])
        || !isset($_REQUEST["stat"])
        || !isset($_REQUEST["value"])
        ) {
        return false;
    }

    if ($_REQUEST["value"] != "0"
        && $_REQUEST["value"] != "1") {
            return false;
    }

    if ($_REQUEST["stat"] != "0"
        && $_REQUEST["stat"] != "1") {
            return false;
    }

    return true;
}

if ($ci0->getSession("securitykey") !== $ci0->getSecuritykey()) {
    $mi0->abort(-1, NULL);
} else if (!dataIsAllRight()) {
    $mi0->abort(-2, NULL);
}

if (!$ci0->existSession("user_data")) {
    $mi0->abort(-3, NULL);
}

$mi0->begin();

$email = $ci0->getSession("user_data")["pk_email"];
$aplication = $mi0->sanitize($_REQUEST["aplication"]);
$stat = $mi0->sanitize($_REQUEST["stat"]);
$value = $mi0->sanitize($_REQUEST["value"]);
$interaction = "";
$table_name = "";
switch ($stat) {
    case "0":
        $table_name = "favorite";
        $interaction = "favorite";
        break;
    case "1":
        $table_name = "endorsement";
        $interaction = "endorsement";
        break;
}

if ($value == "1") {
    $mi0->query("
        INSERT INTO aplication_interaction
            (fk_aplication_id, fk_consumer_id, fk_interaction_type)
        VALUES
            ('$aplication', '$email', '$interaction')"
    );
    if ($mi0->result === FALSE) {
        $mi0->end("rollback", -4, NULL);
    }

    $last_interaction = $mi0->link->insert_id;
    $mi0->query("
        INSERT INTO aplication_$table_name
            (fk_aplicationinteraction_id, fk_aplicationinteraction_type)
        VALUES
            ('$last_interaction', '$interaction')"
    );
    if ($mi0->result === FALSE) {
        $mi0->end("rollback", -5, NULL);
    }
} else if ($value == "0") {
    $mi0->query("
        DELETE FROM aplication_interaction
        WHERE
            fk_aplication_id = '$aplication' AND fk_consumer_id = '$email'"
    );
    if ($mi0->result === FALSE) {
        $mi0->end("rollback", -6, NULL);
    }
}

$mi0->end("commit", 0, NULL);