import React, { FC } from "react";
import { ITodo } from "../../models/ITodo";
import styles from "./style.module.css";

interface TodoProps {
  todo: ITodo;
  todoApiFetch: (id: string | undefined, action: "toggle" | "delete") => void;
  todoUpdate: (e: React.MouseEvent<HTMLParagraphElement>, id: string | undefined) => void;
}

const TodoItem: FC<TodoProps> = ({ todo, todoApiFetch, todoUpdate }) => {
  return (
    <li className={styles.card}>
      <p onClick={(e) => todoUpdate(e,todo.id)}>title {todo.title}</p>
      <p onClick={(e) => todoUpdate(e,todo.id)}>description {todo.description}</p>
      <input
        type="checkbox"
        defaultChecked={todo.checked}
        onChange={() => todoApiFetch(todo.id, "toggle")}
      />
      <button onClick={() => todoApiFetch(todo.id, "delete")}>delete</button>
    </li>
  );
};

export default TodoItem;
