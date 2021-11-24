<div class="modal hidden" id="modal-signin-form">
    <div class="modal-card-big">
        <div class="modal-header">
            <h2>Inicio de sesión</h2>
            <button><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
            <form>
                <h3>Llena tus datos</h3>
                <div class="input">
                    <label for="signin-email">Correo</label>
                    <input id="signin-email" type="email" placeholder="ejemplo@gmail.com">
                    <span class="log"></span>
                </div>
                <div class="input">
                    <label for="signin-password">Contraseña</label>
                    <input id="signin-password" type="password">
                    <span class="log"></span>
                </div>
                <button type="button" id="signin-submit">Iniciar sesión</button>
                <p>¿Aun no tienes cuenta? registrate <span id="signin-to-signup">aquí</span></p>
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
                <h3>Llena tus datos</h3>
                <div class="input">
                    <label for="signup-firstname">Nombre(s)</label>
                    <input id="signup-firstname" type="text">
                    <span class="log"></span>
                </div>
                <div class="input">
                    <label for="signup-lastname">Apellido(s)</label>
                    <input id="signup-lastname" type="text">
                    <span class="log"></span>
                </div>
                <div class="input">
                    <label for="signup-email">Correo</label>
                    <input id="signup-email" type="email" placeholder="ejemplo@gmail.com">
                    <span class="log"></span>
                </div>
                <div class="input">
                    <label for="signup-password">Contraseña</label>
                    <input id="signup-password" type="password" placeholder="Solo números y letras">
                    <span class="help">Solo números y letras</span>
                    <span class="log"></span>
                </div>
                <div class="input">
                    <label for="signup-confirm-password">Confirmar contraseña</label>
                    <input id="signup-confirm-password" type="password">
                    <span class="log"></span>
                </div>
                <div class="input">
                    <label for="signup-birthdate">Fecha de nacimiento</label>
                    <input id="signup-birthdate" type="date">
                    <span class="log"></span>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="signup-politics"> Acepto los términos y condiciones de uso</label>
                    <span class="log"></span>
                </div>
                <button type="button" id="signup-submit">Crear cuenta</button>
                <p>¿Ya tienes cuenta? inicia sesión <span id="signup-to-signin">aquí</span></p>
            </form>
        </div>
    </div>
</div>