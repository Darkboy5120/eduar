<?php
require "../users/root.php";

function dataIsAllRight () {
    global $mi0;
    $shorttext_opt = array("regex" => "/[^A-Za-z]+( [^A-Za-z])*$/", "min" => 5, "max" => 25);
    $longtext_opt = array("regex" => "/[^A-Za-z]+( [^A-Za-z])*$/", "min" => 5, "max" => 255);
    $link_opt = array("regex" => "/[^A-Za-z]+( [^A-Za-z])*$/", "min" => 5, "max" => 255);
    if ($mi0->analyze($_REQUEST["name"], $shorttext_opt)
        || $mi0->analyze($_REQUEST["description"], $longtext_opt)
        || $mi0->analyze($_REQUEST["github"], $link_opt)
        || !isset($_REQUEST["category"])
    ) {
        return FALSE;
    } else if (count($_FILES) != 7) {

    }
    //checar que el archivo sea apk
    //checar que las imagenes tambien
    return TRUE;
}

if ($ci0->getSession("securitykey") !== $ci0->getSecuritykey()
    ) {
    $mi0->abort(-1, NULL);
} else if (!dataIsAllRight()) {
    $mi0->abort(-2, NULL);
}

$files_path = "../files/aplication_apk/";

$developer_id = $ci0->getSession("user_data")["pk_email"];
$name = $mi0->sanitize($_REQUEST["name"]);
$category = $mi0->sanitize($_REQUEST["category"]);
$description = $mi0->sanitize($_REQUEST["description"]);
$github = $mi0->sanitize($_REQUEST["github"]);
$filepath = $files_path . $mi0->getRandString(10) . ".apk";

$mi0->begin();

$mi0->query("
    INSERT INTO aplication
        (fk_developer_id, fk_aplicationcategory_id, name, description, github, filepath)
    VALUES
        ('$developer_id', '$category', '$name', '$description', '$github', '$filepath')"
);
if ($mi0->result === FALSE) {
    $mi0->end("rollback", -3, NULL);
}

if (!move_uploaded_file($_FILES["file_apk"]["tmp_name"], $filepath)) {
    $mi0->end("rollback", -4, NULL);
}

$images_path = "../files/aplication_images/";
$last_aplication_id = $mi0->link->insert_id;

foreach ($_FILES as $name => $file) {
    if ($name == "images_background"
        || $name == "images_thumbnail"
        || strpos($name, "images_other") !== FALSE
        ) {

            while (TRUE) {
                $new_image_path = $images_path . $mi0->getRandString(10) . "." . substr($file["type"], 6);
                $mi0->query("
                    INSERT INTO aplication_image
                        (pk_filepath, fk_aplication_id)
                    VALUES
                        ('$new_image_path', '$last_aplication_id')"
                );
                if ($mi0->result === FALSE) {
                    if ($mi0->getErrorName() === "DUPLICATE_KEY") {
                        continue;
                    }
                    $mi0->end("rollback", -5, NULL);
                }
                break;
            }
            if (!move_uploaded_file($file["tmp_name"], $new_image_path)) {
                $mi0->end("rollback", -6, NULL);
            }

            if ($name == "images_thumbnail") {

                $mi0->query("
                    INSERT INTO aplication_image_thumbnail
                        (fk_aplication_id, fk_aplicationimage_id)
                    VALUES
                        ('$last_aplication_id', '$new_image_path')"
                );
                if ($mi0->result === FALSE) {
                    $mi0->end("rollback", -7, NULL);
                }

            } else if ($name == "images_background") {
                
                $mi0->query("
                    INSERT INTO aplication_image_background
                        (fk_aplication_id, fk_aplicationimage_id)
                    VALUES
                        ('$last_aplication_id', '$new_image_path')"
                );
                if ($mi0->result === FALSE) {
                    $mi0->end("rollback", -8, NULL);
                }

            }
            
    }
}

$mi0->end("commit", 0, NULL);