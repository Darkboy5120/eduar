const INPUT_SUCCESS_LOG_CLASS = "input-success-log";
const INPUT_ERROR_LOG_CLASS = "input-error-log";

export const Form = {
    Input : (selector, data) => {
        let inputEl = document.querySelector(selector);
        let containerEl = inputEl.parentNode;
        let logEl = containerEl.querySelector(".log");
        let helpEl = containerEl.querySelector(".help");

        const value = () => {
            return inputEl.value;
        }

        const scrollIntoView = () => {
            inputEl.scrollIntoView();
        }

        const log = {
            write  : (type, text) => {
                if (type == "success") {
                    logEl.classList.add(INPUT_SUCCESS_LOG_CLASS);
                    logEl.classList.remove(INPUT_ERROR_LOG_CLASS);
                } else if (type == "error") {
                    logEl.classList.remove(INPUT_SUCCESS_LOG_CLASS);
                    logEl.classList.add(INPUT_ERROR_LOG_CLASS);
                }
                logEl.innerHTML = text;
                logEl.classList.remove("hidden");
            },
            hide : () => {
                logEl.classList.add("hidden");
            },
            success : "El campo es correcto",
            error : {
                min : (data.type == "number") ? "No debe ser menor que " + data.min : "No debe tener menos de " + data.min + " caracteres",
                min : (data.type == "number") ? "No debe ser mayor que " + data.min : "No debe tener más de " + data.min + " caracteres",
                empty : "El campo esta vacío",
                regex : "El campo es incorrecto"
            }
        }

        const isOk = () => {
            let regex_result = inputEl.value.match(data.regex);
            if (data.not) regex_result = !regex_result;

            if (inputEl.value == "" && !data.optional) {
                log.write("error", log.error.empty);
                return false;
            } else if (regex_result) {
                log.write("error", log.error.regex);
                return false;
            } else if (data.type == "number") {
                 if (inputEl.value < data.min) {
                    log.write("error", log.error.min);
                    return false;
                } else if (inputEl.value > data.max) {
                    log.write("error", log.error.max);
                    return false;
                }
            } else if (data.type == "text") {
                if (inputEl.value.length < data.min) {
                    log.write("error", log.error.min);
                    return false;
                } else if (inputEl.value.length > data.max) {
                    log.write("error", log.error.max);
                    return false;
                }
            }
            log.write("success", log.success);

            return true;
        }

        inputEl.addEventListener("keyup", e => {
            e.preventDefault();
            e.stopPropagation();
            if (helpEl) {
                if (value() == "") {
                    helpEl.classList.add("hidden");
                } else {
                    helpEl.classList.remove("hidden");
                }
            }
        });

        return {
            isOk : isOk,
            log : log,
            value : value,
            scrollIntoView : scrollIntoView,
            input : inputEl
        };
    },

    Checkbox : (selector) => {
        let inputEl = document.querySelector(selector);
        let containerEl = inputEl.parentNode.parentNode;
        let logEl = containerEl.querySelector(".log");

        const value = () => {
            return inputEl.checked;
        }

        const scrollIntoView = () => {
            inputEl.scrollIntoView();
        }

        const log = {
            write  : (type, text) => {
                if (type == "success") {
                    logEl.classList.add(INPUT_SUCCESS_LOG_CLASS);
                    logEl.classList.remove(INPUT_ERROR_LOG_CLASS);
                } else if (type == "error") {
                    logEl.classList.remove(INPUT_SUCCESS_LOG_CLASS);
                    logEl.classList.add(INPUT_ERROR_LOG_CLASS);
                }
                logEl.innerHTML = text;
                logEl.classList.remove("hidden");
            },
            hide : () => {
                logEl.classList.add("hidden");
            }
        }

        return {
            log : log,
            value : value,
            scrollIntoView : scrollIntoView,
            input : inputEl
        }
    },

    Select : (selector) => {
        let inputEl = document.querySelector(selector);
        let containerEl = inputEl.parentNode;
        let logEl = containerEl.querySelector(".log");

        const value = () => {
            return inputEl.value;
        }
        
        const isOk = () => {
            if (value() == "") {
                log.write("error", "El campo esta vacío");
                return false;
            } else {
                log.hide();
            }

            return true;
        }

        const scrollIntoView = () => {
            inputEl.scrollIntoView();
        }

        const log = {
            write  : (type, text) => {
                if (type == "success") {
                    logEl.classList.add(INPUT_SUCCESS_LOG_CLASS);
                    logEl.classList.remove(INPUT_ERROR_LOG_CLASS);
                } else if (type == "error") {
                    logEl.classList.remove(INPUT_SUCCESS_LOG_CLASS);
                    logEl.classList.add(INPUT_ERROR_LOG_CLASS);
                }
                logEl.innerHTML = text;
                logEl.classList.remove("hidden");
            },
            hide : () => {
                logEl.classList.add("hidden");
            }
        }

        return {
            log : log,
            value : value,
            scrollIntoView : scrollIntoView,
            select : inputEl,
            isOk : isOk
        }
    }
};