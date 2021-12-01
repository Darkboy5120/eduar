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
}

$mi0->begin();

$aplication = $mi0->sanitize($_REQUEST["aplication"]);

$mi0->query("
    SELECT
        aplication_image.pk_filepath
    FROM
        aplication_image
    WHERE
        aplication_image.fk_aplication_id = '$aplication'
        AND aplication_image.pk_filepath NOT IN (
            SELECT
                fk_aplicationimage_id
            FROM
                aplication_image_thumbnail
            WHERE
                fk_aplication_id = '$aplication')
        AND aplication_image.pk_filepath NOT IN (
            SELECT
                fk_aplicationimage_id
            FROM
                aplication_image_background
            WHERE
                fk_aplication_id = '$aplication')"
);
if ($mi0->result->num_rows === 0) {
    $mi0->end("rollback", -3, NULL);
}
$data = $mi0->result->fetch_all(MYSQLI_ASSOC);

$mi0->end("commit", 0, $data);