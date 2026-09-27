import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Column } from '../column/column';
import { Header } from '../header/header';
import { BoardService } from '../services/board-service';
import { InputStyleDirective } from '../shared/directives/tk-input';
import { Task } from '../shared/models/board';

@Component({
  selector: 'app-board',
  imports: [
    FormField,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    Column,
    InputStyleDirective,
    MatSelectModule,
    CommonModule,
    Header,
  ],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {
  protected showInput = signal(false);

  protected columnModel = signal({ name: '' });
  protected columnForm = form(this.columnModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Column name is required' });
  });
  protected boardservice = inject(BoardService);

  protected addColumn(event: Event): void {
    event.preventDefault();
    submit(this.columnForm, async () => {
      this.boardservice.addColumn(this.columnModel().name);
      this.columnModel.set({ name: '' });
    });
  }

  protected changeShowInput() {
    this.showInput.update((v) => !v);

    if (this.columnModel().name) this.columnModel.set({ name: '' });
  }

  protected get connectedLists(): string[] {
    return this.boardservice.columns().map((c) => c.id);
  }

  protected onDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  protected closeInput(): void {
    this.showInput.set(false);
    this.columnModel.set({ name: '' });
  }
}
