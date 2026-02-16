import { TaskEvent } from "@events/task-events";

const events: TaskEvent[] = [];

export const EventStore = {
  append(event: TaskEvent) {
    events.push(event);
  },

  all(): TaskEvent[] {
    return [...events];
  },

  byTask(taskId: string): TaskEvent[] {
    return events.filter(e => e.taskId === taskId);
  }
};

