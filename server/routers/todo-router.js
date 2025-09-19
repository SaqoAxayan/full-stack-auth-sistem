import { Router } from "express";
import TodoController from "../controllers/todo-controller.js";

const router = Router();

router.get('/', TodoController.getTodo)
router.post("/addTodo", TodoController.addTodo);
router.delete("/delete/:id", TodoController.deleteTodo);
router.patch("/update/:id", TodoController.updateTodo);
router.patch("/checked/:id", TodoController.checkedTodo);
router.delete('/deleteAll', TodoController.deleteAllTodo)

export default router;
