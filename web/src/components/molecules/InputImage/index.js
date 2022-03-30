/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect, useState } from 'react';
import { FaPlus, FaEdit } from 'react-icons/fa';
import CustomText from '../../atoms/CustomText';
import styles from './styles.module.css';
import {
  getOutputObject,
  setDefaultConfiguration,
  setEvents,
  createButton,
  createEmpty,
  createItsAllRight,
  createLog,
  createLabel,
  createInput,
} from './utils';

class Images {
  constructor(files, editedStatus, input, regex, empty, button, itsAllRight, setOk, setValue) {
    this.status = 0;
    this.element = input.element.parentNode.querySelector(`.${styles.fileContainer} > .${styles.fileImages}`);
    this.regex = regex;
    this.empty = empty;
    this.thefiles = files;
    this.editedStatus = editedStatus;
    this.button = button;
    this.itsAllRight = itsAllRight;
    this.setOk = setOk;
    this.setValue = setValue;
  }

  show = () => {
    this.element.classList.remove(styles.hidden);
  };

  hide = () => {
    this.element.classList.add(styles.hidden);
  };

  update = () => {
    // eslint-disable-next-line no-unused-vars
    const r = this.itsAllRight();
    if (this.thefiles.length > 0) {
      this.setOk(true);
      this.setValue(this.thefiles);
      this.show();
      this.empty.hide();
      this.button.edit.show();
    } else {
      this.setValue(this.thefiles);
      this.setOk(false);
      this.hide();
      this.empty.show();
      this.button.edit.hide();
    }
  };

  edit = () => {
    this.element.classList.add(styles.editing);
    this.status = 1;
  };

  createComponent = (file) => {
    const div = document.createElement('div');
    const removeIcon = document.createElement('p');
    removeIcon.textContent = 'Eliminar';
    removeIcon.classList.add(styles.fileRemove);
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
    div.classList.add(styles.fileImage);
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
    this.element.classList.add(styles.fileDragover);
    this.empty.element.classList.add(styles.fileDragover);
    e.stopPropagation();
    e.preventDefault();
  };

  // eslint-disable-next-line class-methods-use-this
  dragover = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  dragleave = (e) => {
    this.element.classList.remove(styles.fileDragover);
    this.empty.element.classList.remove(styles.fileDragover);
    e.stopPropagation();
    e.preventDefault();
  };

  drop = (e) => {
    this.element.classList.remove(styles.fileDragover);
    this.empty.element.classList.remove(styles.fileDragover);
    e.stopPropagation();
    e.preventDefault();

    const dt = e.dataTransfer;
    const { files } = dt;
    this.handleFiles(files);
  };
}

export function ImageControl(inputEl, setOk, setValue, options) {
  let editedStatus = false;
  const files = [];
  const input = createInput(inputEl);
  const log = createLog(input, options);
  const label = createLabel(input);
  const empty = createEmpty(input);
  const button = createButton(input);

  const itsAllRight = createItsAllRight(files, log, options);
  const resetIsEdited = () => { editedStatus = false; };
  const isEdited = () => editedStatus;
  const focus = () => { label.element.scrollIntoView(); };

  const images = new Images(
    files,
    editedStatus,
    input,
    options.regex,
    empty,
    button,
    itsAllRight,
    setOk,
    setValue,
  );
  button.edit.onclick = () => { images.edit(); };

  setDefaultConfiguration(images, button, input);
  setEvents(button, input, images, empty);

  return getOutputObject(itsAllRight, log, files, focus, images, resetIsEdited, isEdited);
}

function InputImage({
  title, label, setValue, setOk,
}) {
  const input = useRef();
  const [controller, setController] = useState(null);

  useEffect(() => {
    if (input && !controller) {
      setController(new ImageControl(input.current, setOk, setValue, {
        min: 1, max: 5, regex: /image.*/,
      }));
    }
  }, [input]);

  return (
    <div className={styles.inputLayout}>
      <CustomText text={title} className={styles.title} />
      <div className={styles.inputField}>
        <input ref={input} className={styles.hidden} type="file" multiple />
        <div className={`${styles.inputSecondary} ${styles.fileContainer} ${styles.long}`}>
          <div className={styles.fileImages} />
          <span className={styles.fileEmpty}>No se han agregado imágenes</span>
          <div className={styles.fileActions}>
            <button type="button" className="fileAdd">
              <FaPlus className={styles.actionIcon} />
              Agregar
            </button>
            <button type="button" className="fileEdit">
              <FaEdit className={styles.actionIcon} />
              Editar
            </button>
          </div>
        </div>
      </div>
      <span className={`${styles.inputLog} ${styles.hidden}`} />
      {label ? <CustomText text={label} /> : null}
    </div>
  );
}

export default InputImage;
