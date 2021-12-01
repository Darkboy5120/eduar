<?php require_once("$VIEW_COMPONENT_CONTENT_FOLDER/navbar.php"); ?>

<div class="container">
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