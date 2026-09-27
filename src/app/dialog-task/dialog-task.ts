import { Component, inject, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Chip } from '../chip/chip';
import { InputStyleDirective } from '../shared/directives/tk-input';
import { TagColor, TagProp, Task } from '../shared/models/board';
import { PICKER_COLORS, TAG_COLORS } from '../shared/models/tag-colors';

@Component({
  selector: 'app-dialog-task',
  imports: [FormField, MatButtonModule, InputStyleDirective, MatDialogClose, MatIcon, Chip],
  templateUrl: './dialog-task.html',
  styleUrl: './dialog-task.scss',
})
export class DialogTask {
  protected readonly data = inject<Task | null>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<DialogTask>);

  protected readonly taskModel = signal<Pick<Task, 'title' | 'description'>>({
    title: this.data?.title ?? '',
    description: this.data?.description ?? '',
  });

  protected readonly taskForm = form(this.taskModel, (schemaPath) => {
    required(schemaPath.title, { message: 'Title is required' });
  });

  protected readonly tagInput = signal('');
  protected readonly tags = signal<TagProp[]>(this.data?.tags ?? []);


  protected readonly palette = TAG_COLORS;
  protected readonly pickerColors = PICKER_COLORS;
  protected readonly selectedColor = signal<TagColor | null>(null);

  protected addTag(event: Event): void {
    event.preventDefault();
    this.commitTag();
  }

  private commitTag(): void {
    const label = this.tagInput().trim();

    if (label && !this.tags().some((tag) => tag.label === label)) {
      this.tags.update((tags) => [...tags, { label, color: this.selectedColor() ?? 'gray' }]);
    }
    this.tagInput.set('');
  }

  protected save(event: Event): void {
    event.preventDefault();
    this.commitTag();

    submit(this.taskForm, async () => {
      const task: Task = {
        id: this.data?.id ?? crypto.randomUUID(),
        title: this.taskModel().title,
        description: this.taskModel().description,
        tags: this.tags(),
      };

      this.dialogRef.close(task);
    });
  }

  protected selectColor(color: TagColor | null): void {
    this.selectedColor.set(color);
  }
}
