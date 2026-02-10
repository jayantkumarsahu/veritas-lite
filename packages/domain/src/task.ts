// DOMAIN: Task Aggregate Root

export type TaskStatus =
  | "CREATED"
  | "PLANNED"
  | "IN_PROGRESS"
  | "BLOCKED"
  | "COMPLETED";

export interface TaskEvent {
  type: string;
  occurredAt: Date;
  payload: unknown;
}

export class Task {
  private readonly id: string;
  private status: TaskStatus;
  private readonly history: TaskEvent[] = [];

  constructor(id: string) {
    this.id = id;
    this.status = "CREATED";
    this.record("TASK_CREATED", { id });
  }

  plan() {
    this.ensureStatus("CREATED");
    this.status = "PLANNED";
    this.record("TASK_PLANNED", {});
  }

  start() {
    this.ensureStatus("PLANNED");
    this.status = "IN_PROGRESS";
    this.record("TASK_STARTED", {});
  }

  block(reason: string) {
    if (this.status === "COMPLETED") {
      throw new Error("Completed task cannot be blocked");
    }
    this.status = "BLOCKED";
    this.record("TASK_BLOCKED", { reason });
  }

  complete() {
    this.ensureStatus("IN_PROGRESS");
    this.status = "COMPLETED";
    this.record("TASK_COMPLETED", {});
  }

  getState() {
    return {
      id: this.id,
      status: this.status,
      history: [...this.history],
    };
  }

  // -------- private helpers --------

  private ensureStatus(expected: TaskStatus) {
    if (this.status !== expected) {
      throw new Error(
        `Invalid transition: expected ${expected}, got ${this.status}`
      );
    }
  }

  private record(type: string, payload: unknown) {
    this.history.push({
      type,
      occurredAt: new Date(),
      payload,
    });
  }
}
