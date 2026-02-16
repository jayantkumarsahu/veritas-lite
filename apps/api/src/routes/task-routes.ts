import { Router } from "express";
import { TaskService } from "../services/task-service";
import {EventStore} from "../store/event-store"
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

router.get("/tasks",(req,res)=>{

	res.status(200).json({data: EventStore.all()} );
});

export default router;
