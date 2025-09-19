import React from "react";
import styles from "./style.module.css";
import { HeaderList } from "./data";
import { Link } from "react-router-dom";

const Header = () => {
  const pendingHeaderList = HeaderList.map((list) => (
    <Link to={list.to} key={list.id} >{list.name}</Link>
  ));
  return <header className={styles.header}>{pendingHeaderList}</header>;
};

export default Header;
