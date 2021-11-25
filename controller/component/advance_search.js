import { AlertMe } from "../component/alert_me.js";
import { RequestMe } from "../component/request_me.js";

export const AdvanceSearch = (containerSelector, navbarController) => {
    let containerEl = document.querySelector(containerSelector);
    let resultsEl = containerEl.querySelector("#results");
    let categoryEl = document.querySelector("#filter-category");
    let orderbyEl = document.querySelector("#filter-orderby");
    let orderEl = document.querySelector("#filter-order");
    let paginationTopEl = document.querySelector("#myar-pagination-top");
    let page = 3;

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

    const get_ar = () => {
        resultsEl.innerHTML = "";

        RequestMe.get("model/apis/", {
            api: "developer_get_ar",
            category : categoryEl.value,
            orderby : orderbyEl.value,
            order : orderEl.value,
            page : page.toString()
        }).then(response => {
            switch (response.code) {
                case 0:
                    let aplications = response.data.aplications;

                    update_pagination(response.data.limit, response.data.before, response.data.after);

                    for (let name in aplications) {
                        let node = document.createElement("div");
                        node.classList.add("app");
                        node.innerHTML = `
                            <div class="dropdown">
                                <i class="fas fa-ellipsis-v"></i>
                                <div class="dropdown-content">
                                    <button id="ndd-signin-modal"><i class="fas fa-edit"></i> Editar</button>
                                    <button id="ndd-signup-modal"><i class="fas fa-trash"></i> Eliminar</button>
                                </div>
                            </div>
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
                        navbarController.add_dropdown(node.querySelector(".dropdown"));
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
        
        //filters functions
        document.querySelectorAll("[data-filter]").forEach(e => {

        });

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