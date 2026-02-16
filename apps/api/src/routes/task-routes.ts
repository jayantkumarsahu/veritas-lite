import { Router } from "express";
import { TaskService } from "../services/task-service";

const router = Router();

router.post("/", (req, res) => {
  try {
    const { title } = req.body;
    const task = TaskService.createTask(title);
    res.status(201).json(task);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
