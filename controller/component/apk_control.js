const createLog = (input) => {
  const log = {
    element: input.parentNode.querySelector('.input-log'),
    write: (type, message) => {
      if (type === 'success') {
        log.element.classList.add('input-success-log');
        log.element.classList.remove('input-error-log');
      } else if (type === 'error') {
        log.element.classList.remove('input-success-log');
        log.element.classList.add('input-error-log');
      }
      log.element.textContent = message;
      log.element.classList.remove('hidden');
    },
    hide: () => { log.element.add('hidden'); },
  };
  return log;
};

const createIsOk = (input, fileType, log) => () => {
  if (input.files.length === 0) {
    log.write('error', 'El campo esta vacío');
    return false;
  } if (input.files[0].type !== fileType) {
    log.write('error', 'Ese tipo de archivo es invalido');
    return false;
  }

  log.write('success', 'El campo es correcto');
  return true;
};

const setEvents = (input, isOk) => {
  input.addEventListener('change', () => {
    isOk();
  });
};

function ApkControl(inputSelector, fileType) {
  const input = document.querySelector(inputSelector);

  const log = createLog(input);
  const isOk = createIsOk(input, fileType, log);

  setEvents(input, isOk);

  return {
    isOk,
    input,
  };
}

export default ApkControl;
