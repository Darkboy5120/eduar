<?php require_once("$VIEW_COMPONENT_CONTENT_FOLDER/navbar.php"); ?>

<div class="container">
    <h1>Bienvenido a EduAR</h1>
    <p>Tenemos muchas AR que te pueden brindarte grandes beneficios en tus clases</p>
    <div class="quicksearch">
        <div class="quickfilters">
            <a href="?p=search&filter=0">Lo más reciente</a>
            <a href="?p=search&filter=1"> Más popular</a>
            <a href="?p=search&filter=2">Más descargado</a>
        </div>
        <div class="categories-container">
            <h2>Categorias AR</h2>
            <p>Comienza a buscar en tu area de interes</p>
            <div class="categories" id="categories">
                <i class='loading fas fa-sync-alt fa-spin'></i>
                <p class="log hidden"></p>
            </div>
        </div>
    </div>
</div>