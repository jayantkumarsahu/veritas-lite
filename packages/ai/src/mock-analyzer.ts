import { TaskAnalyzer } from "./task-analyzer";
import { TaskInsight } from "./task-insights";
import { TaskEvent } from "../../events/task-events";

export class MockTaskAnalyzer implements TaskAnalyzer {
  async analyze(events: TaskEvent[]): Promise<TaskInsight> {
    const taskId = events[0]?.payload?.taskId ?? "unknown";

    return {
      taskId,
      inferredIntent: "General task execution",
      complexity: "MEDIUM",
      suggestedNextAction: "Break task into smaller steps",
      confidence: 0.42,
      generatedAt: new Date(),
    };
  }
}
