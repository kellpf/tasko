import { Injectable, signal, Signal } from '@angular/core';
import { ColumnProp, Task } from '../shared/models/board';
import { BOARD_MOCK } from '../shared/mocks/column.mock';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private _columns = signal<ColumnProp[]>(BOARD_MOCK);

  columns = this._columns.asReadonly();

  addColumn(name: string): void {
    const randomId = crypto.randomUUID();
    const newCol: ColumnProp = { id: randomId, title: name, tasks: [] };
    this._columns.update((cols) => [...cols, newCol]);
  }

  addTask(columnId: string, task: Task): void {
    const randomId = crypto.randomUUID();

    this._columns.update((cols) =>
      cols.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, { ...task, id: randomId }] } : col,
      ),
    );
  }

  updateTask(columnId: string, updatedTask: Task): void {
    this._columns.update((cols) =>
      cols.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
            }
          : col,
      ),
    );
  }

  deleteColumn(columnId: string): void {
    this._columns.update((cols) => cols.filter(col => col.id !== columnId));
  }

  deleteTask(columnId: string, taskId: string) {
    this._columns().forEach((col) => {
      if (col.id === columnId) {
        console.log('A columa clicada: ', col.title);

        const task = col.tasks.find((task) => task.id === taskId);

        task && console.log('A task encontrada foi: ', task.title);
      }
    });

    this._columns.update((cols) =>
      cols.map((col) =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter((task) => task.id !== taskId) }
          : col,
      ),
    );
  }
}
