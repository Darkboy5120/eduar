import { Modal } from "../component/modal.js";
import { Navbar } from "../component/navbar.js";
import { Form } from "../component/form.js";
import { AlertMe } from "../component/alert_me.js";
import { RequestMe } from "../component/request_me.js";
import { FileControl, FileControlDumb } from "../component/file_control.js";

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
                category : Form.Select("#pre-category")
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
                others : new FileControl("#input-others-image", {
                    min: 1, max: 5, regex: /image.*/
                }),
                thumbnail : new FileControl("#input-thumbnail-image", {
                    min: 1, max: 1, regex : /image.*/
                }),
                background : new FileControl("#input-background-image", {
                    min: 1, max: 1, regex : /image.*/
                }),
                apk : new FileControlDumb("#input-apk-file", "application/vnd.android.package-archive")
            },
            submit : {
                element : document.querySelector("#images-submit"),
                onclick : () => {
                    if (!form.images.isOk()) return;

                    const submitEl = form.images.submit.element;
                    const defaultSubmitText = submitEl.innerHTML;
                    submitEl.innerHTML = "<i class='fas fa-sync-alt fa-spin'></i> Cargando...";

                    RequestMe.post("model/apis/", {
                        api: "developer_create_app",
                        name: form.presentation.input.name.value(),
                        category: form.presentation.input.category.value(),
                        description : form.presentation.input.description.value(),
                        github : form.presentation.input.github.value(),
                        images_other_0 : form.images.input.others.val()[0],
                        images_other_1 : form.images.input.others.val()[1],
                        images_other_2 : form.images.input.others.val()[2],
                        images_other_3 : form.images.input.others.val()[3],
                        images_other_4 : form.images.input.others.val()[4],
                        images_thumbnail : form.images.input.thumbnail.val()[0],
                        images_background : form.images.input.background.val()[0],
                        file_apk : form.images.input.apk.input.files[0],
                    }).then(response => {
                        submitEl.innerHTML = defaultSubmitText;
                        switch (response.code) {
                            case 0:
                                new AlertMe("Genial", "Aplicación subida correctamente, regresando a Mis AR");
                                window.setTimeout(() => {
                                    location = "?p=myar"
                                }, 3000);
                                break;
                            default:
                                new AlertMe("Error", "Ha ocurrido un error, intente de nuevo por favor");
                        }
                    });
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

    RequestMe.post("model/apis/", {
        api: "global_get_categories",
    }).then(response => {
        switch (response.code) {
            case 0:
                let categories = response.data;
                for (let name in categories) {
                    let node = document.createElement("option");
                    node.setAttribute("value", categories[name].pk_id);
                    node.textContent = categories[name].name;
                    form.presentation.input.category.select.appendChild(node);
                }
                break;
            default:
                new AlertMe("Error", "Ha ocurrido un error, intente de nuevo por favor");
        }
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