import { Injectable, signal } from '@angular/core';
import { ColumnProp, Task } from '../shared/models/board';
import { BOARD_MOCK } from '../shared/mocks/column.mock';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private readonly _columns = signal<ColumnProp[]>(BOARD_MOCK);

  readonly columns = this._columns.asReadonly();

  addColumn(title: string): void {
    const newCol: ColumnProp = { id: crypto.randomUUID(), title, tasks: [] };
    this._columns.update((cols) => [...cols, newCol]);
  }

  addTask(columnId: string, task: Omit<Task, 'id'>): void {
    const newTask: Task = { ...task, id: crypto.randomUUID() };

    this._columns.update((cols) =>
      cols.map((col) =>
        col.id === columnId ? { ...col, tasks: [...(col.tasks ?? []), newTask] } : col,
      ),
    );
  }

  updateTask(columnId: string, updatedTask: Task): void {
    this._columns.update((cols) =>
      cols.map((col) =>
        col.id === columnId
          ? { ...col, tasks: col.tasks?.map((t) => (t.id === updatedTask.id ? updatedTask : t)) }
          : col,
      ),
    );
  }

  deleteColumn(columnId: string): void {
    this._columns.update((cols) => cols.filter((col) => col.id !== columnId));
  }

  deleteTask(columnId: string, taskId: string): void {
    this._columns.update((cols) =>
      cols.map((col) =>
        col.id === columnId
          ? { ...col, tasks: col.tasks?.filter((task) => task.id !== taskId) }
          : col,
      ),
    );
  }
}