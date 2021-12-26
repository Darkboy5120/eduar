/* eslint-disable func-names */
const plural = ' archivo';
const singular = ' archivos';

const createInput = (inputSelector) => ({
  element: document.querySelector(inputSelector),
});
const createLabel = (input) => ({
  element: input.element.parentNode.parentNode.querySelector('label'),
});
const createLog = (input, options) => {
  const log = {
    element: input.element.parentNode.parentNode.querySelector('.input-log'),
    message: {
      minLength: `No debes agregar menos de ${options.min}${(options.min > 1)
        ? plural : singular}`,
      maxLength: `No debes agregar más de ${options.max}${(options.max > 1)
        ? plural : singular}`,
      empty: 'El campo esta vacío',
      success: 'El campo es correcto',
      regex: 'No se permite ese tipo de archivo',
    },
    print: (type, message) => {
      log.element.textContent = message;
      log.element.classList.remove('hidden');
      if (type === 'success') {
        log.element.classList.add('input-success-log');
        log.element.classList.remove('input-error-log');
      } else if (type === 'error') {
        log.element.classList.remove('input-success-log');
        log.element.classList.add('input-error-log');
      }
    },
    hide: () => log.element.classList.add('hidden'),
  };
  return log;
};

const createItsAllRight = (files, log, options) => () => {
  if (files.length === 0) {
    log.print('error', log.message.empty);
    return false;
  } if (files.length < options.min) {
    log.print('error', log.message.minLength);
    return false;
  } if (files.length > options.max) {
    log.print('error', log.message.maxLength);
    return false;
  }
  log.print('success', log.message.success);
  return true;
};

const createEmpty = (input) => {
  const empty = {
    element: input.element.parentNode.querySelector('.file-container > .file-empty'),
    show: () => {
      empty.element.classList.remove('hidden');
    },
    hide: () => {
      empty.element.classList.add('hidden');
    },
  };
  return empty;
};

const createButton = (input) => {
  const button = {
    add: {
      element: input.element.parentNode.querySelector('.file-container > .file-actions > .file-add'),
      onclick: () => input.element.click(),
      show: () => button.add.element.classList.remove('hidden'),
      hide: () => button.add.element.classList.add('hidden'),
    },
    edit: {
      element: input.element.parentNode.querySelector('.file-container > .file-actions > .file-edit'),
      onclick: () => null,
      show: () => button.edit.element.classList.remove('hidden'),
      hide: () => button.edit.element.classList.add('hidden'),
    },
  };
  return button;
};

const listenStatus = (e, images) => {
  switch (images.status) {
    case 1:
      if (!e.target.classList.contains('file-edit')) {
        images.element.classList.remove('editing');
        // eslint-disable-next-line no-param-reassign
        images.status = 0;
      }
      break;
    default:
  }
};

const setEvents = (button, input, images, empty) => {
  window.addEventListener('click', (e) => listenStatus(e, images));
  button.add.element.addEventListener('click', button.add.onclick);
  button.edit.element.addEventListener('click', button.edit.onclick);
  input.element.addEventListener('change', function () { images.handleFiles(this.files); }, false);
  images.element.addEventListener('dragenter', () => function () { images.dragenter(this.files); }, false);
  images.element.addEventListener('dragleave', () => function () { images.dragleave(this.files); }, false);
  images.element.addEventListener('dragover', () => function () { images.dragover(this.files); }, false);
  images.element.addEventListener('drop', () => function () { images.drop(this.files); }, false);
  empty.element.addEventListener('dragenter', () => function () { images.dragenter(this.files); }, false);
  empty.element.addEventListener('dragleave', () => function () { images.dragleave(this.files); }, false);
  empty.element.addEventListener('dragover', () => function () { images.dragover(this.files); }, false);
  empty.element.addEventListener('drop', () => function () { images.drop(this.files); }, false);
};

const setDefaultConfiguration = (images, button, input) => {
  images.hide();
  button.edit.hide();
  input.element.classList.add('hidden');
};

const getOutputObject = (itsAllRight, log, files, focus, images, resetIsEdited, isEdited) => ({
  isDone: () => (!!(itsAllRight())),
  isOk: itsAllRight,
  printLog: log.print,
  val: () => files,
  files,
  isEmpty: files.length === 0,
  focus,
  handleFiles: images.handleFiles,
  resetIsEdited,
  isEdited,
});

