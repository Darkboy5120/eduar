import { Navbar } from "../component/navbar.js";
import { Modal } from "../component/modal.js";
import { Form } from "../component/form.js";
import { AlertMe } from "../component/alert_me.js";
import { RequestMe } from "../component/request_me.js";

(function () {
    Navbar().main();

    let form = {
        signin : {
            input : {
                email : Form.Input("#signin-email", {
                    type : "text",
                    regex: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",
                    min : 5,
                    max : 50,
                    not : true,
                }),
                password : Form.Input("#signin-password", {
                    type : "text",
                    regex: "[^A-Za-z0-9]+",
                    min : 5,
                    max : 50
                })
            },
            button : {
                toSignup : document.querySelector("#signin-to-signup")
            },
            submit : {
                element : document.querySelector("#signin-submit"),
                onclick : () => {
                    if (!form.signin.isOk()) return;

                    const submitEl = form.signin.submit.element;
                    const defaultSubmitText = submitEl.innerHTML;
                    submitEl.innerHTML = "<i class='fas fa-sync-alt fa-spin'></i> Cargando...";

                    const email = form.signin.input.email.value();
                    const password = form.signin.input.password.value();

                    RequestMe.post("model/apis/", {
                        api: "global_signin",
                        email: email,
                        password: password,
                    }).then(response => {
                        submitEl.innerHTML = defaultSubmitText;
                        switch (response.code) {
                            case 0:
                                location = "?p=home";
                                //modal.signin.hide();
                                /*new AlertMe("Genial", "Iniciando sesión...");
                                window.setInterval(() => {
                                    location = "?p=home";
                                }, 3000);*/
                                break;
                            default:
                                new AlertMe("Error", "Ha ocurrido un error, intente de nuevo por favor");
                        }
                    });
                }
            },
            isOk : () => {
                let r = true;
                for (let name in form.signin.input) {
                    if (!form.signin.input[name].isOk()) {
                        r = false;
                    }
                }

                return r;
            }
        }, signup : {
            input : {
                firstname : Form.Input("#signup-firstname", {
                    type : "text",
                    regex: "[^A-Za-z]+( [^A-Za-z])*$",
                    min : 5,
                    max : 50,
                }),
                lastname : Form.Input("#signup-lastname", {
                    type : "text",
                    regex: "[^A-Za-z]+( [^A-Za-z])*$",
                    min : 5,
                    max : 50,
                }),
                email : Form.Input("#signup-email", {
                    type : "text",
                    regex: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",
                    min : 5,
                    max : 50,
                    not: true,
                }),
                password : Form.Input("#signup-password", {
                    type : "text",
                    regex: "[^A-Za-z0-9]+",
                    min : 5,
                    max : 50,
                }),
                confirmPassword : Form.Input("#signup-confirm-password", {
                    type : "text",
                    regex: "[^A-Za-z0-9]+",
                    min : 5,
                    max : 50,
                }),
                birthdate : Form.Input("#signup-birthdate", {
                    type : "text",
                    regex : /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
                    min : 10,
                    max : 10,
                    not : true,
                })
            },
            checkbox : {
                politics : Form.Checkbox("#signup-politics")
            },
            button : {
                toSignin : document.querySelector("#signup-to-signin")
            },
            submit : {
                element : document.querySelector("#signup-submit"),
                onclick : () => {
                    if (!form.signup.isOk()) return;

                    const submitEl = form.signup.submit.element;
                    const defaultSubmitText = submitEl.innerHTML;
                    submitEl.innerHTML = "<i class='fas fa-sync-alt fa-spin'></i> Cargando...";

                    const email = form.signup.input.email.value();
                    const firstname = form.signup.input.firstname.value();
                    const lastname = form.signup.input.lastname.value();
                    const birthdate = form.signup.input.birthdate.value();
                    const password = form.signup.input.password.value();

                    RequestMe.post("model/apis/", {
                        api: "consumer_signup",
                        email: email,
                        firstname: firstname,
                        lastname: lastname,
                        birthdate: birthdate,
                        password: password,
                    }).then(response => {
                        submitEl.innerHTML = defaultSubmitText;
                        switch (response.code) {
                            case 0:
                                modal.signup.hide();
                                new AlertMe("Genial", "Cuenta creada correctamente, iniciando sesión...");
                                window.setInterval(() => {
                                    location = "?p=home";
                                }, 3000);
                                break;
                            case -3:
                                form.signup.input.email.log.write("error", "Ese correo ya esta en uso");
                                break;
                            default:
                                new AlertMe("Error", "Ha ocurrido un error, intente de nuevo por favor");
                        }
                    });
                }
            },
            isOk : () => {
                let r = true;
                //let first_err = null;
                for (let name in form.signup.input) {
                    if (!form.signup.input[name].isOk()) {
                        r = false;
                        //if (first_err == null) first_err = form.signup.input[name];
                    }
                }
                if (!form.signup.checkbox.politics.value()) {
                    form.signup.checkbox.politics.log.write("error", "Debes aceptar los términos y condiciones");
                    r = false;
                    //if (first_err == null) first_err = form.signup.checkbox.politics;
                } else {
                    form.signup.checkbox.politics.log.hide();
                }
                if (form.signup.input.password.value() != form.signup.input.confirmPassword.value()) {
                    r = false;
                    form.signup.input.password.log.write("error", "Las contraseñas no coinciden");
                    form.signup.input.confirmPassword.log.write("error", "Las contraseñas no coinciden");
                    //if (first_err == null) first_err = form.signup.checkbox.politics;
                }
                //if (first_err != null) first_err.scrollIntoView();

                return r;
            }
        }
    }

    form.signin.button.toSignup.addEventListener("click", () => {
        modal.signin.hide();
        modal.signup.show();
        form.signup.input.firstname.input.focus();
    });
    form.signup.button.toSignin.addEventListener("click", () => {
        modal.signup.hide();
        modal.signin.show();
        form.signin.input.email.input.focus();
    });

    for (let name in form) {
        form[name].submit.element.addEventListener("click", e => {
            form[name].submit.onclick();
        });
    }

    let modal = {
        signin : Modal("#modal-signin-form"),
        signup : Modal("#modal-signup-form"),
    }

    document.querySelector("#ndd-signin-modal").addEventListener("click", () => {
        modal.signin.show();
    });
    document.querySelector("#ndd-signup-modal").addEventListener("click", () => {
        modal.signup.show();
    });

    let test = {
        signin : () => {
            modal.signin.show();
            form.signin.input.email.input.value = "hmaldonado0@ucol.mx";
            form.signin.input.password.input.value = "pollo123";

            if (form.signin.isOk()) {
                console.log("signin: success");
            } else {
                console.log("signin: error");
            }
        },
        signup : () => {
            modal.signup.show();
            form.signup.input.firstname.input.value = "hilario guadalupe";
            form.signup.input.lastname.input.value = "maldonado gonzalez";
            form.signup.input.email.input.value = "hmaldonado0@ucol.mx";
            form.signup.input.birthdate.input.value = "2021-01-02";
            form.signup.input.password.input.value = "pollo123";
            form.signup.input.confirmPassword.input.value = "pollo123";
            form.signup.checkbox.politics.input.checked = true;

            if (form.signup.isOk()) {
                console.log("singup: success");
            } else {
                console.log("signup: error");
            }
        }
    }
})();

