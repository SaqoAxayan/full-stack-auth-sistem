import TodoService from "../service/todo-service.js";

class TodoController {
  async getTodo(req, res) {
    try {
      const userId = req.user.payload.id;
      const todoData = await TodoService.getTodo(userId);
      return res.status(200).json(todoData);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async addTodo(req, res) {
    try {
      const { title, description } = req.body;
      const { id } = req.user.payload;
      const todoData = await TodoService.addTodo(title, description, id);
      return res.status(200).json(todoData);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async deleteTodo(req, res) {
    try {
      const todoId = req.params.id;
      const userId = req.user.payload.id;
      const todo = await TodoService.deleteTodo(todoId, userId);
      return res.status(200).json(todo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async updateTodo(req, res) {
    try {
      const userId = req.user.payload.id;
      const todoId = req.params.id;
      const { title, description } = req.body;

      const todo = await TodoService.updateTodo(
        userId,
        todoId,
        title,
        description
      );
      return res.status(200).json(todo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async checkedTodo(req, res) {
    try {
      const todoId = req.params.id;
      const userId = req.user.payload.id;
      const todoData = await TodoService.checkedTodo(userId, todoId);
      return res.status(200).json(todoData);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async deleteAllTodo(req, res) {
    try {
      const userId = req.user.payload.id;
      const todoData = await TodoService.deleteAllTodo(userId);
      return res.status(200).json(todoData);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new TodoController();
