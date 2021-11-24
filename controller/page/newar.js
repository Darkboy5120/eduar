import { Modal } from "../component/modal.js";
import { Navbar } from "../component/navbar.js";
import { Form } from "../component/form.js";
import { AlertMe } from "../component/alert_me.js";
import { RequestMe } from "../component/request_me.js";
import { FileControl } from "../component/file_control.js";

(function () {
    Navbar().main();

    let newar = {
        current : 0,
        min : 0,
        max : 1,
        step : {
            next : () => {
                if (newar.current < newar.max) {
                    newar.current++;
                }
                newar.updateView();
            },
            back : () => {
                if (newar.current > newar.min) {
                    newar.current--;
                }
                newar.updateView();
            }
        },
        updateView : () => {
            let viewArr = [
                document.querySelector("#presentation"),
                document.querySelector("#images"),
            ];

            let tabsArr = document.querySelectorAll(".newar > .progress > span");

            viewArr.forEach((e, i, arr) => {
                if (i == newar.current) {
                    e.classList.remove("hidden");
                } else {
                    e.classList.add("hidden");
                }

                if (i <= (newar.current-1)) {
                    tabsArr[i].classList.add("active");
                } else {
                    tabsArr[i].classList.remove("active");
                }
            });
        }
    }

    let form = {
        presentation : {
            input : {
                name : Form.Input("#pre-name", {
                    type : "text",
                    regex: "[^A-Za-z]+( [^A-Za-z])*$",
                    min : 5,
                    max : 50,
                }),
                description : Form.Input("#pre-desc", {
                    type : "text",
                    regex: "[^A-Za-z]+( [^A-Za-z])*$",
                    min : 5,
                    max : 255,
                }),
                github : Form.Input("#pre-github", {
                    type : "text",
                    regex: "[^A-Za-z]+( [^A-Za-z])*$",
                    min : 5,
                    max : 255,
                }),
            },
            submit : {
                element : document.querySelector("#pre-submit"),
                onclick : () => {
                    if (!form.presentation.isOk()) return;

                    const submitEl = form.presentation.submit.element;
                    const defaultSubmitText = submitEl.innerHTML;
                    submitEl.innerHTML = "<i class='fas fa-sync-alt fa-spin'></i> Cargando...";

                    const name = form.presentation.input.name.value();

                    RequestMe.post("model/apis/", {
                        api: "consumer_check_app_name",
                        name: name,
                    }).then(response => {
                        console.log(response);
                        submitEl.innerHTML = defaultSubmitText;
                        switch (response.code) {
                            case 0:
                                newar.step.next();
                                break;
                            case 1:
                                form.presentation.input.name.log.write("error", "Ese nombre ya esta en uso");
                                break;
                            default:
                                new AlertMe("Error", "Ha ocurrido un error, intente de nuevo por favor");
                        }
                    });
                }
            },
            isOk : () => {
                let r = true;
                for (let name in form.presentation.input) {
                    if (!form.presentation.input[name].isOk()) {
                        r = false;
                    }
                }

                return r;
            },
        },
        images : {
            button : {
                back : document.querySelector("#images-back")
            },
            input : {
                add_image_others : new FileControl("#input-others-image", {
                    min: 1, max: 20
                }),
                add_image_thumbnail : new FileControl("#input-thumbnail-image", {
                    min: 1, max: 1
                }),
                add_image_background : new FileControl("#input-background-image", {
                    min: 1, max: 1
                }),
            },
            submit : {
                element : document.querySelector("#images-submit"),
                onclick : () => {
                    console.log(form.images.isOk());
                    if (!form.images.isOk()) return;

                    const submitEl = form.images.submit.element;
                    const defaultSubmitText = submitEl.innerHTML;
                    submitEl.innerHTML = "<i class='fas fa-sync-alt fa-spin'></i> Cargando...";

                    /*const name = form.images.input.name.value();

                    RequestMe.post("model/apis/", {
                        api: "consumer_check_app_name",
                        name: name,
                    }).then(response => {
                        console.log(response);
                        submitEl.innerHTML = defaultSubmitText;
                        switch (response.code) {
                            case 0:
                                newar.step.next();
                                break;
                            case 1:
                                form.presentation.input.name.log.write("error", "Ese nombre ya esta en uso");
                                break;
                            default:
                                new AlertMe("Error", "Ha ocurrido un error, intente de nuevo por favor");
                        }
                    });*/
                }
            },
            isOk : () => {
                let r = true;
                for (let name in form.images.input) {
                    if (!form.images.input[name].isOk()) {
                        r = false;
                    }
                }

                return r;
            },
        }
    }

    form.presentation.submit.element.addEventListener("click", () => {
        form.presentation.submit.onclick();
    });
    form.images.button.back.addEventListener("click", () => {
        newar.step.back();
    });
    form.images.submit.element.addEventListener("click", () => {
        form.images.submit.onclick();
    });

    let test = {
        presentation : () => {
            form.presentation.input.name.input.value = "eduar";
            form.presentation.input.description.input.value = "eduar its awesome";
            form.presentation.input.github.input.value = "https://github.com/Darkboy5120/eduar";

            if (form.presentation.isOk()) {
                console.log("presentation: success");
            } else {
                console.log("presentation: error");
            }
        }
    }

    test.presentation();

})();