import { ButtonProps } from "./button.types";
import styles from "./button.module.css";
import clsx from "clsx";

const Button = ({
  children,
  variant = "primary",
  active = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        active && styles.active,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
