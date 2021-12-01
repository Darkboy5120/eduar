<?php
$ci0->setSession("securitykey", $ci0->getSecurityKey());
$user_data = ($ci0->existSession("user_data")) ? $ci0->getSession("user_data") : null;
$search_data = array(
    "category" => (isset($_REQUEST["category"])) ? $_REQUEST["category"] : null,
    "orderby" => (isset($_REQUEST["orderby"])) ? $_REQUEST["orderby"] : null,
    "order" => (isset($_REQUEST["order"])) ? $_REQUEST["order"] : null
);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="<?=$VIEW_PAGE_FOLDER?>/style/searchar.css">
    <script src="https://kit.fontawesome.com/0d40d8f017.js" crossorigin="anonymous"></script>

    <title>EduAR - Búsquedad avanzada</title>
</head>
<body>
    <?php require_once("$VIEW_CONTENT_PAGE_FOLDER/searchar.php"); ?>

    <script>
        USER_DATA = <?php echo json_encode($user_data); ?>;
        SEARCH_DATA = <?php echo json_encode($search_data); ?>;
        console.log(USER_DATA, SEARCH_DATA);
    </script>
    <script type="module" src="<?=$CONTROLLER_PAGE_FOLDER?>/searchar.js"></script>
</body>
</html>