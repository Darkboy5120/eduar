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

$email = ($ci0->existSession("user_data")) ? $ci0->getSession("user_data")["pk_email"] : "0";
$aplication = $mi0->sanitize($_REQUEST["aplication"]);

$mi0->query("
    SELECT
        aplication.pk_id,
        aplication.name,
        aplication.description,
        aplication.github,
        aplication.filepath,
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
        AS endorsements,
        aplication_image.pk_filepath AS background,
        (SELECT
            COUNT(aplication_interaction.pk_id)
        FROM
            aplication
        LEFT JOIN
            (aplication_interaction, aplication_favorite)
        ON
            (aplication_interaction.fk_aplication_id = aplication.pk_id
                AND aplication_interaction.pk_id = aplication_favorite.fk_aplicationinteraction_id)
        WHERE
            aplication_interaction.fk_consumer_id = '$email')
        AS already_favorite,
        (SELECT
            COUNT(aplication_interaction.pk_id)
        FROM
            aplication
        LEFT JOIN
            (aplication_interaction, aplication_endorsement)
        ON
            (aplication_interaction.fk_aplication_id = aplication.pk_id
                AND aplication_interaction.pk_id = aplication_endorsement.fk_aplicationinteraction_id)
        WHERE
            aplication_interaction.fk_consumer_id = '$email')
        AS already_endorsement,
        (SELECT
            COUNT(aplication_interaction.pk_id)
        FROM
            aplication
        LEFT JOIN
            (aplication_interaction, aplication_download)
        ON
            (aplication_interaction.fk_aplication_id = aplication.pk_id
                AND aplication_interaction.pk_id = aplication_download.fk_aplicationinteraction_id)
        WHERE
            aplication_interaction.fk_consumer_id = '$email')
        AS already_download
    FROM
        aplication
    LEFT JOIN
        (user, aplication_image, aplication_image_background)
    ON
        (aplication.fk_developer_id = user.pk_email
            AND aplication.pk_id = aplication_image.fk_aplication_id
            AND aplication_image_background.fk_aplicationimage_id = aplication_image.pk_filepath)
    WHERE aplication.pk_id = '$aplication'"
);
if ($mi0->result->num_rows > 0) {
    $data = $mi0->result->fetch_all(MYSQLI_ASSOC)[0];
    $mi0->end("commit", 0, $data);
} else {
    $mi0->end("rollback", -3, NULL);
}