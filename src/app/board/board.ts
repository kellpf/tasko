import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Column } from '../column/column';
import { ClickOutsideDirective } from '../shared/directives/click-outside';
import { form, FormField } from '@angular/forms/signals';
import { BoardService } from '../services/board-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputStyleDirective } from '../shared/directives/tk-input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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
    FormField,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board implements OnInit {
  boardservice = inject(BoardService);
  public title = '';
  showInput = false;

  protected columnModel = signal({
    name: '',
  });
  protected columnForm = form(this.columnModel);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.title = params['board'];
    });
  }

  addColumn(event: Event): void {
    event.preventDefault();
    const columnName = this.columnModel().name;
    if (columnName) {
      this.boardservice.addColumn(columnName);
      this.columnModel.set({ name: '' });
    }
  }

  changeShowInput() {
    this.showInput = !this.showInput;

    if (this.columnModel().name) this.columnModel.set({ name: '' });
  }

  get connectedLists(): string[] {
    return this.boardservice.columns().map((c) => c.id);
  }

  onDrop(event: CdkDragDrop<Task[]>) {
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
}
