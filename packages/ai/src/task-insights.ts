// AI OUTPUT CONTRACT — Task Insights

export type TaskComplexity =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "UNKNOWN";

export interface TaskInsight {
  taskId: string;
  inferredIntent: string;
  complexity: TaskComplexity;
  suggestedNextAction: string;
  confidence: number; // 0 → 1
  generatedAt: Date;
}
