import { Component, Inject, OnInit, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../shared/models/board';
import { InputStyleDirective } from '../shared/directives/tk-input';

@Component({
  selector: 'app-dialog-task',
  imports: [FormField, MatButtonModule, InputStyleDirective],
  templateUrl: './dialog-task.html',
  styleUrl: './dialog-task.scss',
})
export class DialogTask implements OnInit {
  protected taskModel = signal({
    title: '',
    description: '',
  });
  protected taskForm = form(this.taskModel);

  constructor(
    private dialogRef: MatDialogRef<DialogTask>,
    @Inject(MAT_DIALOG_DATA) private data: Task,
  ) {}

  ngOnInit(): void {
    if (this.data) this.taskModel.set({ ...this.data });
  }

  public save(event: Event): void {
    event.preventDefault();

    const task: Task = {
      id: this?.data?.id,
      title: this.taskModel().title,
      description: this.taskModel().description,
    };

    this.dialogRef.close(task);
  }

  public close(event: Event): void {
    event.preventDefault();
    this.dialogRef.close();
  }
}
