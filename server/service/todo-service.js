import mongoose from "mongoose";
import Todo from "../models/todo-model.js";

class TodoService {
  async getTodo(userId) {
    let todo = await Todo.findOne({ user: userId });
    if (!todo) throw new Error("Todo not found");

    const todosWithId = todo.todos.map((todo) => ({
      id: todo._id,
      title: todo.title,
      description: todo.description,
      checked: todo.checked,
    }));

    return {
      user: todo.user,
      todos: todosWithId,
    };
  }
  async addTodo(title, description, id) {
    if (!title) throw new Error("title դաշտը լրացված չէ");
    if (!description) throw new Error("description դաշտը լրացված չէ");

    const newList = {
      title,
      description,
      checked: false,
    };

    let candidate = await Todo.findOne({ user: id });

    if (!candidate) {
      candidate = await Todo.create({
        user: id,
        todos: [newList],
      });
    } else {
      const titleStep = candidate.todos.find((todo) => todo.title === title);
      if (titleStep)
        throw new Error("այս title ով todo գոյություն ունի ուրիշ անուն գրեք");
      candidate.todos.push(newList);
      await candidate.save();
    }

    return candidate;
  }

  async deleteTodo(todoId, userId) {
    const updated = await Todo.findOneAndUpdate(
      { user: userId },
      { $pull: { todos: { _id: todoId } } },
      { new: true }
    );
    if (!updated) throw new Error("Todo not found");
    return updated;
  }

  async updateTodo(userId, todoId, title, description) {
    const updateFields = {};
    if (title !== undefined) updateFields["todos.$.title"] = title;
    if (description !== undefined)
      updateFields["todos.$.description"] = description;

    if (Object.keys(updateFields).length === 0) {
      throw new Error("Nothing to update");
    }

    const updated = await Todo.findOneAndUpdate(
      { user: userId, "todos._id": todoId },
      {
        $set: updateFields,
      },
      { new: true }
    );
    if (!updated) throw new Error("Todo not found");
    return updated;
  }

  async checkedTodo(userId, todoId) {
    const updated = await Todo.findOne({ user: userId, "todos._id": todoId });

    if (!updated) throw new Error("Todo not found");

    const item = updated.todos.id(todoId);
    item.checked = !item.checked;

    await updated.save();

    return updated;
  }

  async deleteAllTodo(userId) {
    const todoData = await Todo.findOneAndUpdate(
      {
        user: userId,
      },
      {
        $pull: { todos: { checked: true } },
      }
    );

    if (!todoData) throw new Error("Todo not found");
    return todoData;
  }
}

export default new TodoService();
