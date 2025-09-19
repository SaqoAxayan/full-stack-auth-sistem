import React from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const Home = () => {
  const navigate = useNavigate();

  const navigateHandlerNextTodo = () => {
    navigate("/todo");
  };
  
  return (
    <div className={styles.container}>
      <Button onClick={navigateHandlerNextTodo} buttonContent="TodoList" />
    </div>
  );
};

export default Home;
