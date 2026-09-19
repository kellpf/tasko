import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Card } from '../card/card';
import { DialogTask } from '../dialog-task/dialog-task';
import { BoardService } from '../services/board-service';
import { ColumnProp, Task } from '../shared/models/board';
import { DialogConfirm } from '../dialog-confirm/dialog-confirm';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-column',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    Card,
    CommonModule,
    DragDropModule,
    MatMenuModule,
  ],
  templateUrl: './column.html',
  styleUrl: './column.scss',
})
export class Column {
  column = input.required<ColumnProp>();
  @Input() connectedLists!: string[];
  @Output() taskDropped = new EventEmitter<CdkDragDrop<Task[]>>();
  boardService = inject(BoardService);

  constructor(private dialog: MatDialog) {}

  public addTask(columnId: string): void {
    this.dialog
      .open(DialogTask)
      .afterClosed()
      .subscribe((task: Task) => {
        if (!task) return;
        this.boardService.addTask(columnId, task);
      });
  }

  public deleteColumn(column: ColumnProp) {
    console.log('Voce deseja deletar a coluna', column.title, '?');

    !column.tasks.length
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
