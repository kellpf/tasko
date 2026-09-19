import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogTask } from '../dialog-task/dialog-task';
import { BoardService } from '../services/board-service';
import { Task } from '../shared/models/board';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkAriaLive } from '../../../node_modules/@angular/cdk/types/_a11y-module-chunk';

@Component({
  selector: 'app-card',
  imports: [MatIconModule, DragDropModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() public task: Task | undefined; // undefined corrigir
  @Input() public columnId: string | undefined;

  boardService = inject(BoardService);

  constructor(private dialog: MatDialog) {}

  protected editTask(): void {
    this.dialog
      .open(DialogTask, { data: { ...this.task } })
      .afterClosed()
      .subscribe((task) => {
        if(task) {
          this.boardService.updateTask(this.columnId ?? '', task)
        }
      });
  }

  protected deleteTask(): void {
    this.columnId && this.task && this.boardService.deleteTask(this.columnId, this.task?.id);
  }
}
