import express from "express";
import { InMemoryEventStore } from "./store/event-store";
import { TaskService } from "./services/task-service";
import { MockTaskAnalyzer } from "../../../packages/ai/src/mock-analyzer";

const app = express();
app.use(express.json());

const store = new InMemoryEventStore();
const analyzer = new MockTaskAnalyzer();
const service = new TaskService(store, analyzer);

app.post("/tasks/:id", async (req, res) => {
  const insight = await service.createTask(req.params.id);
  res.json(insight);
});

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});
