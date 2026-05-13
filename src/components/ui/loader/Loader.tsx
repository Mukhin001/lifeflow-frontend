import clsx from "clsx";
import styles from "./loader.module.css";

interface LoaderProps {
  text?: string;
  overlay?: boolean;
}

const Loader = ({ text, overlay = false }: LoaderProps) => {
  return (
    <div className={clsx(styles.wrapper, overlay && styles.overlay)}>
      <div className={styles.loader} />

      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default Loader;
