const INPUT_SUCCESS_LOG_CLASS = "input-success-log";
const INPUT_ERROR_LOG_CLASS = "input-error-log";

export const Form = () => {
    const Input = (selector, data) => {
        let inputEl = document.querySelector(selector);
        let containerEl = inputEl.parentNode;
        let logEl = containerEl.querySelector(".log");

        const value = () => {
            return inputEl.value;
        }

        const log = {
            write  : (type, text) => {
                if ("success") {
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
            success : "El valor es correcto",
            error : {
                min : "No debe ser menor que " + data.min,
                max : "No debe ser mayor que " + data.max,
                empty : "El campo esta vacío",
                regex : "El valor es incorrecto"
            }
        }

        const isOk = () => {
            if (inputEl.value == "" && !data.optional) {
                log.write("error", log.error.empty);
                return false;
            } else if (data.min != undefined && data.max != undefined && data.regex != undefined) {
                if (!inputEl.value.match(data.regex)) {
                    log.write("error", log.error.regex);
                    return false;
                } else if (inputEl.value < data.min) {
                    log.write("error", log.error.min);
                    return false;
                } else if (inputEl.value > data.max) {
                    log.write("error", log.error.max);
                    return false;
                }
            }
            log.write("success", log.success);

            return true;
        }

        return {
            isOk : isOk,
            log : log,
            value : value
        };
    }

    return {
        Input : Input
    }
};