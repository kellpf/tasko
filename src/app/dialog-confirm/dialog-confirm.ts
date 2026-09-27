import { Component, inject, signal } from '@angular/core';
import { DialogConfig } from '../shared/models/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-confirm',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './dialog-confirm.html',
  styleUrl: './dialog-confirm.scss',
})

export class DialogConfirm {
  private data = inject<DialogConfig>(MAT_DIALOG_DATA);
  protected confirmModel = signal(this.data);

  private dialogRef = inject(MatDialogRef<DialogConfirm>);

  protected confirm() {
    this.dialogRef.close(true);
  }
}
