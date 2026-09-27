import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { Card } from '../card/card';
import { DialogConfirm } from '../dialog-confirm/dialog-confirm';
import { DialogTask } from '../dialog-task/dialog-task';
import { BoardService } from '../services/board-service';
import { ColumnProp, Task } from '../shared/models/board';

@Component({
  selector: 'app-column',
  imports: [MatInputModule, MatButtonModule, MatIconModule, Card, DragDropModule, MatMenuModule],
  templateUrl: './column.html',
  styleUrl: './column.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Column {
  public column = input.required<ColumnProp>();
  public connectedLists = input.required<string[]>();
  public taskDropped = output<CdkDragDrop<Task[]>>();

  private boardService = inject(BoardService);
  private dialog = inject(MatDialog);

  protected addTask(columnId: string): void {
    this.dialog
      .open(DialogTask)
      .afterClosed()
      .subscribe((task: Task) => {
        if (!task) return;
        this.boardService.addTask(columnId, task);
      });
  }

  protected deleteColumn(column: ColumnProp) {
    !column.tasks?.length
      ? this.boardService.deleteColumn(column.id)
      : this.dialog
          .open(DialogConfirm, {
            data: {
              title: 'Delete column',
              description:
                'There are still tasks in this column. Are you sure you want to delete it?',
            },
          })
          .afterClosed()
          .subscribe((confirm) => confirm && this.boardService.deleteColumn(column.id));
  }
}
