import taskRoutes from "./routes/task-routes";
import { Task } from "domain/task";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/tasks", taskRoutes);

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});
