import { TaskEvent } from "../../../packages/events/task-events";

export class InMemoryEventStore {
  private events: TaskEvent[] = [];

  append(event: TaskEvent) {
    this.events.push(event);
  }

  getByTaskId(taskId: string): TaskEvent[] {
    return this.events.filter(
      (e: any) => e.payload?.taskId === taskId
    );
  }

  all(): TaskEvent[] {
    return [...this.events];
  }
}
