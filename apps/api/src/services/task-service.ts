import { Task } from "../../../packages/domain/src/task";
import { InMemoryEventStore } from "../store/event-store";
import { TaskAnalyzer } from "../../../packages/ai/src/task-analyzer";
import { TaskDecayAnalyzer } from "../../../packages/ai/src/decay-analyzer";

export class TaskService {
  private decay = new TaskDecayAnalyzer();

  constructor(
    private readonly store: InMemoryEventStore,
    private readonly analyzer: TaskAnalyzer
  ) {}

  async createTask(taskId: string) {
    const task = new Task(taskId);
    const state = task.getState();

    state.history.forEach(e => this.store.append(e as any));

    const events = this.store.getByTaskId(taskId);

    return {
      insight: await this.analyzer.analyze(events),
      decay: this.decay.analyze(events),
    };
  }
}

