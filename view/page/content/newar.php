<?php require_once("$VIEW_COMPONENT_CONTENT_FOLDER/navbar.php"); ?>
<?php require_once("$VIEW_MODAL_PAGE_FOLDER/sign.php"); ?>
<?php require_once("$VIEW_MODAL_PAGE_FOLDER/myar.php"); ?>

<div class="container">
    <h1>Subir nueva AR</h1>
    <div class="newar">
        <div class="progress">
            <span>Presentación <i class="fas fa-check"></i></span>
            <span>Imágenes <i class="fas fa-check"></i></span>
        </div>
        <div id="presentation" class="step">
            <h2>Presentación</h2>
            <form>
                <div class="inputs">
                    <div class="input">
                        <label for="pre-name">Nombre</label>
                        <input id="pre-name" type="text">
                        <span class="log"></span>
                        <span>Elije un título llamativo para tu aplicación</span>
                    </div>
                    <div class="input">
                        <label for="pre-desc">Descripción</label>
                        <textarea id="pre-desc" rows="5"></textarea>
                        <span class="log"></span>
                        <span>Detalla lo que hace y no hace la aplicación de una forma atractiva hacia los demás</span>
                    </div>
                    <div class="input">
                        <label for="pre-github">Github de la aplicación</label>
                        <input id="pre-github" type="text">
                        <span class="log"></span>
                        <span>Tu código fuente puede ayudar mucho a otros desarrolladores menos expertos</span>
                    </div>
                </div>
                <div class="actions">
                    <button id="pre-submit" type="button" class="button-submit"><i class="fas fa-arrow-right"></i> Siguiente paso</button>
                </div>
            </form>
        </div>
        <div id="images" class="step hidden">
            <h2>Imágenes</h2>
            <div class="step-container">
                <div class="input-layout">
                    <label for="input-others-image">Sube todas las imágenes que usaras</label>
                    <div class="input-field">
                        <input class="hidden" id="input-others-image" type="file" multiple="true">
                        <div class="input-secondary file-container long">
                            <div class="file-images">
                            </div>
                            <span class="file-empty">No se han agregado imágenes</span>
                            <div class="file-actions">
                                <button type="button" class="file-add"><i class="fas fa-plus"></i> 
                                    Agregar</button>
                                <button type="button" class="file-edit"><i class="fas fa-edit"></i> 
                                    Editar</button>
                            </div>
                        </div>
                    </div>
                    <span class="input-log hidden"></span>
                </div>
                <div class="input-layout">
                    <label for="input-thumbnail-image">Miniatura</label>
                    <div class="input-field">
                        <input class="hidden" id="input-thumbnail-image" type="file" multiple="true">
                        <div class="input-secondary file-container">
                            <div class="file-images">
                            </div>
                            <span class="file-empty">No se han agregado imágenes</span>
                            <div class="file-actions">
                                <button type="button" class="file-add"><i class="fas fa-plus"></i> 
                                    Agregar</button>
                                <button type="button" class="file-edit"><i class="fas fa-edit"></i> 
                                    Editar</button>
                            </div>
                        </div>
                    </div>
                    <span class="input-log hidden"></span>
                    <p>Esta imágen saldra en los resultados de búsquedad, procura que sea llamativa.</p>
                </div>
                <div class="input-layout">
                    <label for="input-background-image">Portada</label>
                    <div class="input-field">
                        <input class="hidden" id="input-background-image" type="file" multiple="true">
                        <div class="input-secondary file-container">
                            <div class="file-images">
                            </div>
                            <span class="file-empty">No se han agregado imágenes</span>
                            <div class="file-actions">
                                <button type="button" class="file-add"><i class="fas fa-plus"></i> 
                                    Agregar</button>
                                <button type="button" class="file-edit"><i class="fas fa-edit"></i> 
                                    Editar</button>
                            </div>
                        </div>
                    </div>
                    <span class="input-log hidden"></span>
                    <p>Esta imágen se mostrara en la página de la aplicación AR, deberia ser una imagen grande.</p>
                </div>
            </div>
            <div class="actions">
                <button class="button-submit" id="images-back"><i class="fas fa-arrow-left"></i> Paso anterior</button>
                <button class="button-submit" id="images-submit"><i class="fas fa-check-double"></i>  Terminar</button>
            </div>
        </div>
    </div>
</div>