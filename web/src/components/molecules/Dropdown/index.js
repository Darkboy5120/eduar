import React, {useEffect, useRef} from "react";
import Button from "../../atoms/Button";
import './styles.css';

const handlekeyboardNavigation = root => {
  root.current.focus();
  root.current.onkeypress = e => {
    e.preventDefault();
    e.stopPropagation();
    let firstChild = root.current.querySelector(".dropdownItem");
    firstChild.focus();
    let rootChilds = root.current.querySelectorAll(".dropdownItem");
    rootChilds.forEach(el => {
      el.onkeyup = e => {
        e.preventDefault();
        e.stopPropagation();
        if (e.which === 27) {
          root.current.querySelector("button").focus();
        }
      };
    })
  };
};

const Dropdown = ({children, title, leftIcon, align}) => {
  let root = useRef();
  align = align ?? "left";
  let contentAlign = align === "right" ? "contentRight" : null;

  useEffect(() => {
    handlekeyboardNavigation(root);
  }, [root]);

  return (
    <div ref={root} className="dropdown">
      <Button leftIcon={leftIcon} title={title} onClick={() => console.log(123)} />
      <div className={`content ${contentAlign}`}>{children}</div>
    </div>
  );
};

export default Dropdown;