import React from "react";
import styles from "./style.module.css";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className={styles.container}>
      <p>Main Layout</p>
      <Outlet />
    </div>
  );
};

export default Main;
