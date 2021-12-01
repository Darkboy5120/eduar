<?php
require "../users/root.php";

function dataIsAllRight () {
    if (!isset($_REQUEST["search_value"])
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

$search_value = $mi0->sanitize($_REQUEST["search_value"]);

$mi0->query("
    SELECT
        aplication.pk_id,
        aplication.name,
        user.firstname,
        user.lastname,
        (SELECT
            COUNT(aplication_interaction.pk_id)
        FROM
            aplication_interaction
        WHERE
            aplication_interaction.fk_aplication_id = aplication.pk_id
                AND aplication_interaction.fk_interaction_type = 'download')
        AS downloads,
        (SELECT
            COUNT(aplication_interaction.pk_id)
        FROM
            aplication_interaction
        WHERE
            aplication_interaction.fk_aplication_id = aplication.pk_id
                AND aplication_interaction.fk_interaction_type = 'favorite')
        AS favorites,
        (SELECT
            COUNT(aplication_interaction.pk_id)
        FROM
            aplication_interaction
        WHERE
            aplication_interaction.fk_aplication_id = aplication.pk_id
                AND aplication_interaction.fk_interaction_type = 'endorsement')
        AS endorsements
    FROM
        aplication
    LEFT JOIN
        (user, aplication_image, aplication_image_background)
    ON
        (aplication.fk_developer_id = user.pk_email
            AND aplication.pk_id = aplication_image.fk_aplication_id
            AND aplication_image_background.fk_aplicationimage_id = aplication_image.pk_filepath)
    WHERE LOCATE('$search_value', aplication.name)"
);
if ($mi0->result->num_rows > 0) {
    $data = $mi0->result->fetch_all(MYSQLI_ASSOC);
    $mi0->end("commit", 0, $data);
} else {
    $mi0->end("rollback", -3, NULL);
}