class Images {
  constructor(files, editedStatus, input, regex, empty, button, itsAllRight) {
    this.status = 0;
    this.element = input.element.parentNode.querySelector('.file-container > .file-images');
    this.regex = regex;
    this.empty = empty;
    this.thefiles = files;
    this.editedStatus = editedStatus;
    this.button = button;
    this.itsAllRight = itsAllRight;
  }

  show = () => {
    this.element.classList.remove('hidden');
  };

  hide = () => {
    this.element.classList.add('hidden');
  };

  update = () => {
    // eslint-disable-next-line no-unused-vars
    const r = this.itsAllRight();
    if (this.thefiles.length > 0) {
      this.show();
      this.empty.hide();
      this.button.edit.show();
    } else {
      this.hide();
      this.empty.show();
      this.button.edit.hide();
    }
  };

  edit = () => {
    this.element.classList.add('editing');
    this.status = 1;
  };

  createComponent = (file) => {
    const div = document.createElement('div');
    const removeIcon = document.createElement('i');
    removeIcon.classList.add('file-remove', 'fas', 'fa-trash-alt');
    removeIcon.addEventListener('click', () => {
      for (let i = 0; i < this.thefiles.length; i += 1) {
        if (this.thefiles[i].name === file.name) {
          this.editedStatus = true;
          delete this.thefiles[i];
          this.thefiles.splice(i, 1);
          div.remove();
          this.update();
          // eslint-disable-next-line no-unused-vars
          const r = this.itsAllRight();
        }
      }
    });
    div.classList.add('file-image');
    const img = document.createElement('img');
    div.appendChild(img);
    div.appendChild(removeIcon);
    img.file = file;
    this.element.appendChild(div);

    const reader = new FileReader();
    // eslint-disable-next-line no-param-reassign
    reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; }(img));
    reader.readAsDataURL(file);
  };

  handleFiles = (f) => {
    if (f.length) this.files = f;
    for (let i = 0; i < this.files.length; i += 1) {
      const file = this.files[i];
      const fileType = this.regex;
      const isDuplicated = this.thefiles.filter((fi) => file.name === fi.name).length > 0;
      if (!file.type.match(fileType)) {
        // eslint-disable-next-line no-continue
        continue;
      } else if (isDuplicated) {
        // eslint-disable-next-line no-continue
        continue;
      }

      this.thefiles.push(file);
      this.editedStatus = true;
      this.createComponent(file);
    }
    this.update();
  };

  dragenter = (e) => {
    this.element.classList.add('file-dragover');
    this.empty.element.classList.add('file-dragover');
    e.stopPropagation();
    e.preventDefault();
  };

  // eslint-disable-next-line class-methods-use-this
  dragover = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  dragleave = (e) => {
    this.element.classList.remove('file-dragover');
    this.empty.element.classList.remove('file-dragover');
    e.stopPropagation();
    e.preventDefault();
  };

  drop = (e) => {
    this.element.classList.remove('file-dragover');
    this.empty.element.classList.remove('file-dragover');
    e.stopPropagation();
    e.preventDefault();

    const dt = e.dataTransfer;
    const { files } = dt;
    this.handleFiles(files);
  };
}

export function ImageControl(inputSelector, options) {
  let editedStatus = false;
  const files = [];
  const input = createInput(inputSelector);
  const log = createLog(input, options);
  const label = createLabel(input);
  const empty = createEmpty(input);
  const button = createButton(input);

  const itsAllRight = createItsAllRight(files, log, options);
  const resetIsEdited = () => { editedStatus = false; };
  const isEdited = () => editedStatus;
  const focus = () => { label.element.scrollIntoView(); };

  const images = new Images(files, editedStatus, input, options.regex, empty, button, itsAllRight);
  button.edit.onclick = () => { images.edit(); };

  setDefaultConfiguration(images, button, input);
  setEvents(button, input, images, empty);

  return getOutputObject(itsAllRight, log, files, focus, images, resetIsEdited, isEdited);
}

export default ImageControl;
