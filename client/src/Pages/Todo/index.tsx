import React, { useRef, useState } from "react";
import styles from "./style.module.css";
import { todoAPI } from "../../services/todoService";
import TodoLists from "../../ui/TodoLists";
import { useMemo } from "react";

const Todo = () => {
  const { data: todosData, isLoading, isError } = todoAPI.useGetTodoQuery();
  const [fetchAddTodo, {}] = todoAPI.useFetchAddTodoMutation();
  const [fetchDeleteAllTodo, {}] = todoAPI.useFetchDeleteAllTodoMutation();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    const title: string | undefined = titleRef?.current?.value;
    const description: string | undefined = descriptionRef?.current?.value;
    const checked: boolean = false;

    if (title && description) {
      const newTodo = {
        title,
        description,
        checked,
      };
      try {
        const response = await fetchAddTodo(newTodo);
        console.log(response);
      } catch (error) {
        console.log("Todo Error:");
      }
    }
  };

  const deleteAllTodo = async () => {
    try {
      const response = await fetchDeleteAllTodo();
      console.log(response);
    } catch (error) {
      console.log("Todo Error:");
    }
  };

  const searchTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filterTodos = useMemo(() => {
    if (!todosData?.todos) return [];
    if (!searchQuery) return todosData.todos;

    return todosData.todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [todosData?.todos, searchQuery]);

  return (
    <div className={styles.container}>
      <form onSubmit={addTodo}>
        <input
          ref={titleRef}
          placeholder="title"
          name="title"
          autoComplete="title"
          required
        />
        <input
          ref={descriptionRef}
          placeholder="description"
          name="description"
          autoComplete="description"
          required
        />
        <button>addTodo</button>
      </form>
      <button onClick={deleteAllTodo} className={styles.deleteAll}>
        deleteAllChecked
      </button>
      <input
        onChange={(e) => searchTodo(e)}
        className={styles.searchTodo}
        placeholder="searchTodo"
      />
      {filterTodos.length > 0 ? (
        <TodoLists todos={filterTodos} />
      ) : searchQuery ? (
        <div className={styles.noResults}>
          No todos found matching "{searchQuery}"
        </div>
      ) : isError ? (
        <div className={styles.noTodos}>No todos yet. Add your first todo!</div>
      ) : isLoading ? (
        <div>...loadingTodos</div>
      ): (<div></div>)}
    </div>
  );
};

export default Todo;
