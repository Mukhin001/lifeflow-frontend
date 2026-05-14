import { InputProps } from "./input.types";
import styles from "./Input.module.css";

const Input = ({ className, ...props }: InputProps) => {
  return <input className={`${className} ${styles.input}`} {...props} />;
};

export default Input;
