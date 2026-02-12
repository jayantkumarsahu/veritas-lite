import { Task } from "../../../packages/domain/src/task";
import { InMemoryEventStore } from "../store/event-store";
import { TaskAnalyzer } from "../../../packages/ai/src/task-analyzer";

export class TaskService {
  constructor(
    private readonly store: InMemoryEventStore,
    private readonly analyzer: TaskAnalyzer
  ) {}

  async createTask(taskId: string) {
    const task = new Task(taskId);
    const state = task.getState();

    state.history.forEach(e => this.store.append(e as any));

    return this.analyzer.analyze(
      this.store.getByTaskId(taskId)
    );
  }
}
