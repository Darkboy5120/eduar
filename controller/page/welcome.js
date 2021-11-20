import { Dropdown } from "../component/dropdown.js";
import { Navbar } from "../component/navbar.js";
import { Modal } from "../component/modal.js";
import { Form } from "../component/form.js";

(function () {
    Dropdown().main();
    Navbar().main();
    //Modal()

    let form = {
        signin : {
            input : {
                email : Form().Input("#email", {
                    regex : /^(?:[1-9]|0[1-9]|10)$/,
                    min : 5,
                    max : 10,
                    optional : false,
                }),
                password : Form().Input("#password", {
                    regex : /^(?:[1-9]|0[1-9]|10)$/,
                    min : 5,
                    max : 10,
                    optional : false,
                })
            },
            submit : {
                element : document.querySelector("#submit-signin"),
                onclick : () => {
                    if (form.signin.isOk()) {
                        console.log(123);
                    }
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
                firstname : Form().Input("#firstname", {
                    regex : /^(?:[1-9]|0[1-9]|10)$/,
                    min : 5,
                    max : 10,
                    optional : false,
                }),
                lastname : Form().Input("#lastname", {
                    regex : /^(?:[1-9]|0[1-9]|10)$/,
                    min : 5,
                    max : 10,
                    optional : false,
                }),
                email : Form().Input("#email", {
                    regex : /^(?:[1-9]|0[1-9]|10)$/,
                    min : 5,
                    max : 10,
                    optional : false,
                }),
                password : Form().Input("#password", {
                    regex : /^(?:[1-9]|0[1-9]|10)$/,
                    min : 5,
                    max : 10,
                    optional : false,
                }),
                confirmPassword : Form().Input("#confirm-password", {
                    regex : /^(?:[1-9]|0[1-9]|10)$/,
                    min : 5,
                    max : 10,
                    optional : false,
                }),
                birthdate : Form().Input("#birthdate", {
                    optional : false,
                })
            },
            submit : {
                element : document.querySelector("#submit-signup"),
                onclick : () => {
                    if (form.signin.isOk()) {
                        console.log(123);
                    }
                }
            },
            isOk : () => {
                let r = true;
                for (let name in form.signup.input) {
                    if (!form.signup.input[name].isOk()) {
                        r = false;
                    }
                }
                if (form.signup.input.password.value() == form.signup.input.confirmPassword.value()) {
                    r = false;
                }

                return r;
            }
        }
    }

    for (let name in form) {
        console.log(form[name]);
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
    modal.signup.show();
})();

