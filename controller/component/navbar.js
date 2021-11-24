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
    const main = () => {
        let dropdowns = [];
        document.querySelectorAll(".dropdown").forEach(e => {
            dropdowns.push(make_dropdown(e));
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
    
    return {
        main : main
    }
}