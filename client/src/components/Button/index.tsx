import React, { FC } from "react";
import styles from "./style.module.css";

interface ButtonProps {
  buttonContent: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ buttonContent, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {buttonContent}
    </button>
  );
};

export default Button;
