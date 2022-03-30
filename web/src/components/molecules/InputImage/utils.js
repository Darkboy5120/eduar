import styles from './styles.module.css';

/* eslint-disable func-names */
const plural = ' archivo';
const singular = ' archivos';

export const createInput = (inputEl) => ({
  element: inputEl,
});
export const createLabel = (input) => ({
  element: input.element.parentNode.parentNode.querySelector('label'),
});
export const createLog = (input, options) => {
  const log = {
    element: input.element.parentNode.parentNode.querySelector(`.${styles.inputLog}`),
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
      log.element.classList.remove(styles.hidden);
      if (type === 'success') {
        log.element.classList.add(styles.inputSuccessLog);
        log.element.classList.remove(styles.inputErrorLog);
      } else if (type === 'error') {
        log.element.classList.remove(styles.inputSuccessLog);
        log.element.classList.add(styles.inputErrorLog);
      }
    },
    hide: () => log.element.classList.add(styles.hidden),
  };
  return log;
};

export const createItsAllRight = (files, log, options) => () => {
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

export const createEmpty = (input) => {
  const empty = {
    element: input.element.parentNode.querySelector(`.${styles.fileContainer} > .${styles.fileEmpty}`),
    show: () => {
      empty.element.classList.remove(styles.hidden);
    },
    hide: () => {
      empty.element.classList.add(styles.hidden);
    },
  };
  return empty;
};

export const createButton = (input) => {
  const button = {
    add: {
      element: input.element.parentNode.querySelector(`.${styles.fileContainer} > .${styles.fileActions} > .fileAdd`),
      onclick: () => input.element.click(),
      show: () => button.add.element.classList.remove(styles.hidden),
      hide: () => button.add.element.classList.add(styles.hidden),
    },
    edit: {
      element: input.element.parentNode.querySelector(`.${styles.fileContainer} > .${styles.fileActions} > .fileEdit`),
      onclick: () => null,
      show: () => button.edit.element.classList.remove(styles.hidden),
      hide: () => button.edit.element.classList.add(styles.hidden),
    },
  };
  return button;
};

const listenStatus = (e, images) => {
  switch (images.status) {
    case 1:
      if (!e.target.classList.contains('fileEdit')) {
        images.element.classList.remove(styles.editing);
        // eslint-disable-next-line no-param-reassign
        images.status = 0;
      }
      break;
    default:
  }
};

export const setEvents = (button, input, images, empty) => {
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

export const setDefaultConfiguration = (images, button, input) => {
  images.hide();
  button.edit.hide();
  input.element.classList.add(styles.hidden);
};

// eslint-disable-next-line max-len
export const getOutputObject = (itsAllRight, log, files, focus, images, resetIsEdited, isEdited) => ({
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
