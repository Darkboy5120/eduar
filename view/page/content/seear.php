<?php require_once("$VIEW_COMPONENT_CONTENT_FOLDER/navbar.php"); ?>
<?php require_once("$VIEW_MODAL_PAGE_FOLDER/sign.php"); ?>

<div class="container">
    <h1 id="name">Centro de cargar con cuchillas 120v</h1>
    <div class="header">
        <img id="background" src="" alt="Background image">
        <div class="info">
            <div class="more-info">
                <span>Desarrollado por <a href="" id="author">FooGuy5</a></span>
                <span><a href="" id="github">Github</a></span>
                <span id="version">v2.3</span>
            </div>
            <div class="actions">
                <button id="favorites-button"><i class="fas fa-heart"></i> <span id="favorites-value">2k</span></button>
                <button id="endorsements-button"><i class="fas fa-thumbs-up"></i> <span id="endorsements-value">5k</span></button>
                <button id="downloads-button"><i class="fas fa-download"></i> <span id="downloads-value">20k</span></button>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="tabs">
            <button class="active" data-tab="description">Descripción</button>
            <button data-tab="images">Imágenes</button>
            <button data-tab="comments">Comentarios</button>
        </div>
        <div class="sections">
            <div class="hidden" id="description">
                <div class="loading">
                    <i class='fas fa-sync-alt fa-spin'></i>
                </div>
            </div>
            <div class="hidden" id="images">
                <div class="loading">
                    <i class='fas fa-sync-alt fa-spin'></i>
                </div>
            </div>
            <div class="hidden" id="comments">
                <form>
                    <label for="new-comment">Commentario</label>
                    <textarea id="new-comment" rows="5"></textarea>
                    <button id="add-comment" type="submit">Enviar</button>
                </form>
                <div class="comments-container">
                    <div class="comment">
                        <span><b>Hilario</b></span>
                        <span>hace 1 minuto</span>
                        <p>la aplicacion es muy buena, me sirvio a mi y a mis compañesros, espero con ancias 
                            siguiente version :)
                        </p>
                        <div class="reactions">
                            <i class="far fa-laugh-beam"> 1k</i>
                            <i class="far fa-sad-tear"> 1k</i>
                            <i class="far fa-angry"> 1k</i>
                            <i class="far fa-surprise"> 1k</i>
                        </div>
                    </div>
                    <div class="comment">
                        <span><b>Hilario</b></span>
                        <span>hace 1 minuto</span>
                        <p>la aplicacion es muy buena, me sirvio a mi y a mis compañesros, espero con ancias 
                            siguiente version :)
                        </p>
                        <div class="reactions">
                            <i class="far fa-laugh-beam"> 1k</i>
                            <i class="far fa-sad-tear"> 1k</i>
                            <i class="far fa-angry"> 1k</i>
                            <i class="far fa-surprise"> 1k</i>
                        </div>
                    </div>
                    <div class="comment">
                        <span><b>Hilario</b></span>
                        <span>hace 1 minuto</span>
                        <p>la aplicacion es muy buena, me sirvio a mi y a mis compañesros, espero con ancias 
                            siguiente version :)
                        </p>
                        <div class="reactions">
                            <i class="far fa-laugh-beam"> 1k</i>
                            <i class="far fa-sad-tear"> 1k</i>
                            <i class="far fa-angry"> 1k</i>
                            <i class="far fa-surprise"> 1k</i>
                        </div>
                    </div>
                    <div class="comment">
                        <span><b>Hilario</b></span>
                        <span>hace 1 minuto</span>
                        <p>la aplicacion es muy buena, me sirvio a mi y a mis compañesros, espero con ancias 
                            siguiente version :)
                        </p>
                        <div class="reactions">
                            <i class="far fa-laugh-beam"> 1k</i>
                            <i class="far fa-sad-tear"> 1k</i>
                            <i class="far fa-angry"> 1k</i>
                            <i class="far fa-surprise"> 1k</i>
                        </div>
                    </div>
                    <div class="comment">
                        <span><b>Hilario</b></span>
                        <span>hace 1 minuto</span>
                        <p>la aplicacion es muy buena, me sirvio a mi y a mis compañesros, espero con ancias 
                            siguiente version :)
                        </p>
                        <div class="reactions">
                            <i class="far fa-laugh-beam"> 1k</i>
                            <i class="far fa-sad-tear"> 1k</i>
                            <i class="far fa-angry"> 1k</i>
                            <i class="far fa-surprise"> 1k</i>
                        </div>
                    </div>
                </div>
                <div class="loading">
                    <i class='fas fa-sync-alt fa-spin'></i>
                </div>
            </div>
        </div>
    </div>
</div>