import { randomUUID } from "crypto";
import { Task } from "@domain/task";
import { EventStore } from "../store/event-store";
import { TaskCreatedEvent } from "@events/task-events";

export const TaskService = {
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


