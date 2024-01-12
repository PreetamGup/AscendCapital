import { Router } from "express";
import todoController from "../controller/todoController.js";

const router = Router();

router.post("/create", todoController.create)
router.post("/add", todoController.addTodo)
router.get("/get/:user_id", todoController.getTodo)
router.put("/update", todoController.updateTodo)
router.delete("/delete/:todo_id", todoController.deleteTodo)


export default router