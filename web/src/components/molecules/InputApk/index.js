import React, { useState, useRef, useEffect } from 'react';
import CustomText from '../../atoms/CustomText';
import styles from './styles.module.css';

const createLog = (input) => {
  const log = {
    element: input.parentNode.querySelector(`.${styles.inputLog}`),
    write: (type, message) => {
      if (type === 'success') {
        log.element.classList.add(styles.inputSuccessLog);
        log.element.classList.remove(styles.inputErrorLog);
      } else if (type === 'error') {
        log.element.classList.remove(styles.inputSuccessLog);
        log.element.classList.add(styles.inputErrorLog);
      }
      log.element.textContent = message;
      log.element.classList.remove(styles.hidden);
    },
    hide: () => { log.element.add(styles.hidden); },
  };
  return log;
};

const createIsOk = (input, fileType, log, setOk, setValue) => () => {
  setValue(input.files);
  if (input.files.length === 0) {
    log.write('error', 'El campo esta vacío');
    setOk(false);
    return false;
  } if (input.files[0].type !== fileType) {
    log.write('error', 'Ese tipo de archivo es invalido');
    setOk(false);
    return false;
  }

  setOk(true);

  log.write('success', 'El campo es correcto');
  return true;
};

const setEvents = (input, isOk) => {
  input.addEventListener('change', () => {
    isOk();
  });
};

function ApkControl(inputEl, setOk, setValue, fileType) {
  const input = inputEl;
  const log = createLog(input);
  const isOk = createIsOk(input, fileType, log, setOk, setValue);

  setEvents(input, isOk);

  return {
    isOk,
    input,
  };
}

function InputApk({ title, setValue, setOk }) {
  const input = useRef();
  const [controller, setController] = useState(null);

  useEffect(() => {
    if (input && !controller) {
      setController(new ApkControl(input.current, setOk, setValue, 'application/vnd.android.package-archive'));
    }
  }, [input]);

  return (
    <div className={styles.inputLayout}>
      <CustomText className={styles.title} text={title} />
      <input type="file" ref={input} />
      <span className={`${styles.inputLog} ${styles.hidden}`} />
      <p>Tiene que se una archivo apk.</p>
    </div>
  );
}

export default InputApk;
