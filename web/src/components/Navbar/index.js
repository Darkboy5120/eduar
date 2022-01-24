import styles from "./styles";
import Button from "../Button";

const Navbar = () => {
  return (
    <div style={styles.container}>
      <Button title="Eduar" onClick={() => console.log(123)} />
    </div>
  );
};

export default Navbar;