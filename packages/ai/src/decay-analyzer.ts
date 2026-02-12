import { TaskEvent } from "../../events/task-events";
import { TaskDecaySignal } from "./task-decay";

export class TaskDecayAnalyzer {
  analyze(events: TaskEvent[]): TaskDecaySignal {
    const lastEvent = events[events.length - 1];
    const now = Date.now();
    const last = new Date(lastEvent.occurredAt).getTime();

    const inactivityDays = Math.floor(
      (now - last) / (1000 * 60 * 60 * 24)
    );

    const decayScore = Math.min(inactivityDays / 14, 1);

    const riskLevel =
      decayScore > 0.7 ? "HIGH" :
      decayScore > 0.3 ? "MEDIUM" :
      "LOW";

    return {
      taskId: (lastEvent as any).payload?.taskId ?? "unknown",
      inactivityDays,
      decayScore,
      riskLevel,
      explanation:
        "Task shows reduced momentum due to inactivity",
      generatedAt: new Date(),
    };
  }
}
