export const FileControl = function (inputSelector, options) {
    let files = [];
    let input = {
        element: document.querySelector(inputSelector)
    };
    let edited_status = false;
    const reset_is_edited = () => {
        edited_status = false;
    }
    const is_edited = () => {
        return edited_status;
    }
    const itsAllRight = () => {
        if (files.length == 0) {
            log.print("error", log.message.empty);
            return false;
        } else if ("error", files.length < options.min) {
            log.print("error", log.message.minLength);
            return false;
        } else if ("error", files.length > options.max) {
            log.print("error", log.message.maxLength);
            return false;
        }
        log.print("success", log.message.success);
        return true;
    }
    const plural = " archivo";
    const singular = " archivos";
    let log = {
        element: input.element.parentNode.parentNode.querySelector(".input-log"),
        message: {
            minLength: "No debes agregar menos de " + options.min + ((options.min > 1)
                ? plural : singular),
            maxLength: "No debes agregar más de " + options.max + ((options.max > 1)
            ? plural : singular),
            empty: "El campo esta vacío",
            success : "El campo es correcto",
            regex : "No se permite ese tipo de archivo",
        },
        print: (type, message) => {
            log.element.textContent = message;
            log.element.classList.remove("hidden");
            if (type == "success") {
                log.element.classList.add("input-success-log");
                log.element.classList.remove("input-error-log");
            } else if (type == "error") {
                log.element.classList.remove("input-success-log");
                log.element.classList.add("input-error-log");
            }
        },
        hide: () => {
            log.element.classList.add("hidden");
        }
    };
    let images = {
        status: 0,
        element : input.element.parentNode.querySelector(".file-container > .file-images"),
        show: () => {
            images.element.classList.remove("hidden");
        },
        hide: () => {
            images.element.classList.add("hidden");
        },
        update: () => {
            let r = itsAllRight();
            if (files.length > 0) {
                images.show();
                empty.hide();
                button.edit.show();
            } else {
                images.hide();
                empty.show();
                button.edit.hide();
            }
        },
        handleFiles: function (f) {
            if (f.length) this.files = f;
            for (let i = 0; i < this.files.length; i++) {
                let file = this.files[i];
                let fileType = options.regex;
            
                const isDuplicated = files.filter(f => file.name == f.name).length > 0;
                if (!file.type.match(fileType)) {
                  continue;
                } else if (isDuplicated) {
                    continue;
                }

                files.push(file);
                edited_status = true;
            
                let div = document.createElement("div");
                let remove_icon = document.createElement("i");
                remove_icon.classList.add("file-remove", "fas", "fa-trash-alt");
                remove_icon.addEventListener("click", e => {
                    for (let i = 0; i < files.length; i++) {
                        if (files[i].name == file.name) {
                            edited_status = true;
                            delete files[i];
                            files.splice(i, 1);
                            div.remove();
                            images.update();
                            let r = itsAllRight();
                        }
                    }
                });
                let img = document.createElement("img");
                div.classList.add("file-image");
                div.appendChild(img);
                div.appendChild(remove_icon);
                img.file = file;
                images.element.appendChild(div);
            
                let reader = new FileReader();
                reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
                reader.readAsDataURL(file);
            }
            images.update();
        },
        dragenter: function (e) {
            images.element.classList.add("file-dragover");
            empty.element.classList.add("file-dragover");
            e.stopPropagation();
            e.preventDefault();
        },
        dragover: function (e) {
            e.stopPropagation();
            e.preventDefault();
        },
        dragleave: function (e) {
            images.element.classList.remove("file-dragover");
            empty.element.classList.remove("file-dragover");
            e.stopPropagation();
            e.preventDefault();
        },
        drop: function (e) {
            images.element.classList.remove("file-dragover");
            empty.element.classList.remove("file-dragover");
            e.stopPropagation();
            e.preventDefault();

            let dt = e.dataTransfer;
            let files = dt.files;
            images.handleFiles(files);
        }
    };
    let label = {
        element: input.element.parentNode.parentNode.querySelector("label")
    }
    let empty = {
        element: input.element.parentNode.querySelector(".file-container > .file-empty"),
        show: () => {
            empty.element.classList.remove("hidden");
        },
        hide: () => {
            empty.element.classList.add("hidden");
        }
    };
    let button = {
        add: {
            element: input.element.parentNode.querySelector(".file-container > .file-actions > .file-add"),
            onclick: () => {
                input.element.click();
            },
            show: () => {
                button.add.element.classList.remove("hidden");
            },
            hide: () => {
                button.add.element.classList.add("hidden");
            }
        },
        edit: {
            element: input.element.parentNode.querySelector(".file-container > .file-actions > .file-edit"),
            onclick: () => {
                images.element.classList.add("editing");
                images.status = 1;
            },
            show: () => {
                button.edit.element.classList.remove("hidden");
            },
            hide: () => {
                button.edit.element.classList.add("hidden");
            }
        }
    };
    const focus = () => {
        label.element.scrollIntoView();
    }
    images.hide();
    button.edit.hide();
    //let r = itsAllRight();
    if (!input.element.classList.contains("hidden")) {
        input.element.classList.add("hidden");
    }
    window.addEventListener("click", e => {
        switch (images.status) {
            case 0:
                break;
            case 1:
                if (!e.target.classList.contains("file-edit")) {
                    images.element.classList.remove("editing");
                    images.status = 0;
                }
                break;
            case 2:
                break;
        }
    });
    button.add.element.addEventListener("click", button.add.onclick);
    button.edit.element.addEventListener("click", button.edit.onclick);
    input.element.addEventListener("change", images.handleFiles, false);
    images.element.addEventListener("dragenter", images.dragenter, false);
    images.element.addEventListener("dragleave", images.dragleave, false);
    images.element.addEventListener("dragover", images.dragover, false);
    images.element.addEventListener("drop", images.drop, false);
    empty.element.addEventListener("dragenter", images.dragenter, false);
    empty.element.addEventListener("dragleave", images.dragleave, false);
    empty.element.addEventListener("dragover", images.dragover, false);
    empty.element.addEventListener("drop", images.drop, false);

    return {
        isDone : function () {
            return (itsAllRight()) ? true : false;
        },
        isOk : itsAllRight,
        printLog : log.print,
        val: () => {
            return files;
        },
        files: files,
        isEmpty : files.length == 0,
        focus: focus,
        handleFiles: images.handleFiles,
        reset_is_edited: reset_is_edited,
        is_edited: is_edited
    };
}

export const FileControlDumb = function (inputSelector, fileType) {
    let input = document.querySelector(inputSelector);

    const log = {
        element : input.parentNode.querySelector(".input-log"),
        write : (type, message) => {
            if (type == "success") {
                log.element.classList.add("input-success-log");
                log.element.classList.remove("input-error-log");
            } else if (type == "error") {
                log.element.classList.remove("input-success-log");
                log.element.classList.add("input-error-log");
            }

            log.element.textContent = message;
            log.element.classList.remove("hidden");
        }, hide : () => {
            log.element.add("hidden");
        }
    }

    const isOk = () => {
        if (input.files.length == 0) {
            log.write("error", "El campo esta vacío");
            return false;
        } else if (input.files[0].type != fileType) {
            log.write("error", "Ese tipo de archivo es invalido");
            return false;
        }

        log.write("success", "El campo es correcto");
        return true;
    }

    return {
        isOk : isOk,
        input : input,
    }
}