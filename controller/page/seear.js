import { Modal } from "../component/modal.js";
import { Navbar } from "../component/navbar.js";
import { Form } from "../component/form.js";
import { AlertMe } from "../component/alert_me.js";
import { RequestMe } from "../component/request_me.js";
import { Sign } from "../component/sign.js";

(function () {
    let navbarController = Navbar();
    navbarController.main();
    let signController = Sign();

    let default_section = document.querySelector("[data-tab=description]");
    let current_section = null;

    let section = {
        description : {
            element : document.querySelector("#description"),
            loaded : false,
            load : (data) => {
                section.description.element.textContent = data;
                section.description.loaded = true;
            }
        },
        images : {
            element : document.querySelector("#images"),
            loaded : false,
            load : () => {
                RequestMe.get("model/apis/", {
                    api: "consumer_get_ar_images",
                    aplication : APLICATION
                }).then(response => {
                    switch (response.code) {
                        case 0:
                            section.images.element.querySelector(".loading").classList.add("hidden");;
                            let images = response.data;
                            for (let name in images) {
                                let node = document.createElement("img");
                                node.setAttribute("src", "model" + images[name].pk_filepath.slice(2));
                                section.images.element.appendChild(node);
                            }
                            section.images.loaded = true;
                            break;
                        default:
                            new AlertMe("Error", "Hubo un problema al intentar cargar las imágenes");
                    }
                });
            }
        },
        comments : {
            element : document.querySelector("#comments"),
            loaded : false,
            load : () => {

            }
        }
    }


    const load_section = (sectionEl) => {
        sectionEl.classList.remove("hidden");
        for (let name in section) {
            if (section[name].element.id == sectionEl.id && !section[name].loaded) {
                section[name].load();
            }
        }
    }

    const update_tabs = (newTabEl) => {
        let oldTabEl = current_section;
        if (oldTabEl != null) oldTabEl.classList.remove("active");
        newTabEl.classList.add("active");

        current_section = newTabEl;
    }

    const set_section = (tabEl) => {
        document.querySelectorAll(".content > .sections > *").forEach(e => {
            let sectionId = tabEl.getAttribute("data-tab");
            let lastSection = (current_section != null) ? current_section.getAttribute("data-tab") : null;
            if (sectionId == e.id && sectionId != lastSection) {
                update_tabs(tabEl)
                load_section(e);
            } else if (sectionId != e.id) {
                e.classList.add("hidden");
            }
        });
    }

    document.querySelectorAll("[data-tab]").forEach(e => {
        e.addEventListener("click", () => {
            set_section(e);
        });
    });

    set_section(default_section);

    let ar_stats = {
        switchable : {
            favorites : {
                button : document.querySelector("#favorites-button"),
                value : document.querySelector("#favorites-value"),
                count : 0,
                active : false,
                api_param : "0",
            },
            endorsements : {
                button : document.querySelector("#endorsements-button"),
                value : document.querySelector("#endorsements-value"),
                count : 0,
                active : false,
                api_param : "1"
            },
        },
        downloads : {
            button : document.querySelector("#downloads-button"),
            value : document.querySelector("#downloads-value"),
            count : 0,
            onclick : (filepath) => {
                RequestMe.get("model/apis/", {
                    api: "consumer_download_ar",
                    aplication : APLICATION
                }).then(response => {
                    switch (response.code) {
                        case 0:
                            window.open("model" + filepath);
                            new AlertMe("Genial", "La aplicación se esta comenzando a descargar");
                            break;
                        case -3:
                            new AlertMe("Error", "Debes iniciar sesión para realizar esa acción");
                            signController.modal.signin.show();
                            break;
                        default:
                            new AlertMe("Error", "Ha ocurrido un problema al intentar descargar la aplicación, intente de nuevo");
                    }
                });
            }
        }
    }

    const switch_ar_stat = (ar_stat) => {
        RequestMe.get("model/apis/", {
            api: "consumer_switch_ar_stat",
            aplication : APLICATION,
            stat : ar_stat.api_param,
            value : (ar_stat.active) ? "0" : "1"
        }).then(response => {
            switch (response.code) {
                case 0:
                    if (ar_stat.active) {
                        ar_stat.count-=1;
                        ar_stat.value.textContent = ar_stat.count;
                        ar_stat.button.classList.remove("active");
                    } else {
                        ar_stat.button.classList.add("active");
                        ar_stat.count+=1;
                        ar_stat.value.textContent = ar_stat.count;
                    }
                    ar_stat.active = !ar_stat.active;
                    break;
                case -3:
                    new AlertMe("Error", "Debes iniciar sesión para realizar esa acción");
                    signController.modal.signin.show();
                    break;
                default:
                    new AlertMe("Error", "Ha ocurrido un problema, intente de nuevo por favor");
            }
        });
    }

    const load_first_data = (data) => {
        document.querySelector("#name").textContent = data.name;
        document.querySelector("#background").setAttribute("src", "model" + data.background.slice(2));
        document.querySelector("#author").textContent = data.firstname;
        document.querySelector("#github").setAttribute("href", data.github);
        
        //si ya tenia esta ar como favorito, le agregamos la clase .active al boton
        ar_stats.switchable.favorites.value.textContent = data.favorites;
        ar_stats.switchable.favorites.count = parseInt(data.favorites);
        if (data.already_favorite == "1") {
            ar_stats.switchable.favorites.button.classList.add("active");
            ar_stats.switchable.favorites.active = true;
        }

        //si ya tenia esta ar como me gusta, le agregamos la clase .active al boton
        ar_stats.switchable.endorsements.value.textContent = data.endorsements;
        ar_stats.switchable.endorsements.count = parseInt(data.endorsements);
        if (data.already_endorsement == "1") {
            ar_stats.switchable.endorsements.button.classList.add("active");
            ar_stats.switchable.endorsements.active = true;
        }

        ar_stats.downloads.value.textContent = parseInt(data.downloads);
        ar_stats.downloads.count = data.downloads;

        ar_stats.downloads.button.addEventListener("click", () => {
            ar_stats.downloads.onclick(data.filepath);
        });

        for (let name in ar_stats.switchable) {
            ar_stats.switchable[name].button.addEventListener("click", () => {
                switch_ar_stat(ar_stats.switchable[name]);
            });
        }

        section.description.load(data.description);

    }

    RequestMe.get("model/apis/", {
        api: "consumer_get_ar_all",
        aplication : APLICATION
    }).then(response => {
        switch (response.code) {
            case 0:
                load_first_data(response.data);
                break;
            default:
                new AlertMe("Error", "Ha ocurrido un problema, recargue la página por favor");
        }
    });

})();