import styles from "./select.module.css";

type Props = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ className = "", children, ...props }: Props) => {
  return (
    <select className={`${styles.select} ${className}`} {...props}>
      {children}
    </select>
  );
};

export default Select;
