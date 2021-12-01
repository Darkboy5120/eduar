import { Modal } from "../component/modal.js";
import { Navbar } from "../component/navbar.js";
import { Form } from "../component/form.js";
import { AlertMe } from "../component/alert_me.js";
import { RequestMe } from "../component/request_me.js";

(function () {
    let navbarController = Navbar();
    navbarController.main();

    let last_active_section = null;
    let default_section_id = "configuration";

    const set_new_section = (target_section) => {
        let new_section = document.querySelector("#" + target_section);
        let new_tab_section = document.querySelector(`[data-tab=${target_section}]`);
        new_section.classList.remove("hidden");
        new_tab_section.classList.add("active");
        if (last_active_section != null) {
            let last_tab_section = document.querySelector(`[data-tab=${last_active_section.id}]`);
            last_tab_section.classList.remove("active");
            last_active_section.classList.add("hidden");
        }
        last_active_section = new_section;
    }

    document.querySelectorAll("[data-tab]").forEach(e => {
        e.addEventListener("click", () => {
            let target_section = e.getAttribute("data-tab");
            if (target_section != last_active_section.id) set_new_section(target_section);
        });
    });

    set_new_section(default_section_id);

})();