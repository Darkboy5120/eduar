<?php require_once("$VIEW_COMPONENT_CONTENT_FOLDER/navbar.php"); ?>
<?php require_once("$VIEW_MODAL_PAGE_FOLDER/sign.php"); ?>
<?php require_once("$VIEW_MODAL_PAGE_FOLDER/myar.php"); ?>

<div class="container">
    <div class="loading">
        <i class='fas fa-sync-alt fa-spin'></i>
    </div>
    <div class="header hidden" id="is-dev-full">
        <h1>Has subido los siguientes AR</h1>
        <p></p>
        <a href="?p=newar"><button><i class="fas fa-plus"></i> Subir AR</button></a>
    </div>
    <div class="header hidden" id="is-dev-empty">
        <h1>Aun no has subido aplicaciones</h1>
        <p>Si necesitas ayuda para comenzar, consulta la <a href="">guía</a> para desarrolladores</p>
        <a href="?p=newar"><button><i class="fas fa-plus"></i> Subir AR</button></a>
    </div>
    <div class="header hidden" id="not-dev">
        <h1>Aun no has activado el modo desarrollador</h1>
        <p>Solo los desarrolladores pueden subir sus aplicaciones</p>
        <button id="become-developer-trigger">Activar modo desarrollador</button>
    </div>
    <div class="header hidden" id="header-error">
        <h1>Error</h1>
        <p>Lo sentimos, hubo un problema al cargar el contenido, intente de nuevo por favor</p>
        <button onclick="location = location;">Recargar página</button>
    </div>
</div>