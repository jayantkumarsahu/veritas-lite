// AI SIGNAL — Task Decay

export interface TaskDecaySignal {
  taskId: string;
  inactivityDays: number;
  decayScore: number; // 0 → 1
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  explanation: string;
  generatedAt: Date;
}
