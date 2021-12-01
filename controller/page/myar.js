import { Modal } from "../component/modal.js";
import { Navbar } from "../component/navbar.js";
import { Form } from "../component/form.js";
import { AlertMe } from "../component/alert_me.js";
import { RequestMe } from "../component/request_me.js";
import { AdvanceSearch } from "../component/advance_search.js";

(function () {
    let navbarController = Navbar();
    navbarController.main();

    let modal = {
        become_developer_warning : Modal("#modal-become-developer-warning"),
        remove_app_warning : Modal("#modal-remove-app-warning")
    }

    let advanceSearch = AdvanceSearch("#myar", navbarController, {
        type : "myar",
        modal : modal
    });
    advanceSearch.main();

    const become_developer = () => {
        let submit_button = document.querySelector("#become-developer");
        let default_submit_text = submit_button.innerHTML;
        submit_button.innerHTML = "<i class='fas fa-sync-alt fa-spin'></i> Cargando...";

        RequestMe.post("model/apis/", {
            api: "global_become_developer",
        }).then(response => {
            submit_button.innerHTML = default_submit_text;
            switch (response.code) {
                case 0:
                    location = location;
                    break;
                default:
                    new AlertMe("Error", "Ha ocurrido un error, intente de nuevo por favor");
            }
        });
    }

    document.querySelector("#become-developer-trigger").addEventListener("click", () => {
        modal.become_developer_warning.show();
    });
    document.querySelector("#m-bdw-cancel").addEventListener("click", () => {
        modal.become_developer_warning.hide();
    });
    document.querySelector("#m-raw-cancel").addEventListener("click", () => {
        modal.remove_app_warning.hide();
    });
    document.querySelector("#become-developer").addEventListener("click", () => {
        modal.become_developer_warning.hide();
        become_developer();
    });

    RequestMe.get("model/apis/", {
        api: "global_is_developer"
    }).then(response => {
        let loadingEl = document.querySelector(".container > .loading");
        loadingEl.classList.add("hidden");

        switch (response.code) {
            case 0:
                document.querySelector("#not-dev").classList.remove("hidden");
                break;
            case 1:
                document.querySelector("#myar").classList.remove("hidden");
                document.querySelector("#is-dev-full").classList.remove("hidden");
                break;
            case 2:
                document.querySelector("#is-dev-empty").classList.remove("hidden");
                break;
            default:
                document.querySelector("#not-dev").classList.remove("hidden");
        }

        if (response.code == 1 || response.code == 2) {
            advanceSearch.get_ar();
        }
    });

})();