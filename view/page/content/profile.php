<?php require_once("$VIEW_COMPONENT_CONTENT_FOLDER/navbar.php"); ?>

<div class="container">
    <div class="profile">
        <div class="navigation">
            <div class="header">
                <img src="" alt="facepic">
                <h3>Hilarión</h3>
                <div class="level">
                <p>Nivel 3</p>
                <meter id="level" value="2" min="0" max="10"></meter><br>
                </div>
            </div>
            <ul>
                <li><button data-tab="configuration">Configuración</button></li>
                <li><button data-tab="profile">Perfil</button></li>
                <li><button data-tab="verification">Verificación</button></li>
                <li><button data-tab="achievements">Logros</button></li>
            </ul>
        </div>
        <div class="sections">
            <div id="configuration" class="hidden section">foo1</div>
            <div id="profile" class="hidden section">foo2</div>
            <div id="verification" class="hidden section">foo3</div>
            <div id="achievements" class="hidden section">foo4</div>
        </div>
    </div>
</div>