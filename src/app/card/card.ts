import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogTask } from '../dialog-task/dialog-task';
import { BoardService } from '../services/board-service';
import { TagProp, Task } from '../shared/models/board';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipSet } from '@angular/material/chips';
import { Chip } from '../chip/chip';

@Component({
  selector: 'app-card',
  imports: [MatIconModule, DragDropModule, MatMenuModule, Chip],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  readonly task = input.required<Task>();
  readonly columnId = input.required<string>();
  protected menuOpen = signal(false);

  private boardService = inject(BoardService);
  private dialog = inject(MatDialog);

  protected togglebutton() {
    this.menuOpen.update((v) => !v);
  }
  protected editTask(): void {
    this.dialog
      .open(DialogTask, { data: { ...this.task() } })
      .afterClosed()
      .subscribe((task) => {
        if (task) {
          this.boardService.updateTask(this.columnId() ?? '', task);
        }
      });
  }

  protected deleteTask(): void {
    this.boardService.deleteTask(this.columnId(), this.task().id);
  }
}
