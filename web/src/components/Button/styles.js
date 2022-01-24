import theme from "../../assets/theme/light";

const styles = {
  container: {
    padding: theme.spacing.m,
    fontSize: theme.font.xl,
    fontWeight: 'bold',
    border: `2px solid ${theme.color.main2}`,
    borderRadius: 5,
    cursor: 'pointer',
  },
  containerHover: {
    backgroundColor: theme.color.main3,
  },
};

export default styles;