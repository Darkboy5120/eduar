<nav class="navbar">
    <div class="dropdown right">
        <i class="fas fa-bars"><span>EduAR</span></i>
        <div class="dropdown-content">
            <!--<span>foo</span>-->
            <a href="?p=home">Categorias</a>
            <a href="?p=welcome">¿Que es EduAR?</a>
            <a href="">Objetivos</a>
            <a href="">Para maestros</a>
            <a href="">Guía para desarrolladores</a>
            <a href="">¿Que es EduAR?</a>
        </div>
    </div>
    <div class="input-search">
        <i class="fas fa-search"></i>
        <input type="text">
    </div>
    <div class="quick-actions">
        <!--<a href="">foo</a>-->
        <div class="dropdown">
            <i class="fas fa-user-circle"></i>
            <div class="dropdown-content">
                <button id="ndd-signin-modal">Iniciar sesión</button>
                <button id="ndd-signup-modal">Crear cuenta</button>
                <!--<a href="">foo</a>-->
            </div>
            <div class="dropdown-content">
                <p data-username></p>
                <p data-email></p>
                <a id="ndd-signin-modal" href="?p=myprofile">Ver perfil</a>
                <a id="ndd-signup-modal" href="?p=myar">Mis AR</a>
                <a id="ndd-signup-modal" href="?p=myfavorites">Mis favoritos</a>
                <button id="ndd-signup">Cerrar sesión</button>
                <!--<a href="">foo</a>-->
            </div>
        </div>
    </div>
</nav>
<script type="module">
    import { RequestMe } from "./controller/component/request_me.js";
    import { AlertMe } from "./controller/component/alert_me.js";

    let ndd_content_arr = document.querySelectorAll(".quick-actions > .dropdown > .dropdown-content");
    const user_data = <?php echo json_encode(($ci0->existSession("user_data")) ? $ci0->getSession("user_data") : null); ?> ;
    if (user_data != null) {
        ndd_content_arr[0].classList.add("hidden");
        ndd_content_arr[1].querySelector("p[data-username]").textContent = user_data.firstname;
        ndd_content_arr[1].querySelector("p[data-email]").textContent = user_data.pk_email;
    } else {
        ndd_content_arr[1].classList.add("hidden");
    }

    ndd_content_arr[1].querySelector("#ndd-signup").addEventListener("click", () => {
        RequestMe.get("model/apis/", {
            api: "global_signout",
        }).then(response => {
            switch (response.code) {
                case 0:
                    location = location;
                    break;
                default:
                    new AlertMe("Error", "Ha ocurrido un error, intente de nuevo por favor");
            }
        }); 
    });
</script>