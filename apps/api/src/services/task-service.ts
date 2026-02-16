import { randomUUID } from "crypto";
import { Task } from "@domain/task";
import { EventStore } from "../store/event-store";
import { TaskCreatedEvent } from "@events/task-events";

export const TaskService = {
  completeTask(taskId: string) {
  const events = EventStore.byTask(taskId);

  const task = Task.fromEvents(events);

  // Domain rule enforcement
  task.complete();

  const completionEvent = {
    type: "TaskCompleted" as const,
    taskId: task.id,
    occurredAt: new Date()
  };

  EventStore.append(completionEvent);

  return task;
},

  getTask(taskId: string) {
    const events = EventStore.byTask(taskId);
    return Task.fromEvents(events);
  },

  createTask(title: string) {
    const id = randomUUID();
    const task = Task.create(id, title);

    const event: TaskCreatedEvent = {
      type: "TaskCreated",
      taskId: task.id,
      title: task.title,
      occurredAt: new Date()
    };

    EventStore.append(event);

    return task;
  }
};
