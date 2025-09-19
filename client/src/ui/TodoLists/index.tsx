import React, { FC } from "react";
import styles from "./style.module.css";
import { ITodo } from "../../models/ITodo";
import TodoItem from "../../components/TodoCard";
import { todoAPI } from "../../services/todoService";

interface TodoListsProps {
  todos: ITodo[];
}
const TodoLists: FC<TodoListsProps> = ({ todos }) => {
  const [fetchDeleteTodo, {}] = todoAPI.useFetchDeleteTodoMutation();
  const [fetchCheckedTodo, {}] = todoAPI.useFetchCheckedTodoMutation();
  const [fetchUpdateTodo, {}] = todoAPI.useFetchUpdateTodoMutation();

  const todoApiSendId = async (
    id: string | undefined,
    actin: "toggle" | "delete"
  ) => {
    if (!id) return;
    try {
      switch (actin) {
        case "toggle":
          const toggleResponse = await fetchCheckedTodo(id);
          console.log(toggleResponse);
          break;
        case "delete":
          const deleteResponse = await fetchDeleteTodo(id);
          console.log(deleteResponse);
          break;
      }
    } catch (error) {
      console.log("Todo Error");
    }
  };

  const todoUpdate = async (
    e: React.MouseEvent<HTMLParagraphElement>,
    id: string | undefined
  ) => {
    const name = e.currentTarget.innerText.split(" ")[0];
    const prom = prompt(`գրեք նոր - ${name}`)?.trim();

    if (name && prom && id) {
      try {
        const responseUpdate = await fetchUpdateTodo({
          id,
          field: name as "title" | "description",
          value: prom,
        });
        console.log(responseUpdate);
      } catch (error) {
        console.log("Todo Error");
      }
    }
  };

  const pendingTodos = todos.map((todo) => {
    return (
      <TodoItem
        key={todo.id}
        todo={todo}
        todoApiFetch={todoApiSendId}
        todoUpdate={todoUpdate}
      />
    );
  });
  return <ol className={styles.lists}>{pendingTodos}</ol>;
};

export default TodoLists;
