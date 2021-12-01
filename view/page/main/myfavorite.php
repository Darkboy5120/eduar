<?php
if (!$ci0->existSession("user_data")) {
    header('Location: ?p=home');
    exit;
}
$ci0->setSession("securitykey", $ci0->getSecurityKey());
$user_data = ($ci0->existSession("user_data")) ? $ci0->getSession("user_data") : null;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="<?=$VIEW_PAGE_FOLDER?>/style/myfavorite.css">
    <script src="https://kit.fontawesome.com/0d40d8f017.js" crossorigin="anonymous"></script>

    <title>EduAR - Mis favoritos</title>
</head>
<body>
    <?php require_once("$VIEW_CONTENT_PAGE_FOLDER/myfavorite.php"); ?>

    <script>
        USER_DATA = <?php echo json_encode($user_data); ?>;
        console.log(USER_DATA);
        SEARCH_DATA = null;
    </script>
    <script type="module" src="<?=$CONTROLLER_PAGE_FOLDER?>/myfavorite.js"></script>
</body>
</html>