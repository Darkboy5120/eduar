<div class="modal hidden" id="modal-signin-form">
    <div class="modal-card-big">
        <div class="modal-header">
            <h2></h2>
            <button><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
            <form>
                <h2>Llena tus datos</h2>
                <div class="input">
                    <label for="email">Correo</label>
                    <input id="email" type="email">
                    <span class="log"></span>
                </div>
                <div class="input">
                    <label for="password">Contraseña</label>
                    <input id="password" type="password">
                    <span class="log"></span>
                </div>
                <button type="button" id="submit-signin">Iniciar sesión</button>
                <p>¿Aun no tienes cuenta? registrate <a href="">aquí</a></p>
            </form>
        </div>
    </div>
</div>
<div class="modal hidden" id="modal-signup-form">
    <div class="modal-card-big">
        <div class="modal-header">
            <h2>Registro de cuenta</h2>
            <button><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
            <form>
                <h2>Llena tus datos</h2>
                <div class="input">
                    <label for="firstname">Nombre(s)</label>
                    <input id="firstname" type="text">
                    <span class="log"></span>
                </div>
                <div class="input">
                    <label for="lastname">Apellido(s)</label>
                    <input id="lastname" type="text">
                    <span class="log"></span>
                </div>
                <div class="input">
                    <label for="email">Correo</label>
                    <input id="email" type="email">
                    <span class="log"></span>
                </div>
                <div class="input">
                    <label for="password">Contraseña</label>
                    <input id="password" type="password">
                    <span class="log"></span>
                </div>
                <div class="input">
                    <label for="confirm-password">Confirmar ontraseña</label>
                    <input id="confirm-password" type="password">
                    <span class="log"></span>
                </div>
                <div class="input">
                    <label for="birthdate">Fecha de nacimiento</label>
                    <input id="birthdate" type="datetime-local">
                    <span class="log"></span>
                </div>
                <label><input type="checkbox" id="politics"> Acepto los términos y condiciones de uso</label><br>
                <button type="button" id="submit-signup">Crear cuenta</button>
                <p>¿Ya tienes cuenta? inicia sesión <a href="">aquí</a></p>
            </form>
        </div>
    </div>
</div>