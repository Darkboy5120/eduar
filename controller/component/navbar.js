import { RequestMe } from "../component/request_me.js";

export const Navbar = function () {
    const make_dropdown = (element) => {
        let active = false;
        let content = element.querySelector(".dropdown-content:not(.hidden)");
        element.setAttribute("tabindex", "0");
        const show = () => {
            content.classList.add("dropdown-content-animation");
            content.classList.remove("hidden");
            element.classList.add("active");
            active = true;
        }
        const dismiss = () => {
            content.classList.add("hidden");
            content.classList.remove("dropdown-content-animation");
            element.classList.remove("active");
            active = false;
        }
        const switch_status = () => {
            if (active) {
                dismiss();
            } else {
                show();
            }
        }
        const get_active = () => {
            return active;
        }
        dismiss();
        element.addEventListener("click", e => {
            switch_status();
            e.stopPropagation();
        });
        return {
            dismiss: dismiss,
            show: show,
            get_active: get_active,
            switch_status, switch_status,
            element: element
        }
    }

    let dropdowns = [];

    const add_dropdown = (element) => {
        dropdowns.push(make_dropdown(element));
    }

    const main = () => {

        document.querySelectorAll(".dropdown").forEach(e => {
            add_dropdown(e);
        });
        const was_any_dropdown_clicked = (target) => {
            let result = false;
            dropdowns.forEach(d => {
                if (target.id = d.id) {
                    result = true;
                }
            });
            return result;
        }
        const dismiss_active_dropdowns = () => {
            dropdowns.forEach(d => {
                if (d.get_active()) {
                    d.dismiss();
                }
            });
        }
        window.addEventListener("click", event => {
            if (!was_any_dropdown_clicked(event.target)) {
                dismiss_active_dropdowns();
            }
        });
        const add_keyboard_events = (d) => {
            d.element.addEventListener("keyup", (event) => {
                if (event.which == 13) {
                    d.switch_status();
                } else if (event.which == 27) {
                    d.dismiss();
                    d.element.blur();
                }
            });
        }
        dropdowns.forEach(d => {
            add_keyboard_events(d);
        });
    }

    let searchInputEl = document.querySelector("#search");
    let searchResultsEl = searchInputEl.parentNode.querySelector(".search-results");
    let searchThrottle = 1000;
    let searchTimeout = null;

    const controlSearch = (e) => {
        let searchValue = e.target.value;
        if (searchValue.length == 0) {
            searchResultsEl.classList.add("hidden");
            return;
        }
        else if (searchTimeout != null) window.clearTimeout(searchTimeout);
        searchResultsEl.innerHTML = `
            <div class="loading">
                <i class="fas fa-sync-alt fa-spin"></i>
            </div>
        `;
        searchResultsEl.classList.remove("hidden");
        searchTimeout = window.setTimeout(() => {
            doSearch(searchValue);
        }, searchThrottle);
    }

    const doSearch = (search_value) => {
        RequestMe.post("model/apis/", {
            api: "global_search_ar",
            search_value: search_value
        }).then(response => {
            switch (response.code) {
                case 0:
                    searchResultsEl.innerHTML = "";
                    let aplications = response.data;
                    for (let name in aplications) {
                        let node = document.createElement("a");
                        node.classList.add("s-result");
                        node.setAttribute("href", `?p=seear&aplication=${aplications[name].pk_id}`);
                        node.innerHTML = `
                            <p>${aplications[name].name}</p>
                            <span>Por ${aplications[name].firstname}</span>
                            <div class="stats">
                                <i class="far fa-heart"> ${aplications[name].favorites}</i>
                                <i class="far fa-thumbs-up"> ${aplications[name].endorsements}</i>
                                <i class="fas fa-download"> ${aplications[name].downloads}</i>
                            </div>
                        `;
                        searchResultsEl.appendChild(node);
                    }
                    break;
                case -3:
                    searchResultsEl.innerHTML = `
                        <p class="empty">No se encontraron resultados</p>
                    `;
                    break;
                default:
                    searchResultsEl.innerHTML = `
                        <p class="error">Ha ocurrido un problema al intentar hacer la búsquedad, por favor intente de nuevo</p>
                    `;
            }
        });
    }

    searchInputEl.addEventListener("keyup", e => {
        controlSearch(e);
    });
    searchInputEl.addEventListener("blur", e => {
        window.setTimeout(() => {
            if (searchTimeout != null) window.clearTimeout(searchTimeout);
            searchResultsEl.classList.add("hidden");
        }, 200);
    });
    searchInputEl.addEventListener("focus", e => {
        controlSearch(e);
    });
    
    return {
        main : main,
        add_dropdown : add_dropdown
    }
}