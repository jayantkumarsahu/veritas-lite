import { TaskEvent } from "../../events/task-events";
import { TaskInsight } from "./task-insights";

export interface TaskAnalyzer {
  analyze(events: TaskEvent[]): Promise<TaskInsight>;
}
