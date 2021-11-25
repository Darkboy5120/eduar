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

    <div class="myar" id="myar">
        <div class="header">
            <div class="left">
                <p>Páginas</p>
                <div class="actions" id="myar-pagination-top">
                </div>
            </div>
            <div class="right">
                <div class="filter">
                    <p>Categoria</p>
                    <div class="actions">
                        <select id="filter-category" data-filter>
                        </select>
                    </div>
                </div>
                <div class="filter">
                    <p>Ordenar por</p>
                    <div class="actions">
                        <select id="filter-orderby" data-filter>
                            <option value="0">Descargas</option>
                            <option value="1">Popularidad</option>
                            <option value="2">Favoritos</option>
                        </select>
                    </div>
                </div>
                <div class="filter">
                    <p>Orden</p>
                    <div class="actions">
                        <select id="filter-order" data-filter>
                            <option value="0">Ascendente</option>
                            <option value="1">Descendente</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="results" id="results">
        </div>
    </div>
</div>