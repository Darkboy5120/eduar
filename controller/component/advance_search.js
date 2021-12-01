import { AlertMe } from "../component/alert_me.js";
import { RequestMe } from "../component/request_me.js";
import { Modal } from "../component/modal.js";

export const AdvanceSearch = (containerSelector, navbarController, data) => {
    let containerEl = document.querySelector(containerSelector);
    let resultsEl = containerEl.querySelector("#results");
    let categoryEl = document.querySelector("#filter-category");
    let orderbyEl = document.querySelector("#filter-orderby");
    let orderEl = document.querySelector("#filter-order");
    let paginationTopEl = document.querySelector("#myar-pagination-top");
    let removeAppEl = document.querySelector("#remove-app");
    let page = 0;
    let getArApi = "";
    switch (data.type) {
        case "myar":
            getArApi = "developer_get_ar";
            break;
        case "searchar":
            getArApi = "consumer_get_ar";
            break;
        case "myfavorite":
            getArApi = "consumer_get_favorite";
    }

    const change_page = (newpage) => {
        page = newpage;
        get_ar();
    }

    const update_pagination = (limit, before, after) => {
        paginationTopEl.innerHTML = "";

        let pages_before = Math.floor(before.length / limit);
        
        let previusPageNode = document.createElement("button");
            previusPageNode.innerHTML = `<i class="fas fa-chevron-left"></i>`;
        if (pages_before > 0) {
            previusPageNode.addEventListener("click", () => {
                change_page(page-1);
            });
        } else {
            previusPageNode.classList.add("invisible");
        }
        paginationTopEl.appendChild(previusPageNode);

        let parentNode = document.createElement("div");
        parentNode.classList.add("actions-pages");

        for (let i = 0; i < pages_before; i++) {
            let node = document.createElement("button");
            node.textContent = i+1;
            node.addEventListener("click", () => {
                change_page(i);
            });
            parentNode.append(node);
        }
        
        let currentPageNode = document.createElement("button");
        currentPageNode.classList.add("active");
        currentPageNode.textContent = page+1;
        parentNode.appendChild(currentPageNode);

        let pages_after = Math.floor(after.length / limit);
        for (let i = 0; i < pages_after; i++) {
            let node = document.createElement("button");
            node.textContent = i+page+2;
            node.addEventListener("click", () => {
                change_page(i+page+1);
            });
            parentNode.append(node);
        }
        paginationTopEl.appendChild(parentNode);

        let nextPageNode = document.createElement("button");
        nextPageNode.innerHTML = `<i class="fas fa-chevron-right"></i>`;
        if (pages_after > 0) {
            nextPageNode.addEventListener("click", () => {
                change_page(page+1);
            });
        } else {
            nextPageNode.classList.add("invisible");
        }
        paginationTopEl.appendChild(nextPageNode);
    }

    const do_remove_app = (aplication_id) => {
        let default_submit_text = removeAppEl.innerHTML;
        removeAppEl.innerHTML = "<i class='fas fa-sync-alt fa-spin'></i>";

        RequestMe.get("model/apis/", {
            api: "developer_remove_app",
            aplication : aplication_id
        }).then(response => {
            removeAppEl.innerHTML = default_submit_text;
            switch (response.code) {
                case 0:
                    data.modal.remove_app_warning.hide();
                    new AlertMe("Genial", "La aplicación se ha eliminado correctamente");
                    get_ar();
                    break;
                default:
                    new AlertMe("Error", "Ha ocurrido un problema al intentar eliminar la aplicación, intente de nuevo por favor");

            }
        });
    }

    const get_ar = () => {
        resultsEl.innerHTML = "";

        RequestMe.get("model/apis/", {
            api: getArApi,
            category : categoryEl.value,
            orderby : orderbyEl.value,
            order : orderEl.value,
            page : page.toString()
        }).then(response => {
            switch (response.code) {
                case 0:
                    let aplications = response.data.aplications;

                    update_pagination(response.data.limit, response.data.before, response.data.after);

                    //variables determinar si se agrega el html del dropdown para editar y eliminar
                    //ademas se determina si se agregar sus eventos onclick con sus apis
                    let is_developer = null;
                    let developer_dropdown_html = "";
                    if (data.type == "myar") {
                        is_developer = true;
                        developer_dropdown_html = `
                            <div class="dropdown">
                                <i class="fas fa-ellipsis-v"></i>
                                <div class="dropdown-content">
                                    <button><i class="fas fa-edit"></i> Editar</button>
                                    <button><i class="fas fa-trash"></i> Eliminar</button>
                                </div>
                            </div>
                        `;
                    } else {
                        is_developer = false;
                    }

                    for (let name in aplications) {
                        let node = document.createElement("div");
                        if (!is_developer) {
                            //agregarmos estilos a los app y eventos de click para dirigir a la pagina de la app
                            //esto solo cuando sean apps de otros usuarios como la seccion de busquedad avanzada
                            node = document.createElement("button");
                            node.classList.add("consumer");
                            node.addEventListener("click", () => {
                                location = `?p=seear&aplication=${aplications[name].pk_id}`;
                            });
                        }
                        node.classList.add("app");

                        node.innerHTML = `
                            ${developer_dropdown_html}
                            <img src="${"model" + aplications[name].thumbnail.slice(2)}" alt="">
                            <div class="info">
                                <h3>${aplications[name].name}</h3>
                                <span>V2.3</span>
                                <span>Por <a href="">${aplications[name].firstname}</a></span>
                                <div class="small-info">
                                    <span><i class="fas fa-heart"></i> ${aplications[name].favorites}</span>
                                    <span><i class="fas fa-thumbs-up"></i> ${aplications[name].endorsements}</span>
                                    <span><i class="fas fa-download"></i> ${aplications[name].downloads}</span>
                                </div>
                            </div>
                        `;
                        if (is_developer) {
                            navbarController.add_dropdown(node.querySelector(".dropdown"));
                            node.querySelectorAll(".dropdown > .dropdown-content > button").forEach((e, i) => {
                                if (i == 0) {
                                    //editar aplicacion
                                } else {
                                    //eliminar aplicacion
                                    e.addEventListener("click", () => {
                                        data.modal.remove_app_warning.show();
                                        removeAppEl.onclick = () => {
                                            do_remove_app(aplications[name].pk_id);
                                        };
                                    });
                                }
                            });
                        }
                        resultsEl.appendChild(node);
                    }
                    break;
                default:
                    paginationTopEl.innerHTML = "";
                    resultsEl.innerHTML = `
                        <p>No se encontraron aplicaciónes</p>
                    `;
                    //new AlertMe("Error", "Ha ocurrido un problema al intentar cargar las aplicaciones, recarge la página por favor");
            }
        });
    }

    const main = () => {
        const load_categories = (categories) => {

            let node = document.createElement("option");
            node.setAttribute("value", "0");
            node.textContent = "Ninguna";
            categoryEl.appendChild(node);

            for (let category of categories) {
                let node = document.createElement("option");
                node.setAttribute("value", category.pk_id);
                node.textContent = category.name;
                categoryEl.appendChild(node);
            }
        }

        RequestMe.get("model/apis/", {
            api: "global_get_categories"
        }).then(response => {
            switch (response.code) {
                case 0:
                    load_categories(response.data);
                    if (data.type != "myar") {
                        if (SEARCH_DATA != null) {
                            if (SEARCH_DATA.category != null) categoryEl.value = SEARCH_DATA.category;
                            if (SEARCH_DATA.orderby != null) orderbyEl.value = SEARCH_DATA.orderby;
                            if (SEARCH_DATA.order != null) orderEl.value = SEARCH_DATA.order;
                        }
                        get_ar();
                    }
                    break;
                default:
                    logEl.textContent = "Ha ocurrido un problema al intentar cargar las categorias"
            }
        });

        [categoryEl, orderbyEl, orderEl].forEach(e => {
            e.addEventListener("change", () => {
                
                change_page(0);
            });
        });

    }

    return {
        main : main,
        get_ar : get_ar
    }
}