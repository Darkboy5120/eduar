<?php
require "../users/root.php";

function getArSql ($email, $category_sql, $orderby_sql, $order_sql, $offset, $limit) {
    $sql = "
    SELECT
        aplication.name,
        user.firstname,
        user.lastname,
        (SELECT
            COUNT(aplication_download.fk_aplicationuniqueinteraction_id)
        FROM
            aplication_download
        LEFT JOIN
            (aplication_unique_interaction)
        ON
            (aplication_download.fk_aplicationuniqueinteraction_id = aplication_unique_interaction.fk_aplication_id)
        WHERE
            aplication_download.fk_aplicationuniqueinteraction_id = aplication_unique_interaction.fk_aplication_id)
        AS downloads,
        (SELECT
            COUNT(aplication_favorite.fk_aplicationuniqueinteraction_id)
        FROM
            aplication_favorite
        LEFT JOIN
            (aplication_unique_interaction)
        ON
            (aplication_favorite.fk_aplicationuniqueinteraction_id = aplication_unique_interaction.fk_aplication_id)
        WHERE
            aplication_favorite.fk_aplicationuniqueinteraction_id = aplication_unique_interaction.fk_aplication_id)
        AS favorites,
        (SELECT
            COUNT(aplication_endorsement.fk_aplicationuniqueinteraction_id)
        FROM
            aplication_endorsement
        LEFT JOIN
            (aplication_unique_interaction)
        ON
            (aplication_endorsement.fk_aplicationuniqueinteraction_id = aplication_unique_interaction.fk_aplication_id)
        WHERE
            aplication_endorsement.fk_aplicationuniqueinteraction_id = aplication_unique_interaction.fk_aplication_id)
        AS endorsements,
        aplication_image.pk_filepath AS thumbnail
    FROM
        aplication
    LEFT JOIN
        (user, aplication_image, aplication_image_thumbnail)
    ON
        (aplication.fk_developer_id = user.pk_email
            AND aplication.pk_id = aplication_image.fk_aplication_id
            AND aplication_image_thumbnail.fk_aplicationimage_id = aplication_image.pk_filepath)
    WHERE
        aplication.fk_developer_id = '$email' $category_sql
    ORDER BY
        $orderby_sql
    $order_sql
    LIMIT $offset, $limit";

    return $sql;
}

function dataIsAllRight () {
    if (!isset($_REQUEST["category"])
        || !isset($_REQUEST["orderby"])
        || !isset($_REQUEST["order"])
        || !isset($_REQUEST["page"])
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

$email = $ci0->getSession("user_data")["pk_email"];
$page = $mi0->sanitize($_REQUEST["page"]);
$limit = 1;
$offset = intval($page) * $limit;
$category = $mi0->sanitize($_REQUEST["category"]);
$category_sql = ($category == "0")
    ? ""
    : "AND aplication.fk_aplicationcategory_id = '$category'";
$orderby = $mi0->sanitize($_REQUEST["orderby"]);
$orderby_sql = "aplication.name";
switch ($orderby) {
    case "0":
        $orderby_sql = "downloads";
        break;
    case "1":
        $orderby_sql = "endorsements";
        break;
    case "2":
        $orderby_sql = "favorites";
        break;
}
$order = $mi0->sanitize($_REQUEST["order"]);
$order_sql = ($order == "0")
    ? "ASC"
    : "DESC";

$mi0->query(
    getArSql($email, $category_sql, $orderby_sql, $order_sql, $offset, $limit)
);
if ($mi0->result->num_rows === 0) {
    $mi0->end("rollback", -3, NULL);
}
$data = array();
$data["limit"] = $limit;
$data["aplications"] = $mi0->result->fetch_all(MYSQLI_ASSOC);

$mi0->query(
    getArSql($email, $category_sql, $orderby_sql, $order_sql, 0, $offset)
);
$data["before"] = $mi0->result->fetch_all(MYSQLI_ASSOC);

$mi0->query(
    getArSql($email, $category_sql, $orderby_sql, $order_sql, ($offset + $limit), 1000000)
);
$data["after"] = $mi0->result->fetch_all(MYSQLI_ASSOC);

$mi0->end("commit", 0, $data);