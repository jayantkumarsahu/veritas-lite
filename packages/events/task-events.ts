// EVENT CONTRACTS — Task Domain

export type TaskEventType =
  | "TASK_CREATED"
  | "TASK_PLANNED"
  | "TASK_STARTED"
  | "TASK_BLOCKED"
  | "TASK_COMPLETED";

export interface BaseEvent {
  id: string;
  type: TaskEventType;
  occurredAt: Date;
}

export interface TaskCreatedEvent extends BaseEvent {
  type: "TASK_CREATED";
  payload: {
    taskId: string;
  };
}

export interface TaskBlockedEvent extends BaseEvent {
  type: "TASK_BLOCKED";
  payload: {
    reason: string;
  };
}

export type TaskEvent =
  | TaskCreatedEvent
  | TaskBlockedEvent;
