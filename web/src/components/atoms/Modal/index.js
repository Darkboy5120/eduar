/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useEffect } from 'react';
import styles from './styles.module.css';
import { FaTimes } from 'react-icons/fa';

function Modal({
  visible, setVisible, title, children,
}) {
  const modalContainer = useRef();
  const hideModal = () => {
    setVisible(false);
  };
  const checkDismiss = (e) => {
    if (e.target.classList.contains('modalWrapper')) {
      hideModal();
    }
  };
  useEffect(() => {
    if (visible) {
      document.activeElement.blur();
      modalContainer.current.focus();
      modalContainer.current.onkeyup = (e) => {
        if (e.which === 27) {
          setVisible(false);
          document.activeElement.blur();
        }
      };
    }
  }, [visible, modalContainer, setVisible]);

  return visible ? (
    <div className={styles.modalWrapper} role="button" onClick={checkDismiss}>
      <div ref={modalContainer} role="navigation" tabIndex="1" className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button type="button" aria-label="Cerrar" className={styles.modalClose} onClick={hideModal}><FaTimes /></button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  ) : null;
}

export default Modal;
