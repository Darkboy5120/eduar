<?php
require "../users/root.php";

function dataIsAllRight () {
    if (!isset($_REQUEST["aplication"])
        ) {
        return false;
    }

    return true;
}

if ($ci0->getSession("securitykey") !== $ci0->getSecuritykey()) {
    $mi0->abort(-1, NULL);
} else if (!dataIsAllRight()) {
    $mi0->abort(-2, NULL);
} else if (!$ci0->existSession("user_data")) {
    $mi0->abort(-3, NULL);
}

$mi0->begin();

$aplication = $mi0->sanitize($_REQUEST["aplication"]);
$email = $ci0->getSession("user_data")["pk_email"];

//solo cuentas las descargar unicas por cada usuario, las globales no se cuentan

$mi0->query("
    SELECT
        aplication_interaction.pk_id
    FROM
        aplication_interaction
    LEFT JOIN
        (aplication_download)
    ON
        (aplication_interaction.pk_id = aplication_download.fk_aplicationinteraction_id)
    WHERE
        aplication_interaction.fk_aplication_id = '$aplication'"
);
if ($mi0->result->num_rows === 0) {
    $mi0->query("
        INSERT INTO aplication_interaction
            (fk_aplication_id, fk_consumer_id, fk_interaction_type)
        VALUES
            ('$aplication', '$email', 'download')"
    );
    if ($mi0->result === FALSE) {
    $mi0->end("rollback", -4, NULL);
    }

    $last_interaction = $mi0->link->insert_id;
    $mi0->query("
        INSERT INTO aplication_download
            (fk_aplicationinteraction_id, fk_aplicationinteraction_type)
        VALUES
            ('$last_interaction', 'download')"
    );
    if ($mi0->result === FALSE) {
    $mi0->end("rollback", -5, NULL);
    }
}

$mi0->query("
    SELECT
        filepath
    FROM
        aplication
    WHERE
        pk_id = '$aplication'"
);
if ($mi0->result->num_rows === 0) {
    $mi0->end("rollback", -6, NULL);
}

$mi0->end("commit", 0, NULL);