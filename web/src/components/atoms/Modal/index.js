import React, {useRef, useEffect} from "react";
import "./styles.css";
import {FaTimes} from "react-icons/fa";

const Modal = ({visible, setVisible, title, children}) => {
  let modalContainer = useRef();
  const hideModal = () => {
    setVisible(false);
  };
  const checkDismiss = e => {
    if (e.target.classList.contains("modalWrapper")) {
      hideModal();
    }
  };
  
  useEffect(() => {
    if (visible) {
      document.activeElement.blur();
      modalContainer.current.focus();
    }
  }, [visible, modalContainer]);

  return visible ? <div className="modalWrapper" onClick={checkDismiss}>
  <div ref={modalContainer} className="modalContainer">
    <div className="modalHeader">
      <h2 className="modalTitle">{title}</h2>
      <button className="modalClose" onClick={hideModal}>{<FaTimes />}</button>
    </div>
    <div className="modalBody">{children}</div>
  </div>
</div> : null;
};

export default Modal;