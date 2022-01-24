import React, {useState} from "react";
import styles from "./styles";

const Button = ({title, onClick}) => {
  const [hover, setHover] = useState(false);
  return (
    <button onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={styles.container} onClick={onClick}>{title}</button>
  );
};

export default Button;