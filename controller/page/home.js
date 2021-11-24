import { Navbar } from "../component/navbar.js";
import { Form } from "../component/form.js";
import { AlertMe } from "../component/alert_me.js";
import { RequestMe } from "../component/request_me.js";
import { Sign } from "../component/sign.js";

(function () {
    Navbar().main();
    Sign();

    const load_categories = (categories) => {
        let categoriesEl = document.querySelector("#categories");
        for (let category of categories) {
            let node = document.createElement("a");
            node.innerHTML = `
                <i class="fas fa-tag"></i>
                <p>${category.name}</p>
            `;
            node.setAttribute("href", `?p=search&category=${category.pk_id}`);
            categoriesEl.appendChild(node);
        }
    }

    RequestMe.get("model/apis/", {
        api: "global_get_categories"
    }).then(response => {
        let loadingEl = document.querySelector(".categories > .loading");
        let logEl = document.querySelector(".categories > .log");

        loadingEl.classList.add("hidden");
        switch (response.code) {
            case 0:
                load_categories(response.data);
                break;
            default:
                logEl.textContent = "Ha ocurrido un problema al intentar cargar las categorias"
                logEl.classList.remove("hidden");
        }
    });

})();